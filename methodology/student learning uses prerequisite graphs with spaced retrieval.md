---
description: Student learning knowledge system — inspirational composition showing derived architecture for prerequisite graph construction, mastery tracking, and spaced retrieval scheduling
kind: example
domain: student-learning
topics: ["[[domain-compositions]]"]
---

# student learning uses prerequisite graphs with spaced retrieval

An inspirational composition showing what an agent-operated learning system looks like when derived from first principles. The killer feature is the prerequisite graph: every concept links to the concepts it depends on and the concepts that depend on it, and the agent detects knowledge gaps before they cascade into downstream confusion. This is not a template to copy but a worked example demonstrating how the 8 configuration dimensions compose into a system that turns passive note-taking into active learning architecture.

## Persona

**Priya, 22, third-year computer science student at a large research university.** She is taking four courses this semester: Operating Systems, Machine Learning, Discrete Mathematics II, and a humanities elective (Philosophy of Mind). She is strong in math but struggling with OS — the systems programming concepts feel disconnected from her programming experience, and she cannot tell whether she is struggling because the material is genuinely hard or because she is missing prerequisite knowledge from courses she passed without deeply understanding.

Priya's current study system is a mess. She has lecture notes in OneNote organized by date, a few Anki decks she made for Discrete Math I (abandoned after week 6), bookmarked Stack Overflow answers, and a folder of past exams she reviews the night before. She re-reads notes before exams, feels confident, then blanks on retrieval questions. Her grades do not reflect her effort because her study methods are high-effort-low-retention: re-reading creates an illusion of knowledge that active recall would expose.

Her agent's name is Sage. Sage maintains the concept graph across all four courses, tracks which concepts Priya actually understands (tested through retrieval, not self-report), and detects prerequisite gaps before they cascade. When Priya struggles with virtual memory in OS, Sage traces the prerequisite chain and discovers that Priya's understanding of memory addressing from Computer Architecture is shaky — a gap that has been silently compounding for two semesters.

Priya talks to Sage daily for 15-30 minutes (post-lecture processing and study sessions). Sage manages the review schedule, generates practice problems, and prepares study guides.

## Configuration

The 8 dimensions as derived for student learning:

| Dimension | Position | Rationale |
|-----------|----------|-----------|
| **Granularity** | Fine-grained — one note per concept | The prerequisite graph requires atomic concepts. "Virtual memory" must be its own note so that its prerequisites (memory addressing, page tables, address translation) can link to it individually. A compound "OS Chapter 7" note cannot participate in a prerequisite graph because it bundles concepts with different dependency structures. |
| **Organization** | Flat with course-based and concept-based MOCs | All concepts live in `notes/` regardless of course. A concept like "graph theory" appears in both Discrete Math and ML. Flat organization enables cross-course connections that course-folder silos would prevent. MOCs organize by course (for lecture tracking) and by concept domain (for understanding topology). |
| **Linking** | Dense explicit with prerequisite typing | Every concept links to its prerequisites with `prerequisite` relationship type and to downstream concepts with `enables` relationship type. Cross-course links are especially valuable: when Probability Theory appears in both Discrete Math and ML, the link reveals that mastering it once serves two courses. |
| **Metadata** | Medium-dense — mastery tracking and retrieval scheduling | Concepts need `mastery_level`, `last_tested`, `prerequisites`, `retrieval_strength`. Dense enough for programmatic gap detection and spaced repetition scheduling but not so dense that creating a concept note after lecture feels like paperwork. |
| **Processing** | Medium — lecture capture, concept extraction, prerequisite linking, retrieval testing | Content enters as lecture notes and gets processed into concept notes. Processing involves: identify distinct concepts, check for existing concept notes (avoid duplication), link prerequisites, generate retrieval questions. Heavier than personal assistant routing but lighter than research extraction because the concepts are largely defined by the course material. |
| **Formalization** | Convention-first with gradual automation | Start with written conventions for concept note creation and prerequisite linking. Automate retrieval scheduling (spaced repetition engine) and gap detection (prerequisite chain validation) as the graph grows. Schema validation for concept notes starts after the first month, once Priya's note-taking patterns stabilize. |
| **Review** | Dual cadence — daily retrieval practice and weekly concept review | Daily: spaced repetition review of due concepts (5-15 minutes). Weekly: assess progress across courses, identify stalled concepts, plan study priorities. Pre-exam: targeted review based on prerequisite completeness for exam topics. The agent manages the daily schedule; the weekly review is collaborative. |
| **Scope** | Multi-course, single semester with carryover | All four courses in one system. Concepts from previous semesters (prerequisites) are included when referenced but not exhaustively backfilled. The graph grows forward from this semester, pulling in prior knowledge only when gaps are detected. |

## Vault Structure

```
vault/
├── self/
│   ├── identity.md              # Sage's role and Priya's learning patterns
│   ├── study-patterns.md        # When Priya learns best, energy patterns
│   └── memory/
│       ├── gap-history.md       # Prerequisite gaps detected and resolved
│       └── exam-postmortems.md  # What exams revealed about understanding
├── notes/                       # All concept notes (flat)
│   ├── index.md                 # Hub: all courses and concept domains
│   ├── operating-systems.md     # Course MOC
│   ├── machine-learning.md      # Course MOC
│   ├── discrete-math-ii.md      # Course MOC
│   ├── philosophy-of-mind.md    # Course MOC
│   ├── computation.md           # Concept domain MOC (cross-course)
│   ├── probability.md           # Concept domain MOC (cross-course)
│   ├── virtual-memory.md        # Concept note
│   ├── page-tables.md           # Concept note
│   ├── memory-addressing.md     # Concept note
│   ├── process-scheduling.md    # Concept note
│   ├── gradient-descent.md      # Concept note
│   ├── backpropagation.md       # Concept note
│   ├── bayes-theorem.md         # Concept note
│   ├── graph-coloring.md        # Concept note
│   ├── chinese-room-argument.md # Concept note
│   ├── lecture-2026-02-10-os.md  # Lecture note
│   ├── lecture-2026-02-10-ml.md  # Lecture note
│   ├── problem-set-3-os.md      # Practice problems
│   ├── midterm-1-os-prep.md     # Study guide
│   └── ...
├── inbox/                       # Quick captures during lectures
│   └── ...
├── archive/                     # Past semester concept notes (still linkable)
│   └── ...
└── ops/
    ├── templates/
    │   ├── concept.md
    │   ├── lecture.md
    │   ├── practice-problem.md
    │   ├── study-guide.md
    │   └── exam-postmortem.md
    ├── derivation.md
    ├── retrieval-schedule.md     # Spaced repetition queue
    └── health/
        ├── prerequisite-gaps.md  # Detected gaps in the dependency chain
        └── mastery-dashboard.md  # Per-course mastery overview
```

## Note Schemas

### Concept

```yaml
---
description: A discrete idea or principle that can be understood, tested, and connected to other concepts
type: concept
domain: systems | ml | math | philosophy | programming
courses: ["[[operating-systems]]"]
mastery_level: unaware | exposed | familiar | practiced | mastered
last_tested: 2026-02-08
retrieval_strength: strong | moderate | weak | untested
prerequisites: ["[[memory-addressing]]", "[[page-tables]]"]
enables: ["[[demand-paging]]", "[[memory-mapped-io]]"]
retrieval_questions:
  - "Explain how virtual memory decouples logical from physical address space"
  - "What happens during a page fault? Walk through each step"
  - "Why does virtual memory require hardware support?"
topics: ["[[operating-systems]]", "[[computation]]"]
relevant_notes: ["[[memory-addressing]] -- prerequisite: must understand physical vs logical addresses first", "[[page-tables]] -- prerequisite: the data structure that maps virtual to physical", "[[process-scheduling]] -- related: virtual memory enables multiprogramming which scheduling manages"]
---
```

### Lecture

```yaml
---
description: Capture from a specific class session with key concepts and questions raised
type: lecture
course: "[[operating-systems]]"
date: 2026-02-10
instructor: Prof. Nakamura
key_concepts: ["[[virtual-memory]]", "[[page-tables]]", "[[page-fault-handling]]"]
questions_raised:
  - "How does the TLB interact with context switches?"
  - "Why is the page size usually 4KB and not larger?"
examples_given:
  - "Worked through address translation with a two-level page table"
topics: ["[[operating-systems]]"]
---
```

### Practice Problem

```yaml
---
description: An exercise testing specific concepts, with approach documentation and error analysis
type: practice-problem
concepts_tested: ["[[virtual-memory]]", "[[page-tables]]"]
course: "[[operating-systems]]"
source: Problem Set 3, Question 4
difficulty: medium
attempted: true
correct: false
time_taken: 25 minutes
solution_approach: Tried to compute page table size but confused virtual and physical address bits
errors_made: ["Confused virtual address space size with physical memory size", "Did not account for multi-level page table overhead"]
concepts_revealed_weak: ["[[memory-addressing]]"]
topics: ["[[operating-systems]]"]
---
```

### Study Guide

```yaml
---
description: Exam preparation document mapping exam topics to concept mastery status and study priorities
type: study-guide
course: "[[operating-systems]]"
exam: Midterm 1
date: 2026-02-28
topics_covered: ["[[process-scheduling]]", "[[virtual-memory]]", "[[page-tables]]", "[[memory-addressing]]", "[[system-calls]]", "[[concurrency-basics]]"]
mastery_summary:
  strong: ["[[system-calls]]", "[[process-scheduling]]"]
  moderate: ["[[concurrency-basics]]"]
  weak: ["[[virtual-memory]]", "[[page-tables]]"]
  gap: ["[[memory-addressing]]"]
study_priority: ["[[memory-addressing]]", "[[page-tables]]", "[[virtual-memory]]", "[[concurrency-basics]]"]
topics: ["[[operating-systems]]"]
---
```

### Exam Postmortem

```yaml
---
description: Post-exam analysis identifying what the exam revealed about actual understanding
type: exam-postmortem
course: "[[operating-systems]]"
exam: Midterm 1
date: 2026-02-28
grade: B-
expected_grade: B+
surprised_by:
  - "Could not explain TLB miss handling under time pressure — knew the concept but retrieval was slow"
  - "Multi-level page table question required combining three concepts simultaneously"
concepts_overestimated: ["[[virtual-memory]]"]
concepts_underestimated: ["[[system-calls]]"]
study_method_insights:
  - "Re-reading notes on virtual memory created false confidence — could recognize but not produce"
  - "Practice problems on system calls forced active recall, which held up under exam pressure"
topics: ["[[operating-systems]]"]
---
```

## Example Notes

### Concept: Virtual Memory

```markdown
---
description: Abstraction that decouples programs from physical memory layout by mapping virtual addresses to physical frames through page tables
type: concept
domain: systems
courses: ["[[operating-systems]]"]
mastery_level: familiar
last_tested: 2026-02-08
retrieval_strength: weak
prerequisites: ["[[memory-addressing]]", "[[page-tables]]", "[[address-translation]]"]
enables: ["[[demand-paging]]", "[[memory-mapped-io]]", "[[copy-on-write]]", "[[shared-memory]]"]
retrieval_questions:
  - "Explain how virtual memory decouples logical from physical address space"
  - "What happens during a page fault? Walk through each step"
  - "Why does virtual memory require hardware support (MMU)?"
  - "How does virtual memory enable multiprogramming?"
topics: ["[[operating-systems]]", "[[computation]]"]
relevant_notes: ["[[memory-addressing]] -- prerequisite: must understand physical vs logical addresses first", "[[page-tables]] -- prerequisite: the data structure that enables the mapping", "[[address-translation]] -- prerequisite: the mechanical process of converting addresses", "[[process-scheduling]] -- related: virtual memory enables the multiprogramming that scheduling manages", "[[demand-paging]] -- downstream: virtual memory makes demand paging possible"]
---

# virtual memory

Virtual memory is the abstraction that lets every process believe it has its own
contiguous address space starting from zero, regardless of how physical memory
is actually organized. The operating system and hardware (MMU) collaborate to
translate virtual addresses to physical addresses transparently.

## Why It Exists
Without virtual memory, every process would need to know where in physical memory
it was loaded. Programs would need to be relocated at load time, could not be
larger than physical memory, and could not share memory safely. Virtual memory
solves all three problems by adding a layer of indirection: the process uses
virtual addresses, the MMU translates them, and the OS manages the mapping.

## How It Works (Simplified)
1. Process generates a virtual address
2. MMU splits the address into page number + offset
3. Page number indexes into the [[page-tables]] to find the physical frame number
4. Frame number + offset = physical address
5. If the page is not in memory (page fault), the OS loads it from disk

This depends on understanding [[memory-addressing]] — specifically the difference
between an address space (the range of possible addresses) and physical memory
(the actual RAM installed). Virtual address space can be larger than physical
memory because not all pages need to be resident simultaneously.

## What I Struggle With
The multi-level page table structure. I understand why single-level page tables
waste memory (most of the virtual address space is unused, but the table must
have entries for all of it). I can describe two-level page tables in theory.
But when I try to compute page table sizes or walk through address translation
with specific bit counts, I get confused about which bits go where.

Sage's diagnosis: this struggle traces back to [[memory-addressing]], specifically
the relationship between address width (in bits), address space size (in bytes),
and page size. Resolving that prerequisite gap should make multi-level page
tables more tractable.

## Cross-Course Connection
The concept of indirection — adding a layer between what something appears to
be and what it actually is — appears in [[machine-learning]] as well. Feature
embeddings create a "virtual" representation space that decouples the learning
algorithm from the raw input format. This is not a deep analogy but noticing
the pattern of indirection as a recurring systems design tool.

---

Relevant Notes:
- [[memory-addressing]] -- prerequisite, gap detected: address width vs space size confusion
- [[page-tables]] -- prerequisite, the mechanism that makes this work
- [[process-scheduling]] -- virtual memory enables the multiprogramming context
- [[demand-paging]] -- the downstream concept this enables
```

### Concept: Memory Addressing (Prerequisite Gap)

```markdown
---
description: The relationship between address width in bits, addressable space in bytes, and physical memory size — the foundation that virtual memory builds on
type: concept
domain: systems
courses: ["[[operating-systems]]"]
mastery_level: exposed
last_tested: 2026-02-10
retrieval_strength: weak
prerequisites: ["[[binary-number-representation]]"]
enables: ["[[virtual-memory]]", "[[page-tables]]", "[[cache-organization]]"]
retrieval_questions:
  - "If a system has 32-bit addresses, how large is the addressable space?"
  - "A system has 16GB of physical RAM. How many bits does the physical address need?"
  - "Why can the virtual address space be larger than physical memory?"
  - "What is the difference between addressable space and installed memory?"
gap_detected: 2026-02-08
gap_source: "[[problem-set-3-os]]"
topics: ["[[operating-systems]]", "[[computation]]"]
relevant_notes: ["[[binary-number-representation]] -- prerequisite: must convert between bits and sizes", "[[virtual-memory]] -- downstream: this gap is blocking understanding of VM", "[[page-tables]] -- downstream: page table size calculations require address arithmetic"]
---

# memory addressing

Memory addressing is the relationship between three quantities that students
(including me) frequently conflate:

1. **Address width** — how many bits in an address (e.g., 32 bits, 64 bits)
2. **Addressable space** — how many unique locations can be named = 2^(address width)
3. **Physical memory** — how much RAM is actually installed (may be less than addressable space)

## Why This Matters
Every calculation in virtual memory depends on keeping these straight. When
Prof. Nakamura asks "how many entries does the page table need?" the answer
depends on the size of the VIRTUAL address space (determined by virtual address
width), not the physical memory. I keep mixing these up.

## The Gap
Sage flagged this as a prerequisite gap on Feb 8 after I got Problem Set 3,
Question 4 wrong. My error: I used physical memory size (4GB) to compute
page table entries when I should have used virtual address space size (2^32 for
a 32-bit system). The numbers happened to be the same in that problem (4GB
physical, 32-bit virtual = 4GB virtual), which masked my confusion. But in
the next problem where physical was 2GB and virtual was 32-bit, I got it wrong.

## Working Through It
- 32-bit address means 2^32 = 4,294,967,296 addressable bytes = 4 GB
- 64-bit address means 2^64 = 18.4 exabytes (far more than any physical RAM)
- A system with 16GB RAM needs at least 34-bit physical addresses (2^34 = 16GB)
- BUT the virtual address space can be much larger than physical RAM — that is
  the whole point of [[virtual-memory]]

## Practice Drills Sage Generated
1. 48-bit virtual address, 4KB pages. How many page table entries needed? (2^48 / 2^12 = 2^36)
2. 32-bit virtual, 16GB physical, 4KB pages. How many physical frames? (16GB / 4KB = 4M = 2^22)
3. Why is the number of page table entries determined by virtual, not physical, address space?

## Mastery Status
Exposed but not practiced. I can follow the explanation when reading it, but
under time pressure (exam conditions), I revert to the conflation error.
Need spaced practice with varied numbers until the distinction is automatic.

---

Relevant Notes:
- [[virtual-memory]] -- this gap blocks understanding of VM page table sizing
- [[binary-number-representation]] -- the prerequisite beneath this prerequisite
- [[page-tables]] -- computing page table size requires this addressing knowledge
```

### Lecture: Operating Systems, February 10

```markdown
---
description: Lecture on virtual memory implementation covering address translation, TLB, and multi-level page tables
type: lecture
course: "[[operating-systems]]"
date: 2026-02-10
instructor: Prof. Nakamura
key_concepts: ["[[virtual-memory]]", "[[page-tables]]", "[[address-translation]]", "[[tlb]]"]
questions_raised:
  - "How does the TLB interact with context switches? Does it flush?"
  - "Why is the page size usually 4KB and not larger or smaller?"
  - "What happens when the page table itself does not fit in memory?"
examples_given:
  - "Worked through address translation with a two-level page table on a 32-bit system"
  - "Showed TLB hit/miss timing comparison: 1ns TLB hit vs 100ns page table walk"
topics: ["[[operating-systems]]"]
relevant_notes: ["[[virtual-memory]] -- central concept of today's lecture", "[[memory-addressing]] -- my gap showed during the worked example: I confused address width with memory size again"]
---

# lecture 2026-02-10 — operating systems

Prof. Nakamura covered virtual memory implementation. Key takeaway: virtual
memory is not just about having more memory than physically installed —
it is about isolation, protection, and shared memory.

## Concepts Introduced or Deepened
- [[virtual-memory]] — deepened: how the abstraction actually works at hardware level
- [[address-translation]] — new: the step-by-step process the MMU follows
- [[tlb]] — new: the cache that makes address translation fast enough to be practical
- Multi-level page tables — deepened: why single-level wastes space, how two-level solves it

## Key Insight
The TLB is what makes virtual memory practical. Without it, every memory access
requires an additional memory access (to read the page table), which would
halve performance. The TLB converts the common case from 2 memory accesses
to 1 + tiny TLB lookup. This is an instance of a general systems principle:
expensive indirection becomes viable when the common case is cached.

## Questions to Follow Up
- TLB and context switches: Prof mentioned "TLB flush" — need to understand
  what this means for performance of context-heavy workloads
- Page size trade-offs: larger pages = fewer table entries but more internal
  fragmentation. Is there a formula for optimal page size?

## Gap Observation
During the worked example, I again stumbled on address width vs addressable
space. When asked "how many entries in the first-level page table?" I tried
to compute from physical memory size. The student next to me got it instantly
by dividing virtual address space by (page size * entries per second-level table).
My [[memory-addressing]] gap is directly blocking my ability to follow these
examples in real time.

---

Relevant Notes:
- [[virtual-memory]] -- today's focus concept
- [[memory-addressing]] -- gap surfaced again during worked example
- [[page-tables]] -- the mechanism discussed in depth today
```

### Practice Problem: Page Table Sizing (Revealing Weakness)

```markdown
---
description: Problem Set 3 Question 4 — page table size calculation that exposed the memory addressing prerequisite gap
type: practice-problem
concepts_tested: ["[[virtual-memory]]", "[[page-tables]]", "[[memory-addressing]]"]
course: "[[operating-systems]]"
source: Problem Set 3, Question 4
difficulty: medium
attempted: true
correct: false
time_taken: 25 minutes
solution_approach: Tried to compute page table entries using physical memory size instead of virtual address space size
errors_made:
  - "Used physical memory (4GB) to determine number of page table entries"
  - "Conflated 'addresses the system can name' with 'memory the system has installed'"
  - "Got the right answer by accident because 32-bit virtual = 4GB = physical size in this problem"
concepts_revealed_weak: ["[[memory-addressing]]"]
topics: ["[[operating-systems]]"]
relevant_notes: ["[[memory-addressing]] -- this problem exposed the gap", "[[virtual-memory]] -- the concept being tested"]
---

# problem set 3 — question 4

**Problem:** A system has 32-bit virtual addresses, 4GB physical memory, and
4KB pages. Calculate: (a) number of page table entries, (b) page table size
if each entry is 4 bytes, (c) why is this problematic?

## My Attempt
(a) Physical memory / page size = 4GB / 4KB = 1M entries

**Wrong reasoning.** The number of page table entries is determined by the
virtual address space, not physical memory. The page table must have an entry
for every possible virtual page, whether or not it maps to a physical frame.

Correct: Virtual address space / page size = 2^32 / 2^12 = 2^20 = 1M entries.

I got the right NUMBER (1M) because 2^32 = 4GB = the physical memory in this
problem. But my REASONING was wrong, and the next problem (where physical is
2GB but virtual is still 32-bit) proved it — I computed 512K entries instead
of the correct 1M.

(b) 1M * 4 bytes = 4MB page table. Correct (by accident).

(c) A 4MB page table per process is problematic because with 100 processes,
that is 400MB just for page tables. This motivates multi-level page tables.

## What This Revealed
The error is not about page tables — it is about [[memory-addressing]].
I do not have a solid intuition for the difference between "addresses that
exist" and "memory that is installed." Until I fix this, every VM calculation
will be unreliable even when I get the right answer by accident.

## Sage's Recommendation
Mastery sequence:
1. Drill [[memory-addressing]] with varied address widths and physical sizes
2. Re-attempt this problem with 48-bit virtual, 8GB physical, 4KB pages
   (numbers where the wrong method gives a visibly wrong answer)
3. Then return to multi-level page table problems

---

Relevant Notes:
- [[memory-addressing]] -- the actual gap this problem exposed
- [[virtual-memory]] -- the concept I thought I was struggling with
- [[page-tables]] -- the structure being sized in this problem
```

### Cross-Course Connection: Indirection as Design Pattern

```markdown
---
description: The pattern of adding a layer of indirection to decouple interface from implementation appears across OS, ML, and philosophy — a meta-concept connecting three courses
type: concept
domain: systems
courses: ["[[operating-systems]]", "[[machine-learning]]", "[[philosophy-of-mind]]"]
mastery_level: familiar
last_tested: 2026-02-12
retrieval_strength: moderate
prerequisites: ["[[virtual-memory]]", "[[gradient-descent]]"]
enables: []
retrieval_questions:
  - "Name three instances of indirection across your courses and explain the common structure"
  - "What are the trade-offs of adding indirection? When does it help vs hurt?"
topics: ["[[computation]]"]
relevant_notes: ["[[virtual-memory]] -- OS instance: virtual addresses decouple programs from physical layout", "[[gradient-descent]] -- ML instance: loss functions decouple learning from raw prediction error", "[[chinese-room-argument]] -- Philosophy instance: Searle argues Chinese Room has indirection without understanding"]
---

# indirection as design pattern

Sage noticed that the concept of indirection — inserting a layer between what
something appears to be and what it actually is — shows up in three of my four
courses this semester. Worth noting because cross-course patterns are the kind
of deep understanding that transfers beyond any single exam.

## Instances
**Operating Systems:** [[virtual-memory]] adds a mapping layer between the
addresses a program uses and the physical memory locations those addresses
correspond to. The benefit: programs do not need to know about physical
layout, and the OS can rearrange physical memory without breaking programs.

**Machine Learning:** Loss functions and [[gradient-descent]] add a layer
between "how wrong is this prediction" and "what should the model do about
it." The loss function transforms raw error into a signal the optimizer
can follow. Different loss functions (MSE, cross-entropy) create different
optimization landscapes for the same underlying problem.

**Philosophy of Mind:** The [[chinese-room-argument]] turns on whether
indirection (the man following rules without understanding Chinese) constitutes
understanding. Searle argues the indirection layer (rule-following) does not
bridge to the thing it appears to produce (understanding). This is the same
structural question: does the mapping layer preserve the essential property
of what it maps?

## The Common Structure
In each case:
1. There is a "real" layer (physical memory, raw errors, Chinese language)
2. There is an interface layer (virtual addresses, loss gradients, rule outputs)
3. The interface layer decouples users from implementation details
4. The decoupling enables flexibility but introduces the question: is anything
   lost in the translation?

## Why This Matters for Learning
Recognizing indirection as a cross-domain pattern means I am not learning
three separate concepts — I am learning one structural principle with three
instantiations. This is the kind of transfer that Sage calls "far transfer":
understanding that travels across domain boundaries because the structure,
not the content, is what was learned.

---

Relevant Notes:
- [[virtual-memory]] -- OS instance of indirection
- [[gradient-descent]] -- ML instance of indirection
- [[chinese-room-argument]] -- philosophical instance questioning whether indirection preserves meaning
```

## Processing Workflow

Content flows through a capture-extract-connect-test cycle designed around the rhythms of student life:

### 1. Capture (During/After Lectures)
Priya takes rapid notes during lectures in `inbox/`. These are messy, incomplete, and timestamp-ordered. After class (or the same evening), she talks to Sage: "Sage, today's OS lecture covered virtual memory, address translation, and the TLB." Sage prompts for details, questions raised, and examples given. The result is a structured lecture note.

### 2. Extract (Post-Lecture Processing)
Sage processes the lecture note by:
- Identifying distinct concepts mentioned (virtual memory, address translation, TLB)
- Checking if concept notes already exist for each (avoid duplication)
- Creating new concept notes for genuinely new concepts
- Updating existing concept notes if the lecture deepened understanding
- Linking the lecture note to all concept notes it references

For each new concept, Sage asks: "What does this concept depend on? What does it enable?" This builds the prerequisite graph incrementally.

### 3. Connect (Prerequisite Graph Construction)
After extraction, Sage updates the prerequisite graph:
- Links new concepts to their prerequisites (virtual memory requires memory addressing and page tables)
- Links new concepts to downstream concepts they enable (virtual memory enables demand paging)
- Checks for cross-course connections: does this concept appear in other courses?
- Generates retrieval questions for each new concept

When Sage detects a concept from a previous semester that Priya needs but may not have mastered (like memory addressing from Computer Architecture), Sage creates a concept note with `gap_detected` metadata and recommends targeted review.

### 4. Test (Active Retrieval)
Sage manages a spaced repetition schedule for all concepts with retrieval questions:
- New concepts get tested within 24 hours (initial encoding)
- Concepts Priya retrieves successfully get longer intervals (2 days, 5 days, 14 days, 30 days)
- Concepts Priya struggles with get shorter intervals and prerequisite chain investigation
- Practice problems provide deeper testing than retrieval questions

After each test session, Sage updates `mastery_level` and `retrieval_strength` for tested concepts. Failed retrievals trigger prerequisite chain analysis: "You could not retrieve virtual memory page fault handling. Checking prerequisites: memory addressing is weak. Recommend reviewing memory addressing before re-attempting virtual memory."

### 5. Synthesize (Exam Preparation)
Before exams, Sage generates study guides:
1. List all concepts the exam covers (from syllabus + lecture notes)
2. For each concept, check mastery_level and retrieval_strength
3. Trace prerequisite chains: if a tested concept is weak, check whether its prerequisites are solid
4. Prioritize study by: prerequisite gaps first (foundation), then weak concepts, then moderate concepts for reinforcement
5. Generate targeted practice problems for the weakest areas

The study guide is not "review everything" — it is "review these specific concepts in this specific order because this is where your understanding has gaps."

### 6. Reflect (Post-Exam Postmortem)
After each exam, Sage facilitates a postmortem:
- Which questions surprised you? (reveals concepts you overestimated)
- Which questions felt easy? (confirms mastery)
- What study methods worked? (refines future study strategy)
- What study methods gave false confidence? (specifically targeting re-reading)

Postmortem insights update Sage's understanding of Priya's learning patterns and inform future study recommendations.

## MOC Structure

### Hub: All Courses

```markdown
---
description: Navigation hub for all active courses and cross-course concept domains
type: moc
topics: []
---

# index

Four active courses this semester, plus cross-cutting concept domains that
span multiple courses.

## Active Courses
- [[operating-systems]] -- systems programming, Prof. Nakamura. Current gap: memory addressing prerequisite
- [[machine-learning]] -- statistical learning theory, Prof. Chen. On track, strong math foundation helps
- [[discrete-math-ii]] -- combinatorics and graph theory, Prof. Williams. Solid, building on Discrete Math I
- [[philosophy-of-mind]] -- consciousness and computation, Prof. Okafor. Engaging, surprising connections to CS

## Cross-Course Concept Domains
- [[computation]] -- indirection, abstraction layers, state machines (OS + ML + Philosophy)
- [[probability]] -- probabilistic reasoning (Discrete Math + ML)
- [[optimization]] -- gradient methods, search (ML + Discrete Math)

## Health
- Prerequisite gaps detected: ops/health/prerequisite-gaps.md
- Mastery dashboard: ops/health/mastery-dashboard.md
- Retrieval schedule: ops/retrieval-schedule.md
```

### Course MOC: Operating Systems

```markdown
---
description: Operating Systems (CS 350) — process management, memory systems, and concurrency, with prerequisite gap tracking for memory addressing
type: moc
course_code: CS 350
instructor: Prof. Nakamura
semester: Spring 2026
topics: ["[[index]]"]
---

# operating systems

Systems programming course covering process management, memory systems,
file systems, and concurrency. Currently the most challenging course because
several concepts depend on Computer Architecture knowledge that I passed
without deeply understanding.

## Core Concepts by Module

### Process Management
- [[process-lifecycle]] -- states, transitions, PCB structure (mastered)
- [[process-scheduling]] -- algorithms, criteria, trade-offs (practiced)
- [[system-calls]] -- interface between user and kernel mode (mastered)
- [[context-switching]] -- mechanism and cost (familiar)

### Memory Systems
- [[memory-addressing]] -- GAP DETECTED: address width vs space size confusion (exposed)
- [[page-tables]] -- single and multi-level structures (familiar)
- [[address-translation]] -- step-by-step MMU process (familiar)
- [[virtual-memory]] -- abstraction, benefits, implementation (familiar, blocked by addressing gap)
- [[tlb]] -- translation caching, flush on context switch (exposed)
- [[demand-paging]] -- not yet covered
- [[page-replacement]] -- not yet covered

### Concurrency (upcoming)
- [[concurrency-basics]] -- threads, race conditions (exposed from readings)
- Not yet covered in lectures

## Prerequisite Gaps
Sage has detected one critical gap in this course:
- [[memory-addressing]] — flagged 2026-02-08 via [[problem-set-3-os]]. This gap
  cascades into virtual-memory, page-tables, and all downstream memory concepts.
  Resolving this gap is the highest priority for OS study.

## Lectures
- [[lecture-2026-02-03-os]] -- process scheduling algorithms
- [[lecture-2026-02-05-os]] -- system calls and kernel mode
- [[lecture-2026-02-10-os]] -- virtual memory and address translation

## Exam Timeline
- Midterm 1: February 28 (process management + memory systems)
- Midterm 2: April 11 (concurrency + file systems)
- Final: May 15 (comprehensive)

---

Agent Notes:
The memory addressing gap is architecturally significant — it is a single
prerequisite failure that blocks understanding of 5+ downstream concepts.
Priya can "learn" virtual memory, page tables, and TLB as surface-level
definitions, but she cannot DO the calculations (page table sizing, address
translation) until addressing is solid. Prioritize this gap over new
lecture content.
```

## Graph Query Examples

```bash
# Find all prerequisite gaps (concepts with gap_detected field)
rg '^gap_detected:' notes/ -l | while read f; do
  desc=$(rg '^description:' "$f" | head -1 | cut -d: -f2-)
  gap_date=$(rg '^gap_detected:' "$f" | cut -d' ' -f2)
  echo "GAP ($gap_date):$desc — $(basename $f)"
done

# Find all concepts at "weak" retrieval strength that enable downstream concepts
rg '^retrieval_strength: weak' notes/ -l | while read f; do
  enables=$(rg '^enables:' "$f" | head -1)
  if echo "$enables" | grep -q '\[\['; then
    echo "WEAK + ENABLING: $(basename $f)"
    echo "  Enables: $enables"
  fi
done

# Cross-course concept detection: concepts appearing in 2+ courses
rg '^courses:.*\[\[.*\]\].*\[\[' notes/ -l | while read f; do
  courses=$(rg '^courses:' "$f" | head -1)
  echo "CROSS-COURSE: $(basename $f) — $courses"
done

# Mastery distribution per course
COURSE="operating-systems"
echo "=== $COURSE mastery distribution ==="
for level in mastered practiced familiar exposed unaware; do
  count=$(rg "^mastery_level: $level" notes/ -l | \
    xargs -I{} rg "^courses:.*$COURSE" {} -l 2>/dev/null | wc -l | tr -d ' ')
  echo "  $level: $count"
done

# Prerequisite chain depth: how many prerequisites deep is a concept?
find_depth() {
  local concept="$1"
  local file=$(find notes/ -name "$concept.md" 2>/dev/null | head -1)
  if [ -z "$file" ]; then echo 0; return; fi
  local prereqs=$(rg '^prerequisites:' "$file" | grep -o '\[\[[^]]*\]\]' | sed 's/\[\[//g;s/\]\]//g')
  if [ -z "$prereqs" ]; then echo 0; return; fi
  local max_depth=0
  for p in $prereqs; do
    local d=$(find_depth "$p")
    if [ "$d" -gt "$max_depth" ]; then max_depth=$d; fi
  done
  echo $((max_depth + 1))
}
# Usage: find_depth "virtual-memory" → 2 (memory-addressing → binary-number-representation)
```

## What Makes This Domain Unique

**1. The prerequisite graph is a dependency graph with cascading failure modes.** In a research vault, a missing connection is a missed opportunity for synthesis — the note still stands on its own. In a learning system, a missing prerequisite is a structural failure that cascades forward. If Priya does not understand memory addressing, she cannot understand virtual memory, which means she cannot understand demand paging, which means the entire second half of Operating Systems is built on sand. The prerequisite graph is not a nice organizational feature — it is a diagnostic tool that reveals why a student is struggling by tracing symptoms back to root causes. This is fundamentally different from the associative linking in research systems where every note is independently valuable.

**2. Mastery must be tested, not self-reported.** In a personal assistant vault, an area is "green" or "red" based on engagement — a reasonable proxy because the user knows their own life. In a learning system, self-reported mastery is dangerously unreliable. Students who re-read notes feel confident but fail on recall. The research on metacognitive blindness (students confident in material they cannot retrieve) means the system must actively test mastery through retrieval questions and practice problems, not trust Priya's self-assessment. This makes testing a first-class operation, not an optional review — and makes the system inherently more adversarial than a personal assistant (which is always on the user's side).

**3. Cross-course connections create transfer learning that isolated study cannot.** Priya takes four courses as four separate workloads. But "indirection as a design pattern" spans OS, ML, and Philosophy. Discrete Math's probability concepts directly enable ML's Bayesian reasoning. These connections are invisible when courses are studied in isolation. The flat concept graph that spans all courses reveals structural similarities that would never surface in a course-folder organization — and these cross-course connections represent the kind of deep understanding that transfers beyond any single exam into lasting expertise. No course syllabus teaches this. The graph reveals it.

## Agent-Native Advantages

**Prerequisite gap detection before cascading failure.** When Priya struggles with virtual memory, she experiences it as "this topic is hard." A human tutor might ask probing questions and eventually identify the memory addressing gap, but only if they think to look there. Sage traces the prerequisite graph algorithmically: virtual-memory depends on memory-addressing, memory-addressing has `retrieval_strength: weak` and a failed practice problem. The diagnosis is not a guess — it is a graph traversal. This is the difference between a student spending 10 hours re-reading virtual memory notes (treating the symptom) and spending 2 hours on memory addressing drills (treating the cause). A human cannot maintain the prerequisite graph across 4 courses and 50+ concepts. An agent can, and the diagnostic accuracy directly converts to study time saved.

**Spaced repetition scheduling across all courses simultaneously.** A human using Anki creates separate decks per course and reviews them independently. Sage manages one unified schedule that optimizes across all courses: "You have 20 minutes for review today. Based on retrieval decay curves: 3 OS concepts are due (one of which is a prerequisite for Friday's lecture), 2 ML concepts are due, and 1 Discrete Math concept is approaching its forgetting threshold. Priority order: the OS prerequisite (time-critical), then the concepts closest to their forgetting thresholds." No human maintains this optimization across four courses. They review whatever deck they feel like, or cram the night before. The agent transforms spaced repetition from a per-course habit (usually abandoned) into a unified, priority-aware system that schedules based on retrieval science, not mood.

**Practice problem targeting based on concept weakness, not chapter progression.** When Sage detects that memory addressing is weak, it does not recommend "do more Chapter 7 problems." It generates or selects problems that specifically test the confused concepts: "Given a 48-bit virtual address space and 8GB physical RAM, compute the number of page table entries." This problem is crafted to produce different answers depending on whether Priya uses virtual address space (correct) or physical memory (her error pattern). If she gets it right, the concept is strengthening. If she gets it wrong in the predicted way, the gap is confirmed and Sage adjusts. This is not generic "more practice" — it is diagnostic practice targeting the specific confusion the prerequisite graph revealed. A textbook's problem sets are ordered by chapter. The agent's problem selection is ordered by diagnostic value.

**Cross-course concept detection that isolated study cannot produce.** Sage detects that probability theory appears in both Discrete Math and ML. A human studying for each course separately would learn Bayes' theorem twice — once as a math proof, once as an ML algorithm — without connecting them. Sage links the concepts: "The [[bayes-theorem]] note in your Discrete Math course is the mathematical foundation for the [[naive-bayes-classifier]] in your ML course. Mastering the proof strengthens your understanding of the classifier, and seeing the classifier application deepens your intuition for the proof." This connection is invisible in a course-siloed system. It is obvious in a flat concept graph that spans courses. The agent does not just notice the connection — it schedules review so that the two instantiations reinforce each other rather than competing for study time.

**Exam postmortem analysis revealing study method failures, not just content failures.** After every exam, Sage analyzes the relationship between study methods and outcomes. "You studied virtual memory by re-reading notes (3 sessions, 2.5 hours total). You studied system calls by doing practice problems (2 sessions, 1.5 hours total). On the exam: virtual memory questions scored 65%, system calls scored 92%. This is consistent with research on re-reading vs. active retrieval: recognition (re-reading) creates confidence but not recall, while retrieval practice (problems) creates durable recall." A human student notices "I did badly on VM" and resolves to study harder. The agent notices "your study METHOD for VM was the problem, not your effort level" and recommends a specific change in approach. This meta-cognitive feedback is what separates students who improve from students who work harder at the same ineffective methods — and it is precisely the kind of pattern detection that requires tracking study methods alongside outcomes across multiple exam cycles, which no student naturally does.
---

Topics:
- [[domain-compositions]]
