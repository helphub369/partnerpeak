// Reads window.PARTNERS_DATA and updates the homepage KPIs.

(function () {
  function parseCoverageFlags(s) {
    if (!s) return { US:0, EU:0, UK:0, APAC:0, global:0 };
    const flag = { US:0, EU:0, UK:0, APAC:0, global:0 };
    const raw = String(s).toUpperCase();

    if (raw.includes("GLOBAL")) { flag.global = 1; flag.US = flag.EU = flag.UK = flag.APAC = 1; return flag; }
    if (raw.includes("US")) flag.US = 1;
    if (raw.includes("EU")) flag.EU = 1;
    if (raw.includes("UK")) flag.UK = 1;
    if (raw.includes("APAC")) flag.APAC = 1;
    return flag;
  }

  function compute(partners) {
    const categories = new Set();
    let total = 0, global = 0, us=0, eu=0, uk=0, apac=0;

    partners.forEach(p => {
      total++;
      (p.verticals || []).forEach(v => categories.add(v));

      const f = parseCoverageFlags(p.geo_coverage);
      if (f.global) global++;
      if (f.US) us++;
      if (f.EU) eu++;
      if (f.UK) uk++;
      if (f.APAC) apac++;
    });

    const coveragePercent = total ? Math.round((global / total) * 100) : 0;

    return {
      totalPrograms: total,
      categoriesCount: categories.size,
      coveragePercent,
      us, eu, uk, apac
    };
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function init() {
    const data = Array.isArray(window.PARTNERS_DATA) ? window.PARTNERS_DATA : [];
    const stats = compute(data);
    setText("programCount", stats.totalPrograms);
    setText("categoryCount", stats.categoriesCount);
    setText("coveragePercent", stats.coveragePercent + "%");
    setText("usCount", stats.us);
    setText("euCount", stats.eu);
    setText("ukCount", stats.uk);
    setText("apacCount", stats.apac);
  }

  window.addEventListener("DOMContentLoaded", init);
})();
