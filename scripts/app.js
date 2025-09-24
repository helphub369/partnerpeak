// Compute KPIs from partners.json and populate the hero metrics
(async function () {
  try {
    const res = await fetch("data/partners.json", { cache: "no-store" });
    const partners = await res.json();

    // Programs count
    const programs = partners.length;

    // Categories (verticals) covered
    const categories = new Set();
    partners.forEach(p => (p.verticals || []).forEach(v => categories.add(v)));

    // Readiness by region (simple boolean flags on each record)
    const counts = { US: 0, EU: 0, UK: 0, APAC: 0 };
    partners.forEach(p => {
      if (p.regions?.includes("US")) counts.US++;
      if (p.regions?.includes("EU")) counts.EU++;
      if (p.regions?.includes("UK")) counts.UK++;
      if (p.regions?.includes("APAC")) counts.APAC++;
    });

    // Coverage (percent of four macro regions with at least 1 listing)
    const coverage = ["US", "EU", "UK", "APAC"].reduce((n, r) => n + (counts[r] > 0 ? 1 : 0), 0);
    const pct = Math.round((coverage / 4) * 100);

    // Paint KPIs
    document.getElementById("kpi-programs").textContent = programs;
    document.getElementById("kpi-categories").textContent = categories.size;
    document.getElementById("kpi-coverage").textContent = `${pct}%`;

    document.getElementById("us-ready").textContent = counts.US;
    document.getElementById("eu-ready").textContent = counts.EU;
    document.getElementById("uk-ready").textContent = counts.UK;
    document.getElementById("apac-ready").textContent = counts.APAC;
  } catch (e) {
    console.error("Failed to load KPIs:", e);
  }
})();
