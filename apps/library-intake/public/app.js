
(function () {
  const steps = [
    {
      id: "panelProgram",
      title: "Program basics",
      hint: "Name the program and define who owns it.",
      help: {
        intro: "Start with ownership and one clear business outcome.",
        expected: [
          "Program name used by stakeholders",
          "Program ID (auto-generated or short kebab-case)",
          "Owner team or function",
          "Outcome stated as a measurable improvement"
        ],
        defaults: [
          "Owner team: Operations Excellence",
          "Program ID style: bank-context-graph"
        ],
        sample: [
          "Outcome: Reduce payment exception resolution time by 30%"
        ],
        pitfalls: [
          "Do not use vague outcomes like 'improve process'",
          "Avoid changing Program ID frequently"
        ]
      }
    },
    {
      id: "panelInterview",
      title: "Guided interview",
      hint: "Optional: answer prompts and auto-fill the form.",
      help: {
        intro: "Use this mode for non-technical contributors.",
        expected: ["One short sentence per prompt"],
        defaults: ["Use plain business language"],
        sample: ["We need shared context for Payments Ops, Fraud Ops, and Lending Ops"],
        pitfalls: ["Long multi-topic answers are harder to map cleanly"]
      }
    },
    {
      id: "panelLibraries",
      title: "Libraries",
      hint: "Define each business function as a library.",
      help: {
        intro: "Each library should map to one operational function.",
        expected: [
          "Library ID and display name",
          "Purpose statement",
          "Owner role"
        ],
        defaults: ["Start with 3-5 libraries"],
        sample: ["payments-ops: Execute payments and handle exceptions"],
        pitfalls: ["Do not mix unrelated functions in one library"]
      }
    },
    {
      id: "panelTerms",
      title: "Shared terms",
      hint: "Set common language across teams.",
      help: {
        intro: "Shared terms keep cross-team links consistent.",
        expected: ["Entity terms and relationship terms"],
        defaults: ["Entities: process, control, risk, metric, exception"],
        sample: ["Relationships: depends_on, owned_by, mitigates, measured_by"],
        pitfalls: ["Avoid synonyms for the same concept across libraries"]
      }
    },
    {
      id: "panelHandoffs",
      title: "Handoffs",
      hint: "Describe how work moves between libraries.",
      help: {
        intro: "Capture the most important cross-function transfers first.",
        expected: ["Source, target, handoff object, type"],
        defaults: ["Use type = handoff unless a specific control flow exists"],
        sample: ["payments-ops -> fraud-ops: high-risk-payment-exception"],
        pitfalls: ["Do not leave object empty; that makes links hard to use"]
      }
    },
    {
      id: "panelArtifact",
      title: "AI drafting",
      hint: "Optional: draft suggestions from source documents.",
      help: {
        intro: "Use AI to accelerate first drafts, then review carefully.",
        expected: ["SOP, runbook, incident, or policy text"],
        defaults: ["Apply suggestions selectively"],
        sample: ["Paste exception SOP to draft handoffs automatically"],
        pitfalls: ["Never accept AI output without validation"]
      }
    },
    {
      id: "panelMap",
      title: "Visual map",
      hint: "Arrange the map for stakeholder readability.",
      help: {
        intro: "The map is for communication, not just storage.",
        expected: ["Drag nodes into a clear flow layout"],
        defaults: ["Keep high-volume hubs near center"],
        sample: ["Payments centered with Fraud and Risk adjacent"],
        pitfalls: ["Avoid crossing lines when possible"]
      }
    },
    {
      id: "panelGovernance",
      title: "Governance",
      hint: "Set baseline controls and compliance defaults.",
      help: {
        intro: "Define minimum compliance settings once.",
        expected: ["Classification, cadence, retention, provenance"],
        defaults: [
          "Classification: confidential",
          "Review cadence: monthly",
          "Retention: 36 months"
        ],
        sample: ["Required provenance: source_ref,captured_at,owner_role,confidence"],
        pitfalls: ["Do not skip provenance fields if auditability matters"]
      }
    },
    {
      id: "panelReview",
      title: "Review & export",
      hint: "Inspect final output and manage revisions.",
      help: {
        intro: "Finalize with revision control before downstream generation.",
        expected: ["Save revision, optionally approve, then export"],
        defaults: ["Approve only reviewed revisions"],
        sample: ["Approve rev-0004, then export manifest.json"],
        pitfalls: ["Avoid approving unsaved or unreviewed drafts"]
      }
    }
  ];

  const interviewQuestions = [
    { key: "programName", prompt: "What should this program be called?" },
    { key: "ownerUnit", prompt: "Which team owns this work?" },
    { key: "targetOutcome", prompt: "What outcome should improve in 6-12 months?" },
    { key: "libraries", prompt: "List functions as libraries (comma-separated)." },
    { key: "entities", prompt: "List shared business terms everyone should use." },
    { key: "relationships", prompt: "List relationship words teams should use consistently." },
    { key: "classificationBaseline", prompt: "Baseline data sensitivity? public/internal/confidential/restricted" }
  ];

  const recommendedEntityChips = ["process", "control", "risk", "metric", "policy", "exception", "system", "role"];
  const recommendedRelationshipChips = ["depends_on", "owned_by", "mitigates", "measured_by", "escalates_to", "feeds"];

  const state = {
    currentStep: 0,
    interviewIndex: 0,
    lastSavedRevision: "",
    templateCatalog: [],
    templateDetails: {},
    approvedCatalog: [],
    program: { name: "", id: "", owner_unit: "", target_outcome: "" },
    libraries: [],
    shared_terms: { entities: [], relationships: [] },
    links: [],
    governance: {
      classification_baseline: "confidential",
      review_cadence: "monthly",
      retention_months: 36,
      change_approval: "dual-approver",
      required_provenance_fields: ["source_ref", "captured_at", "owner_role", "confidence", "effective_from"]
    },
    artifact_suggestions: null,
    map_positions: {}
  };

  const ui = {
    stepper: byId("stepper"),
    progressBar: byId("progressBar"),
    stepTitle: byId("stepTitle"),
    stepHint: byId("stepHint"),
    status: byId("status"),
    btnPrevStep: byId("btnPrevStep"),
    btnNextStep: byId("btnNextStep"),
    librariesContainer: byId("librariesContainer"),
    linksContainer: byId("linksContainer"),
    sharedEntities: byId("sharedEntities"),
    sharedRelationships: byId("sharedRelationships"),
    manifestPreview: byId("manifestPreview"),
    interviewPrompt: byId("interviewPrompt"),
    interviewAnswer: byId("interviewAnswer"),
    mapBoard: byId("mapBoard"),
    mapSvg: byId("mapSvg"),
    artifactSuggestions: byId("artifactSuggestions"),
    revisionSelect: byId("revisionSelect"),
    entityChips: byId("entityChips"),
    relationshipChips: byId("relationshipChips"),
    helpIntro: byId("helpIntro"),
    helpExpected: byId("helpExpected"),
    helpDefault: byId("helpDefault"),
    helpSample: byId("helpSample"),
    helpPitfalls: byId("helpPitfalls"),
    templateSelect: byId("templateSelect"),
    templateInfo: byId("templateInfo"),
    templatePreview: byId("templatePreview"),
    approvedInfo: byId("approvedInfo"),
    baselineOutputDir: byId("baselineOutputDir"),
    baselineInfo: byId("baselineInfo"),
    approvedProgramSelect: byId("approvedProgramSelect"),
    approvedLinkModal: byId("approvedLinkModal"),
    approvedModalBackdrop: byId("approvedModalBackdrop"),
    approvedCatalogSelect: byId("approvedCatalogSelect"),
    approvedSourceSelect: byId("approvedSourceSelect"),
    approvedTargetSelect: byId("approvedTargetSelect"),
    approvedModalInfo: byId("approvedModalInfo")
  };

  init();

  function init() {
    buildStepper();
    wireInputs();
    bindButtons();
    ensureInitialLibrary();
    renderChips();
    renderAll();
    loadTemplateList();
    loadApprovedCatalogs(false);
  }

  function buildStepper() {
    ui.stepper.innerHTML = "";
    steps.forEach((step, idx) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = `${idx + 1}. ${step.title}`;
      button.addEventListener("click", () => {
        state.currentStep = idx;
        renderStep();
      });
      li.appendChild(button);
      ui.stepper.appendChild(li);
    });
  }

  function renderStep() {
    const total = steps.length;
    const current = state.currentStep;
    const step = steps[current];
    ui.stepTitle.textContent = `Step ${current + 1} of ${total}: ${step.title}`;
    ui.stepHint.textContent = step.hint;
    ui.progressBar.style.width = `${((current + 1) / total) * 100}%`;
    renderHelp(step.help);

    steps.forEach((s, idx) => {
      const panel = byId(s.id);
      if (panel) panel.classList.toggle("active", idx === current);
      const btn = ui.stepper.querySelectorAll("button")[idx];
      if (btn) btn.classList.toggle("active", idx === current);
    });

    ui.btnPrevStep.disabled = current === 0;
    ui.btnNextStep.textContent = current === total - 1 ? "Finish" : "Next";
  }

  function renderHelp(help) {
    ui.helpIntro.textContent = help.intro;
    setList(ui.helpExpected, help.expected);
    setList(ui.helpDefault, help.defaults);
    setList(ui.helpSample, help.sample);
    setList(ui.helpPitfalls, help.pitfalls);
  }

  function setList(target, items) {
    target.innerHTML = (items || []).map((x) => `<li>${escape(x)}</li>`).join("");
  }

  function wireInputs() {
    byId("programName").addEventListener("input", (e) => {
      state.program.name = e.target.value;
      if (!state.program.id) {
        state.program.id = toKebab(e.target.value);
        byId("programId").value = state.program.id;
      }
      renderManifest();
    });
    byId("programId").addEventListener("input", (e) => {
      state.program.id = toKebab(e.target.value);
      e.target.value = state.program.id;
      renderManifest();
    });
    byId("ownerUnit").addEventListener("input", (e) => {
      state.program.owner_unit = e.target.value;
      renderManifest();
    });
    byId("targetOutcome").addEventListener("input", (e) => {
      state.program.target_outcome = e.target.value;
      renderManifest();
    });

    ui.sharedEntities.addEventListener("input", (e) => {
      state.shared_terms.entities = splitCsv(e.target.value);
      renderManifest();
    });
    ui.sharedRelationships.addEventListener("input", (e) => {
      state.shared_terms.relationships = splitCsv(e.target.value);
      renderManifest();
    });

    byId("classificationBaseline").addEventListener("change", (e) => {
      state.governance.classification_baseline = e.target.value;
      renderManifest();
    });
    byId("reviewCadence").addEventListener("change", (e) => {
      state.governance.review_cadence = e.target.value;
      renderManifest();
    });
    byId("retentionMonths").addEventListener("input", (e) => {
      state.governance.retention_months = Number(e.target.value || 0);
      renderManifest();
    });
    byId("changeApproval").addEventListener("change", (e) => {
      state.governance.change_approval = e.target.value;
      renderManifest();
    });
    byId("provenanceFields").addEventListener("input", (e) => {
      state.governance.required_provenance_fields = splitCsv(e.target.value);
      renderManifest();
    });
  }

  function bindButtons() {
    ui.btnPrevStep.addEventListener("click", () => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
        renderStep();
      }
    });
    ui.btnNextStep.addEventListener("click", () => {
      if (state.currentStep < steps.length - 1) {
        state.currentStep += 1;
        renderStep();
      } else {
        setStatus("All steps complete. Export your manifest when ready.");
      }
    });

    byId("btnApplyBankStarter").addEventListener("click", applyBankStarter);
    byId("btnAddLibrary").addEventListener("click", addLibrary);
    byId("btnAddLink").addEventListener("click", addLink);
    byId("btnAddLinkFromApproved").addEventListener("click", openApprovedModal);

    byId("btnRefreshTemplates").addEventListener("click", loadTemplateList);
    byId("btnTemplateLoadMerge").addEventListener("click", () => applySelectedTemplate("merge"));
    byId("btnTemplateLoadReplace").addEventListener("click", () => applySelectedTemplate("replace"));
    byId("btnTemplatePreview").addEventListener("click", previewSelectedTemplate);

    byId("btnRefreshApprovedCatalogs").addEventListener("click", () => loadApprovedCatalogs(false));
    byId("btnLoadApprovedLibraries").addEventListener("click", () => loadApproved(false));
    byId("btnLoadApprovedWithLinks").addEventListener("click", () => loadApproved(true));
    byId("btnGenerateFromApproved").addEventListener("click", generateBaselineFromApproved);

    byId("btnExportAnswers").addEventListener("click", () => downloadJson("answers.json", buildAnswers()));
    byId("btnExportManifest").addEventListener("click", () => downloadJson("manifest.json", buildManifest()));
    byId("btnExportManifest2").addEventListener("click", () => downloadJson("manifest.json", buildManifest()));

    byId("btnSaveRevision").addEventListener("click", saveRevision);
    byId("btnLoadRevisions").addEventListener("click", loadRevisionList);
    byId("btnLoadRevision").addEventListener("click", loadRevision);
    byId("btnApproveCurrent").addEventListener("click", approveCurrentRevision);

    byId("btnSuggestFromArtifact").addEventListener("click", requestArtifactSuggestions);
    byId("artifactFileInput").addEventListener("change", readArtifactFile);

    byId("btnInterviewApply").addEventListener("click", applyInterviewAnswer);
    byId("btnInterviewNext").addEventListener("click", nextInterviewQuestion);

    byId("importJsonInput").addEventListener("change", importJson);

    ui.templateSelect.addEventListener("change", () => {
      renderTemplateInfo();
      ui.templatePreview.textContent = "";
    });

    ui.approvedCatalogSelect.addEventListener("change", renderApprovedModalChoices);
    ui.approvedModalBackdrop.addEventListener("click", closeApprovedModal);
    byId("btnApprovedCancel").addEventListener("click", closeApprovedModal);
    byId("btnApprovedInsert").addEventListener("click", insertApprovedModalLink);
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !ui.approvedLinkModal.classList.contains("hidden")) {
        closeApprovedModal();
      }
    });
  }

  function renderChips() {
    renderChipGroup(ui.entityChips, recommendedEntityChips, () => state.shared_terms.entities, (next) => {
      state.shared_terms.entities = next;
      ui.sharedEntities.value = next.join(", ");
      renderManifest();
    });

    renderChipGroup(ui.relationshipChips, recommendedRelationshipChips, () => state.shared_terms.relationships, (next) => {
      state.shared_terms.relationships = next;
      ui.sharedRelationships.value = next.join(", ");
      renderManifest();
    });
  }

  function renderChipGroup(container, values, getSelected, setSelected) {
    container.innerHTML = "";
    values.forEach((value) => {
      const button = document.createElement("button");
      button.className = "chip";
      button.type = "button";
      button.textContent = value;
      const selected = new Set(getSelected());
      if (selected.has(value)) {
        button.style.background = "#dff4ef";
        button.style.borderColor = "#94ccbf";
      }
      button.addEventListener("click", () => {
        const current = new Set(getSelected());
        if (current.has(value)) current.delete(value);
        else current.add(value);
        const next = Array.from(current);
        setSelected(next);
        renderChips();
      });
      container.appendChild(button);
    });
  }

  function ensureInitialLibrary() {
    if (!state.libraries.length) {
      state.libraries.push({
        id: "payments-ops",
        display_name: "Payments Operations",
        purpose: "",
        decisions_supported: [],
        inputs: [],
        outputs: [],
        owner_role: "",
        weekly_change_volume: "medium"
      });
    }
  }

  function addLibrary() {
    state.libraries.push({
      id: `library-${state.libraries.length + 1}`,
      display_name: "",
      purpose: "",
      decisions_supported: [],
      inputs: [],
      outputs: [],
      owner_role: "",
      weekly_change_volume: "medium"
    });
    renderLibraries();
    renderMap();
    renderManifest();
  }

  function addLink() {
    state.links.push({
      source_library: state.libraries[0] ? state.libraries[0].id : "",
      target_library: state.libraries[1] ? state.libraries[1].id : "",
      contract_type: "handoff",
      object: "",
      trigger_event: "",
      sla_target: "",
      failure_signal: "",
      required_fields: []
    });
    renderLinks();
    renderMap();
    renderManifest();
  }

  function renderLibraries() {
    ui.librariesContainer.innerHTML = "";
    state.libraries.forEach((lib, idx) => {
      const card = document.createElement("div");
      card.className = "library-card";
      card.innerHTML = `
        <strong>${escape(lib.display_name || `Library ${idx + 1}`)}</strong>
        <label>Library ID<input data-lib="${idx}" data-field="id" value="${escape(lib.id)}"></label>
        <label>Display name<input data-lib="${idx}" data-field="display_name" value="${escape(lib.display_name)}"></label>
        <label>Purpose<input data-lib="${idx}" data-field="purpose" value="${escape(lib.purpose)}"></label>
        <details>
          <summary>More details</summary>
          <label>Decisions this helps with<input data-lib="${idx}" data-field="decisions_supported" value="${escape(lib.decisions_supported.join(", "))}"></label>
          <label>Inputs<input data-lib="${idx}" data-field="inputs" value="${escape(lib.inputs.join(", "))}"></label>
          <label>Outputs<input data-lib="${idx}" data-field="outputs" value="${escape(lib.outputs.join(", "))}"></label>
          <label>Owner role<input data-lib="${idx}" data-field="owner_role" value="${escape(lib.owner_role)}"></label>
          <label>Weekly change volume
            <select data-lib="${idx}" data-field="weekly_change_volume">
              ${["low", "medium", "high"].map((v) => `<option ${v === lib.weekly_change_volume ? "selected" : ""}>${v}</option>`).join("")}
            </select>
          </label>
        </details>
        <button data-remove-lib="${idx}">Remove Library</button>
      `;
      ui.librariesContainer.appendChild(card);
    });

    ui.librariesContainer.querySelectorAll("input[data-lib],select[data-lib]").forEach((el) =>
      el.addEventListener("input", (e) => {
        const i = Number(e.target.dataset.lib);
        const field = e.target.dataset.field;
        let value = e.target.value;
        if (field === "id") {
          value = toKebab(value);
          e.target.value = value;
        }
        if (["decisions_supported", "inputs", "outputs"].includes(field)) value = splitCsv(value);
        state.libraries[i][field] = value;
        renderLinks();
        renderMap();
        renderManifest();
      })
    );

    ui.librariesContainer.querySelectorAll("button[data-remove-lib]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const i = Number(e.target.dataset.removeLib);
        state.libraries.splice(i, 1);
        if (!state.libraries.length) ensureInitialLibrary();
        renderAll();
      });
    });
  }
  function renderLinks() {
    ui.linksContainer.innerHTML = "";
    state.links.forEach((link, idx) => {
      const options = state.libraries.map((l) => `<option value="${escape(l.id)}">${escape(l.display_name || l.id)}</option>`).join("");
      const card = document.createElement("div");
      card.className = "link-card";
      card.innerHTML = `
        <strong>Handoff ${idx + 1}</strong>
        <label>From<select data-link="${idx}" data-field="source_library">${options}</select></label>
        <label>To<select data-link="${idx}" data-field="target_library">${options}</select></label>
        <label>Type
          <select data-link="${idx}" data-field="contract_type">
            ${["handoff", "control", "data", "escalation", "dependency"].map((v) => `<option ${v === link.contract_type ? "selected" : ""}>${v}</option>`).join("")}
          </select>
        </label>
        <label>What moves between teams?<input data-link="${idx}" data-field="object" value="${escape(link.object)}"></label>
        <details>
          <summary>More details</summary>
          <label>Trigger event<input data-link="${idx}" data-field="trigger_event" value="${escape(link.trigger_event)}"></label>
          <label>SLA target<input data-link="${idx}" data-field="sla_target" value="${escape(link.sla_target)}"></label>
          <label>Failure signal<input data-link="${idx}" data-field="failure_signal" value="${escape(link.failure_signal)}"></label>
          <label>Required fields<input data-link="${idx}" data-field="required_fields" value="${escape((link.required_fields || []).join(", "))}"></label>
        </details>
        <button data-remove-link="${idx}">Remove Handoff</button>
      `;
      ui.linksContainer.appendChild(card);
      card.querySelector('select[data-field="source_library"]').value = link.source_library || "";
      card.querySelector('select[data-field="target_library"]').value = link.target_library || "";
    });

    ui.linksContainer.querySelectorAll("input[data-link],select[data-link]").forEach((el) =>
      el.addEventListener("input", (e) => {
        const i = Number(e.target.dataset.link);
        const field = e.target.dataset.field;
        let value = e.target.value;
        if (field === "required_fields") value = splitCsv(value);
        state.links[i][field] = value;
        renderMap();
        renderManifest();
      })
    );

    ui.linksContainer.querySelectorAll("button[data-remove-link]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const i = Number(e.target.dataset.removeLink);
        state.links.splice(i, 1);
        renderLinks();
        renderMap();
        renderManifest();
      });
    });
  }

  function renderMap() {
    ui.mapBoard.innerHTML = "";
    ui.mapSvg.innerHTML = "";
    const width = ui.mapBoard.clientWidth || 800;
    const height = ui.mapBoard.clientHeight || 360;
    ui.mapSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    state.libraries.forEach((lib, idx) => {
      if (!state.map_positions[lib.id]) {
        state.map_positions[lib.id] = { x: 30 + (idx % 4) * 180, y: 30 + Math.floor(idx / 4) * 110 };
      }
      const node = document.createElement("div");
      node.className = "node";
      node.textContent = lib.display_name || lib.id;
      node.dataset.libId = lib.id;
      const pos = state.map_positions[lib.id];
      node.style.left = `${pos.x}px`;
      node.style.top = `${pos.y}px`;
      ui.mapBoard.appendChild(node);
      makeDraggable(node, lib.id, drawLinks);
    });

    drawLinks();
  }

  function drawLinks() {
    ui.mapSvg.innerHTML = "";
    const centers = {};
    ui.mapBoard.querySelectorAll(".node").forEach((n) => {
      centers[n.dataset.libId] = { x: n.offsetLeft + n.offsetWidth / 2, y: n.offsetTop + n.offsetHeight / 2 };
    });

    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = '<marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#0f7e6f"></path></marker>';
    ui.mapSvg.appendChild(defs);

    state.links.forEach((link) => {
      const s = centers[link.source_library];
      const t = centers[link.target_library];
      if (!s || !t) return;
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(s.x));
      line.setAttribute("y1", String(s.y));
      line.setAttribute("x2", String(t.x));
      line.setAttribute("y2", String(t.y));
      line.setAttribute("stroke", "#0f7e6f");
      line.setAttribute("stroke-width", "2");
      line.setAttribute("marker-end", "url(#arrow)");
      ui.mapSvg.appendChild(line);
    });
  }

  function makeDraggable(node, libId, onMove) {
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;
    node.addEventListener("mousedown", (e) => {
      dragging = true;
      offsetX = e.clientX - node.offsetLeft;
      offsetY = e.clientY - node.offsetTop;
    });
    window.addEventListener("mouseup", () => {
      dragging = false;
    });
    window.addEventListener("mousemove", (e) => {
      if (!dragging) return;
      const x = Math.max(0, e.clientX - offsetX - ui.mapBoard.getBoundingClientRect().left);
      const y = Math.max(0, e.clientY - offsetY - ui.mapBoard.getBoundingClientRect().top);
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
      state.map_positions[libId] = { x, y };
      onMove();
    });
  }

  async function requestArtifactSuggestions() {
    const artifactText = byId("artifactText").value.trim();
    if (!artifactText) {
      setStatus("Paste or upload source text first.");
      return;
    }
    setStatus("Generating AI suggestions...");

    try {
      const resp = await fetch("/api/ai/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artifactText, currentLibraries: state.libraries.map((l) => l.id) })
      });
      const payload = await resp.json();
      if (!resp.ok) throw new Error(payload.error || "suggestion_failed");
      state.artifact_suggestions = payload.data;
      renderSuggestions();
      setStatus("Suggestions ready. Apply only what looks right.");
    } catch (err) {
      setStatus(`Suggestion failed: ${err.message}`);
    }
  }

  function renderSuggestions() {
    const data = state.artifact_suggestions;
    if (!data) {
      ui.artifactSuggestions.innerHTML = "";
      return;
    }

    ui.artifactSuggestions.innerHTML = `
      <div class="suggestion-card">
        <h4>Suggested libraries</h4>
        <pre>${escape(JSON.stringify(data.libraries || [], null, 2))}</pre>
        <button id="applySuggestedLibraries" class="primary">Apply suggested libraries</button>
      </div>
      <div class="suggestion-card">
        <h4>Suggested shared terms</h4>
        <pre>${escape(JSON.stringify({ entities: data.shared_entities || [], relationships: data.shared_relationships || [] }, null, 2))}</pre>
        <button id="applySuggestedTerms" class="primary">Apply suggested terms</button>
      </div>
      <div class="suggestion-card">
        <h4>Suggested handoffs</h4>
        <pre>${escape(JSON.stringify(data.links || [], null, 2))}</pre>
        <button id="applySuggestedLinks" class="primary">Apply suggested handoffs</button>
      </div>
    `;

    byId("applySuggestedLibraries").addEventListener("click", () => {
      if (Array.isArray(data.libraries) && data.libraries.length) {
        state.libraries = data.libraries.map((l, i) => ({
          id: toKebab(l.id || `library-${i + 1}`),
          display_name: l.display_name || "",
          purpose: l.purpose || "",
          decisions_supported: Array.isArray(l.decisions_supported) ? l.decisions_supported : [],
          inputs: Array.isArray(l.inputs) ? l.inputs : [],
          outputs: Array.isArray(l.outputs) ? l.outputs : [],
          owner_role: l.owner_role || "",
          weekly_change_volume: l.weekly_change_volume || "medium"
        }));
      }
      renderAll();
    });

    byId("applySuggestedTerms").addEventListener("click", () => {
      state.shared_terms.entities = Array.isArray(data.shared_entities) ? data.shared_entities : [];
      state.shared_terms.relationships = Array.isArray(data.shared_relationships) ? data.shared_relationships : [];
      ui.sharedEntities.value = state.shared_terms.entities.join(", ");
      ui.sharedRelationships.value = state.shared_terms.relationships.join(", ");
      renderChips();
      renderManifest();
    });

    byId("applySuggestedLinks").addEventListener("click", () => {
      if (Array.isArray(data.links)) {
        state.links = data.links.map((l) => ({
          source_library: l.source_library || "",
          target_library: l.target_library || "",
          contract_type: l.contract_type || "handoff",
          object: l.object || "",
          trigger_event: l.trigger_event || "",
          sla_target: l.sla_target || "",
          failure_signal: l.failure_signal || "",
          required_fields: Array.isArray(l.required_fields) ? l.required_fields : []
        }));
      }
      renderLinks();
      renderMap();
      renderManifest();
    });
  }

  function nextInterviewQuestion() {
    state.interviewIndex = (state.interviewIndex + 1) % interviewQuestions.length;
    renderInterview();
  }
  function applyInterviewAnswer() {
    const q = interviewQuestions[state.interviewIndex];
    const answer = ui.interviewAnswer.value.trim();
    if (!answer) return;

    switch (q.key) {
      case "programName":
        state.program.name = answer;
        if (!state.program.id) state.program.id = toKebab(answer);
        byId("programName").value = state.program.name;
        byId("programId").value = state.program.id;
        break;
      case "ownerUnit":
        state.program.owner_unit = answer;
        byId("ownerUnit").value = answer;
        break;
      case "targetOutcome":
        state.program.target_outcome = answer;
        byId("targetOutcome").value = answer;
        break;
      case "libraries":
        state.libraries = splitCsv(answer).map((name) => ({
          id: toKebab(name),
          display_name: name,
          purpose: "",
          decisions_supported: [],
          inputs: [],
          outputs: [],
          owner_role: "",
          weekly_change_volume: "medium"
        }));
        break;
      case "entities":
        state.shared_terms.entities = splitCsv(answer);
        ui.sharedEntities.value = state.shared_terms.entities.join(", ");
        break;
      case "relationships":
        state.shared_terms.relationships = splitCsv(answer);
        ui.sharedRelationships.value = state.shared_terms.relationships.join(", ");
        break;
      case "classificationBaseline": {
        const v = answer.toLowerCase();
        if (["public", "internal", "confidential", "restricted"].includes(v)) {
          state.governance.classification_baseline = v;
          byId("classificationBaseline").value = v;
        }
        break;
      }
      default:
        break;
    }

    ui.interviewAnswer.value = "";
    setStatus(`Applied answer to: ${q.prompt}`);
    renderAll();
  }

  function renderInterview() {
    ui.interviewPrompt.textContent = interviewQuestions[state.interviewIndex].prompt;
  }

  function applyBankStarter() {
    state.program = {
      name: "Bank Business Function Meta-Graph",
      id: "bank-context-graph",
      owner_unit: "Operations Excellence",
      target_outcome: "Reduce cross-functional process failures and decision latency"
    };
    state.libraries = [
      {
        id: "payments-ops",
        display_name: "Payments Operations",
        purpose: "Execute payments and handle payment exceptions.",
        decisions_supported: ["When to escalate payment exceptions"],
        inputs: ["sops", "runbooks", "incident-tickets"],
        outputs: ["process-insights", "control-gap-findings"],
        owner_role: "payments-ops-manager",
        weekly_change_volume: "high"
      },
      {
        id: "fraud-ops",
        display_name: "Fraud Operations",
        purpose: "Investigate suspicious activity and mitigation actions.",
        decisions_supported: ["When to hold or release high-risk transactions"],
        inputs: ["alerts", "cases", "policy"],
        outputs: ["investigation-findings", "mitigation-actions"],
        owner_role: "fraud-ops-manager",
        weekly_change_volume: "high"
      },
      {
        id: "lending-ops",
        display_name: "Lending Operations",
        purpose: "Coordinate underwriting and post-booking controls.",
        decisions_supported: ["When to request additional underwriting documentation"],
        inputs: ["loan-files", "underwriting-guides"],
        outputs: ["loan-decision-notes", "exception-escalations"],
        owner_role: "lending-ops-manager",
        weekly_change_volume: "medium"
      }
    ];
    state.shared_terms = {
      entities: ["process", "control", "risk", "metric", "exception", "policy"],
      relationships: ["depends_on", "owned_by", "mitigates", "measured_by", "escalates_to"]
    };
    state.links = [
      {
        source_library: "payments-ops",
        target_library: "fraud-ops",
        contract_type: "escalation",
        object: "high-risk-payment-exception",
        trigger_event: "exception.severity == critical",
        sla_target: "15m",
        failure_signal: "no_ack_within_sla",
        required_fields: ["exception_id", "severity", "detected_at", "owner_role"]
      },
      {
        source_library: "lending-ops",
        target_library: "fraud-ops",
        contract_type: "control",
        object: "suspected-application-fraud",
        trigger_event: "fraud_indicator >= threshold",
        sla_target: "30m",
        failure_signal: "no_case_opened",
        required_fields: ["application_id", "indicator_score", "owner_role"]
      }
    ];

    hydrateDomFromState();
    renderChips();
    renderAll();
    setStatus("Bank starter applied. Review each step and adjust for your team.");
  }

  function hydrateDomFromState() {
    byId("programName").value = state.program.name || "";
    byId("programId").value = state.program.id || "";
    byId("ownerUnit").value = state.program.owner_unit || "";
    byId("targetOutcome").value = state.program.target_outcome || "";
    ui.sharedEntities.value = (state.shared_terms.entities || []).join(", ");
    ui.sharedRelationships.value = (state.shared_terms.relationships || []).join(", ");
    byId("classificationBaseline").value = state.governance.classification_baseline || "confidential";
    byId("reviewCadence").value = state.governance.review_cadence || "monthly";
    byId("retentionMonths").value = state.governance.retention_months || 36;
    byId("changeApproval").value = state.governance.change_approval || "dual-approver";
    byId("provenanceFields").value = (state.governance.required_provenance_fields || []).join(",");
  }

  function buildAnswers() {
    return {
      schema_version: "1.0",
      captured_at: new Date().toISOString(),
      program: state.program,
      libraries: state.libraries,
      shared_terms: state.shared_terms,
      links: state.links,
      governance: state.governance
    };
  }

  function buildManifest() {
    const programId = state.program.id || toKebab(state.program.name) || "program";
    return {
      schema_version: "1.0",
      program_id: programId,
      revision: "draft",
      updated_at: new Date().toISOString(),
      program: {
        name: state.program.name,
        owner_unit: state.program.owner_unit,
        target_outcome: state.program.target_outcome
      },
      defaults: {
        processing_depth: "heavy",
        automation: "full",
        search: "hybrid",
        review_cadence: state.governance.review_cadence,
        retention_months: state.governance.retention_months
      },
      governance: state.governance,
      libraries: state.libraries,
      ontology: state.shared_terms,
      contracts: state.links
    };
  }

  function renderManifest() {
    ui.manifestPreview.textContent = JSON.stringify(buildManifest(), null, 2);
  }

  function renderAll() {
    renderStep();
    renderLibraries();
    renderLinks();
    renderMap();
    renderInterview();
    renderManifest();
  }

  async function saveRevision() {
    const programId = state.program.id || toKebab(state.program.name) || "program";
    try {
      const resp = await fetch("/api/revisions/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ programId, answers: buildAnswers(), manifest: buildManifest() })
      });
      const payload = await resp.json();
      if (!resp.ok) throw new Error(payload.error || "save_failed");
      state.lastSavedRevision = payload.revision;
      setStatus(`Saved revision ${payload.revision}.`);
      await loadRevisionList();
    } catch (err) {
      setStatus(`Save failed: ${err.message}`);
    }
  }

  async function approveCurrentRevision() {
    const programId = state.program.id || toKebab(state.program.name) || "program";
    let revision = ui.revisionSelect.value || state.lastSavedRevision;
    if (!revision) {
      await saveRevision();
      revision = state.lastSavedRevision;
    }
    if (!revision) {
      setStatus("No revision available to approve.");
      return;
    }

    try {
      const resp = await fetch("/api/revisions/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programId,
          revision,
          approvedBy: byId("approvedBy").value || "local-review"
        })
      });
      const payload = await resp.json();
      if (!resp.ok) throw new Error(payload.error || "approve_failed");
      ui.approvedInfo.textContent = `Approved: ${payload.latest.program_id} ${payload.latest.revision} (${payload.latest.approved_at})`;
      setStatus(`Approved ${revision}. Latest approved is now available for retrieval.`);
    } catch (err) {
      setStatus(`Approval failed: ${err.message}`);
    }
  }

  async function loadApproved(includeLinks) {
    let selected = getSelectedApprovedCatalog();
    if (!selected || !selected.data || !selected.data.manifest) {
      await loadApprovedCatalogs(true);
      selected = getSelectedApprovedCatalog();
    }

    if (!selected || !selected.data || !selected.data.manifest) {
      setStatus("No approved libraries found for the selected set.");
      return;
    }

    const manifest = selected.data.manifest;
    state.libraries = Array.isArray(manifest.libraries) ? manifest.libraries : state.libraries;
    if (includeLinks) {
      state.links = Array.isArray(manifest.contracts) ? manifest.contracts : state.links;
    }
    state.shared_terms = manifest.ontology || state.shared_terms;
    hydrateDomFromState();
    renderChips();
    renderAll();
    ui.approvedInfo.textContent = `Loaded approved ${selected.program_id} ${selected.revision} (${selected.approved_at})`;
    setStatus(includeLinks ? "Loaded approved libraries and handoffs." : "Loaded approved libraries.");
  }


  async function generateBaselineFromApproved() {
    let selected = getSelectedApprovedCatalog();
    if (!selected) {
      await loadApprovedCatalogs(false);
      selected = getSelectedApprovedCatalog();
    }

    if (!selected) {
      setStatus("No approved set selected for baseline generation.");
      return;
    }

    const outputDir = String(ui.baselineOutputDir.value || "generated-libraries").trim() || "generated-libraries";

    try {
      setStatus("Generating baseline from approved set...");
      const resp = await fetch("/api/approved/generate-baseline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: selected.key, outputDir })
      });
      const payload = await resp.json();
      if (!resp.ok) {
        throw new Error(payload.error || "baseline_generation_failed");
      }

      const result = payload.result || {};
      ui.baselineInfo.textContent = `Generated ${result.libraries_count || 0} libraries at ${result.base_dir_relative || "generated output"}.`;
      setStatus(`Baseline generated from approved ${selected.program_id} ${selected.revision}.`);
    } catch (err) {
      ui.baselineInfo.textContent = "";
      setStatus(`Could not generate baseline: ${err.message}`);
    }
  }
  async function loadRevisionList() {
    const programId = state.program.id || toKebab(state.program.name) || "program";
    const resp = await fetch(`/api/revisions/${encodeURIComponent(programId)}`);
    const payload = await resp.json();
    ui.revisionSelect.innerHTML = "";
    (payload.revisions || []).forEach((rev) => {
      const opt = document.createElement("option");
      opt.value = rev;
      opt.textContent = rev;
      ui.revisionSelect.appendChild(opt);
    });
    setStatus(`Found ${(payload.revisions || []).length} revision(s).`);
  }

  async function loadRevision() {
    const programId = state.program.id || toKebab(state.program.name) || "program";
    const rev = ui.revisionSelect.value;
    if (!rev) return;
    const resp = await fetch(`/api/revisions/${encodeURIComponent(programId)}/${encodeURIComponent(rev)}`);
    if (!resp.ok) {
      setStatus("Could not load selected revision.");
      return;
    }
    const payload = await resp.json();
    hydrateFromAnswers(payload.answers || {});
    state.lastSavedRevision = rev;
    setStatus(`Loaded revision ${rev}.`);
  }

  function hydrateFromAnswers(answers) {
    state.program = answers.program || state.program;
    state.libraries = Array.isArray(answers.libraries) ? answers.libraries : state.libraries;
    state.shared_terms = answers.shared_terms || state.shared_terms;
    state.links = Array.isArray(answers.links) ? answers.links : state.links;
    state.governance = answers.governance || state.governance;
    hydrateDomFromState();
    renderChips();
    renderAll();
  }

  function importJson(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || "{}"));
        if (parsed.answers) {
          hydrateFromAnswers(parsed.answers);
          setStatus("Imported revision file.");
          return;
        }
        if (parsed.program || parsed.libraries) {
          hydrateFromAnswers(parsed);
          setStatus("Imported answers file.");
          return;
        }
        if (parsed.program_id && parsed.libraries) {
          hydrateFromAnswers({
            program: parsed.program || {},
            libraries: parsed.libraries,
            shared_terms: parsed.ontology || { entities: [], relationships: [] },
            links: parsed.contracts || [],
            governance: parsed.governance || state.governance
          });
          setStatus("Imported manifest file.");
          return;
        }
        setStatus("JSON format not recognized.");
      } catch (err) {
        setStatus(`Import failed: ${err.message}`);
      }
    };
    reader.readAsText(file);
  }

  function readArtifactFile(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      byId("artifactText").value = String(reader.result || "");
      setStatus(`Loaded ${file.name}.`);
    };
    reader.readAsText(file);
  }


  async function loadTemplateList() {
    try {
      const resp = await fetch("/api/templates/bank");
      const payload = await resp.json();
      if (!resp.ok) throw new Error(payload.error || "template_list_failed");
      state.templateCatalog = Array.isArray(payload.templates) ? payload.templates : [];
      state.templateDetails = {};
      renderTemplateSelect();
      ui.templatePreview.textContent = "";
      if (state.templateCatalog.length) {
        setStatus(`Loaded ${state.templateCatalog.length} template(s).`);
      }
    } catch (err) {
      ui.templateSelect.innerHTML = "";
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = "Templates unavailable";
      ui.templateSelect.appendChild(opt);
      ui.templateInfo.textContent = "";
      ui.templatePreview.textContent = "";
      setStatus(`Could not load templates: ${err.message}`);
    }
  }

  function renderTemplateSelect() {
    ui.templateSelect.innerHTML = "";
    if (!state.templateCatalog.length) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = "No templates found";
      ui.templateSelect.appendChild(opt);
      ui.templateInfo.textContent = "";
      ui.templatePreview.textContent = "";
      return;
    }

    state.templateCatalog.forEach((tpl) => {
      const opt = document.createElement("option");
      opt.value = tpl.id;
      opt.textContent = `${tpl.title} (${tpl.type === "pack" ? "Pack" : "Library"})`;
      ui.templateSelect.appendChild(opt);
    });
    renderTemplateInfo();
  }

  function renderTemplateInfo() {
    const selected = state.templateCatalog.find((x) => x.id === ui.templateSelect.value) || state.templateCatalog[0];
    if (!selected) {
      ui.templateInfo.textContent = "";
      ui.templatePreview.textContent = "";
      return;
    }
    if (ui.templateSelect.value !== selected.id) {
      ui.templateSelect.value = selected.id;
    }
    const tags = Array.isArray(selected.tags) && selected.tags.length ? ` | tags: ${selected.tags.join(", ")}` : "";
    ui.templateInfo.textContent = `${selected.description || "No description"}${tags}`;
  }


  async function fetchTemplateById(templateId) {
    const id = String(templateId || "").trim();
    if (!id) return null;
    if (state.templateDetails[id]) {
      return state.templateDetails[id];
    }

    const resp = await fetch(`/api/templates/bank/${encodeURIComponent(id)}`);
    const payload = await resp.json();
    if (!resp.ok) {
      throw new Error(payload.error || "template_load_failed");
    }

    state.templateDetails[id] = payload.template || null;
    return state.templateDetails[id];
  }

  async function previewSelectedTemplate() {
    const templateId = ui.templateSelect.value;
    if (!templateId) {
      setStatus("Select a template first.");
      return;
    }

    try {
      const template = await fetchTemplateById(templateId);
      ui.templatePreview.textContent = JSON.stringify(template || {}, null, 2);
      setStatus(`Showing preview for ${templateId}.`);
    } catch (err) {
      ui.templatePreview.textContent = "";
      setStatus(`Could not preview template: ${err.message}`);
    }
  }
  async function applySelectedTemplate(mode) {
    const templateId = ui.templateSelect.value;
    if (!templateId) {
      setStatus("Select a template first.");
      return;
    }

    try {
      const template = await fetchTemplateById(templateId) || {};

      if (template.type === "pack") {
        applyPackTemplate(template.pack || {}, mode);
      } else {
        applyLibraryTemplate(template, mode);
      }

      hydrateDomFromState();
      renderChips();
      renderAll();
      setStatus(`${mode === "replace" ? "Loaded" : "Merged"} template ${template.title || template.id}.`);
    } catch (err) {
      setStatus(`Could not apply template: ${err.message}`);
    }
  }

  function applyLibraryTemplate(template, mode) {
    const lib = normalizeLibrary(template.library || { id: template.id || "library" });
    if (mode === "replace") {
      state.libraries = [lib];
      if (template.shared_terms) {
        state.shared_terms = normalizeSharedTerms(template.shared_terms);
      }
      if (Array.isArray(template.links) && template.links.length) {
        state.links = template.links.map((x) => normalizeLink(x));
      }
      return;
    }

    upsertLibrary(lib);
    if (template.shared_terms) {
      mergeSharedTerms(template.shared_terms);
    }
    if (Array.isArray(template.links)) {
      mergeLinks(template.links);
    }
  }

  function applyPackTemplate(pack, mode) {
    const program = pack.program || {};
    const libraries = Array.isArray(pack.libraries) ? pack.libraries.map((x) => normalizeLibrary(x)) : [];
    const links = Array.isArray(pack.links) ? pack.links.map((x) => normalizeLink(x)) : [];
    const terms = normalizeSharedTerms(pack.shared_terms || pack.ontology || {});

    if (mode === "replace") {
      state.program = {
        name: program.name || state.program.name,
        id: toKebab(program.id || state.program.id || program.name || ""),
        owner_unit: program.owner_unit || state.program.owner_unit,
        target_outcome: program.target_outcome || state.program.target_outcome
      };
      state.libraries = libraries.length ? libraries : state.libraries;
      state.links = links;
      state.shared_terms = terms;
      if (pack.governance) {
        state.governance = { ...state.governance, ...pack.governance };
      }
      return;
    }

    state.program.name = state.program.name || program.name || "";
    state.program.id = state.program.id || toKebab(program.id || program.name || "");
    state.program.owner_unit = state.program.owner_unit || program.owner_unit || "";
    state.program.target_outcome = state.program.target_outcome || program.target_outcome || "";

    libraries.forEach((lib) => upsertLibrary(lib));
    mergeSharedTerms(terms);
    mergeLinks(links);

    if (pack.governance) {
      Object.keys(pack.governance).forEach((key) => {
        const current = state.governance[key];
        if (current == null || current === "" || (Array.isArray(current) && !current.length)) {
          state.governance[key] = pack.governance[key];
        }
      });
    }
  }

  async function loadApprovedCatalogs(includeManifest) {
    const suffix = includeManifest ? "?includeManifest=1" : "";
    try {
      const resp = await fetch(`/api/approved/catalog${suffix}`);
      const payload = await resp.json();
      if (!resp.ok) throw new Error(payload.error || "approved_catalog_failed");
      state.approvedCatalog = Array.isArray(payload.items) ? payload.items : [];
      renderApprovedProgramSelect();
      return state.approvedCatalog;
    } catch (err) {
      ui.approvedProgramSelect.innerHTML = "";
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = "No approved sets found";
      ui.approvedProgramSelect.appendChild(opt);
      ui.approvedInfo.textContent = "No approved libraries available yet.";
      ui.baselineInfo.textContent = "";
      setStatus(`Could not load approved sets: ${err.message}`);
      return [];
    }
  }

  function renderApprovedProgramSelect() {
    const previous = ui.approvedProgramSelect.value;
    ui.approvedProgramSelect.innerHTML = "";

    if (!state.approvedCatalog.length) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = "No approved sets found";
      ui.approvedProgramSelect.appendChild(opt);
      ui.approvedInfo.textContent = "No approved libraries available yet.";
      ui.baselineInfo.textContent = "";
      return;
    }

    state.approvedCatalog.forEach((item) => {
      const opt = document.createElement("option");
      opt.value = item.key;
      opt.textContent = approvedEntryLabel(item);
      ui.approvedProgramSelect.appendChild(opt);
    });

    if (previous && state.approvedCatalog.some((x) => x.key === previous)) {
      ui.approvedProgramSelect.value = previous;
    }

    const selected = getSelectedApprovedCatalog();
    if (selected) {
      ui.approvedInfo.textContent = `Selected: ${approvedEntryLabel(selected)}`;
    }
  }

  function getSelectedApprovedCatalog() {
    const selectedKey = ui.approvedProgramSelect.value;
    return state.approvedCatalog.find((item) => item.key === selectedKey) || state.approvedCatalog[0] || null;
  }

  function approvedEntryLabel(item) {
    return `${item.program_id} | ${item.revision} | ${item.approved_at}`;
  }

  async function openApprovedModal() {
    if (!state.approvedCatalog.length || !state.approvedCatalog[0].data) {
      await loadApprovedCatalogs(true);
    }
    if (!state.approvedCatalog.length) {
      setStatus("No approved sets available for linking yet.");
      return;
    }

    renderApprovedModalCatalogSelect();
    ui.approvedLinkModal.classList.remove("hidden");
    ui.approvedLinkModal.setAttribute("aria-hidden", "false");
  }

  function closeApprovedModal() {
    ui.approvedLinkModal.classList.add("hidden");
    ui.approvedLinkModal.setAttribute("aria-hidden", "true");
  }

  function renderApprovedModalCatalogSelect() {
    const selectedMain = ui.approvedProgramSelect.value;
    ui.approvedCatalogSelect.innerHTML = "";

    state.approvedCatalog.forEach((item) => {
      const opt = document.createElement("option");
      opt.value = item.key;
      opt.textContent = approvedEntryLabel(item);
      ui.approvedCatalogSelect.appendChild(opt);
    });

    if (selectedMain && state.approvedCatalog.some((item) => item.key === selectedMain)) {
      ui.approvedCatalogSelect.value = selectedMain;
    }

    renderApprovedModalChoices();
  }

  function renderApprovedModalChoices() {
    const selected = state.approvedCatalog.find((item) => item.key === ui.approvedCatalogSelect.value) || state.approvedCatalog[0];
    if (!selected) return;

    ui.approvedSourceSelect.innerHTML = "";
    ui.approvedTargetSelect.innerHTML = "";

    const libraries = Array.isArray(selected.data && selected.data.manifest && selected.data.manifest.libraries)
      ? selected.data.manifest.libraries
      : [];
    const contracts = Array.isArray(selected.data && selected.data.manifest && selected.data.manifest.contracts)
      ? selected.data.manifest.contracts
      : [];

    libraries.forEach((lib) => {
      const sourceOpt = document.createElement("option");
      sourceOpt.value = lib.id;
      sourceOpt.textContent = `${lib.display_name || lib.id} (${lib.id})`;
      ui.approvedSourceSelect.appendChild(sourceOpt);

      const targetOpt = document.createElement("option");
      targetOpt.value = lib.id;
      targetOpt.textContent = `${lib.display_name || lib.id} (${lib.id})`;
      ui.approvedTargetSelect.appendChild(targetOpt);
    });

    if (contracts.length) {
      const first = contracts[0];
      if (first.source_library) ui.approvedSourceSelect.value = first.source_library;
      if (first.target_library) ui.approvedTargetSelect.value = first.target_library;
      byId("approvedContractType").value = first.contract_type || "handoff";
      byId("approvedObject").value = first.object || "";
      byId("approvedTriggerEvent").value = first.trigger_event || "";
      byId("approvedSlaTarget").value = first.sla_target || "";
      byId("approvedFailureSignal").value = first.failure_signal || "";
      byId("approvedRequiredFields").value = Array.isArray(first.required_fields) ? first.required_fields.join(",") : "";
    } else {
      byId("approvedContractType").value = "handoff";
      byId("approvedObject").value = "";
      byId("approvedTriggerEvent").value = "";
      byId("approvedSlaTarget").value = "";
      byId("approvedFailureSignal").value = "";
      byId("approvedRequiredFields").value = "";
    }

    ui.approvedModalInfo.textContent = `Using approved ${selected.program_id} ${selected.revision} (${libraries.length} libraries).`;
  }

  function insertApprovedModalLink() {
    const selected = state.approvedCatalog.find((item) => item.key === ui.approvedCatalogSelect.value);
    if (!selected || !selected.data || !selected.data.manifest) {
      setStatus("No approved set selected.");
      return;
    }

    const sourceLibrary = ui.approvedSourceSelect.value;
    const targetLibrary = ui.approvedTargetSelect.value;
    if (!sourceLibrary || !targetLibrary) {
      setStatus("Choose both source and target libraries.");
      return;
    }

    const manifest = selected.data.manifest;
    const libs = Array.isArray(manifest.libraries) ? manifest.libraries : [];
    const byIdMap = Object.fromEntries(libs.map((lib) => [lib.id, lib]));

    [sourceLibrary, targetLibrary].forEach((libId) => {
      if (!state.libraries.some((lib) => lib.id === libId) && byIdMap[libId]) {
        state.libraries.push(normalizeLibrary(byIdMap[libId]));
      }
    });

    const link = normalizeLink({
      source_library: sourceLibrary,
      target_library: targetLibrary,
      contract_type: byId("approvedContractType").value,
      object: byId("approvedObject").value,
      trigger_event: byId("approvedTriggerEvent").value,
      sla_target: byId("approvedSlaTarget").value,
      failure_signal: byId("approvedFailureSignal").value,
      required_fields: splitCsv(byId("approvedRequiredFields").value)
    });

    if (!state.links.some((x) => linkKey(x) === linkKey(link))) {
      state.links.push(link);
    }

    closeApprovedModal();
    renderAll();
    setStatus("Inserted handoff from approved libraries.");
  }

  function normalizeLibrary(lib) {
    const id = toKebab(lib && lib.id ? lib.id : "library");
    return {
      id,
      display_name: lib && lib.display_name ? lib.display_name : id,
      purpose: lib && lib.purpose ? lib.purpose : "",
      decisions_supported: Array.isArray(lib && lib.decisions_supported) ? lib.decisions_supported : [],
      inputs: Array.isArray(lib && lib.inputs) ? lib.inputs : [],
      outputs: Array.isArray(lib && lib.outputs) ? lib.outputs : [],
      owner_role: lib && lib.owner_role ? lib.owner_role : "",
      weekly_change_volume: lib && lib.weekly_change_volume ? lib.weekly_change_volume : "medium"
    };
  }

  function normalizeLink(link) {
    return {
      source_library: link && link.source_library ? toKebab(link.source_library) : "",
      target_library: link && link.target_library ? toKebab(link.target_library) : "",
      contract_type: link && link.contract_type ? link.contract_type : "handoff",
      object: link && link.object ? link.object : "",
      trigger_event: link && link.trigger_event ? link.trigger_event : "",
      sla_target: link && link.sla_target ? link.sla_target : "",
      failure_signal: link && link.failure_signal ? link.failure_signal : "",
      required_fields: Array.isArray(link && link.required_fields) ? link.required_fields : []
    };
  }

  function normalizeSharedTerms(terms) {
    return {
      entities: uniqueStrings(Array.isArray(terms && terms.entities) ? terms.entities : []),
      relationships: uniqueStrings(Array.isArray(terms && terms.relationships) ? terms.relationships : [])
    };
  }

  function mergeSharedTerms(terms) {
    const next = normalizeSharedTerms(terms);
    state.shared_terms.entities = uniqueStrings([...(state.shared_terms.entities || []), ...next.entities]);
    state.shared_terms.relationships = uniqueStrings([...(state.shared_terms.relationships || []), ...next.relationships]);
  }

  function upsertLibrary(lib) {
    const idx = state.libraries.findIndex((x) => x.id === lib.id);
    if (idx === -1) {
      state.libraries.push(lib);
      return;
    }
    const current = state.libraries[idx];
    state.libraries[idx] = {
      ...current,
      ...lib,
      decisions_supported: uniqueStrings([...(current.decisions_supported || []), ...(lib.decisions_supported || [])]),
      inputs: uniqueStrings([...(current.inputs || []), ...(lib.inputs || [])]),
      outputs: uniqueStrings([...(current.outputs || []), ...(lib.outputs || [])])
    };
  }

  function mergeLinks(links) {
    const existing = new Set(state.links.map((x) => linkKey(x)));
    links.map((x) => normalizeLink(x)).forEach((link) => {
      const key = linkKey(link);
      if (!existing.has(key)) {
        state.links.push(link);
        existing.add(key);
      }
    });
  }

  function linkKey(link) {
    return [
      link.source_library || "",
      link.target_library || "",
      link.contract_type || "",
      String(link.object || "").trim().toLowerCase()
    ].join("::");
  }

  function uniqueStrings(values) {
    return Array.from(new Set((values || []).map((x) => String(x || "").trim()).filter(Boolean)));
  }
  function downloadJson(filename, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function splitCsv(text) {
    return String(text || "").split(",").map((v) => v.trim()).filter(Boolean);
  }

  function toKebab(text) {
    return String(text || "").toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  }

  function escape(value) {
    return String(value || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
  }

  function setStatus(message) {
    ui.status.textContent = message;
  }
})();
