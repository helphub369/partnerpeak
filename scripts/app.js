// app.js - Reads dataset and updates homepage stats

function computeStats(partners) {
  const totalPrograms = partners.length;

  const categories = new Set();
  let us = 0, eu = 0, uk = 0, apac = 0, global = 0;

  partners.forEach(p => {
    // categories
    p.verticals.forEach(v => categories.add(v));

    // coverage
    if (p.geo_coverage.includes("US")) us++;
    if (p.geo_coverage.includes("EU")) eu++;
    if (p.geo_coverage.includes("UK")) uk++;
    if (p.geo_coverage.includes("APAC")) apac++;
    if (p.geo_coverage.includes("global")) global++;
  });

  // inject into DOM
  document.getElementById("programCount").textContent = totalPrograms;
  document.getElementById("categoryCount").textContent = categories.size;
  document.getElementById("coveragePercent").textContent =
    Math.round((global / totalPrograms) * 100) + "%";

  document.getElementById("usCount").textContent = us;
  document.getElementById("euCount").textContent = eu;
  document.getElementById("ukCount").textContent = uk;
  document.getElementById("apacCount").textContent = apac;
}

window.addEventListener("DOMContentLoaded", () => {
  if (window.PARTNERS_DATA) {
    computeStats(window.PARTNERS_DATA);
  }
});
