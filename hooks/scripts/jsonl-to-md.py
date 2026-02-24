#!/usr/bin/env python3
"""Convert Claude Code session JSONL to markdown.

Usage: python3 jsonl-to-md.py <jsonl-path> <output-path> [project-path]

Reads a Claude Code session JSONL file and writes a readable markdown export.
Adapted from mono/jsonl-to-md.py for use in arscontexta session capture hooks.
"""

import json
import re
import sys
from datetime import datetime
from pathlib import Path


def format_tool_block(tool_calls):
    """Format a list of tool calls as a code block."""
    if not tool_calls:
        return ""
    return "```tool\n" + "\n".join(tool_calls) + "\n```"


def consolidate_assistant_messages(messages):
    """Merge consecutive assistant messages into single turns.

    Combines text, tool calls, and mixed messages from the same assistant
    turn into one entry so the export shows one Agent block per turn.
    """
    result = []
    parts = []  # accumulates content strings for current assistant run

    def flush_assistant():
        if not text_parts and not tool_buffer:
            return
        # Merge any remaining tool buffer into a single block
        if tool_buffer:
            text_parts.append(format_tool_block(tool_buffer))
            tool_buffer.clear()
        result.append(("assistant", "\n\n".join(p for p in text_parts if p), []))
        text_parts.clear()

    text_parts = []
    tool_buffer = []

    for role, content, tools in messages:
        if role == "assistant":
            if tools and not content.strip():
                # Pure tool call — accumulate into buffer
                tool_buffer.extend(tools)
            else:
                # Text (possibly with tools) — flush tool buffer first
                if tool_buffer:
                    text_parts.append(format_tool_block(tool_buffer))
                    tool_buffer.clear()
                if content.strip():
                    text_parts.append(content.strip())
                if tools:
                    tool_buffer.extend(tools)
        else:
            flush_assistant()
            result.append((role, content, []))

    flush_assistant()
    return result


def format_tool_call(item, project_path=None):
    """Format a tool call with its relevant arguments."""
    name = item.get("name", "unknown")
    inp = item.get("input", {})

    def shorten_path(path):
        if project_path and path.startswith(project_path):
            return path[len(project_path):].lstrip('/')
        home = str(Path.home())
        if path.startswith(home):
            return '~' + path[len(home):]
        return path

    if name == "Bash":
        cmd = inp.get("command", "")
        if len(cmd) > 100:
            cmd = cmd[:97] + "..."
        return f"bash: {cmd}"
    elif name == "Read":
        return f"read: {shorten_path(inp.get('file_path', ''))}"
    elif name == "Edit":
        return f"edit: {shorten_path(inp.get('file_path', ''))}"
    elif name == "Write":
        return f"write: {shorten_path(inp.get('file_path', ''))}"
    elif name == "Glob":
        pattern = inp.get("pattern", "")
        path = inp.get("path", "")
        if path:
            return f"glob: {pattern} in {shorten_path(path)}"
        return f"glob: {pattern}"
    elif name == "Grep":
        pattern = inp.get("pattern", "")
        path = inp.get("path", "")
        if path:
            return f"grep: {pattern} in {shorten_path(path)}"
        return f"grep: {pattern}"
    elif name == "Task":
        desc = inp.get("description", "")
        return f"task: {desc}" if desc else "task: spawn agent"
    elif name == "AskUserQuestion":
        return "ask: user question"
    elif name == "Skill":
        skill = inp.get("skill", "")
        return f"skill: {skill}"
    else:
        return f"{name.lower()}"


def extract_text_content(content_array, project_path=None):
    """Extract text, thinking, and tool calls from content array.

    Claude Code stores streamed user input as individual character strings
    in the content array. We concatenate those directly (no separator) and
    treat structured {type: "text"} blocks as separate paragraphs.
    """
    text_parts = []
    thinking_parts = []
    tool_calls = []
    char_buffer = []

    for item in content_array:
        if isinstance(item, str):
            char_buffer.append(item)
            continue
        # Flush character buffer before processing structured items
        if char_buffer:
            text_parts.append("".join(char_buffer))
            char_buffer = []
        if not isinstance(item, dict):
            continue
        if item.get("type") == "text":
            text_parts.append(item.get("text", ""))
        elif item.get("type") == "thinking":
            thinking_parts.append(item.get("thinking", ""))
        elif item.get("type") == "tool_use":
            tool_calls.append(format_tool_call(item, project_path))

    # Flush any remaining characters
    if char_buffer:
        text_parts.append("".join(char_buffer))

    return "\n".join(text_parts), "\n".join(thinking_parts), tool_calls


def clean_system_tags(text):
    """Remove system-injected tags from user messages."""
    # Remove common system tags and their content
    text = re.sub(r'<system-reminder>.*?</system-reminder>', '', text, flags=re.DOTALL)
    text = re.sub(r'<ide_opened_file>.*?</ide_opened_file>', '', text, flags=re.DOTALL)
    text = re.sub(r'<command-name>.*?</command-name>', '', text, flags=re.DOTALL)
    text = re.sub(r'<command-message>.*?</command-message>', '', text, flags=re.DOTALL)
    # Collapse excess whitespace left behind
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


def convert_session(jsonl_path, project_path=None):
    """Convert JSONL session to markdown."""
    messages = []

    with open(jsonl_path, "r") as f:
        for line in f:
            try:
                entry = json.loads(line)
            except json.JSONDecodeError:
                continue

            entry_type = entry.get("type")

            if entry_type == "user":
                content = entry.get("message", {}).get("content", [])
                text, _, _ = extract_text_content(content, project_path)
                text = clean_system_tags(text)
                if text.strip():
                    # Detect injected skill prompts and wrap in code block
                    if text.startswith("Base directory for this skill:"):
                        first_line = text.split('\n', 1)[0]
                        text = f"*Skill invoked: {first_line}*\n\n`````md\n{text}\n`````"
                    messages.append(("user", text.strip(), []))

            elif entry_type == "assistant":
                content = entry.get("message", {}).get("content", [])
                text, thinking, tools = extract_text_content(content, project_path)
                if text.strip() or tools:
                    messages.append(("assistant", text.strip(), tools))

    messages = consolidate_assistant_messages(messages)

    # Build markdown
    md_lines = []
    timestamp = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
    session_id = Path(jsonl_path).stem

    md_lines.append("---")
    md_lines.append(f"session_id: {session_id}")
    md_lines.append(f"exported: {timestamp}")
    md_lines.append("---")
    md_lines.append("")
    md_lines.append("# Session Export")
    md_lines.append("")

    prev_role = None
    for role, content, _ in messages:
        if role == "user":
            if prev_role == "assistant":
                md_lines.append("---")
                md_lines.append("")
            md_lines.append("**User:**")
            md_lines.append("")
            md_lines.append(content)
            md_lines.append("")
            md_lines.append("___")
            md_lines.append("")
        else:
            md_lines.append("**Agent:**")
            md_lines.append("")
            md_lines.append(content)
            md_lines.append("")
        prev_role = role

    return "\n".join(md_lines)


def main():
    if len(sys.argv) < 3:
        print("Usage: jsonl-to-md.py <jsonl-path> <output-path> [project-path]", file=sys.stderr)
        sys.exit(1)

    jsonl_path = sys.argv[1]
    output_path = sys.argv[2]
    project_path = sys.argv[3] if len(sys.argv) > 3 else None

    if not Path(jsonl_path).exists():
        print(f"JSONL file not found: {jsonl_path}", file=sys.stderr)
        sys.exit(1)

    markdown = convert_session(jsonl_path, project_path)

    with open(output_path, "w") as f:
        f.write(markdown)


if __name__ == "__main__":
    main()
