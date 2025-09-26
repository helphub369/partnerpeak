/* global PARTNER_DATA */
window.PP = (() => {
  // derive readiness flags from geo_coverage
  function withReadiness(rows) {
    return rows.map(r => {
      const g = (r.geo_coverage || "global").toLowerCase();
      const has = s => g.includes(s) || g.includes("global");
      return {
        ...r,
        readiness: {
          us:  has("us"),
          eu:  has("eu"),
          uk:  has("uk"),
          apac:has("apac")
        }
      };
    });
  }

  function uniq(arr) { return [...new Set(arr)]; }

  function computeStats(rows) {
    const programs = rows.length;
    const cats = uniq(rows.flatMap(r => r.verticals || [])).length;
    const globalPct = Math.round(
      100 * rows.filter(r => (r.geo_coverage||"").toLowerCase().includes("global")).length / Math.max(programs,1)
    );

    const us    = rows.filter(r => r.readiness.us).length;
    const eu    = rows.filter(r => r.readiness.eu).length;
    const uk    = rows.filter(r => r.readiness.uk).length;
    const apac  = rows.filter(r => r.readiness.apac).length;

    return { programs, cats, globalPct, us, eu, uk, apac };
  }

  function renderHomeStats(data) {
    const rows = withReadiness(data);
    const s = computeStats(rows);
    byId("count-programs").textContent = s.programs;
    byId("count-categories").textContent = s.cats;
    byId("count-global").textContent = s.globalPct + "%";
    byId("badge-us").textContent = s.us;
    byId("badge-eu").textContent = s.eu;
    byId("badge-uk").textContent = s.uk;
    byId("badge-apac").textContent = s.apac;
  }

  function renderPartners(data) {
    const rows = withReadiness(data);

    // category chips
    const cats = uniq(rows.flatMap(r => r.verticals || [])).sort();
    const chips = byId("chips");
    chips.innerHTML = "";
    cats.forEach(c => {
      const el = document.createElement("button");
      el.className = "chip";
      el.textContent = c;
      el.addEventListener("click", () => {
        toggleChip(el);
        draw();
      });
      chips.appendChild(el);
    });

    // search + toggles
    ["q","f-us","f-eu","f-uk","f-apac"].forEach(id =>
      byId(id).addEventListener(id==="q"?"input":"change", draw)
    );

    const grid = byId("grid");
    draw();

    function draw() {
      const q = byId("q").value.trim().toLowerCase();
      const need = {
        us: byId("f-us").checked,
        eu: byId("f-eu").checked,
        uk: byId("f-uk").checked,
        apac: byId("f-apac").checked
      };
      const activeCats = [...chips.querySelectorAll(".chip.active")].map(x=>x.textContent);

      const filtered = rows.filter(r => {
        if (q) {
          const hay = [r.program_name, ...(r.verticals||[]), r.mechanism, r.payout_model].join(" ").toLowerCase();
          if (!hay.includes(q)) return false;
        }
        if (activeCats.length && !(r.verticals||[]).some(v => activeCats.includes(v))) return false;
        if (need.us   && !r.readiness.us)   return false;
        if (need.eu   && !r.readiness.eu)   return false;
        if (need.uk   && !r.readiness.uk)   return false;
        if (need.apac && !r.readiness.apac) return false;
        return true;
      });

      grid.innerHTML = "";
      filtered.forEach(r => grid.appendChild(card(r)));
      if (!filtered.length) grid.innerHTML = `<div class="notice">No matches. Try clearing filters.</div>`;
    }
  }

  // UI helpers
  function byId(id){return document.getElementById(id);}
  function toggleChip(el){el.classList.toggle("active");}

  function badge(text){const b=document.createElement("span");b.className="badge";b.textContent=text;return b;}

  function card(r){
    const d = document.createElement("div");
    d.className = "card";

    const h = document.createElement("h3"); h.textContent = r.program_name; d.appendChild(h);

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `${(r.verticals||[]).join(" • ")} • ${r.payout_model||"recurring"} • ${r.typical_payout_range||""}`;
    d.appendChild(meta);

    const bs = document.createElement("div"); bs.className = "badges";
    if (r.readiness?.us)   bs.appendChild(badge("US"));
    if (r.readiness?.eu)   bs.appendChild(badge("EU"));
    if (r.readiness?.uk)   bs.appendChild(badge("UK"));
    if (r.readiness?.apac) bs.appendChild(badge("APAC"));
    (r.verticals||[]).slice(0,3).forEach(v => bs.appendChild(badge(v)));
    d.appendChild(bs);

    const lr = document.createElement("div"); lr.className="linkrow";
    if (r.source_url) {
      const a = document.createElement("a"); a.className="small"; a.href=r.source_url; a.target="_blank"; a.textContent="Program";
      lr.appendChild(a);
    }
    if (r.conversion_reporting?.docs_url) {
      const a = document.createElement("a"); a.className="small"; a.href=r.conversion_reporting.docs_url; a.target="_blank"; a.textContent="Docs";
      lr.appendChild(a);
    }
    d.appendChild(lr);
    return d;
  }

  return { renderHomeStats, renderPartners };
})();
