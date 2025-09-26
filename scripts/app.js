// Fully self-contained client app for PartnerPeak
(async function () {
  const DATA_URL = "data/partners.json";

  // DOM
  const $grid = byId("pp-grid");
  const $search = byId("pp-search");
  const $regions = [...document.querySelectorAll(".pp-region")];
  const $verticalSel = byId("pp-vertical");
  const $payoutSel = byId("pp-payout");
  const $reset = byId("pp-reset");

  const $ctTotal = byId("pp-count-total");
  const $ctVert = byId("pp-count-vert");
  const $ctCover = byId("pp-count-cover");

  const $heroUS = byId("hero-us"), $heroEU = byId("hero-eu"), $heroUK = byId("hero-uk"), $heroAPAC = byId("hero-apac");

  // Modal
  const $modal = byId("pp-modal");
  const $close = byId("pp-modal-close");
  const $mName = byId("pp-m-name");
  const $mVerts = byId("pp-m-verts");
  const $mPayout = byId("pp-m-payout");
  const $mRange = byId("pp-m-range");
  const $mGeo = byId("pp-m-geo");
  const $mScore = byId("pp-m-score");
  const $mDocs = byId("pp-m-docs");
  const $mSource = byId("pp-m-source");
  const $mCopy = byId("pp-m-copy");

  const $aff = byId("pp-aff");
  const $dest = byId("pp-dest");
  const $out = byId("pp-out");
  const $build = byId("pp-build");

  // State
  let all = [];
  let filtered = [];
  let current = null;

  // Utils
  function byId(id){return document.getElementById(id)}
  const uniq = (a) => [...new Set(a)];
  const norm = (s = "") => String(s).toLowerCase().trim();
  function escapeHTML(s){return String(s).replace(/[&<>"']/g,m=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[m]))}
  function includesRegion(p, region) {
    const g = (p.geo_coverage || "").toUpperCase();
    if (!g) return false;
    if (g === "GLOBAL") return true;
    return g.split("|").includes(region.toUpperCase());
  }

  // Load data
  try {
    const res = await fetch(DATA_URL, { cache: "no-store" });
    all = await res.json();

    // Enforce LOW-RISK ONLY (risk_flags must be empty or not present)
    all = all.filter((p) => Array.isArray(p.risk_flags) ? p.risk_flags.length === 0 : true);

    // Build vertical options
    const verts = uniq(all.flatMap((p)=>Array.isArray(p.verticals)?p.verticals:[]))
      .map(v=>v.replace(/_/g," "))
      .sort((a,b)=>a.localeCompare(b));
    for (const v of verts) {
      const opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v;
      $verticalSel.appendChild(opt);
    }

    // Hero region counts
    $heroUS.textContent = all.filter(p=>includesRegion(p,"US")).length;
    $heroEU.textContent = all.filter(p=>includesRegion(p,"EU")).length;
    $heroUK.textContent = all.filter(p=>includesRegion(p,"UK")).length;
    $heroAPAC.textContent = all.filter(p=>includesRegion(p,"APAC")).length;

    // Initial render
    applyAndRender();

    // Events
    $search.addEventListener("input", applyAndRender);
    $regions.forEach(cb=>cb.addEventListener("change", applyAndRender));
    $verticalSel.addEventListener("change", applyAndRender);
    $payoutSel.addEventListener("change", applyAndRender);
    $reset.addEventListener("click", () => {
      $search.value = "";
      $regions.forEach(cb => cb.checked = true);
      $verticalSel.value = "";
      $payoutSel.value = "";
      applyAndRender();
    });

    $close.addEventListener("click", () => $modal.classList.add("hidden"));
    $modal.addEventListener("click", (e) => { if (e.target === $modal) $modal.classList.add("hidden"); });

    $mCopy.addEventListener("click", async () => {
      if (!current?.deep_link_template) return;
      await navigator.clipboard.writeText(current.deep_link_template);
      const old = $mCopy.textContent; $mCopy.textContent = "Copied!"; setTimeout(()=>{$mCopy.textContent=old}, 1000);
    });

    $build.addEventListener("click", () => {
      if (!current?.deep_link_template) return;
      const aff = ($aff.value||"").trim();
      const dest = ($dest.value||"").trim();
      if (!aff || !dest) { $out.value = "Enter AFF_ID and Destination URL"; return; }
      const encDest = encodeURIComponent(dest);
      const out = current.deep_link_template
        .replace("{AFF_ID}", aff)
        .replace("{CLICK_ID}", "pp_click")
        .replace("{URLENCODED_DEST}", encDest);
      $out.value = out;
    });

  } catch (e) {
    console.error("Load error:", e);
    $grid.innerHTML = `<div class="pp-card">Could not load data/partners.json</div>`;
  }

  function applyAndRender(){
    const q = norm($search.value);
    const selRegions = $regions.filter(cb=>cb.checked).map(cb=>cb.value.toUpperCase());
    const selVert = norm($verticalSel.value).replace(/\s+/g,"_");
    const selPayout = norm($payoutSel.value);

    filtered = all.filter(p=>{
      const regionOK = selRegions.length ? selRegions.some(r=>includesRegion(p,r)) : true;
      const vertOK = selVert ? (p.verticals||[]).map(v=>norm(v)).includes(selVert) : true;
      const payoutOK = selPayout ? norm(p.payout_model) === selPayout : true;

      const hay = [
        p.program_name, ...(p.verticals||[]), p.payout_model, p.typical_payout_range
      ].filter(Boolean).join(" ").toLowerCase();
      const qOK = q ? hay.includes(q) : true;

      return regionOK && vertOK && payoutOK && qOK;
    });

    renderCounts();
    renderGrid();
  }

  function renderCounts(){
    const total = filtered.length;
    const cats = uniq(filtered.flatMap(p=>p.verticals||[])).length;
    const coverScore = filtered.reduce((acc,p)=>{
      const g = (p.geo_coverage||"").toUpperCase();
      if (g === "GLOBAL") return acc+1;
      const set = new Set(g.split("|").filter(Boolean));
      return acc + (set.size >= 3 ? 1 : 0);
    },0);
    const coverage = total ? Math.round((coverScore/total)*100) : 0;

    $ctTotal.textContent = total;
    $ctVert.textContent = cats;
    $ctCover.textContent = `${coverage}%`;
  }

  function renderGrid(){
    if (!filtered.length){
      $grid.innerHTML = `<div class="pp-card">No partners match your filters.</div>`;
      return;
    }
    $grid.innerHTML = filtered
      .sort((a,b)=>(b.automation_score||0)-(a.automation_score||0))
      .map(cardHTML).join("");

    [...$grid.querySelectorAll("[data-pid]")].forEach(btn=>{
      btn.addEventListener("click", ()=>{
        const idx = Number(btn.getAttribute("data-pid"));
        current = filtered[idx];
        openModal(current);
      });
    });
  }

  function cardHTML(p,i){
    const verts = (p.verticals||[]).slice(0,3).map(v=>v.replace(/_/g," "));
    return `
      <article class="pp-card">
        <h4>${escapeHTML(p.program_name||"—")}</h4>
        <div class="pp-badges">
          ${verts.map(v=>`<span class="pp-badge">${escapeHTML(v)}</span>`).join("")}
        </div>
        <div class="pp-meta-row">
          <span><strong>Payout:</strong> ${escapeHTML(p.payout_model||"—")}</span>
          <span><strong>Range:</strong> ${escapeHTML(p.typical_payout_range||"—")}</span>
          <span><strong>Coverage:</strong> ${escapeHTML(p.geo_coverage||"—")}</span>
          <span><strong>Auto:</strong> ${escapeHTML(String(p.automation_score??"—"))}/5</span>
        </div>
        <div class="pp-actions">
          <button class="btn" data-pid="${i}">Details</button>
        </div>
      </article>
    `;
  }

  function openModal(p){
    $mName.textContent = p.program_name||"—";
    $mVerts.textContent = (p.verticals||[]).map(v=>v.replace(/_/g," ")).join(", ");
    $mPayout.textContent = p.payout_model||"—";
    $mRange.textContent = p.typical_payout_range||"—";
    $mGeo.textContent = p.geo_coverage||"—";
    $mScore.textContent = String(p.automation_score??"—");
    $mDocs.href = p.conversion_reporting?.docs_url || "#";
    $mSource.href = p.source_url || "#";
    $aff.value=""; $dest.value=""; $out.value="";
    $modal.classList.remove("hidden");
  }
})();
