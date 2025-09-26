/* PartnerPeak – front-end bootstrap
   Loads data/partners.json and renders homepage + directory
*/

const SELECTORS = {
  programCount: "#programCount",
  categoryCount: "#categoryCount",
  coveragePct: "#coveragePct",
  usCount: "#usCount",
  euCount: "#euCount",
  ukCount: "#ukCount",
  apacCount: "#apacCount",
  partnersList: "#partnersList",
  emptyState: "#emptyState",
  searchBox: "#searchBox",
  regionFilter: "#regionFilter",
};

const state = {
  partners: [],
  filtered: [],
};

const regionTokens = {
  US: ["US", "United States", "usa", "us"],
  EU: ["EU", "Europe", "eu"],
  UK: ["UK", "United Kingdom", "gb", "uk"],
  APAC: ["APAC", "APJ", "ASIA", "apac", "apj", "asia", "AU", "NZ", "SG", "JP"],
};

// ---------- bootstrap ----------
document.addEventListener("DOMContentLoaded", async () => {
  document.querySelector("#year").textContent = new Date().getFullYear();

  try {
    const res = await fetch("data/partners.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const partners = await res.json();

    // Normalize minimal fields we rely on
    state.partners = partners.map(normalizePartner);
    state.filtered = [...state.partners];

    renderSummary(state.partners);
    wireFilters();
    renderPartners(state.filtered);
  } catch (err) {
    console.error(err);
    showError("Could not load partners.json. Ensure it exists at /data/partners.json.");
  }
});

// ---------- helpers ----------
function normalizePartner(p) {
  // Expected keys (best-effort): program_name, verticals[], geo_coverage, payout_model,
  // typical_payout_range, approval_friction, source_url
  return {
    name: p.program_name || p.name || "Unnamed Program",
    verticals: Array.isArray(p.verticals) ? p.verticals : [],
    geo: String(p.geo_coverage || p.geo || "").toUpperCase(),
    payout_model: p.payout_model || "",
    payout_range: p.typical_payout_range || "",
    approval: p.approval_friction || "",
    source_url: p.source_url || p.url || "",
  };
}

function renderSummary(list) {
  // Totals
  setText(SELECTORS.programCount, list.length);
  setText(SELECTORS.categoryCount, unique(list.flatMap(p => p.verticals)).length);

  // Regions
  const us = countRegion(list, "US");
  const eu = countRegion(list, "EU");
  const uk = countRegion(list, "UK");
  const apac = countRegion(list, "APAC");

  setText(SELECTORS.usCount, us);
  setText(SELECTORS.euCount, eu);
  setText(SELECTORS.ukCount, uk);
  setText(SELECTORS.apacCount, apac);

  // “Global coverage” = programs with GLOBAL or with all three major regions
  const globalish = list.filter(p => {
    if (p.geo.includes("GLOBAL")) return true;
    const r = regionsFor(p);
    return r.has("US") && r.has("EU") && r.has("UK");
  }).length;

  const pct = list.length ? Math.round((globalish / list.length) * 100) : 0;
  setText(SELECTORS.coveragePct, `${pct}%`);
}

function wireFilters() {
  const searchEl = $(SELECTORS.searchBox);
  const regionEl = $(SELECTORS.regionFilter);

  const apply = () => {
    const q = (searchEl.value || "").trim().toLowerCase();
    const reg = (regionEl.value || "").toUpperCase();

    state.filtered = state.partners.filter(p => {
      const text = [p.name, ...p.verticals].join(" ").toLowerCase();
      const matchesText = !q || text.includes(q);
      const matchesRegion = !reg || regionsFor(p).has(reg) || (reg === "GLOBAL" && p.geo.includes("GLOBAL"));
      return matchesText && matchesRegion;
    });

    renderPartners(state.filtered);
  };

  searchEl.addEventListener("input", apply);
  regionEl.addEventListener("change", apply);
}

function renderPartners(list) {
  const grid = $(SELECTORS.partnersList);
  const empty = $(SELECTORS.emptyState);

  grid.innerHTML = "";
  if (!list.length) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  const frag = document.createDocumentFragment();

  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "card";

    const v = p.verticals.length ? p.verticals.join(" • ") : "—";

    card.innerHTML = `
      <h3>${escapeHTML(p.name)}</h3>
      <div class="meta">${escapeHTML(v)}</div>
      <div class="badges">
        ${badge(p.payout_model || "payout: n/a")}
        ${badge(p.payout_range || "range: n/a")}
        ${badge(p.approval ? `approval: ${p.approval}` : "approval: n/a")}
        ${[...regionsFor(p)].map(r => badge(r)).join("")}
      </div>
      <div class="link-row">
        ${p.source_url ? `<a class="link" href="${escapeAttr(p.source_url)}" target="_blank" rel="noopener">Program page →</a>` : ""}
      </div>
    `;
    frag.appendChild(card);
  });

  grid.appendChild(frag);
}

function countRegion(list, code) {
  return list.reduce((n, p) => n + (regionsFor(p).has(code) ? 1 : 0), 0);
}

function regionsFor(p) {
  const r = new Set();
  const geo = p.geo || "";

  // direct tokens
  if (geo.includes("GLOBAL")) r.add("GLOBAL");
  for (const [code, tokens] of Object.entries(regionTokens)) {
    if (tokens.some(t => geo.includes(t.toUpperCase()))) r.add(code);
  }
  return r;
}

function badge(text) {
  return `<span class="badge">${escapeHTML(text)}</span>`;
}

function unique(arr) {
  return [...new Set(arr.map(s => String(s).trim().toLowerCase()))];
}

function setText(sel, val) {
  const el = $(sel);
  if (el) el.textContent = val;
}

function $(sel){ return document.querySelector(sel); }

function escapeHTML(s){
  return String(s).replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])
  );
}
function escapeAttr(s){
  return String(s).replace(/"/g, '&quot;');
}

function showError(msg){
  const container = document.querySelector(".hero .container");
  const div = document.createElement("div");
  div.className = "empty";
  div.style.marginTop = "12px";
  div.textContent = msg;
  container.appendChild(div);
}
