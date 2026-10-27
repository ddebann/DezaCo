---
name: DezaCo
description: Fire protection equipment catalog lit like a pump room at night, speaking in fire-equipment sign plates and moving like a fire main being charged.
colors:
  night: "#111315"
  night-2: "#1a1d20"
  night-top: "#0b0c0d"
  night-line: "#2a2e33"
  night-control: "#3a3f45"
  night-mute: "#9aa0a6"
  night-text: "#c4c9ce"
  ink: "#1b1e21"
  ink-2: "#4a5057"
  ink-3: "#5f656c"
  line: "#dcdfe2"
  line-2: "#c9cdd1"
  paper: "#ffffff"
  panel: "#f3f4f5"
  plate: "#eceef0"
  safety-red: "#c8161d"
  safety-red-deep: "#9f1016"
  red-lit: "#f0333a"
  pipe-high: "#e0262d"
  pipe-low: "#8f0f14"
  safe-green: "#00794a"
  safe-green-deep: "#005c38"
  green-tint: "#e3f2eb"
  pressure-yellow: "#ffc20e"
typography:
  display:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.8rem, 6vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 0.9
    letterSpacing: "0"
  display-page:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.6rem, 5vw, 4.4rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "0.005em"
  display-product:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.4rem, 4.4vw, 3.8rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "0.005em"
  ticker:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.6rem, 7vw, 6.4rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2rem, 3.4vw, 2.9rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.005em"
  title:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "0.005em"
  sign-row:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.04em"
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.55
    fontFeature: "\"kern\", \"liga\""
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.05em"
  caption:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0.07em"
  dock-label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "0.84rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.07em"
  brand:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "0.02em"
rounded:
  hair: "2px"
  plate: "3px"
  pill-sm: "10px"
  pill: "13px"
  round: "50%"
spacing:
  xs: "6px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  touch: "44px"
  dock: "60px"
  gutter: "clamp(16px, 4vw, 40px)"
  section: "clamp(56px, 8vw, 112px)"
  feature: "clamp(64px, 9vw, 128px)"
components:
  button-red:
    backgroundColor: "{colors.safety-red}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "0 1.2em"
    height: "48px"
  button-red-hover:
    backgroundColor: "{colors.safety-red-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "0 1.2em"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "rgba(255, 255, 255, 0.06)"
  button-lg:
    padding: "0 1.5em"
    height: "56px"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "0 1.2em"
    height: "48px"
  button-ink-hover:
    backgroundColor: "#000000"
  button-green:
    backgroundColor: "{colors.safe-green}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "0 1.2em"
    height: "48px"
  button-green-hover:
    backgroundColor: "{colors.safe-green-deep}"
  button-inlist:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.safe-green-deep}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "0 1.2em"
    height: "48px"
  button-inlist-hover:
    backgroundColor: "{colors.green-tint}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "0 1.2em"
    height: "48px"
  button-sm:
    padding: "0 0.9em"
    height: "40px"
  button-sm-touch:
    height: "{spacing.touch}"
  list-button-night:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    height: "40px"
  list-button-night-hover:
    backgroundColor: "#e9ebed"
  list-count:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    height: "26px"
  list-count-bumped:
    backgroundColor: "{colors.safe-green}"
    textColor: "{colors.paper}"
  sign-row-plate:
    backgroundColor: "{colors.safety-red}"
    rounded: "{rounded.plate}"
    size: "44px"
  sign-row-go:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.hair}"
    size: "32px"
  sign-row-go-hover:
    backgroundColor: "{colors.safety-red}"
  menu-sign:
    backgroundColor: "{colors.safety-red}"
    textColor: "{colors.paper}"
    rounded: "{rounded.plate}"
    padding: "10px"
    height: "104px"
  menu-sign-hover:
    backgroundColor: "{colors.safety-red-deep}"
  menu-link:
    backgroundColor: "transparent"
    textColor: "{colors.night-mute}"
    typography: "{typography.label}"
    height: "52px"
  menu-link-current:
    textColor: "{colors.red-lit}"
  dock:
    backgroundColor: "{colors.night}"
    textColor: "{colors.night-text}"
    height: "{spacing.dock}"
  dock-item:
    backgroundColor: "transparent"
    textColor: "{colors.night-text}"
    typography: "{typography.dock-label}"
    padding: "8px 4px"
    height: "{spacing.dock}"
  dock-item-pressed:
    backgroundColor: "{colors.night-2}"
  dock-item-current:
    backgroundColor: "{colors.night-2}"
    textColor: "{colors.paper}"
  dock-add:
    backgroundColor: "{colors.safety-red}"
    textColor: "{colors.paper}"
    typography: "{typography.dock-label}"
    height: "{spacing.dock}"
  dock-add-in:
    backgroundColor: "{colors.safe-green}"
    textColor: "{colors.paper}"
  dock-count:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill-sm}"
    height: "20px"
  dock-count-bumped:
    backgroundColor: "{colors.safe-green}"
    textColor: "{colors.paper}"
  dock-wa-plate:
    backgroundColor: "{colors.safe-green}"
    textColor: "{colors.paper}"
    rounded: "{rounded.hair}"
    size: "26px"
  shelf-arrow:
    backgroundColor: "{colors.safety-red}"
    textColor: "{colors.paper}"
    rounded: "{rounded.hair}"
    size: "{spacing.touch}"
  pipe-empty:
    backgroundColor: "{colors.night-line}"
    height: "12px"
  ticker:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.ticker}"
    padding: "clamp(28px, 4vw, 52px) 0"
  ticker-mark:
    backgroundColor: "{colors.safety-red}"
    rounded: "{rounded.hair}"
    size: "clamp(14px, 1.4vw, 22px)"
  ticker-mark-alt:
    backgroundColor: "{colors.pressure-yellow}"
  riser-node:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.night-mute}"
    rounded: "{rounded.round}"
    size: "24px"
  riser-node-on:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.safety-red}"
  riser-node-here:
    backgroundColor: "{colors.safety-red}"
    textColor: "{colors.paper}"
  riser-label:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.caption}"
    rounded: "{rounded.hair}"
    padding: "6px 10px"
  category-panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "clamp(24px, 3vw, 36px)"
    height: "360px"
  category-panel-hover:
    backgroundColor: "#eaecee"
  category-panel-plate:
    backgroundColor: "{colors.safety-red}"
    rounded: "{rounded.plate}"
    size: "56px"
  category-row:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "14px 14px 14px 8px"
    height: "112px"
  category-row-plate:
    backgroundColor: "{colors.safety-red}"
    rounded: "{rounded.plate}"
    size: "34px"
  plate-lg:
    backgroundColor: "{colors.safety-red}"
    rounded: "{rounded.plate}"
    size: "112px"
  plate-sm:
    backgroundColor: "{colors.safety-red}"
    rounded: "{rounded.plate}"
    size: "64px"
  plate-xs:
    backgroundColor: "{colors.safety-red}"
    rounded: "{rounded.hair}"
    size: "40px"
  feature-row-thumb:
    backgroundColor: "{colors.night-2}"
    rounded: "{rounded.plate}"
    size: "56px"
  tile-media:
    backgroundColor: "{colors.plate}"
    rounded: "{rounded.plate}"
  tile-media-hover:
    backgroundColor: "#e4e7ea"
  tile-add:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    size: "40px"
  tile-add-touch:
    size: "{spacing.touch}"
  tile-add-in:
    backgroundColor: "{colors.safe-green}"
    textColor: "{colors.paper}"
  tab:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.hair}"
    padding: "0 18px"
    height: "48px"
  tab-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  tab-touch:
    height: "{spacing.touch}"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-2}"
    typography: "{typography.label}"
    rounded: "{rounded.hair}"
    padding: "0 14px"
    height: "40px"
  chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  chip-touch:
    height: "{spacing.touch}"
  step-number:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.plate}"
    size: "44px"
  step-number-send:
    backgroundColor: "{colors.safe-green}"
  finder:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "0 6px 0 16px"
    height: "60px"
  input-field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "11px 12px"
    height: "46px"
  input-field-touch:
    height: "48px"
  contact-line:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.plate}"
    padding: "16px 18px"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.plate}"
    padding: "10px 10px 10px 16px"
---

# Design System: DezaCo

## Overview

**Creative North Star: "The Pump Room After Dark"**

DezaCo's world is the fire-equipment sign system seen in a plant room at night: near-black steel surroundings, the red of the equipment itself as the only strong light, and the familiar sign grammar (square red plates, solid white pictograms, condensed capitals, square arrow plates for "go") carrying navigation. The chrome (top bar, header, hero stage, the pump-set feature, inner page heads, footer, and on phones the dock and menu) is night; the catalog itself sits on white so products and specs read like a clean data sheet.

The home stage is a real showroom rather than a banner: DezaCo's own products stand in a line on a fire-main pipe, captioned like tagged stock. Motion tells one story, charging the fire main. An empty grey pipe draws across the stage, pressure fills it red behind a yellow front, each product rises out of the pipe as the front reaches it, and a water pulse keeps travelling once the main is live. Scrolling continues the story: the products sink back into the pipe as the stage leaves, a riser fills down the page edge and opens a valve at each section, product names slide past in two opposing rows, and each section arrives in the way that suits it. Colour stays semantic: red marks equipment, the fire main and the one primary action; green marks the safe condition (added, send the list); yellow marks pressure arriving; ink and night carry everything else.

Density is catalog-grade. Photos sit on a cool grey plate on white, or float with a deep shadow on night. On phones the system turns thumb-first: the buyer's three actions move to a bottom dock, the menu becomes the sign wall, the line-up becomes a swipe shelf, wrapped selectors become single rows, and every control is at least 44px. The world refuses firefighter and flame photography and certification strips; its proof is the product range itself.

**Key Characteristics:**
- Night chrome (header, hero stage, feature, inner page heads, footer, phone dock and menu) around a white catalog field
- Red lit from within: radial red glows on night grounds, a brighter red for emphasis type on dark
- Products standing on a fire-main pipe that draws empty, charges red behind a yellow front, then carries a travelling water pulse
- Square red sign plates with solid white pictograms and square arrow plates for "go"
- Barlow Condensed uppercase for everything that names or commands; Barlow for reading
- Pressure as the motion story: pipes fill from their source and content appears when the fill reaches it; every reveal fires once
- Thumb-first phones: a three-slot bottom dock, a sign-wall menu, swipe rows and a 44px target floor
- Everything rendered whole and still under reduced motion

## Colors

A night-and-white field with the equipment's red as its light source, green reserved for the safe state and yellow for pressure arriving.

### Primary
- **Safety Red** (safety-red): sign plates of every size (category rows, category panels, page-head plates, contact plates, menu signs, the brand "S"), the primary action of a surface ("Explore the catalog", "Add to enquiry list", the dock's Add slot, the shelf's arrow plate), the header's current-page bar, the active riser valve, the first ticker row's marks, the finder focus ring, field errors, and the red light pooled on night grounds.
- **Deep Safety Red** (safety-red-deep): hover on red buttons and menu signs.
- **Lit Red** (red-lit): red on night where it must read as type or a hairline: the emphasised word in the hero heading, the current link in the phone menu, a line-up caption's tick on hover. Never a fill.
- **Pipe Highlight / Pipe Shadow** (pipe-high, pipe-low): the top and bottom stops of the fire-main's cylindrical shading, around safety red at 45%. Used only on the pressure fill of the line-up pipe and the fire-main steps line.

### Secondary
- **Safe-Condition Green** (safe-green): WhatsApp, "send list" and "ask about" actions, the added state of tile add controls and the dock's Add slot, the bumped enquiry count, the toast tick, the final step's number plate, the WhatsApp contact plate and the dock's WhatsApp plate; also the border of the in-list button.
- **Deep Safe Green** (safe-green-deep): hover on green actions; the text of the in-list button.
- **Green Tint** (green-tint): hover ground of the in-list button, the only tinted control state.

### Tertiary
- **Pressure Yellow** (pressure-yellow): the leading edge of pressure. A soft glow at 90% alpha on the front of the hero pipe's fill, the underline that draws under the emphasised word in the hero heading, the source end of the riser's fill, the far end of the scroll-progress line and the dock's top edge, and the marks of the second ticker row.

### Neutral
- **Night** (night): the ground of the header (at 94% with blur on desktop, opaque on phones), hero stage, feature, dark page heads, footer, phone dock and phone menu.
- **Night Raised** (night-2): thumbnail plates on night (feature product rows); the pressed and current states of a dock slot.
- **Night Top** (night-top): the top bar strip above the header, one step darker.
- **Night Rule** (night-line): dividers on night: header edge, sign-row and feature-row separators, menu rules, dock top edge and slot dividers, footer base rule. Also the empty, uncharged pipe and the neutral page-head plate on the all-products page.
- **Night Control** (night-control): 1px borders of controls on night: contact lines, header icon buttons.
- **Night Mute** (night-mute): secondary text on night: nav links at rest, counts, line-up captions, finder label, crumbs; the ring and icon of a riser valve at rest.
- **Night Text** (night-text): ledes and body copy on night; dock labels.
- **Charcoal Ink** (ink): text on white, ink buttons, selected tabs and chips, step plates, the contact band ground, dark cards, riser labels, 2px framing borders, ticker lettering and its outline row, focus outlines on light.
- **Slate** (ink-2): secondary text on white; also the ghost-button and arrow-plate border on night.
- **Steel** (ink-3): tertiary text and input icons.
- **Rule Grey** (line) and **Control Grey** (line-2): section dividers; 1px control borders on white.
- **Paper** (paper), **Panel Grey** (panel), **Photo Plate** (plate): white ground, alternating bands and category panels, and the cool grey behind every product photo on white.

### Named Rules
**The Sign Semantics Rule.** Red means equipment, the fire main and the one primary action on a surface (explore the catalog, add to the list); green means safe / added / send; yellow means pressure arriving; ink and night mean everything else. Never swap them.
**The Red Light Rule.** Gradients exist only as light on night and as the fire main itself: a radial glow of safety red at no more than 22% alpha pooled behind the stage, feature and page heads, the night ground's own top-to-bottom fade (#16191b to night), the pipe's cylindrical shading, and the red-and-yellow pressure gradient on the riser, the progress line and the dock's top edge. White surfaces never carry a gradient or a wash.
**The Lit Red Rule.** On night, red type and hairlines use lit red; red fills stay safety red.
**The Pressure Yellow Rule.** Yellow appears only where pressure is arriving: the front of a filling pipe, the end of a pressure gradient, the hero underline, the second ticker row's marks. It is never a control fill, a text colour or a background.

## Typography

**Display Font:** Barlow Condensed (with Arial Narrow, sans-serif), self-hosted 500-800
**Body Font:** Barlow (with system-ui, sans-serif), self-hosted 400-700

**Character:** Condensed uppercase sign lettering over a humanist sibling for reading; one skeleton, two jobs.

### Hierarchy
- **Display** (700, clamp(2.8rem, 6vw, 5.5rem), 0.9, 0 tracking): the home hero heading only, one line per mask so lines can unmask.
- **Display Page** (700, clamp(2.6rem, 5vw, 4.4rem), 0.94): dark inner page heads (category, products, about, contact); 2.3rem on phones.
- **Display Product** (700, clamp(2.4rem, 4.4vw, 3.8rem), 0.94): product page H1 on white; 2.3rem on phones.
- **Ticker** (800, clamp(2.6rem, 7vw, 6.4rem), 1, 0.01em): the two scroll-linked rows of product names; the first row solid ink, the second outlined in ink (1.5px stroke, transparent fill).
- **Headline** (700, clamp(2rem, 3.4vw, 2.9rem), 1): section headings; the dark feature steps up to clamp(2.2rem, 4vw, 3.4rem); category group heads step down to clamp(1.6rem, 2.6vw, 2.2rem).
- **Title** (700, 1.45rem, 1.05): card and step headings; category panel titles at clamp(1.5rem, 2.1vw, 2rem), 1.28rem in the phone rows; tile names at 1.3rem, 0.02em (1.12rem on phones).
- **Sign Row** (700, 1.35rem, 1, 0.04em): category names in the stage sign rows; feature row names at 1.15rem, 0.03em; menu sign names at 1.02rem, 0.02em (0.92rem at 400px and below).
- **Body** (400, 17px, 1.55): reading text. Ledes at clamp(1.05rem, 1.4vw, 1.2rem), 46ch on white and 50ch on the stage; section intros 52ch; prose 68ch. Text inputs never drop below 16px on phones.
- **Label** (600, 0.9-1.15rem, 0.04-0.06em, uppercase): nav, buttons, tabs, chips, field labels, link-arrows, panel meta, footer heads; phone menu links at 1.3rem.
- **Caption** (600, 0.88rem, 1.1, 0.07em, uppercase): the product captions under the fire-main (0.8rem on the phone shelf) and the riser's valve labels (0.06em).
- **Dock Label** (600, 0.84rem, 1, 0.07em, uppercase): the labels under the dock's icons.
- **Brand** (800, 1.75rem, 0.9, 0.02em, uppercase): wordmark beside the red "S" plate; sub-line 600 0.72rem, 0.12em, dropped on phones.

### Named Rules
**The Sign Lettering Rule.** Anything that names, labels or commands is Barlow Condensed uppercase; anything that explains is Barlow sentence case. Never set a paragraph in the condensed face.
**The Tabular Count Rule.** Counts and quantities use tabular lining numerals.

## Layout

Content sits in a 1320px wrap with a fluid gutter (clamp(16px, 4vw, 40px)). White sections breathe at clamp(56px, 8vw, 112px) and alternate white and panel grey; the dark feature runs deeper at clamp(64px, 9vw, 128px). Spacing clusters on 6 / 12 / 16 / 24 / 32px. The page never scrolls sideways: the main column and the stage clip horizontal overflow.

The home stage is a 7/12 : 5/12 split aligned to the bottom: heading, lede and actions left; finder and four sign rows right. Below it, the full-bleed line-up: products on a shared baseline, heights proportional to real size, spaced clamp(18px, 3vw, 44px), centred on wide screens. Directly under the stage a white ticker band carries two rows of product names. From 1200px, on pages with four or more named sections, a riser sits fixed 16px from the left edge, centred vertically, min(58vh, 520px) tall; where there is no riser a 3px progress line runs along the top of the viewport instead.

Category panels run two up (one up below 1080px), each split text : photo, 360px tall. The feature is 5/12 copy with product rows : 7/12 hero photo (photo first below 960px). Product grids run 4 / 3 / 2 columns (32px / 20px gaps, 24px / 12px on phones). Product pages split 1.1fr : 1fr with a sticky square gallery (stacked below 900px). Dark inner page heads run plate : text : photo (plate : text, photo below, under 860px). The desktop header is sticky at 72px under a 36px top bar.

**Phones and small tablets.** At 880px and below the top bar and the header's list button go; the header is brand plus menu button at 64px, opaque, tucking away on scroll down and returning on scroll up. A 60px dock is fixed to the bottom edge (plus the device's safe area); the page reserves that height and the toast rides 76px above the bottom. At 960px the stage stacks as copy, line-up, then finder, and the layers stop drifting. At 720px tabs and category chips become one swipeable row bleeding to the gutters, the catalog filter goes full width at 48px, the home range shows four tiles per family followed by a full-width "See all" line button, and form actions go full width. At 560px the first viewport is heading, a one-sentence lede, one red action and the line-up as a swipe shelf with three products in view (140px tallest), then the finder; the sign rows give way to the menu's sign wall, the ghost action is dropped, family panels become compact rows 12px apart, the closing strip shrinks to two contact buttons, and the footer drops what the dock already carries.

### Named Rules
**The 44 Floor Rule.** At 880px and below every control is at least 44px in its smaller dimension (dock slots 60px, menu links 52px, fields and steppers 48px) and every text input is at least 16px.
**The Dock Carries It Rule.** On phones the buyer's three actions (products, enquiry list, WhatsApp) live in the dock and nowhere else in the chrome: the header loses its list button, the closing strip loses its WhatsApp line, the footer loses its contact column.
**The One Row Rule.** On phones a set of selectors never wraps. Tabs, chips and the line-up run as single snap-scrolling rows with a hidden scrollbar and a fading right edge.

## Elevation & Depth

On white the system is flat: tone and 1-2px rules separate surfaces. On night, depth comes from light: red glows pool under the content, and product cutouts cast deep, dark drop shadows as if lit from above. Overlays lift with soft ink shadows. The phone dock, the phone header and the menu panel are flat night slabs separated by a 1px night rule, never by a shadow; the menu sits over a 60% near-black scrim (rgba(8, 9, 10, 0.6)).

### Shadow Vocabulary
- **Night product** (`filter: drop-shadow(0 22px 18px rgba(0,0,0,0.42))` on the line-up; page heads 0 24px 22px / 0.55, feature 0 30px 30px / 0.6): cutouts on night.
- **Plate product** (`filter: drop-shadow(0 10px 12px rgba(27,30,33,0.12))`; gallery 0 16px 18px / 0.14, category panels 0 18px 18px / 0.18): cutouts on the photo plate.
- **Pipe** (`box-shadow: inset 0 2px 0 rgba(255,255,255,0.06), 0 10px 18px -6px rgba(0,0,0,0.6)`): the fire-main under the line-up; the inset line is the highlight on the empty steel.
- **Pressure front** (`radial-gradient(ellipse at 100% 50%, rgba(255,194,14,0.9), rgba(255,194,14,0) 70%)`, 26px wide, 2px blur): the glow on the leading edge of the pipe's fill; it fades as the fill completes.
- **Floating** (`box-shadow: 0 1px 2px rgba(27,30,33,0.06), 0 8px 24px -12px rgba(27,30,33,0.18)`): toast.
- **Dropdown** (`box-shadow: 0 10px 18px -12px rgba(27,30,33,0.35)`): finder suggestions.
- **Drawer** (`box-shadow: -12px 0 40px -16px rgba(17,19,21,0.4)`): enquiry drawer, over a 45% night scrim.
- **Control lift** (`box-shadow: 0 1px 2px rgba(27,30,33,0.12)`): white add control on a photo plate.

### Named Rules
**The Flat Plate Rule.** Plates, panels, tiles, tabs, buttons and the dock carry no shadow at rest or on hover. Shadows belong to products, the pipe and overlays; the one exception is the white add control's 1px lift, which keeps it visible on the grey photo plate.
**The Lit From Above Rule.** On night, a product always has a drop shadow beneath it and a red glow somewhere behind the composition; never a boxed card.

## Shapes

Square geometry with a hair of radius, as on stamped metal signs: 3px on plates, buttons, inputs, tiles, panels, cards and menu signs; 2px on tabs, chips, arrow plates, small contact plates, thumbnails, riser labels and the dock's WhatsApp plate. Round is reserved for two things: count pills (26px in the header, 20px in the dock) and the riser's 24px valve nodes, which are handwheels. Framing uses 2px ink (finder, add box, dropdown) on white and a 2px white finder frame on night; ordinary controls take 1px control grey (night control on dark).

Icons come in two registers. Sign pictograms are solid white silhouettes on a 24-unit grid with a few fine line details, drawn like the equipment signs they borrow from. UI icons are single-stroke outlines with round caps and joins (1.9 by default, 2.2 inside arrow plates, 2.4 in the shelf arrow, the toast tick and the riser's valve).

Recurring silhouettes: the square arrow plate (28-44px, 2px border, right arrow; outlined at rest, filled red as the shelf's control); the pipe, a 12px bar under the line-up, a 6px bar joining the step plates and forming the riser, and a 3px line as scroll progress; the diamond, a small square turned 45 degrees, separating names in the ticker; and the mask edge, a fade to transparent on the right of any row that scrolls sideways.

### Named Rules
**The Handwheel Rule.** A circle means a count or a valve. Nothing else in the system is round.

## Components

### Stage Line-up (signature component)
DezaCo's products standing on the fire main.
- **Structure:** a row of cutouts on a common baseline over a 12px pipe; each item has a 1px tick and a caption below the pipe. Each cutout sits in a figure clipped at the baseline, so anything below the pipe's top edge is hidden.
- **Load sequence:** the pipe draws in empty (night-rule grey with a fine top highlight, 0.75s from 0.15s). At 0.9s pressure fills it left to right with the shaded red (1.1s) behind a yellow front. Each product rises out of the pipe (0.9s) at the moment the front passes beneath it, and its caption fades up 0.3s later. From 2.3s a 4px white streak travels the pipe every 3.2s; it pauses when the line-up is off screen or the tab is hidden.
- **Scroll:** as the stage leaves the viewport the products sink back into the pipe at slightly different rates, clipped at the baseline; they never float off it. While the line-up is fully on screen it is whole.
- **Hover / focus:** product lifts 10px (0.55s); caption turns white and its tick lit red. Focus draws a 2px white outline around the caption. Touch devices get no lift.
- **Swipe shelf (560px and below):** three products in view at 140px, snap-scrolling from the gutter with 22px gaps, right edge fading to transparent until the end is reached. A 44px red arrow plate with a 2px white border sits at the right above the pipe; tapping it advances 70% of the shelf's width, and it slips away at the end. Once, 2.6s after load and only if untouched, the shelf nudges 72px and returns.

### Product-name Ticker
A white band under the stage with two rows of product names in the ticker face, 4px apart: the first solid ink with red diamonds between names, the second outlined ink with yellow diamonds. The rows are tied to scroll, not to time: they slide in opposite directions at 0.45px per pixel scrolled while the band is in view and stop when scrolling stops. Decorative and hidden from assistive technology; the names repeat the catalog's own trade names.

### Riser (desktop, 1200px and up)
A vertical fire main that tracks the page.
- **Structure:** a 6px pipe (35% steel grey) with one 24px valve node per named section, evenly spaced; each node links to its section.
- **Fill:** the pipe fills downward as sections are reached, yellow at the source running to red by 30%.
- **Valves:** at rest a white disc with a night-mute ring and handwheel; once passed, the ring and handwheel turn red and the handwheel rotates a quarter turn (0.6s); the current section's valve fills red with a white handwheel and grows to 1.15.
- **Label:** on hover or focus an ink plate with the section name slides out 6px to the right.
- **Fallback:** without a riser (fewer than four sections, or below 1200px) a 3px red-to-yellow line across the top of the viewport shows scroll progress; on phones the dock's top edge takes that job.

### Sign Rows
The stage's category navigation, a sign board in list form (replaced by the menu's sign wall at 560px and below).
- **Structure:** 44px red pictogram plate, sign-row name, night-mute count, 32px arrow plate; night rules between rows.
- **Entrance:** rows slide in 18px from the left, 0.08s apart from 0.5s.
- **Hover / focus:** name slides 6px right (0.35s); arrow plate fills red (0.25s); the pictogram tips 6 degrees and grows to 1.12.

### Sign Wall Menu (880px and below)
The phone menu is the sign wall the thesis promises.
- **Structure:** a night panel dropping from under the header, scrollable within the viewport, clearing the dock at its foot. First a two-by-two grid of red signs 8px apart, each at least 104px tall: white pictogram (36px, 30px at 400px and below), a 2px white divider, the family name in sign lettering and its product count. Then the page links at 1.3rem on night rules, 52px each.
- **States:** signs deepen to deep safety red on hover; the current page link is lit red.
- **Behaviour:** opens with a 0.2s fade and 8px drop over a 60% near-black scrim; the page behind stops scrolling; tapping the scrim or pressing Escape closes it.

### Mobile Dock (880px and below)
The buyer's three actions within thumb reach.
- **Structure:** three equal slots on an opaque night bar with a night rule above and between: Products, Enquiry list, WhatsApp. Each is a 22px outline icon over a dock label in night text, 60px tall.
- **Count:** a 20px white pill beside the list icon; it turns green and grows to 1.25 when an item lands.
- **WhatsApp:** white label under a 26px green plate carrying the chat icon.
- **Contextual Add slot:** on a product page the first slot becomes a red "Add to list" with a plus; once the product is in the list it turns green, shows a tick and reads "In your list", and tapping it opens the list.
- **States:** pressed and current-page slots sit on night raised; the current slot's label turns white.
- **Top edge:** a 3px red-to-yellow line above the dock fills left to right with scroll progress: the fire main, carried to the thumb.
- **Behaviour:** slides out of the way (0.35s) while a text field has focus, so it never rides on the keyboard.

### Category Panels
- **Style:** panel-grey card (3px, 360px min) split text : photo; 56px red plate beside the title, slate description, condensed-caps count and a 40px ink-bordered arrow plate at the foot.
- **Reveal:** each panel wipes open from its left edge (1.1s, 0.08s apart); its photo fades in and grows from 0.85 just behind the wipe, then drifts a little against the scroll.
- **Hover / focus:** ground to #eaecee (0.35s), arrow plate fills ink, photo scales 1.06 and lifts 4px (0.8s).
- **Compact row (560px and below):** photo in a 104px column at left, then a 34px plate with the title at 1.28rem and a slate count line with a 32px arrow plate; no description; at least 112px tall.

### Dark Feature
A night band with a red glow at right: headline, night-text copy, a list of product rows (56px night-raised thumbnail, condensed name, mute descriptor, arrow that nudges 4px on hover) and a red action; a large product photo with a night shadow opposite. On arrival the photo uncovers from its right edge (1.2s) while settling from 1.15 to rest, the headline rises from behind a mask, and the rows feed in from the left one by one.

### Buttons
- **Shape:** 3px, 48px (56px large, 40px small and 44px on phones), 2px border matching fill, press nudges 1px down, disabled at 45%.
- **Red:** the primary action of a surface ("Explore the catalog", "Fire pump systems", "Add to enquiry list"); hover deep red.
- **In list:** the state a red add button settles into once the product is in the list: white ground, 2px green border, deep green label with a tick, reading "In your list"; hover green tint.
- **Ghost (night):** transparent, white text, slate border; hover border white with a 6% white wash. Dropped from the phone hero.
- **Ink / Green / Line:** ink for the drawer's email send; green for WhatsApp, send and "ask about"; line for secondary actions on white, including the full-width "See all" under a phone range.
- **Header list button (desktop):** white on night with an ink count pill; the pill turns green and scales 1.18 when an item lands.
- **Link-arrow:** condensed caps plus a 28px ink-bordered arrow plate that fills ink on hover; 44px tall on phones.

### Tabs and Chips
- **Tabs:** 48px (44px on phones), white, 1px control grey, 2px corners, condensed caps in slate with a count; hover borders ink; selected fills ink. Switching fades the panel's tiles up, staggered 0.04s.
- **Chips:** 40px (44px on phones) version of the same language for category filters and "who we supply" links.
- **Phones:** one snap-scrolling row bleeding to both gutters with the right 14% fading out; the last item keeps 40px of clear space after it.

### Product Tile
- **Media:** square photo plate, image contained at 74%; hover deepens the plate to #e4e7ea and lifts the photo 6px at 1.04 scale (no hover change on touch).
- **Add control:** 40px white square top-right (44px on phones); ink on hover; green with a tick when in the list, entering with a 0.4s pop.
- **Reveal:** tiles entering together cascade 0.08s apart, rising 36px; each photo grows from 0.8 just after its tile.

### Fire-Main Steps
Three steps joined by a 6px shaded red pipe running through 44px ink number plates (the last plate green); each plate knocks out the pipe with a 6px ring of the band colour. Below 860px the pipe turns vertical along the left. On arrival the pipe fills from its source (1.5s) and lights each station in turn: the plate pops in, then its text fades up, at roughly 0.55s intervals.

### Dark Page Head
Night crumbs and head with a red glow at lower right: 112px red plate (72px on phones; night-rule grey on the all-products page), display-page title, night-text description, an optional green action, and a product cutout rising in on the right (132px tall on phones, omitted there when it is only decoration). Title, text and action fade up in sequence (0.7s, 0.08s steps).

### Inputs / Fields
- **Finder:** 60px, 2px ink frame (white frame on the stage, ink text inside), steel search icon; focus turns the frame red with a 4px 18% red ring. Suggestions drop 6px below with 44px photo-plate thumbnails.
- **Fields:** 46px (48px on phones), 1px control grey; focus borders ink with a 3px 12% ink ring; invalid borders red with red helper text. Quantity stepper as one bordered group, 48px tall with 46px buttons on phones.

### Navigation
- **Top bar (desktop):** 36px night-top strip, night-mute contacts.
- **Header (desktop):** sticky night at 94% with blur, night rule below; brand plate and white wordmark; nav in condensed caps (night mute, white on hover/current), current page marked by a 3px red bar on the header's edge.
- **Header (phones):** opaque night, brand and a 44px bordered menu button; slides up out of view when scrolling down past 240px and returns on any upward scroll, near the top of the page, or while the menu is open.
- **Phones:** see Sign Wall Menu and Mobile Dock.

### Contact Band, Drawer and Toast
- **Contact band:** ink ground; contact lines bordered in night control with 40px red or green plates; border turns white on hover. On phones it reduces to two 56px buttons (call, email) labelled in condensed caps.
- **Drawer:** right sheet up to 460px (full width on phones) sliding in (0.4s) over a night scrim; panel-grey footer with send actions; 44px steppers, note field and remove control on phones.
- **Toast:** ink bar, green tick plate, white condensed action; sits above the dock on phones.

### Motion
- **Easing:** expo-out (cubic-bezier(0.16, 1, 0.3, 1)) for everything that arrives or responds. Water travelling in a pipe uses symmetric in-out curves: the empty pipe's draw (0.65, 0, 0.35, 1), the pressure fill and the steps pipe (0.55, 0, 0.45, 1), the water pulse (0.45, 0, 0.55, 1). The feature photo uncovers on (0.7, 0, 0.2, 1).
- **Load:** heading lines unmask upward (0.95s, 0.09s steps); lede, actions and side column fade up 16px (0.8s, 0.35-0.45s); a yellow underline draws under the emphasised word (0.7s from 0.75s); then the line-up's load sequence.
- **Scroll-linked:** one animation-frame loop drives every value tied to scroll position: the stage's copy and side column drift upward at different rates while the copy fades (desktop only), the line-up retracts, the ticker rows slide, feature and panel photos drift up to about 40px, the riser fills, and the progress line and dock edge grow.
- **Reveal vocabulary:** headings rise from behind a mask; paragraphs and buttons rise 36px; arrows and contact lines slide in 48px from the right; list rows slide in 36px from the left; panels wipe open; the feature photo uncovers; the steps pipe fills station by station; tiles cascade. All 0.8-1.2s, staggered 0.08s, started once an element has cleared the bottom tenth of the viewport, and fired once.
- **Page changes:** where the browser supports view transitions, the old page fades up and out 14px (0.28s) and the new page fades up into place from 18px (0.5s).
- **State changes:** 0.2-0.35s.
- **Text into frame (v6):** the hero headline arrives word by word from beyond the screen edges (line 1 from the left, line 2 from the right, line 3 from the left; 1.15s expo-out, 0.07s word stagger, 10px blur clearing), after a kicker whose red bar draws first; the lede slides in from the left, the buttons rise, the search box and family links slide in from the right. A giant outlined DEZACO wordmark (9% white stroke) glides in behind the product line-up and drifts left as the stage scrolls away. On every page, section headings slide in word by word from the left as they reach the viewport, their copy follows from the left and their link from the right; the two "who we supply" columns arrive from opposite sides; family panel titles follow the panel doors in from the right; inner page titles slide in on load. Under reduced motion the same words fade in place (0.6s) with no travel, so the page still comes alive without movement. The hero is pre-hidden by an html.mfx class set in <head>; if Motion fails to load the class is dropped and the text shows plainly.
- **Motion layer (v5):** Motion (motion.dev, vendored at assets/js/vendor/motion.min.js, trimmed to animate, scroll, inView, press, hover) adds an interaction layer in assets/js/motion-fx.js, loaded after site.js; without it the site falls back to the rAF loop. Controls squeeze on press with a spring (stiffness 520, damping 30; scale 0.92 small, 0.97 medium, 0.985 wide). Adding to the enquiry list throws the product photo along a curve (x expo-out, y ease-in, 0.72s) into the list button, which pulses on arrival. One ink indicator slides between tabs (spring, no bounce, 0.35s). Family counts count up once on entry (0.9s). The ticker rows and the pump photo's drift run on Motion's scroll(), which uses the browser's scroll timeline where it can. Pointing at or focusing a pump-set row fades the big photo back and brings that unit forward with a red name tag. The hero search placeholder types four trade names once, then rests; focusing the field stops it.

**The Charged Main Rule.** Motion tells one story: pressure enters a pipe at its source and travels along it, and things appear when the pressure reaches them. A new animated element either rides a pipe or arrives because one filled.
**The Once Only Rule.** Entrances and reveals fire once and are never replayed on re-entry. The water pulse runs three times after the main charges, then the pipe rests; it pauses when it cannot be seen.
**The Whole And Still Rule.** Under prefers-reduced-motion nothing is animated and nothing is missing: the pipe is charged and red, the products stand in place, headings are unmasked, panels are open, the ticker rests, the layers do not drift, the shelf does not nudge, page changes cut. Scroll-progress fills still track, because they are indicators. The same holds without JavaScript: reveals are only prepared by script, so unscripted content is simply visible.

## Do's and Don'ts

### Do:
- **Do** put chrome on night (header, hero stage, feature bands, inner page heads, footer, the phone dock and menu) and keep catalog grids, product pages and forms on white.
- **Do** light night grounds with a radial safety-red glow at 22% alpha or less, behind the content.
- **Do** use lit red for red type or hairlines on night, and safety red for every red fill.
- **Do** represent a category with a red square plate and a solid white pictogram, paired with a square arrow plate for "go".
- **Do** keep red for equipment, the fire main and the primary action, green for added / send / ask, yellow for pressure arriving, ink and night for everything else.
- **Do** place product photos on the photo plate on white, or as shadowed cutouts on night; contained, never cropped.
- **Do** let pressure drive motion: fill pipes from their source and bring content in when the fill reaches it.
- **Do** run arrivals on expo-out and water on in-out curves, fire every reveal once, and render everything whole and still under reduced motion.
- **Do** pause any looping motion when it is off screen.
- **Do** keep every control at 44px or more and every text input at 16px or more at 880px and below.
- **Do** put the buyer's three actions in the phone dock, and give its first slot to the page's own primary action when there is one.
- **Do** run tabs, chips and the hero line-up as single swipeable rows on phones, with a fading right edge that clears at the end.

### Don't:
- **Don't** use firefighter or flame photography, or a certifications or client-logo strip.
- **Don't** put gradients or red washes on white surfaces; gradients belong to night light and to pipes.
- **Don't** add shadows to plates, panels, tiles, tabs, buttons or the dock.
- **Don't** introduce round corners or pill buttons; round is reserved for count pills and the riser's valve nodes.
- **Don't** loop any animation other than the water pulse, or animate content that must be read before it settles.
- **Don't** use yellow as a control fill, a text colour or a background.
- **Don't** swap the two icon registers: sign pictograms are solid white silhouettes, UI icons are single-stroke outlines.
- **Don't** repeat the dock's actions in the phone header, closing strip or footer.
- **Don't** wrap tabs or chips into a stack on phones, or let the page scroll sideways.
- **Don't** hide content behind a reveal: without JavaScript or with reduced motion, everything is visible in place.
