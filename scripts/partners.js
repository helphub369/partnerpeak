// Render partner catalog with filters/sort from data/partners.json
const state = { partners: [], filtered: [] };

function $(id) { return document.getElementById(id); }

function renderGrid(list) {
  const grid = $("partner-grid");
  grid.innerHTML = "";

  if (!list.length) {
    grid.innerHTML = `<div class="partner-card"><div class="partner-meta">No results. Adjust filters.</div></div>`;
    return;
  }

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "partner-card";
    const payouts = p.typical_payout_range || "Varies";
    const automation = p.automation_score != null ? `${p.automation_score}/5` : "—";
    const regions = (p.regions || []).join(" · ") || "—";
    const verticals = (p.verticals || []).join(", ");

    card.innerHTML = `
      <div class="partner-title">${p.program_name}</div>
      <div class="partner-meta">Verticals: ${verticals}</div>
      <div class="partner-meta">Model: ${p.payout_model || "—"} · Automation: ${automation}</div>
      <div class="partner-meta">Regions: ${regions}</div>
      <div class="partner-payout">Payout: ${payouts}</div>
      <div class="badges">
        ${p.api_ready ? `<span class="badge ok">API-ready</span>` : `<span class="badge">Manual</span>`}
        ${p.conversion_reporting?.type ? `<span class="badge">${p.conversion_reporting.type.toUpperCase()} reporting</span>` : ""}
        <span class="badge">Low-risk</span>
      </div>
      <a class="partner-link" href="${p.source_url}" rel="noopener" target="_blank">View Program</a>
    `;
    grid.appendChild(card);
  });
}

function applyFilters() {
  const q = $("q").value.trim().toLowerCase();
  const region = $("region").value;
  const vertical = $("vertical").value;
  const sortBy = $("sort").value;

  let out = [...state.partners];

  if (q) {
    out = out.filter(p =>
      p.program_name?.toLowerCase().includes(q) ||
      (p.verticals || []).some(v => (v + "").toLowerCase().includes(q))
    );
  }
  if (region) {
    out = out.filter(p => (p.regions || []).includes(region));
  }
  if (vertical) {
    out = out.filter(p => (p.verticals || []).includes(vertical));
  }

  // Sort
  if (sortBy === "automation") out.sort((a,b) => (b.automation_score||0)-(a.automation_score||0));
  else if (sortBy === "payout")   out.sort((a,b) => (b.payout_rank||0)-(a.payout_rank||0));
  else out.sort((a,b) => (a.rank||999)-(b.rank||999));

  state.filtered = out;
  renderGrid(out);
}

async function init() {
  try {
    const res = await fetch("../data/partners.json", { cache: "no-store" });
    const data = await res.json();
    state.partners = data;

    // Populate vertical dropdown
    const set = new Set();
    data.forEach(p => (p.verticals || []).forEach(v => set.add(v)));
    const vSel = $("vertical");
    [...set].sort().forEach(v => {
      const opt = document.createElement("option");
      opt.value = v; opt.textContent = v;
      vSel.appendChild(opt);
    });

    // Events
    ["q","region","vertical","sort"].forEach(id => $(id).addEventListener("input", applyFilters));
    $("clear").addEventListener("click", () => {
      $("q").value = ""; $("region").value = ""; $("vertical").value = ""; $("sort").value = "rank";
      applyFilters();
    });

    applyFilters();
  } catch (e) {
    console.error("Failed to load partners:", e);
    renderGrid([]);
  }
}

document.addEventListener("DOMContentLoaded", init);
