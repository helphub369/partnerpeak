/* PartnerPeak — partners directory UI
   - Loads /data/partners.json
   - Facets: category chips, region filter, search, sort
   - Safeguards against missing fields
*/

(async function () {
  const grid = byId('pp-grid');
  const countEl = byId('pp-count');
  const catsEl = byId('pp-cats');
  const qEl = byId('pp-search');
  const regionEl = byId('pp-region');
  const sortEl = byId('pp-sort');

  let all = [];
  try {
    const res = await fetch('../data/partners.json', { cache: 'no-store' });
    all = await res.json();
  } catch (e) {
    grid.innerHTML = `<div class="pp-muted">Couldn’t load partners.json</div>`;
    return;
  }

  // Normalize + derive helpers
  all = (all || []).map(p => ({
    name: (p.name || '').trim(),
    category: (p.category || 'Other').trim(),
    region: (p.region || 'Global').trim(),
    payout: (p.payout || '').trim(),
    model: (p.model || '').trim(),
    risk: (p.risk || 'Low').trim(),
    url: (p.url || '#').trim()
  })).filter(p => p.name);

  // Build category chips (from data)
  const categories = [...new Set(all.map(p => p.category))].sort();
  let activeCat = ''; // all
  catsEl.innerHTML = [
    chipHtml('All', ''),
    ...categories.map(c => chipHtml(c, c))
  ].join('');
  catsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('.pp-chip');
    if (!btn) return;
    activeCat = btn.dataset.cat || '';
    [...catsEl.querySelectorAll('.pp-chip')].forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    render();
  });
  // Set “All” active by default
  const first = catsEl.querySelector('.pp-chip[data-cat=""]');
  if (first) first.classList.add('active');

  // Wire search / filters
  qEl.addEventListener('input', debounce(render, 120));
  regionEl.addEventListener('change', render);
  sortEl.addEventListener('change', render);

  render();

  function render() {
    const q = qEl.value.trim().toLowerCase();
    const region = regionEl.value;

    let rows = all.filter(p =>
      (!activeCat || p.category === activeCat) &&
      (!region || p.region === region) &&
      (!q || (
        p.name.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ))
    );

    // Sort
    const key = sortEl.value;
    rows.sort((a, b) => {
      if (key === 'payout') {
        // heuristic: pull leading number for desc sort
        const pa = parseFloat((a.payout.match(/[\d.]+/g) || [0])[0]);
        const pb = parseFloat((b.payout.match(/[\d.]+/g) || [0])[0]);
        return pb - pa;
      }
      if (key === 'category') return a.category.localeCompare(b.category);
      return a.name.localeCompare(b.name);
    });

    countEl.textContent = rows.length.toString();
    grid.innerHTML = rows.map(card).join('') || emptyHtml();
  }

  // Card template
  function card(p) {
    return `
      <article class="pp-card">
        <div class="pp-name">${esc(p.name)}</div>
        <div class="pp-meta">
          <span class="pp-badge">${esc(p.category)}</span>
          <span class="pp-badge">${esc(p.region)}</span>
          <span class="pp-badge">${esc(p.payout || 'Payout varies')}</span>
          <span class="pp-badge">Risk: ${esc(p.risk)}</span>
        </div>
        <div class="pp-muted">${esc(p.model || '')}</div>
        <div class="pp-cta">
          <a href="${escUrl(p.url)}" target="_blank" rel="nofollow noopener">Program details</a>
          <span class="pp-muted">Always include FTC disclosure on affiliate links</span>
        </div>
      </article>
    `;
  }

  function chipHtml(label, value) {
    return `<button class="pp-chip" data-cat="${escAttr(value)}">${esc(label)}</button>`;
  }

  function emptyHtml() {
    return `<div class="pp-muted">No programs match your filters. Try clearing a filter or searching a different term.</div>`;
  }

  // Utils
  function byId(id){ return document.getElementById(id) }
  function esc(s){ return String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])) }
  function escAttr(s){ return esc(s).replace(/"/g, '&quot;') }
  function escUrl(s){ return esc(s) }
  function debounce(fn, wait=150){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn.apply(null,a),wait)} }
})();
