// scripts/partners.js — robust loader that works on GitHub Pages subfolders

(async () => {
  // Always resolve relative to the current page (works for /partnerpeak/)
  const partnersURL = new URL('./data/partners.json', window.location.href);

  async function loadPartners() {
    const res = await fetch(partnersURL.toString(), { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed to load ${partnersURL} → ${res.status} ${res.statusText}`);
    }
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      if (!Array.isArray(data)) throw new Error('partners.json must be an array []');
      return data;
    } catch (e) {
      console.error('Invalid JSON in partners.json:', e);
      throw e;
    }
  }

  // helpers
  const $ = (s) => document.querySelector(s);
  const setText = (s, v) => { const el = $(s); if (el) el.textContent = v; };
  const fmt = (n) => Intl.NumberFormat('en-US').format(n || 0);

  function hydrateKPIs(list) {
    setText('[data-kpi="total-programs"]', fmt(list.length));

    const countBy = (pred) => list.filter(pred).length;
    const hasRegion = (key) =>
      countBy(p => (p.region || '').toUpperCase().includes(key));

    setText('[data-kpi="us"]',   fmt(hasRegion('US')));
    setText('[data-kpi="eu"]',   fmt(hasRegion('EU')));
    setText('[data-kpi="uk"]',   fmt(hasRegion('UK')));
    setText('[data-kpi="apac"]', fmt(hasRegion('APAC')));

    const cats = new Set(list.map(p => (p.category || '').trim()).filter(Boolean));
    setText('[data-kpi="categories"]', fmt(cats.size));

    const globalish = countBy(p => /global/i.test(p.region || ''));
    const pct = list.length ? Math.round((globalish / list.length) * 100) : 0;
    setText('[data-kpi="global-pct"]', `${pct}%`);
  }

  function renderPartnerList(list) {
    const wrap = $('#partners-list');
    if (!wrap) return;

    if (!list.length) {
      wrap.innerHTML = `<div class="empty">No programs yet.</div>`;
      return;
    }

    wrap.innerHTML = list.map(p => `
      <article class="partner">
        <div class="partner__head">
          <h3>${p.name || 'Unnamed Program'}</h3>
          <span class="badge">${(p.risk || 'Low')}</span>
        </div>
        <div class="partner__meta">
          <span>${p.category || 'Uncategorized'}</span>
          <span>${p.region || 'Region: n/a'}</span>
          <span>${p.payout || 'Payout: n/a'}</span>
        </div>
        ${p.url ? `<a class="btn" href="${p.url}" target="_blank" rel="nofollow noopener">Program</a>` : ``}
      </article>
    `).join('');
  }

  try {
    const partners = await loadPartners();
    hydrateKPIs(partners);
    renderPartnerList(partners);
    console.log(`Loaded ${partners.length} partners from`, partnersURL.toString());
  } catch (err) {
    console.error(err);
    const notice = document.createElement('div');
    notice.style.cssText = 'position:fixed;bottom:10px;left:10px;background:#c0392b;color:#fff;padding:8px 12px;border-radius:8px;font:14px system-ui;z-index:9999';
    notice.textContent = 'Failed to load partners.json. Open console for details.';
    document.body.appendChild(notice);
  }
})();
