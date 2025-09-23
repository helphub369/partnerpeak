#!/usr/bin/env python3
import os, json, re, html, datetime, hashlib, xml.etree.ElementTree as ET

ROOT = os.getenv('GITHUB_WORKSPACE', '.')
DATA = os.path.join(ROOT, 'data', 'partners.json')
TPL = os.path.join(ROOT, 'templates', 'partner.html')
TPL_INDEX = os.path.join(ROOT, 'templates', 'partners_index.html')
OUT_DIR = os.path.join(ROOT, 'partners')
SITE = os.environ.get('SITE_URL', 'https://YOUR_DOMAIN').rstrip('/')

def slugify(s):
    base = s.lower()
    base = re.sub(r'[^a-z0-9]+','-', base)
    base = re.sub(r'-+','-', base).strip('-')
    return base or hashlib.md5(s.encode()).hexdigest()[:8]

def read(p): 
    with open(p, 'r', encoding='utf-8') as f: 
        return f.read()

def write(p, txt):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(txt)

def json_ld(p, slug):
    import json as _json
    obj = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": p["program_name"],
      "description": f"Automation-friendly {p['program_name']} integration via PartnerPeak.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "USD",
        "url": f"{SITE}/partners/{slug}.html"
      },
      "publisher": {"@type": "Organization","name": "PartnerPeak"}
    }
    return _json.dumps(obj, indent=2)

def render_partner(p, tpl):
    slug = slugify(p['program_name'])
    page = tpl.format(
        TITLE = f"{p['program_name']} — Affiliate/Referral Program via PartnerPeak",
        META_DESC = f"{p['program_name']} program: automation {p.get('automation_score','?')}/5, payouts {p.get('typical_payout_range','N/A')}, geo coverage {p.get('geo_coverage','global')}.",
        SLUG = slug,
        JSON_LD = json_ld(p, slug),
        PROGRAM_NAME = html.escape(p['program_name']),
        VERTICAL = html.escape(', '.join(p.get('verticals') or [])),
        VERTICAL_RAW = (p.get('verticals') or ['saas'])[0],
        AUTOMATION_SCORE = str(p.get('automation_score','?')),
        PAYOUT = html.escape(p.get('typical_payout_range','N/A')),
        MECHANISM = html.escape(p.get('mechanism','link')),
        PAYOUT_MODEL = html.escape(p.get('payout_model','flat/percent')),
        GEO_COVERAGE = html.escape(p.get('geo_coverage','global')),
        RISK_FLAGS = html.escape(', '.join(p.get('risk_flags') or []) or 'none'),
        DEEP_LINK = html.escape(p.get('deep_link_template','')),
        DOCS_URL = html.escape((p.get('conversion_reporting') or {}).get('docs_url','')),
        SOURCE_URL = html.escape(p.get('source_url','')),
        OVERVIEW = html.escape(f"{p['program_name']} is an automation‑friendly program indexed by PartnerPeak.")
    )
    return slug, page

def build_pages(partners):
    tpl = read(TPL)
    os.makedirs(OUT_DIR, exist_ok=True)
    seen=set(); paths=[]
    for p in partners[:500]:
        base = slugify(p['program_name']); slug=base; n=2
        while slug in seen: slug=f"{base}-{n}"; n+=1
        seen.add(slug)
        _, html_page = render_partner(p, tpl)
        write(os.path.join(OUT_DIR, f"{slug}.html"), html_page)
        paths.append(('/partners/'+slug+'.html', p['program_name']))
    write(os.path.join(OUT_DIR, "index.html"), read(TPL_INDEX))
    paths.append(('/partners/', 'Partner directory'))
    return paths

def build_sitemap(paths):
    urlset = ET.Element('urlset', xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    now = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
    base_pages = ['/', '/disclosure.html', '/privacy.html', '/terms.html', '/cookies.html', '/dmca.html']
    for loc in base_pages:
        url = ET.SubElement(urlset, 'url')
        ET.SubElement(url, 'loc').text = f"{SITE}{loc}"
        ET.SubElement(url, 'lastmod').text = now
        ET.SubElement(url, 'changefreq').text = 'daily'
        ET.SubElement(url, 'priority').text = '0.7' if loc!='/' else '1.0'
    for loc, _name in paths:
        url = ET.SubElement(urlset, 'url')
        ET.SubElement(url, 'loc').text = f"{SITE}{loc}"
        ET.SubElement(url, 'lastmod').text = now
        ET.SubElement(url, 'changefreq').text = 'weekly'
        ET.SubElement(url, 'priority').text = '0.5'
    ET.ElementTree(urlset).write(os.path.join(ROOT, 'sitemap.xml'), encoding='utf-8', xml_declaration=True)

def build_feed(paths):
    now = datetime.datetime.utcnow().strftime("%a, %d %b %Y %H:%M:%S +0000")
    items = []
    for loc, name in paths[:50]:
        guid = hashlib.md5((loc+name).encode()).hexdigest()
        items.append(f"""
    <item>
      <title>{html.escape(name)}</title>
      <link>{SITE}{loc}</link>
      <guid isPermaLink="false">{guid}</guid>
      <pubDate>{now}</pubDate>
      <description>{html.escape(name)} page published.</description>
    </item>""")
    rss = f"""<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>PartnerPeak Updates</title>
    <link>{SITE}/</link>
    <description>New partner pages and updates</description>
    <lastBuildDate>{now}</lastBuildDate>
    {''.join(items)}
  </channel>
</rss>
"""
    with open(os.path.join(ROOT, 'feed.xml'), 'w', encoding='utf-8') as f:
        f.write(rss)

def build_robots():
    robots = f"""User-agent: *
Disallow: /assets/dev/
Allow: /

Crawl-delay: 5
Sitemap: {SITE}/sitemap.xml
Sitemap: {SITE}/feed.xml
"""
    with open(os.path.join(ROOT, 'robots.txt'), 'w', encoding='utf-8') as f:
        f.write(robots)

def main():
    if not os.path.exists(DATA):
        print("No data/partners.json found"); return 1
    partners = json.load(open(DATA, 'r', encoding='utf-8'))
    paths = build_pages(partners)
    build_sitemap(paths)
    build_feed(paths)
    build_robots()
    print(f"Built {len(paths)} partner pages + sitemap.xml + feed.xml + robots.txt")
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
