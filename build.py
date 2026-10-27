#!/usr/bin/env python3
"""DezaCo static site generator.

Edit data/catalog.json (products, categories, contact details), then run:
    python3 build.py
Every HTML page and assets/js/catalog.js is regenerated. No dependencies.
"""
import json, html, os, re
from pathlib import Path
from PIL import Image  # only used to read image sizes; optional

ROOT = Path(__file__).parent
DATA = json.loads((ROOT / "data/catalog.json").read_text())
SITE, CATS, PRODUCTS = DATA["site"], DATA["categories"], DATA["products"]
CAT = {c["slug"]: c for c in CATS}
YEAR = 2026

def esc(s): return html.escape(str(s), quote=True)

# number items per category: V-01, H-03 ...
_counter = {}
for p in PRODUCTS:
    c = CAT[p["cat"]]
    _counter[c["slug"]] = _counter.get(c["slug"], 0) + 1
    p["ref"] = f'{c["code"]}-{_counter[c["slug"]]:02d}'
for c in CATS:
    c["items"] = [p for p in PRODUCTS if p["cat"] == c["slug"]]

def img_size(rel):
    try:
        with Image.open(ROOT / rel) as im: return im.size
    except Exception: return (800, 800)

def pimg(p, n=None): return f'assets/products/{p["slug"]}-{n or p["images"][0]}.webp'

# ---------------------------------------------------------------- icons
UI_ICONS = {
    "grid": '<rect x="4" y="4" width="6.5" height="6.5" rx="1"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1"/>',
    "search": '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    "plus": '<path d="M12 5v14M5 12h14"/>',
    "minus": '<path d="M5 12h14"/>',
    "check": '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    "arrow": '<path d="M4.5 12h15M13.5 6l6 6-6 6"/>',
    "x": '<path d="M6 6l12 12M18 6 6 18"/>',
    "list": '<path d="M9 4h6v3H9z"/><path d="M15 5.5h2.5v15h-11v-15H9"/><path d="M9.5 11.5h5M9.5 15h5"/>',
    "phone": '<path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/>',
    "mail": '<path d="M3.5 6h17v12h-17z"/><path d="m4 6.5 8 6.5 8-6.5"/>',
    "pin": '<path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    "clock": '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    "menu": '<path d="M4 7h16M4 12h16M4 17h16"/>',
    "chat": '<path d="M4 5.5h16v10.5h-9l-4.5 3.5V16H4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    "trash": '<path d="M5 7h14M10 7V4.5h4V7M7 7l1 13h8l1-13"/>',
}
PICTOS = {
    "valve": '<circle cx="12" cy="4.6" r="2.7" stroke-width="1.5" fill="none" stroke="currentColor"/><path fill="currentColor" stroke="none" d="M11.2 7.2h1.6v3.2h-1.6zM9 10h6v2.2H9zM7.6 12.6h8.8a1 1 0 0 1 1 1v4.4a2 2 0 0 1-2 2H8.6a2 2 0 0 1-2-2v-4.4a1 1 0 0 1 1-1zM3 12.4h1.9v7.8H3zM19.1 12.4H21v7.8h-1.9zM4.9 14.6h2.2v3.4H4.9zM16.9 14.6h2.2v3.4h-2.2z"/>',
    "hydrant": '<circle fill="currentColor" stroke="none" cx="12" cy="2.9" r="1.1"/><path fill="currentColor" stroke="none" d="M8.4 7.2a3.6 3.6 0 0 1 7.2 0zM7.9 7.7h8.2v3.1H7.9zM9.6 10.8h4.8v8.4H9.6zM5.2 11.7h4.4v2.8H5.2zM14.4 11.7h4.4v2.8h-4.4zM3.4 11.1h1.8v4H3.4zM18.8 11.1h1.8v4h-1.8zM6.8 19.2h10.4v2.4H6.8z"/>',
    "extinguisher": '<path fill="currentColor" stroke="none" d="M9 9.6a3 3 0 0 1 6 0v10.3a1.6 1.6 0 0 1-1.6 1.6h-2.8A1.6 1.6 0 0 1 9 19.9zM11 4.2h2v2.5h-2z"/><path d="M12.6 4.1 17 2.6M11.2 4.3 8.4 5.2M11 5.2C7 5.2 5.6 8 5.6 11.4v4.2" stroke-width="1.5" fill="none" stroke="currentColor"/><path fill="currentColor" stroke="none" d="M4.7 15.2h1.8l.5 3.2H4.2z"/>',
    "pump": '<path fill="currentColor" stroke="none" d="M2.5 18.2h19v2.1h-19zM3.4 9h9.2v8H3.4zM12.6 11h1.6v4h-1.6zM16.3 6.6h2.4v3.8h-2.4zM15.4 5.4h4.2v1.4h-4.2zM4.8 17h2.2v1.2H4.8zM9 17h2.2v1.2H9zM15.8 16.4h3.4v1.8h-3.4z"/><circle fill="currentColor" stroke="none" cx="17.5" cy="13" r="3.9"/>',
    "grid": '<path fill="currentColor" stroke="none" d="M4.3 11.4a2.3 2.3 0 0 1 4.6 0v8.2a1.3 1.3 0 0 1-1.3 1.3h-2a1.3 1.3 0 0 1-1.3-1.3zM5.9 7.4h1.4v2H5.9zM11.2 20.9h10.3v1.4H11.2z"/><path d="M6.6 7.5 9.4 6.4" stroke-width="1.3" fill="none" stroke="currentColor"/><circle cx="16.4" cy="12.6" r="5.2" stroke-width="1.7" fill="none" stroke="currentColor"/><circle cx="16.4" cy="12.6" r="2.4" stroke-width="1.5" fill="none" stroke="currentColor"/><path fill="currentColor" stroke="none" d="M15.7 17.8h1.4v3.2h-1.4z"/>',
    "chat": '<path d="M3.5 5h17v11h-9.5l-5 4v-4H3.5z" stroke-width="1.6" fill="none" stroke="currentColor"/><path d="M7.5 9.2h9M7.5 12.3h6" stroke-width="1.6" fill="none" stroke="currentColor"/>',
}

def sprite():
    parts = ['<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>']
    for k, v in UI_ICONS.items():
        parts.append(f'<symbol id="i-{k}" viewBox="0 0 24 24">{v}</symbol>')
    for k, v in PICTOS.items():
        parts.append(f'<symbol id="p-{k}" viewBox="0 0 24 24">{v}</symbol>')
    mark = (ROOT / "assets/img/logo-mark.svg").read_text()
    inner = mark[mark.index(">") + 1: mark.rindex("</svg>")]
    parts.append(f'<symbol id="logo-d" viewBox="0 0 2105 2126">{inner}</symbol>')
    parts.append("</defs></svg>")
    return "".join(parts)

def ic(name, cls="i", label=None):
    a = f' role="img" aria-label="{esc(label)}"' if label else ' aria-hidden="true" focusable="false"'
    return f'<svg class="{cls}"{a}><use href="#i-{name}"/></svg>'

def picto(name):
    return f'<svg class="picto" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#p-{name}"/></svg>'

def wa_link(text=""):
    from urllib.parse import quote
    return f'https://wa.me/{SITE["whatsapp"]}' + (f"?text={quote(text)}" if text else "")

# ---------------------------------------------------------------- layout
NAV = [("index.html", "Home"), ("products.html", "Products"), ("about.html", "About"), ("contact.html", "Contact")]

def page(path, title, desc, body, active=None):
    depth = path.count("/")
    base = "../" * depth
    def u(p): return base + p
    nav = "".join(
        f'<a href="{u(h)}"{" aria-current=page" if active == h else ""}>{esc(t)}</a>' for h, t in NAV
    )
    nav_signs = "".join(
        f'<a class="sign" href="{u("category/" + c["slug"] + ".html")}"><span class="sign__arrow">{ic("arrow")}</span><span class="sign__picto">{picto(c["icon"])}</span><span class="sign__text"><span class="sign__name">{esc(c["sign"])}</span><span class="sign__count">{len(c["items"])} products</span></span></a>'
        for c in CATS)
    cat_links = "".join(f'<li><a href="{u("category/" + c["slug"] + ".html")}">{esc(c["name"])}</a></li>' for c in CATS)
    body = body.replace("{{base}}", base)
    full_title = f"{title} | {SITE['name']}" if title != SITE["name"] else f"{SITE['name']} | Fire protection equipment"
    out = f'''<!doctype html>
<html lang="en" data-base="{base}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(full_title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="theme-color" content="#c8161d">
<link rel="icon" href="{u('assets/img/favicon.svg')}" type="image/svg+xml">
<link rel="icon" href="{u('assets/img/favicon-32.png')}" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="{u('assets/img/apple-touch-icon.png')}">
<link rel="preload" href="{u('assets/fonts/barlow-condensed-latin-700-normal.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{u('assets/css/site.css')}">
<script>(function(d){{d.classList.add("mfx");setTimeout(function(){{if(!d.classList.contains("mfx-on"))d.classList.remove("mfx")}},3000)}})(document.documentElement)</script>
</head>
<body>
{sprite()}
<a class="skip" href="#main">Skip to content</a>
<div class="progress" aria-hidden="true"><span></span></div>
<div class="topbar on-dark"><div class="wrap">
  <a href="tel:{esc(re.sub(r'[^0-9+X]', '', SITE['phone']))}">{ic('phone')}<span class="num">{esc(SITE['phone'])}</span></a>
  <a class="hide-sm" href="mailto:{esc(SITE['email'])}">{ic('mail')}{esc(SITE['email'])}</a>
  <span class="spacer"></span>
  <a class="hide-sm" href="{u('contact.html')}">Send an enquiry</a>
</div></div>
<div class="navscrim" data-navscrim hidden></div>
<header class="header" data-header><div class="wrap">
  <a class="brand" href="{u('index.html')}" aria-label="{esc(SITE['name'])} home">
    <span class="brand__mark" aria-hidden="true"><svg class="brand__glyph" viewBox="0 0 2105 2126" focusable="false"><use href="#logo-d"/></svg></span>
    <span class="brand__word"><span class="brand__name">{esc(SITE['name'])}</span><span class="brand__sub">Fire protection equipment</span></span>
  </a>
  <nav class="nav" id="nav" aria-label="Main"><div class="nav__signs">{nav_signs}</div>{nav}</nav>
  <button class="btn btn--ink btn--sm list-btn" type="button" data-open-list aria-haspopup="dialog">
    {ic('list')}<span class="list-btn__text">Enquiry list</span><span class="list-btn__count num" data-count>0</span>
  </button>
  <button class="iconbtn menu-btn" type="button" aria-controls="nav" aria-expanded="false" data-menu>{ic('menu', label='Menu')}</button>
</div></header>
<main id="main">
{body}
</main>
<footer class="footer on-dark"><div class="wrap">
  <div>
    <a class="brand" href="{u('index.html')}"><span class="brand__mark" aria-hidden="true"><svg class="brand__glyph" viewBox="0 0 2105 2126" focusable="false"><use href="#logo-d"/></svg></span><span class="brand__word"><span class="brand__name">{esc(SITE['name'])}</span><span class="brand__sub">Fire protection equipment</span></span></a>
    <p style="margin-top:16px;max-width:36ch">Valves, hydrant and hose equipment, extinguishers and fire pump systems for factories, high-rise buildings and industrial sites.</p>
  </div>
  <div><h2 class="foot-h">Products</h2><ul>{cat_links}<li><a href="{u('products.html')}">All products</a></li></ul></div>
  <div><h2 class="foot-h">Company</h2><ul><li><a href="{u('about.html')}">About DezaCo</a></li><li><a href="{u('contact.html')}">Contact</a></li><li><button class="linklike" type="button" data-open-list style="all:unset;cursor:pointer;min-height:40px;display:inline-flex;align-items:center">Enquiry list</button></li></ul></div>
  <div><h2 class="foot-h">Contact</h2><ul>
    <li><a href="tel:{esc(re.sub(r'[^0-9+X]', '', SITE['phone']))}" class="num">{esc(SITE['phone'])}</a></li>
    <li><a href="mailto:{esc(SITE['email'])}">{esc(SITE['email'])}</a></li>
    <li><span class="tbc">{esc(SITE['address'])}</span></li>
  </ul></div>
  <div class="footer__base"><span>&copy; {YEAR} {esc(SITE['name'])}. All rights reserved.</span><span>Prices on request. Send your enquiry list on WhatsApp or email.</span></div>
</div></footer>

<nav class="dock on-dark" aria-label="Quick actions" data-dock>
  <a class="dock__item" href="{u('products.html')}" data-dock-first{' aria-current="page"' if path == 'products.html' else ''}>{ic('grid')}<span>Products</span></a>
  <button class="dock__item dock__item--list" type="button" data-open-list aria-haspopup="dialog">{ic('list')}<span>Enquiry list</span><b class="dock__count num" data-count>0</b></button>
  <a class="dock__item dock__item--wa" href="{wa_link('Hello DezaCo, I would like a price for:')}" target="_blank" rel="noopener">{ic('chat')}<span>WhatsApp</span></a>
</nav>
<div class="scrim" data-scrim hidden></div>
<aside class="drawer" id="enquiry" role="dialog" aria-modal="true" aria-labelledby="enquiry-title" hidden>
  <div class="drawer__head">
    <h2 id="enquiry-title">Enquiry list</h2>
    <button class="iconbtn" type="button" data-close-list>{ic('x', label='Close enquiry list')}</button>
  </div>
  <div class="drawer__body" data-lines></div>
  <div class="drawer__foot" data-foot>
    <label class="field"><span>Your name and company</span><input type="text" data-sender placeholder="e.g. Rahim, ABC Garments Ltd." autocomplete="organization"></label>
    <div class="row">
      <a class="btn btn--green" data-send="wa" href="#" target="_blank" rel="noopener">{ic('chat')}WhatsApp</a>
      <a class="btn btn--ink" data-send="mail" href="#">{ic('mail')}Email</a>
    </div>
    <p class="addbox__note">Your list opens as a message you can check before sending. We reply with prices and lead times.</p>
  </div>
</aside>
<div class="toast" role="status" aria-live="polite" data-toast><span class="tick">{ic('check')}</span><span data-toast-text></span><button type="button" data-open-list>View list</button></div>

<script src="{u('assets/js/catalog.js')}"></script>
<script src="{u('assets/js/vendor/motion.min.js')}"></script>
<script src="{u('assets/js/site.js')}"></script>
<script src="{u('assets/js/motion-fx.js')}"></script>
</body>
</html>
'''
    dest = ROOT / path
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(out)

# ---------------------------------------------------------------- components
def tile(p, base="{{base}}", lazy=True, h="h3"):
    iw, ih = img_size(pimg(p))
    load = ' loading="lazy" decoding="async"' if lazy else ""
    return f'''<article class="tile" data-slug="{p['slug']}" data-cat="{p['cat']}" data-search="{esc((p['name'] + ' ' + ' '.join(p['aliases'])).lower())}">
  <div class="tile__media"><img src="{base}{pimg(p)}" alt="{esc(p['name'])}" width="{iw}" height="{ih}"{load}></div>
  <button class="tile__add" type="button" data-add="{p['slug']}" aria-label="Add {esc(p['name'])} to enquiry list">{ic('plus')}</button>
  <div class="tile__body"><{h} class="tile__name"><a href="{base}product/{p['slug']}.html">{esc(p['name'])}</a></{h}><p class="tile__short">{esc(p['short'])}</p></div>
</article>'''

def sign(href, name, count, pic, mod=""):
    return f'''<a class="sign {mod}" href="{href}">
  <span class="sign__arrow">{ic('arrow')}</span>
  <span class="sign__picto">{picto(pic)}</span>
  <span class="sign__text"><span class="sign__name">{esc(name)}</span><span class="sign__count">{esc(count)}</span></span>
</a>'''

def crumbs(items, dark=False):
    lis = "".join(
        f'<li><a href="{h}">{esc(t)}</a></li>' if h else f'<li aria-current="page">{esc(t)}</li>' for h, t in items
    )
    return f'<nav class="crumbs wrap{" crumbs--dark on-dark" if dark else ""}" aria-label="Breadcrumb"><ol>{lis}</ol></nav>'

def finder(idp):
    return f'''<div class="finder" data-finder>
  <label class="finder__label" for="{idp}">Know the part you need? Type its name.</label>
  <div class="finder__box">{ic('search')}
    <input id="{idp}" type="text" role="combobox" aria-expanded="false" aria-controls="{idp}-list" aria-autocomplete="list" autocomplete="off" placeholder="e.g. gate valve, jockey pump">
  </div>
  <ul class="finder__list" id="{idp}-list" role="listbox" hidden></ul>
</div>'''

# ---------------------------------------------------------------- pages
HERO_LINEUP = [
    ("electric-fire-pump", 1, 0.60), ("gate-valve", 1, 0.80), ("non-return-valve", 1, 0.40),
    ("pillar-hydrant", 1, 1.0), ("breeching-inlet", 1, 0.46), ("hydrant-box", 1, 0.60),
    ("abc-dry-powder-extinguisher", 1, 0.55),
]
CAT_IMG = {"valves": ("pressure-relief-valve", 1), "hydrant-hose": ("pillar-hydrant", 1),
           "extinguishers": ("water-spray-extinguisher", 1), "fire-pumps": ("electric-fire-pump", 2)}
BY = {p["slug"]: p for p in PRODUCTS}

def catlinks():
    rows = ""
    for c in CATS:
        rows += f"""<a class="catlink" href="{{{{base}}}}category/{c['slug']}.html">
  <span class="catlink__plate">{picto(c['icon'])}</span>
  <span class="catlink__name">{esc(c['sign'])}</span><span class="catlink__n num">{len(c['items'])}</span>
  <span class="catlink__go">{ic('arrow')}</span></a>"""
    return rows

def build_home():
    n = len(PRODUCTS)
    lineup = ""
    for i, (slug, img, h) in enumerate(HERO_LINEUP):
        p = BY[slug]; src = f"assets/products/{slug}-{img}.webp"; iw, ih = img_size(src)
        pri = "high" if i < 3 else "auto"
        lineup += f"""<a class="lineup__item" href="{{{{base}}}}product/{slug}.html" style="--h:{h};--i:{i}">
  <span class="lineup__fig"><img src="{{{{base}}}}{src}" alt="" width="{iw}" height="{ih}" fetchpriority="{pri}"></span>
  <span class="lineup__label"><span>{esc(p['name'])}</span></span></a>"""
    cats = ""
    for i, c in enumerate(CATS):
        s, k = CAT_IMG[c["slug"]]; src = f"assets/products/{s}-{k}.webp"; iw, ih = img_size(src)
        cats += f"""<a class="catpanel reveal" style="--i:{i}" href="{{{{base}}}}category/{c['slug']}.html">
  <div class="catpanel__text">
    <div class="catpanel__head"><span class="catpanel__plate">{picto(c['icon'])}</span><h3>{esc(c['name'])}</h3></div>
    <p>{esc(c['intro'])}</p>
    <span class="catpanel__meta"><span class="num"><b class="countup" data-countup="{len(c['items'])}">{len(c['items'])}</b> products</span><span class="catpanel__go">{ic('arrow')}</span></span>
  </div>
  <div class="catpanel__media"><img src="{{{{base}}}}{src}" alt="" width="{iw}" height="{ih}" loading="lazy" decoding="async"></div>
</a>"""
    tabs = ""
    panels = ""
    for i, c in enumerate(CATS):
        sel = "true" if i == 0 else "false"
        ti = "" if i == 0 else ' tabindex="-1"'
        hid = "" if i == 0 else " hidden"
        tabs += f'<button class="tab" type="button" role="tab" id="tab-{c["slug"]}" aria-controls="panel-{c["slug"]}" aria-selected="{sel}"{ti}>{esc(c["sign"])} <span class="n num">{len(c["items"])}</span></button>'
        grid = "".join(tile(p) for p in c["items"])
        more = f'<a class="btn btn--line btn--block tabpanel__more" href="{{{{base}}}}category/{c["slug"]}.html">See all {len(c["items"])} in {esc(c["sign"])} {ic("arrow")}</a>'
        panels += f'<div class="tabpanel" role="tabpanel" id="panel-{c["slug"]}" aria-labelledby="tab-{c["slug"]}"{hid}><div class="grid">{grid}</div>{more}</div>'
    pump_rows = ""
    for p in CAT["fire-pumps"]["items"]:
        pump_rows += f'<li><a href="{{{{base}}}}product/{p["slug"]}.html"><span class="prow__img"><img src="{{{{base}}}}{pimg(p)}" alt="" width="44" height="44" loading="lazy" decoding="async"></span><span class="prow__t"><b>{esc(p["name"])}</b><small>{esc(p["short"])}</small></span>{ic("arrow")}</a></li>'
    skid = "assets/products/electric-fire-pump-1.webp"; sw, sh = img_size(skid)
    wa = wa_link("Hello DezaCo, I would like a price for:")
    who1 = "".join(f'<li><a href="{{{{base}}}}product/{s}.html">{esc(BY[s]["name"])}</a></li>' for s in ["abc-dry-powder-extinguisher", "hydrant-box", "fire-hose-reel", "pump-control-panel", "pillar-hydrant"])
    who2 = "".join(f'<li><a href="{{{{base}}}}product/{s}.html">{esc(BY[s]["name"])}</a></li>' for s in ["gate-valve", "butterfly-valve", "oblique-landing-valve", "breeching-inlet", "electric-fire-pump"])
    B = "{{base}}"
    _n = "Gate Valves|Pillar Hydrants|Breeching Inlets|Fire Pump Sets|Landing Valves|Extinguishers|Hose Reels|Butterfly Valves".split("|")
    TICK = "".join(f'<span>{n}</span><i></i>' for n in _n * 3)
    TICK2 = "".join(f'<span>{n}</span><i></i>' for n in (_n[4:] + _n[:4]) * 3)
    body = f"""
<section class="stage on-dark" aria-labelledby="hero-h">
  <div class="wrap stage__top">
    <div class="stage__copy">
      <p class="stage__kicker"><span class="stage__kbar"></span><span class="stage__ktext">Fire protection manufacturer <i></i> Office in the USA</span></p>
      <h1 id="hero-h" class="hero-h"><span class="ln"><span>Fire protection</span></span><span class="ln"><span>equipment,</span></span><span class="ln"><span>made by <em>DezaCo.</em></span></span></h1>
      <p class="stage__lede">Valves, hydrant and hose gear, extinguishers and complete fire pump sets<span class="lede-more"> for factories, high-rise buildings and industrial sites. Build your list and get a price on WhatsApp</span>.</p>
      <div class="stage__actions">
        <a class="btn btn--red btn--lg" href="{B}products.html">Explore the catalog {ic('arrow')}</a>
        <a class="btn btn--ghost btn--lg" href="{wa}" target="_blank" rel="noopener">{ic('chat')}Get a price</a>
      </div>
    </div>
    <div class="stage__side">
      {finder('find-home')}
      <nav class="catlinks" aria-label="Product categories">{catlinks()}</nav>
    </div>
  </div>
  <div class="shelf"><div class="stage__mark" aria-hidden="true"><span>DezaCo</span></div><button class="shelf__more" type="button" data-shelf-more aria-label="Show more products">{ic('arrow')}</button>
  <div class="lineup" data-lineup><div class="lineup__track">
    <div class="lineup__row">{lineup}</div>
    <div class="lineup__pipe" aria-hidden="true"><span class="lineup__fill"></span><span class="lineup__flow"></span></div>
  </div></div></div>
</section>

<div class="ticker" aria-hidden="true">
  <div class="ticker__row" data-ticker="1">{TICK}</div>
  <div class="ticker__row ticker__row--alt" data-ticker="-1">{TICK2}</div>
</div>

<section class="section" data-floor="Product families" aria-labelledby="fam-h"><div class="wrap">
  <div class="section__head"><div><h2 id="fam-h">Four product families</h2><p>Everything in a building&rsquo;s fire water system, from the pump room to the hose on every floor.</p></div>
  <a class="link-arrow" href="{B}products.html">All {n} products {ic('arrow')}</a></div>
  <div class="catpanels">{cats}</div>
</div></section>

<section class="feature on-dark" data-floor="Fire pump sets" aria-labelledby="pump-h"><div class="wrap feature__in">
  <div class="feature__copy reveal">
    <h2 id="pump-h">Complete fire pump sets</h2>
    <p>Electric main pump, diesel standby, jockey pump and controllers, supplied as individual units or assembled on one skid with its valves. Tell us the flow and pressure you need and we will size the set.</p>
    <ul class="prows">{pump_rows}</ul>
    <a class="btn btn--red" href="{B}category/fire-pumps.html">Fire pump systems {ic('arrow')}</a>
  </div>
  <div class="feature__media reveal"><img src="{B}{skid}" alt="Skid-mounted electric fire pump set with controller and valves" width="{sw}" height="{sh}" loading="lazy" decoding="async"></div>
</div></section>

<section class="section" data-floor="Browse the range" aria-labelledby="range-h"><div class="wrap">
  <div class="section__head"><div><h2 id="range-h">Browse the range</h2><p>Tap + on any product to add it to your enquiry list.</p></div>
  <a class="link-arrow" href="{B}products.html">Full catalog {ic('arrow')}</a></div>
  <div class="tabs" role="tablist" aria-label="Product families" data-tabs>{tabs}</div>
  <div data-tabpanels>{panels}</div>
</div></section>

<section class="section section--panel" data-floor="Get a price" aria-labelledby="how-h"><div class="wrap">
  <div class="section__head"><div><h2 id="how-h">Get a price in three steps</h2><p>No account and no checkout. Your list reaches our sales team as a normal WhatsApp message or email.</p></div></div>
  <div class="steps">
    <div class="step reveal" style="--i:0"><span class="step__n">1</span><h3>Find the part</h3><p>Search by the name you already use, or browse by product family.</p><div class="step__demo">Search &ldquo;check valve&rdquo; &rarr; Non-Return Valve</div></div>
    <div class="step reveal" style="--i:1"><span class="step__n">2</span><h3>Add size and quantity</h3><p>Put every item on one list, with size, rating or any notes.</p><div class="step__demo">Gate Valve &middot; Qty 4 &middot; DN100 flanged</div></div>
    <div class="step reveal" style="--i:2"><span class="step__n">3</span><h3>Send the list</h3><p>Send it on WhatsApp or by email. We reply with prices and lead times.</p><div class="step__demo"><button class="btn btn--green btn--sm" type="button" data-open-list>{ic('list')}Open my list</button></div></div>
  </div>
</div></section>

<section class="section" data-floor="Who we supply" aria-labelledby="who-h"><div class="wrap">
  <div class="section__head"><div><h2 id="who-h">Who we supply</h2></div></div>
  <div class="split">
    <div class="who">
      <h3>Factories and compliance teams</h3>
      <p>Replacing expired extinguishers, adding hydrant points or fixing pump room findings before an inspection. Tell us what the finding says and we will quote the parts.</p>
      <ul>{who1}</ul>
    </div>
    <div class="who">
      <h3>Contractors and MEP engineers</h3>
      <p>Sourcing valves, hydrant fittings and complete pump sets for a project schedule. Send your quantities and sizes as one enquiry.</p>
      <ul>{who2}</ul>
    </div>
  </div>
</div></section>
{cta_band()}
"""
    page("index.html", SITE["name"], "DezaCo makes fire protection equipment: valves, hydrant and hose equipment, fire extinguishers and fire pump systems. Send an enquiry list on WhatsApp or email.", body, active="index.html")

def cta_band():
    return f'''<section class="cta on-dark" data-floor="Contact" aria-labelledby="cta-h"><div class="wrap">
  <div><h2 id="cta-h">Need a price or a part you don&rsquo;t see?</h2><p>Call, message or email our sales team. If it is part of a fire water system, ask us.</p></div>
  <div class="cta__lines">
    <a class="cta__line" href="{wa_link('Hello DezaCo, I would like a price for:')}" target="_blank" rel="noopener"><span class="plate-xs g">{ic('chat')}</span><span><small>WhatsApp</small><b class="num">{esc(SITE['phone'])}</b></span></a>
    <a class="cta__line" href="tel:{esc(re.sub(r'[^0-9+X]', '', SITE['phone']))}"><span class="plate-xs">{ic('phone')}</span><span><small>Call</small><b class="num">{esc(SITE['phone'])}</b></span></a>
    <a class="cta__line" href="mailto:{esc(SITE['email'])}"><span class="plate-xs">{ic('mail')}</span><span><small>Email</small><b>{esc(SITE['email'])}</b></span></a>
  </div>
</div></section>'''

def chips(active=None, as_buttons=False):
    out = []
    if as_buttons:
        out.append(f'<button class="chip" type="button" data-filter="all" aria-pressed="true">All <span class="n">{len(PRODUCTS)}</span></button>')
        for c in CATS:
            out.append(f'<button class="chip" type="button" data-filter="{c["slug"]}" aria-pressed="false">{esc(c["sign"])} <span class="n">{len(c["items"])}</span></button>')
    else:
        out.append(f'<a class="chip" href="{{{{base}}}}products.html">All <span class="n">{len(PRODUCTS)}</span></a>')
        for c in CATS:
            cur = ' aria-current="page"' if c["slug"] == active else ""
            out.append(f'<a class="chip" href="{{{{base}}}}category/{c["slug"]}.html"{cur}>{esc(c["sign"])} <span class="n">{len(c["items"])}</span></a>')
    return f'<div class="chips" role="group" aria-label="Categories">{"".join(out)}</div>'

def build_products():
    groups = ""
    for c in CATS:
        groups += f'''<section class="catgroup" data-group="{c['slug']}" aria-labelledby="g-{c['slug']}">
  <div class="catgroup__head"><span class="plate-sm">{picto(c['icon'])}</span><h2 id="g-{c['slug']}">{esc(c['name'])}</h2><a class="link-arrow" href="{{{{base}}}}category/{c['slug']}.html">All {len(c['items'])} {ic('arrow')}</a></div>
  <div class="grid">{''.join(tile(p) for p in c['items'])}</div>
</section>'''
    body = f'''{crumbs([("{{base}}index.html", "Home"), (None, "Products")], dark=True)}
<header class="pagehead on-dark"><div class="wrap">
  <span class="plate-lg" style="background:#2a2e33">{picto('grid')}</span>
  <div class="pagehead__text"><h1>All products</h1><p>{len(PRODUCTS)} items in four families. Filter by family or type a name, and tap + to add an item to your enquiry list.</p></div>
  <div class="pagehead__img pagehead__img--opt"><img src="{{{{base}}}}assets/products/water-spray-extinguisher-1.webp" alt="" width="1000" height="714"></div>
</div></header>
<div class="wrap">
  <div class="toolbar">{chips(as_buttons=True)}
    <label class="filter">{ic('search')}<span class="visually-hidden">Filter products</span><input type="search" data-filter-input placeholder="Filter by name"></label>
  </div>
  <div data-groups>{groups}</div>
  <p class="noresults" data-noresults hidden>No products match that name. Try a shorter word, or <a href="{wa_link('Hello DezaCo, do you make:')}" target="_blank" rel="noopener">ask us on WhatsApp</a>.</p>
</div>
<div style="height:48px"></div>
{cta_band()}
'''
    page("products.html", "All products", f"The full DezaCo catalog: {len(PRODUCTS)} fire protection products including valves, hydrants, fire hose, extinguishers and fire pumps.", body, active="products.html")

def build_category(c):
    body = f'''{crumbs([("{{base}}index.html", "Home"), ("{{base}}products.html", "Products"), (None, c["name"])], dark=True)}
<header class="pagehead on-dark"><div class="wrap">
  <span class="plate-lg">{picto(c['icon'])}</span>
  <div class="pagehead__text"><h1>{esc(c['name'])}</h1><p>{esc(c['intro'])}</p>
    <a class="btn btn--green" href="{wa_link('Hello DezaCo, I would like a price for ' + c['name'].lower() + ':')}" target="_blank" rel="noopener">{ic('chat')}Ask about {esc(c['sign'].lower())}</a></div>
  <div class="pagehead__img"><img src="{{{{base}}}}assets/products/{CAT_IMG[c['slug']][0]}-{CAT_IMG[c['slug']][1]}.webp" alt=""></div>
</div></header>
<div class="wrap">
  <div class="toolbar">{chips(active=c['slug'])}</div>
  <div class="grid" style="padding-bottom:clamp(56px,7vw,96px)">{''.join(tile(p, lazy=i > 3, h='h2') for i, p in enumerate(c['items']))}</div>
</div>
{cta_band()}
'''
    page(f"category/{c['slug']}.html", c["name"], f"{c['name']} from DezaCo: {', '.join(p['name'] for p in c['items'])}.", body, active="products.html")

def build_product(p):
    c = CAT[p["cat"]]
    imgs = [pimg(p, i) for i in p["images"]]
    w, h = img_size(imgs[0])
    thumbs = ""
    if len(imgs) > 1:
        thumbs = '<div class="gallery__thumbs" role="group" aria-label="Product photos">' + "".join(
            f'<button type="button" data-thumb="{{{{base}}}}{src}"{" aria-current=true" if i == 0 else ""} aria-label="Photo {i+1} of {len(imgs)}"><img src="{{{{base}}}}{src}" alt="" loading="lazy"></button>'
            for i, src in enumerate(imgs)
        ) + "</div>"
    related = [q for q in c["items"] if q["slug"] != p["slug"]][:4]
    uses = "".join(f"<li>{ic('check')}<span>{esc(u)}</span></li>" for u in p["uses"])
    asks = "".join(f"<li>{ic('arrow')}<span>{esc(a)}</span></li>" for a in c["ask"])
    body = f'''{crumbs([("{{base}}index.html", "Home"), ("{{base}}products.html", "Products"), ("{{base}}category/" + c["slug"] + ".html", c["name"]), (None, p["name"])])}
<section class="pdp"><div class="wrap">
  <div class="gallery" data-gallery>
    <div class="gallery__main"><img data-main src="{{{{base}}}}{imgs[0]}" alt="{esc(p['name'])}" width="{w}" height="{h}"></div>
    {thumbs}
  </div>
  <div class="pdp__info">
    <h1>{esc(p['name'])}</h1>
    <p class="pdp__desc">{esc(p['desc'])}</p>
    <form class="addbox" data-addbox="{p['slug']}">
      <div class="addbox__row">
        <div class="field"><span id="q-l">Quantity</span>
          <div class="qty"><button type="button" data-step="-1" aria-label="Decrease quantity">{ic('minus')}</button><input type="number" inputmode="numeric" min="1" max="9999" value="1" aria-labelledby="q-l" data-qty><button type="button" data-step="1" aria-label="Increase quantity">{ic('plus')}</button></div>
        </div>
        <label class="field"><span>Size, rating or notes</span><input type="text" data-note placeholder="e.g. DN100, PN16, flanged"></label>
      </div>
      <div class="addbox__actions">
        <button class="btn btn--red" type="submit" data-add-submit>{ic('plus')}<span>Add to enquiry list</span></button>
        <a class="btn btn--green" data-wa-product href="{wa_link('Hello DezaCo, I would like a price for: ' + p['name'])}" target="_blank" rel="noopener">{ic('chat')}Ask on WhatsApp</a>
      </div>
      <p class="addbox__note">Prices depend on size and quantity. Add everything you need to one list and send it together.</p>
    </form>
    <div class="facts">
      <div><h2>Typical uses</h2><ul>{uses}</ul></div>
      <div><h2>Tell us when you enquire</h2><ul>{asks}</ul></div>
    </div>
  </div>
</div></section>
<section class="section section--panel" aria-labelledby="rel-h"><div class="wrap">
  <div class="section__head"><h2 id="rel-h">More {esc(c['sign'].lower())}</h2><a class="link-arrow" href="{{{{base}}}}category/{c['slug']}.html">All {len(c['items'])} {ic('arrow')}</a></div>
  <div class="grid">{''.join(tile(q) for q in related)}</div>
</div></section>
{cta_band()}
'''
    page(f"product/{p['slug']}.html", p["name"], f"{p['name']} from DezaCo. {p['short']} Send an enquiry for price and availability.", body, active="products.html")

def build_about():
    body = f'''{crumbs([("{{base}}index.html", "Home"), (None, "About")], dark=True)}
<header class="pagehead on-dark"><div class="wrap">
  <span class="plate-lg plate-logo" aria-hidden="true"><svg viewBox="0 0 2105 2126" focusable="false"><use href="#logo-d"/></svg></span>
  <div class="pagehead__text"><h1>About DezaCo</h1><p>We make fire protection equipment for factories, high-rise buildings and industrial sites.</p></div><div></div>
</div></header>
<section class="section"><div class="wrap two">
  <div class="prose">
    <p>DezaCo manufactures the equipment that sits inside a building's fire water system: the valves in the pump room, the pumps and controllers that pressurise the main, the hydrants and hose valves on every floor, and the extinguishers on the wall.</p>
    <p>Our customers are factory owners and compliance teams keeping their sites safe and inspection-ready, and the contractors and engineers who design and install fire systems.</p>
    <h2>What we make</h2>
    <ul>{''.join(f'<li><a href="{{{{base}}}}category/{c["slug"]}.html">{esc(c["name"])}</a>: {esc(", ".join(p["name"] for p in c["items"][:4]))} and more.</li>' for c in CATS)}</ul>
    <h2>Company details</h2>
    <p><span class="tbc">Year founded, factory location and production capacity: to be confirmed by DezaCo.</span></p>
    <p><span class="tbc">Standards, test certificates and approvals: to be added once confirmed.</span></p>
  </div>
  <aside class="card-ink on-dark">
    <h2>Talk to sales</h2>
    <p>Send us your list of parts with sizes and quantities, or the findings you need to close. We will come back with prices.</p>
    <a class="btn btn--green" href="{wa_link('Hello DezaCo,')}" target="_blank" rel="noopener">{ic('chat')}WhatsApp</a>
    <a class="btn btn--line" style="--fg:#fff;--bd:#4a5057" href="{{{{base}}}}contact.html">Contact details</a>
  </aside>
</div></section>
'''
    page("about.html", "About", "About DezaCo, a manufacturer of fire protection equipment.", body, active="about.html")

def build_contact():
    body = f'''{crumbs([("{{base}}index.html", "Home"), (None, "Contact")], dark=True)}
<header class="pagehead on-dark"><div class="wrap">
  <span class="plate-lg sign--green" style="background:var(--green)">{picto('chat')}</span>
  <div class="pagehead__text"><h1>Contact</h1><p>Ask for a price, check availability or tell us about a project.</p></div><div></div>
</div></header>
<section class="section"><div class="wrap two">
  <form class="form" data-contact novalidate>
    <div class="row2">
      <label class="field"><span>Name</span><input name="name" type="text" autocomplete="name" required><small class="err" hidden>Please enter your name.</small></label>
      <label class="field"><span>Company</span><input name="company" type="text" autocomplete="organization"></label>
    </div>
    <label class="field"><span>Phone</span><input name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="+1 (XXX) XXX-XXXX"></label>
    <label class="field"><span>What do you need?</span><textarea name="message" required placeholder="Products, sizes, quantities, or the project you are working on"></textarea><small class="err" hidden>Tell us what you need so we can reply with a price.</small></label>
    <div class="form__actions">
      <button class="btn btn--green" type="submit" data-via="wa">{ic('chat')}Send on WhatsApp</button>
      <button class="btn btn--ink" type="submit" data-via="mail">{ic('mail')}Send by email</button>
    </div>
    <p class="addbox__note">Your message opens in WhatsApp or your email app, ready to send. Items in your enquiry list are added automatically.</p>
  </form>
  <aside class="card-ink on-dark">
    <h2>Sales office</h2>
    <div class="cta__lines">
      <a class="cta__line" href="{wa_link('Hello DezaCo,')}" target="_blank" rel="noopener"><span class="plate-xs g">{ic('chat')}</span><span><small>WhatsApp</small><b class="num">{esc(SITE['phone'])}</b></span></a>
      <a class="cta__line" href="tel:{esc(re.sub(r'[^0-9+X]', '', SITE['phone']))}"><span class="plate-xs">{ic('phone')}</span><span><small>Call</small><b class="num">{esc(SITE['phone'])}</b></span></a>
      <a class="cta__line" href="mailto:{esc(SITE['email'])}"><span class="plate-xs">{ic('mail')}</span><span><small>Email</small><b>{esc(SITE['email'])}</b></span></a>
      <div class="cta__line" style="cursor:default"><span class="plate-xs">{ic('pin')}</span><span><small>Office</small><b class="tbc">{esc(SITE['address'])}</b></span></div>
      <div class="cta__line" style="cursor:default"><span class="plate-xs">{ic('clock')}</span><span><small>Hours</small><b class="tbc">{esc(SITE['hours'])}</b></span></div>
    </div>
  </aside>
</div></section>
'''
    page("contact.html", "Contact", "Contact DezaCo sales for prices on fire protection equipment. WhatsApp, phone or email.", body, active="contact.html")

def build_js():
    data = {
        "site": SITE,
        "cats": [{"slug": c["slug"], "name": c["name"], "sign": c["sign"]} for c in CATS],
        "products": [
            {"slug": p["slug"], "name": p["name"], "cat": p["cat"], "short": p["short"],
             "aliases": p["aliases"], "img": pimg(p)} for p in PRODUCTS
        ],
    }
    (ROOT / "assets/js/catalog.js").write_text("/* generated by build.py from data/catalog.json */\nwindow.DEZACO = " + json.dumps(data, ensure_ascii=False) + ";\n")

if __name__ == "__main__":
    (ROOT / "assets/js").mkdir(parents=True, exist_ok=True)
    build_js()
    build_home(); build_products(); build_about(); build_contact()
    for c in CATS: build_category(c)
    for p in PRODUCTS: build_product(p)
    print("built", 4 + len(CATS) + len(PRODUCTS), "pages")
