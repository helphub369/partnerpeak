<script>
// PartnerPeak: browser-side renderer for GitHub Pages

(async () => {
  // Compute a safe relative URL for GitHub Pages (repo subfolder)
  const base = location.pathname.endsWith('/')
    ? location.pathname
    : location.pathname.replace(/[^/]+$/, '/');
  const dataURL = new URL('data/partners.json', base).toString();

  // Small helpers
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // Where to print errors (without breaking the page)
  function toast(msg) {
    console.warn('[PartnerPeak]', msg);
  }

  // Fetch dataset
  let partners = [];
  try {
    const res = await fetch(dataURL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    partners = await res.json();
    if (!Array.isArray(partners)) throw new Error('partners.json is not an array');
  } catch (err) {
    toast(`Could not load partners.json at ${dataURL}: ${err.message}`);
    return; // stop here; we can’t render
  }

  // Basic stats
  const total = partners.length;
  const regions = {
    us: 0, eu: 0, uk: 0, apac: 0
  };

  // Region guesser (from geo_coverage text)
  function bucketByRegion(partner) {
    const cov = (partner.geo_coverage || '').toLowerCase();
    if (/global/.test(cov)) {
      regions.us++; regions.eu++; regions.uk++; regions.apac++;
      return;
    }
    if (/us|united states|north america|na/.test(cov)) regions.us++;
    if (/(eu|europe(?!.*uk))/.test(cov)) regions.eu++;
    if (/\buk\b|\bunited kingdom\b/.test(cov)) regions.uk++;
    if (/apac|asia|pacific|australia|nz/.test(cov)) regions.apac++;
  }

  partners.forEach(bucketByRegion);

  // Category/verticals
  const catSet = new Set();
  partners.forEach(p => {
    (p.verticals || []).forEach(v => catSet.add(String(v).toLowerCase()));
  });

  // Coverage (rough heuristic)
  const coverage = Math.min(
    100,
    Math.round((Object.values(regions).reduce((a,b)=>a+b,0) / (4 * Math.max(1,total))) * 100)
  );

  // Update counters IF page has these ids. We won’t crash if they’re missing.
  const map = [
    ['#stat-total', total],
    ['#stat-us', regions.us],
    ['#stat-eu', regions.eu],
    ['#stat-uk', regions.uk],
    ['#stat-apac', regions.apac],
    ['#stat-cats', catSet.size],
    ['#stat-coverage', coverage + '%'],
  ];
  map.forEach(([sel, val]) => { const n = $(sel); if (n) n.textContent = val; });

  // Render a grid of partners if a mount exists
  // Add an element like: <div id="partners-grid"></div> on /partners page
  const grid = $('#partners-grid');
  if (grid) {
    grid.innerHTML = partners.map(p => {
      const verts = (p.verticals || []).join(' • ');
      const payout = p.typical_payout_range || '';
      const model = p.payout_model || '';
      const autom = (p.automation_score != null) ? `Automation: ${p.automation_score}/5` : '';
      const doc = p.conversion_reporting?.docs_url || p.source_url || '#';
      return `
        <article class="pp-card">
          <div class="pp-card__header">
            <h3>${p.program_name || 'Program'}</h3>
            ${verts ? `<span class="pp-chip">${verts}</span>` : ''}
          </div>
          <div class="pp-card__body">
            <div class="pp-meta"><strong>${model}</strong>${payout ? ` • ${payout}` : ''}</div>
            <div class="pp-meta">${p.geo_coverage || ''}</div>
            <div class="pp-meta">${autom}</div>
          </div>
          <div class="pp-card__footer">
            <a class="pp-btn" href="${doc}" target="_blank" rel="noopener">Docs / Program</a>
          </div>
        </article>
      `;
    }).join('');

    // Tiny styles if your CSS doesn’t have them yet
    if (!$('#pp-inline-style')) {
      const style = document.createElement('style');
      style.id = 'pp-inline-style';
      style.textContent = `
        #partners-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:16px; }
        .pp-card { background: rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:16px; }
        .pp-card__header { display:flex; align-items:center; gap:8px; justify-content:space-between; }
        .pp-card h3 { margin:0; font-size:1.05rem; }
        .pp-chip { font-size:.75rem; opacity:.85; border:1px solid rgba(255,255,255,0.15); padding:2px 8px; border-radius:999px; }
        .pp-meta { opacity:.85; margin-top:6px; font-size:.9rem; }
        .pp-btn { display:inline-block; padding:8px 12px; border-radius:8px; background:#1f6feb; color:#fff; text-decoration:none; }
        .pp-btn:hover { filter:brightness(1.1); }
      `;
      document.head.appendChild(style);
    }
  }
})();
</script>
