# DezaCo website

Static catalog site for DezaCo fire protection equipment. Plain HTML, CSS and JavaScript: upload the folder to any web host (cPanel, Netlify, Vercel, GitHub Pages). No server code.

## Pages
- `index.html` home: part finder, category signs, the range, how to get a price
- `products.html` full catalog with category filter and name search
- `category/*.html` one page per category (4)
- `product/*.html` one page per product (29)
- `about.html`, `contact.html`

## Enquiry list
Visitors tap + on any product (or "Add to enquiry list" on a product page), set quantity and size/notes, then send the whole list as a WhatsApp message or an email. The list is kept in the visitor's browser (localStorage). No prices are shown.

## Editing content
All text, products and contact details live in `data/catalog.json`. After editing, run:

    python3 build.py

(needs Python 3 and Pillow: `pip install pillow`). This regenerates every page and `assets/js/catalog.js`. You can also edit the HTML directly, but a rebuild will overwrite it.

Product photos: `assets/products/<product-slug>-<n>.webp`. The `images` list on each product picks which numbered photos appear (first = main photo).

## Before launch (placeholders)
Set in `data/catalog.json`, then rebuild:
- `phone`, `whatsapp` (international format without +, e.g. 12025550123), `email`, `address` (US office), `hours`
- Company facts on the About page (marked with a yellow highlight)
- Logo: the red "S" plate is a placeholder mark (`assets/img/favicon.svg` and the header)

Photos: all product photos are stand-ins from the client's WhatsApp images and brochure. These still show another manufacturer's marks and should be replaced with DezaCo's own photos first:
- `pillar-hydrant-1.webp` (EMACO cast on the head)
- `lay-flat-fire-hose-1.webp` (EMACO and FM printed on hose)
- `hose-rack-nipple-1.webp` (EMACO engraved)
- `hose-rack-1.webp` (Powhatan label)
- `hydrant-box-1.webp` (EMACO on hose bar)
- `flexible-joint-1.webp` (faint maker marks)
Low resolution (cropped from the brochure PDF): `foot-valve-1`, `fire-hose-reel-1`, `jockey-pump-1`, `wet-chemical-extinguisher-1`, `foam-extinguisher-1`, `water-spray-extinguisher-1`.

## Design
Fire-safety sign system on dark "night" chrome: red plates with white pictograms mark equipment categories, green marks send/added states. Motion (all in the "v3" blocks of `assets/css/site.css` and `assets/js/site.js`, switched off for visitors who ask for reduced motion):
- Load: an empty pipe draws across the hero, pressure fills it red from left to right, and each product rises out of the pipe as the pressure reaches it.
- Scroll: the hero drifts apart at different speeds; two rows of product names slide in opposite directions; a vertical "riser" pipe on the left edge (desktop) fills as you scroll and its valves turn as each section is reached; headings rise from behind a mask; category panels wipe open; the pump photo uncovers; the three-step pipe fills station by station; product tiles cascade in.
- Page changes cross-fade in browsers that support view transitions.

Phones (the "v4" blocks): a bottom bar holds Products, Enquiry list (with count) and WhatsApp; on a product page its first slot becomes "Add to list". The menu shows the four product families as red signs. The header hides when scrolling down and returns when scrolling up. Family panels, tabs and category chips are compacted so pages are shorter, and every control is at least 44px tall. Fonts: Barlow Condensed and Barlow, self-hosted in `assets/fonts` (SIL Open Font License). See `DESIGN.md` for tokens and components.
