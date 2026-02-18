(function () {
  const steps = [
    { id: "program", label: "Program Basics" },
    { id: "libraries", label: "Libraries" },
    { id: "shared", label: "Shared Business Terms" },
    { id: "handoffs", label: "Cross-Library Handoffs" },
    { id: "governance", label: "Governance" },
    { id: "artifact", label: "Artifact Assist" },
    { id: "visual", label: "Visual Mapping" },
    { id: "review", label: "Review & Export" }
  ];

  const interviewQuestions = [
    { key: "programName", prompt: "What should this context program be called?" },
    { key: "ownerUnit", prompt: "Which team or unit owns this program?" },
    { key: "targetOutcome", prompt: "What outcome should improve in 6-12 months?" },
    { key: "libraries", prompt: "List the business functions as libraries (comma-separated)." },
    { key: "entities", prompt: "List shared business terms (entities)." },
    { key: "relationships", prompt: "List shared relationship types." },
    { key: "classificationBaseline", prompt: "Data classification baseline (public/internal/confidential/restricted)?" }
  ];

  const state = {
    mode: "form",
    interviewIndex: 0,
    program: {
      name: "",
      id: "",
      owner_unit: "",
      target_outcome: ""
    },
    libraries: [],
    shared_terms: {
      entities: [],
      relationships: []
    },
    links: [],
    governance: {
      classification_baseline: "confidential",
      review_cadence: "monthly",
      retention_months: 36,
      change_approval: "dual-approver",
      required_provenance_fields: [
        "source_ref",
        "captured_at",
        "owner_role",
        "confidence",
        "effective_from"
      ]
    },
    artifact_suggestions: null,
    map_positions: {}
  };

  const ui = {
    sectionNav: byId("sectionNav"),
    librariesContainer: byId("librariesContainer"),
    linksContainer: byId("linksContainer"),
    sharedEntities: byId("sharedEntities"),
    sharedRelationships: byId("sharedRelationships"),
    manifestPreview: byId("manifestPreview"),
    status: byId("status"),
    interviewPrompt: byId("interviewPrompt"),
    interviewAnswer: byId("interviewAnswer"),
    mapBoard: byId("mapBoard"),
    mapSvg: byId("mapSvg"),
    artifactSuggestions: byId("artifactSuggestions"),
    revisionSelect: byId("revisionSelect")
  };

  boot();

  function boot() {
    renderNav();
    wireTopLevelInputs();
    bindButtons();
    ensureInitialLibrary();
    renderAll();
  }

  function renderNav() {
    ui.sectionNav.innerHTML = steps
      .map(
        (s) =>
          `<a class="pill-nav" href="#${s.id}" data-step-nav="${s.id}">${s.label}</a>`
      )
      .join("");
    document.querySelectorAll("[data-step]").forEach((step) => {
      step.id = step.dataset.step;
    });
  }

  function wireTopLevelInputs() {
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
    document.querySelectorAll("input[name='mode']").forEach((r) => {
      r.addEventListener("change", (e) => {
        state.mode = e.target.value;
        ui.status.textContent = `Mode: ${state.mode}`;
      });
    });
  }

  function bindButtons() {
    byId("btnAddLibrary").addEventListener("click", addLibrary);
    byId("btnAddLink").addEventListener("click", addLink);
    byId("btnExportAnswers").addEventListener("click", () =>
      downloadJson("answers.json", buildAnswers())
    );
    byId("btnExportManifest").addEventListener("click", () =>
      downloadJson("manifest.json", buildManifest())
    );
    byId("btnSaveRevision").addEventListener("click", saveRevision);
    byId("btnLoadRevisions").addEventListener("click", loadRevisionList);
    byId("btnLoadRevision").addEventListener("click", loadRevision);
    byId("btnSuggestFromArtifact").addEventListener("click", requestArtifactSuggestions);
    byId("btnInterviewApply").addEventListener("click", applyInterviewAnswer);
    byId("btnInterviewNext").addEventListener("click", nextInterviewQuestion);
    byId("importJsonInput").addEventListener("change", importJson);
    byId("artifactFileInput").addEventListener("change", readArtifactFile);
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
        <strong>Library ${idx + 1}</strong>
        <label>ID <input data-lib="${idx}" data-field="id" value="${escape(lib.id)}"></label>
        <label>Display Name <input data-lib="${idx}" data-field="display_name" value="${escape(lib.display_name)}"></label>
        <label>Purpose <input data-lib="${idx}" data-field="purpose" value="${escape(lib.purpose)}"></label>
        <label>Decisions (comma-separated) <input data-lib="${idx}" data-field="decisions_supported" value="${escape(lib.decisions_supported.join(", "))}"></label>
        <label>Inputs (comma-separated) <input data-lib="${idx}" data-field="inputs" value="${escape(lib.inputs.join(", "))}"></label>
        <label>Outputs (comma-separated) <input data-lib="${idx}" data-field="outputs" value="${escape(lib.outputs.join(", "))}"></label>
        <label>Owner Role <input data-lib="${idx}" data-field="owner_role" value="${escape(lib.owner_role)}"></label>
        <label>Weekly Change Volume
          <select data-lib="${idx}" data-field="weekly_change_volume">
            ${["low", "medium", "high"]
              .map((v) => `<option ${v === lib.weekly_change_volume ? "selected" : ""}>${v}</option>`)
              .join("")}
          </select>
        </label>
        <button data-remove-lib="${idx}">Remove Library</button>
      `;
      ui.librariesContainer.appendChild(card);
    });

    ui.librariesContainer
      .querySelectorAll("input[data-lib],select[data-lib]")
      .forEach((el) =>
        el.addEventListener("input", (e) => {
          const i = Number(e.target.dataset.lib);
          const field = e.target.dataset.field;
          let value = e.target.value;
          if (field === "id") {
            value = toKebab(value);
            e.target.value = value;
          }
          if (["decisions_supported", "inputs", "outputs"].includes(field)) {
            value = splitCsv(value);
          }
          state.libraries[i][field] = value;
          renderLinks();
          renderMap();
          renderManifest();
        })
      );

    ui.librariesContainer
      .querySelectorAll("button[data-remove-lib]")
      .forEach((btn) =>
        btn.addEventListener("click", (e) => {
          const i = Number(e.target.dataset.removeLib);
          state.libraries.splice(i, 1);
          if (!state.libraries.length) {
            ensureInitialLibrary();
          }
          renderAll();
        })
      );
  }

  function renderLinks() {
    ui.linksContainer.innerHTML = "";
    state.links.forEach((link, idx) => {
      const options = state.libraries
        .map((l) => `<option value="${escape(l.id)}">${escape(l.id)}</option>`)
        .join("");
      const card = document.createElement("div");
      card.className = "link-card";
      card.innerHTML = `
        <strong>Link ${idx + 1}</strong>
        <label>Source Library
          <select data-link="${idx}" data-field="source_library">${options}</select>
        </label>
        <label>Target Library
          <select data-link="${idx}" data-field="target_library">${options}</select>
        </label>
        <label>Contract Type
          <select data-link="${idx}" data-field="contract_type">
            ${["handoff", "control", "data", "escalation", "dependency"]
              .map((v) => `<option ${v === link.contract_type ? "selected" : ""}>${v}</option>`)
              .join("")}
          </select>
        </label>
        <label>Object <input data-link="${idx}" data-field="object" value="${escape(link.object)}"></label>
        <label>Trigger Event <input data-link="${idx}" data-field="trigger_event" value="${escape(link.trigger_event)}"></label>
        <label>SLA Target <input data-link="${idx}" data-field="sla_target" value="${escape(link.sla_target)}"></label>
        <label>Failure Signal <input data-link="${idx}" data-field="failure_signal" value="${escape(link.failure_signal)}"></label>
        <label>Required Fields (comma-separated)
          <input data-link="${idx}" data-field="required_fields" value="${escape((link.required_fields || []).join(", "))}">
        </label>
        <button data-remove-link="${idx}">Remove Link</button>
      `;
      ui.linksContainer.appendChild(card);

      const sourceSel = card.querySelector('select[data-field="source_library"]');
      const targetSel = card.querySelector('select[data-field="target_library"]');
      sourceSel.value = link.source_library || "";
      targetSel.value = link.target_library || "";
    });

    ui.linksContainer
      .querySelectorAll("input[data-link],select[data-link]")
      .forEach((el) =>
        el.addEventListener("input", (e) => {
          const i = Number(e.target.dataset.link);
          const field = e.target.dataset.field;
          let value = e.target.value;
          if (field === "required_fields") {
            value = splitCsv(value);
          }
          state.links[i][field] = value;
          renderMap();
          renderManifest();
        })
      );

    ui.linksContainer
      .querySelectorAll("button[data-remove-link]")
      .forEach((btn) =>
        btn.addEventListener("click", (e) => {
          const i = Number(e.target.dataset.removeLink);
          state.links.splice(i, 1);
          renderLinks();
          renderMap();
          renderManifest();
        })
      );
  }

  function renderMap() {
    ui.mapBoard.innerHTML = "";
    ui.mapSvg.innerHTML = "";
    const width = ui.mapBoard.clientWidth || 800;
    const height = ui.mapBoard.clientHeight || 380;
    ui.mapSvg.setAttribute("viewBox", `0 0 ${width} ${height}`);

    state.libraries.forEach((lib, idx) => {
      if (!state.map_positions[lib.id]) {
        state.map_positions[lib.id] = {
          x: 30 + (idx % 4) * 180,
          y: 30 + Math.floor(idx / 4) * 110
        };
      }
      const node = document.createElement("div");
      node.className = "node";
      node.textContent = lib.display_name || lib.id;
      node.dataset.libId = lib.id;
      const pos = state.map_positions[lib.id];
      node.style.left = `${pos.x}px`;
      node.style.top = `${pos.y}px`;
      ui.mapBoard.appendChild(node);
      makeDraggable(node, lib.id, () => drawLinks(width, height));
    });

    drawLinks(width, height);
  }

  function drawLinks(width, height) {
    ui.mapSvg.innerHTML = "";
    const centers = {};
    ui.mapBoard.querySelectorAll(".node").forEach((n) => {
      const libId = n.dataset.libId;
      centers[libId] = {
        x: n.offsetLeft + n.offsetWidth / 2,
        y: n.offsetTop + n.offsetHeight / 2
      };
    });
    state.links.forEach((link) => {
      const s = centers[link.source_library];
      const t = centers[link.target_library];
      if (!s || !t) return;
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(s.x));
      line.setAttribute("y1", String(s.y));
      line.setAttribute("x2", String(t.x));
      line.setAttribute("y2", String(t.y));
      line.setAttribute("stroke", "#0e7a6d");
      line.setAttribute("stroke-width", "2");
      line.setAttribute("marker-end", "url(#arrow)");
      ui.mapSvg.appendChild(line);
    });
    addArrowMarker();

    function addArrowMarker() {
      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      defs.innerHTML =
        '<marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#0e7a6d"></path></marker>';
      ui.mapSvg.appendChild(defs);
    }
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
      setStatus("Paste or upload artifact text first.");
      return;
    }
    setStatus("Generating suggestions...");
    try {
      const resp = await fetch("/api/ai/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artifactText,
          currentLibraries: state.libraries.map((l) => l.id)
        })
      });
      const payload = await resp.json();
      if (!resp.ok) {
        throw new Error(payload.error || "suggestion_failed");
      }
      state.artifact_suggestions = payload.data;
      renderSuggestions();
      setStatus("Suggestions ready. Review and apply selectively.");
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
        <h3>Suggested Libraries</h3>
        <pre>${escape(JSON.stringify(data.libraries || [], null, 2))}</pre>
        <button id="applySuggestedLibraries">Apply Libraries</button>
      </div>
      <div class="suggestion-card">
        <h3>Suggested Shared Terms</h3>
        <pre>${escape(JSON.stringify({
          entities: data.shared_entities || [],
          relationships: data.shared_relationships || []
        }, null, 2))}</pre>
        <button id="applySuggestedTerms">Apply Shared Terms</button>
      </div>
      <div class="suggestion-card">
        <h3>Suggested Links</h3>
        <pre>${escape(JSON.stringify(data.links || [], null, 2))}</pre>
        <button id="applySuggestedLinks">Apply Links</button>
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
      state.shared_terms.relationships = Array.isArray(data.shared_relationships)
        ? data.shared_relationships
        : [];
      ui.sharedEntities.value = state.shared_terms.entities.join(", ");
      ui.sharedRelationships.value = state.shared_terms.relationships.join(", ");
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
        state.libraries = splitCsv(answer).map((name, i) => ({
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
      case "classificationBaseline":
        state.governance.classification_baseline = answer.toLowerCase();
        byId("classificationBaseline").value = state.governance.classification_baseline;
        break;
      default:
        break;
    }
    ui.interviewAnswer.value = "";
    setStatus(`Applied answer to ${q.key}.`);
    renderAll();
  }

  function renderInterview() {
    const q = interviewQuestions[state.interviewIndex];
    ui.interviewPrompt.textContent = q.prompt;
  }

  function buildAnswers() {
    return {
      schema_version: "1.0",
      captured_at: new Date().toISOString(),
      mode: state.mode,
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
      libraries: state.libraries.map((l) => ({
        id: l.id,
        display_name: l.display_name,
        purpose: l.purpose,
        owner_role: l.owner_role,
        weekly_change_volume: l.weekly_change_volume,
        decisions_supported: l.decisions_supported,
        inputs: l.inputs,
        outputs: l.outputs
      })),
      ontology: {
        entities: state.shared_terms.entities,
        relationships: state.shared_terms.relationships
      },
      contracts: state.links
    };
  }

  function renderManifest() {
    ui.manifestPreview.textContent = JSON.stringify(buildManifest(), null, 2);
  }

  function renderAll() {
    renderLibraries();
    renderLinks();
    renderMap();
    renderInterview();
    renderManifest();
  }

  function downloadJson(filename, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function saveRevision() {
    const programId = state.program.id || toKebab(state.program.name) || "program";
    try {
      const resp = await fetch("/api/revisions/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programId,
          answers: buildAnswers(),
          manifest: buildManifest()
        })
      });
      const payload = await resp.json();
      if (!resp.ok) throw new Error(payload.error || "save_failed");
      setStatus(`Saved ${payload.revision} to ${payload.path}`);
      loadRevisionList();
    } catch (err) {
      setStatus(`Save failed: ${err.message}`);
    }
  }

  async function loadRevisionList() {
    const programId = state.program.id || toKebab(state.program.name) || "program";
    const resp = await fetch(`/api/revisions/${encodeURIComponent(programId)}`);
    const payload = await resp.json();
    ui.revisionSelect.innerHTML = "";
    (payload.revisions || []).forEach((rev) => {
      const option = document.createElement("option");
      option.value = rev;
      option.textContent = rev;
      ui.revisionSelect.appendChild(option);
    });
    setStatus(`Loaded ${payload.revisions.length || 0} revisions.`);
  }

  async function loadRevision() {
    const programId = state.program.id || toKebab(state.program.name) || "program";
    const rev = ui.revisionSelect.value;
    if (!rev) return;
    const resp = await fetch(
      `/api/revisions/${encodeURIComponent(programId)}/${encodeURIComponent(rev)}`
    );
    if (!resp.ok) {
      setStatus("Failed to load revision.");
      return;
    }
    const payload = await resp.json();
    hydrateFromAnswers(payload.answers || {});
    setStatus(`Loaded revision ${rev}.`);
  }

  function hydrateFromAnswers(answers) {
    state.mode = answers.mode || "form";
    state.program = answers.program || state.program;
    state.libraries = Array.isArray(answers.libraries) ? answers.libraries : state.libraries;
    state.shared_terms = answers.shared_terms || state.shared_terms;
    state.links = Array.isArray(answers.links) ? answers.links : state.links;
    state.governance = answers.governance || state.governance;

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
    byId("provenanceFields").value = (state.governance.required_provenance_fields || []).join(", ");

    document.querySelectorAll("input[name='mode']").forEach((r) => {
      r.checked = r.value === state.mode;
    });
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
          setStatus("Imported revision-style JSON.");
        } else if (parsed.program || parsed.libraries) {
          hydrateFromAnswers(parsed);
          setStatus("Imported answers JSON.");
        } else if (parsed.program_id && parsed.libraries) {
          const answers = {
            mode: "form",
            program: {
              id: parsed.program_id,
              name: parsed.program && parsed.program.name ? parsed.program.name : "",
              owner_unit: parsed.program && parsed.program.owner_unit ? parsed.program.owner_unit : "",
              target_outcome:
                parsed.program && parsed.program.target_outcome ? parsed.program.target_outcome : ""
            },
            libraries: parsed.libraries,
            shared_terms: parsed.ontology || { entities: [], relationships: [] },
            links: parsed.contracts || [],
            governance: parsed.governance || state.governance
          };
          hydrateFromAnswers(answers);
          setStatus("Imported manifest JSON.");
        } else {
          setStatus("JSON format not recognized.");
        }
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
      setStatus(`Loaded ${file.name} for artifact-assisted mode.`);
    };
    reader.readAsText(file);
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function splitCsv(text) {
    return String(text || "")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  }

  function toKebab(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function escape(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function setStatus(message) {
    ui.status.textContent = message;
  }
})();
