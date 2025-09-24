// scripts/app.js
(async function init() {
  // 1) Load partners data
  let partners = (window.PARTNERS && Array.isArray(window.PARTNERS))
    ? window.PARTNERS
    : await fetch('./data/partners.json', { cache: 'no-store' })
        .then(r => {
          if (!r.ok) throw new Error(`Fetch failed: ${r.status}`);
          return r.json();
        })
        .catch(err => {
          console.error('Failed to load partners.json', err);
          return [];
        });

  // 2) Normalize (defensive)
  if (!Array.isArray(partners)) partners = [];

  // 3) Derive simple metrics
  const total = partners.length;
  const cats = new Set();
  const regionReady = { US: 0, EU: 0, UK: 0, APAC: 0 };

  partners.forEach(p => {
    (p.verticals || []).forEach(v => cats.add(String(v).toLowerCase()));
    const geo = String(p.geo_coverage || '').toLowerCase();
    // cheap heuristic: count as “ready” if geo coverage mentions that region or is global
    const isGlobal = geo.includes('global');
    if (isGlobal || geo.includes('us')) regionReady.US++;
    if (isGlobal || geo.includes('eu')) regionReady.EU++;
    if (isGlobal || geo.includes('uk')) regionReady.UK++;
    if (isGlobal || geo.includes('apac') || geo.includes('sg') || geo.includes('au') || geo.includes('nz')) regionReady.APAC++;
  });

  // 4) Paint metrics into the dashboard if the elements exist
  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  setText('metric-total-programs', total);
  setText('metric-total-categories', cats.size);
  setText('metric-global-coverage', total ? `${Math.round(100 * (
    (regionReady.US || regionReady.EU || regionReady.UK || regionReady.APAC) ? 1 : 0
  ))}%` : '0%');

  setText('metric-us-ready', regionReady.US || 0);
  setText('metric-eu-ready', regionReady.EU || 0);
  setText('metric-uk-ready', regionReady.UK || 0);
  setText('metric-apac-ready', regionReady.APAC || 0);

  // 5) Render the partners list page (if present)
  const list = document.getElementById('partners-list');
  if (list) {
    list.innerHTML = partners.map(p => {
      const v = (p.verticals || []).join(', ');
      const payout = p.typical_payout_range || '';
      const mech = p.mechanism || '';
      const geo = p.geo_coverage || '';
      return `
        <li class="partner-card">
          <h3>${p.program_name || 'Unnamed program'}</h3>
          <p class="muted">${v}</p>
          <p><strong>Mechanism:</strong> ${mech} · <strong>Payout:</strong> ${payout} · <strong>Geo:</strong> ${geo}</p>
          ${p.source_url ? `<a href="${p.source_url}" target="_blank" rel="noopener">Program page</a>` : ``}
        </li>`;
    }).join('');
  }

  // 6) Log for sanity
  console.log(`Loaded ${total} partners`);
})();
