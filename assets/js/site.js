/* DezaCo site behaviour: enquiry list, part finder, catalog filter, gallery, contact form. */
(function () {
  "use strict";
  var D = window.DEZACO || { site: {}, cats: [], products: [] };
  var BASE = document.documentElement.getAttribute("data-base") || "";
  var BY = {};
  D.products.forEach(function (p) { BY[p.slug] = p; });
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- storage (fails quietly in private mode) ---------- */
  var KEY = "dezaco.enquiry.v1";
  var mem = [];
  function load() {
    try { var v = JSON.parse(localStorage.getItem(KEY) || "[]"); return Array.isArray(v) ? v.filter(function (l) { return BY[l.slug]; }) : []; }
    catch (e) { return mem; }
  }
  function save(list) {
    mem = list;
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
  }
  var list = load();

  /* ---------- message builders ---------- */
  function listText(extra) {
    var lines = ["Hello DezaCo, I would like a price for:"];
    list.forEach(function (l, i) {
      var p = BY[l.slug];
      lines.push((i + 1) + ". " + p.name + " - Qty " + l.qty + (l.note ? " - " + l.note : ""));
    });
    if (extra) lines.push("", extra);
    return lines.join("\n");
  }
  function waHref(text) { return "https://wa.me/" + (D.site.whatsapp || "") + "?text=" + encodeURIComponent(text); }
  function mailHref(subject, text) { return "mailto:" + (D.site.email || "") + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text); }

  /* ---------- enquiry list ---------- */
  function count() { return list.reduce(function (n, l) { return n + 1; }, 0); }
  function inList(slug) { return list.some(function (l) { return l.slug === slug; }); }

  function add(slug, qty, note) {
    qty = Math.max(1, Math.min(9999, parseInt(qty, 10) || 1));
    var line = list.find(function (l) { return l.slug === slug; });
    if (line) { line.qty = qty; if (note) line.note = note; }
    else list.push({ slug: slug, qty: qty, note: note || "" });
    save(list); sync(); bump();
    toast(BY[slug].name + " added to your list");
  }
  function remove(slug) {
    list = list.filter(function (l) { return l.slug !== slug; });
    save(list); sync();
  }

  function sync() {
    var n = count();
    $$("[data-count]").forEach(function (el) { el.textContent = n; });
    $$("[data-add]").forEach(function (b) {
      var p = BY[b.getAttribute("data-add")], on = inList(p.slug);
      b.classList.toggle("is-in", on);
      b.setAttribute("aria-label", on ? p.name + " is in your enquiry list. Open list" : "Add " + p.name + " to enquiry list");
      b.innerHTML = '<svg class="i" aria-hidden="true"><use href="#i-' + (on ? "check" : "plus") + '"/></svg>';
    });
    renderLines();
    try { document.dispatchEvent(new CustomEvent("dezaco:list")); } catch (e) {}
  }

  function bump() {
    $$(".list-btn, .dock__item--list").forEach(function (b) {
      b.classList.remove("is-bumped"); void b.offsetWidth; b.classList.add("is-bumped");
      setTimeout(function () { b.classList.remove("is-bumped"); }, 900);
    });
  }

  var toastEl = $("[data-toast]"), toastT;
  function toast(msg) {
    if (!toastEl) return;
    $("[data-toast-text]", toastEl).textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove("is-on"); }, 3200);
  }

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  var linesEl = $("[data-lines]"), footEl = $("[data-foot]");
  function renderLines() {
    if (!linesEl) return;
    if (!list.length) {
      linesEl.innerHTML = '<div class="empty"><span class="plate-sm"><svg class="i" aria-hidden="true"><use href="#i-list"/></svg></span>' +
        '<p><b>Your list is empty.</b><br>Tap + on any product to add it, then send the whole list in one message.</p>' +
        '<a class="btn btn--red btn--sm" href="' + BASE + 'products.html">Browse products</a></div>';
      footEl.hidden = true;
      return;
    }
    footEl.hidden = false;
    linesEl.innerHTML = list.map(function (l) {
      var p = BY[l.slug];
      return '<div class="line" data-line="' + p.slug + '">' +
        '<span class="line__img"><img src="' + BASE + p.img + '" alt=""></span>' +
        '<div><a class="line__name" href="' + BASE + 'product/' + p.slug + '.html">' + esc(p.name) + '</a>' +
        '<div class="line__meta">' +
        '<div class="qty"><button type="button" data-lstep="-1" aria-label="Decrease quantity of ' + esc(p.name) + '"><svg class="i" aria-hidden="true"><use href="#i-minus"/></svg></button>' +
        '<input type="number" inputmode="numeric" min="1" max="9999" value="' + l.qty + '" aria-label="Quantity of ' + esc(p.name) + '" data-lqty>' +
        '<button type="button" data-lstep="1" aria-label="Increase quantity of ' + esc(p.name) + '"><svg class="i" aria-hidden="true"><use href="#i-plus"/></svg></button></div>' +
        '<input class="line__note" type="text" value="' + esc(l.note || "") + '" placeholder="Size, rating or notes" aria-label="Notes for ' + esc(p.name) + '" data-lnote>' +
        '</div></div>' +
        '<button class="line__rm" type="button" data-lrm aria-label="Remove ' + esc(p.name) + '"><svg class="i" aria-hidden="true"><use href="#i-trash"/></svg></button>' +
        '</div>';
    }).join("");
    updateSend();
  }

  var senderEl = $("[data-sender]");
  try { if (senderEl) senderEl.value = localStorage.getItem("dezaco.sender") || ""; } catch (e) {}
  function updateSend() {
    var who = senderEl && senderEl.value.trim() ? "From: " + senderEl.value.trim() : "";
    var text = listText(who);
    var wa = $('[data-send="wa"]'), ml = $('[data-send="mail"]');
    if (wa) wa.href = waHref(text);
    if (ml) ml.href = mailHref("Price enquiry - " + count() + " item" + (count() === 1 ? "" : "s"), text);
  }
  if (senderEl) senderEl.addEventListener("input", function () {
    try { localStorage.setItem("dezaco.sender", senderEl.value); } catch (e) {}
    updateSend();
  });

  if (linesEl) {
    linesEl.addEventListener("click", function (e) {
      var row = e.target.closest("[data-line]"); if (!row) return;
      var slug = row.getAttribute("data-line"), line = list.find(function (l) { return l.slug === slug; });
      var step = e.target.closest("[data-lstep]");
      if (step) {
        line.qty = Math.max(1, Math.min(9999, line.qty + parseInt(step.getAttribute("data-lstep"), 10)));
        $("[data-lqty]", row).value = line.qty; save(list); updateSend();
      }
      if (e.target.closest("[data-lrm]")) {
        var next = row.nextElementSibling || row.previousElementSibling;
        remove(slug);
        var f = next && next.getAttribute && next.getAttribute("data-line");
        var target = f ? $('[data-line="' + f + '"] [data-lrm]') : $("[data-close-list]");
        if (target) target.focus();
      }
    });
    linesEl.addEventListener("input", function (e) {
      var row = e.target.closest("[data-line]"); if (!row) return;
      var line = list.find(function (l) { return l.slug === row.getAttribute("data-line"); });
      if (e.target.matches("[data-lqty]")) { var v = parseInt(e.target.value, 10); if (v > 0) line.qty = Math.min(9999, v); }
      if (e.target.matches("[data-lnote]")) line.note = e.target.value;
      save(list); updateSend();
    });
    linesEl.addEventListener("change", function (e) {
      if (e.target.matches("[data-lqty]")) {
        var row = e.target.closest("[data-line]"), line = list.find(function (l) { return l.slug === row.getAttribute("data-line"); });
        e.target.value = line.qty;
      }
    });
  }

  /* ---------- drawer ---------- */
  var drawer = $("#enquiry"), scrim = $("[data-scrim]"), lastFocus = null;
  function openList() {
    if (!drawer) return;
    lastFocus = document.activeElement;
    renderLines();
    drawer.hidden = false; scrim.hidden = false;
    requestAnimationFrame(function () { drawer.classList.add("is-open"); scrim.classList.add("is-open"); });
    document.body.style.overflow = "hidden";
    setTimeout(function () { ($("[data-close-list]", drawer)).focus(); }, 60);
    toastEl && toastEl.classList.remove("is-on");
  }
  function closeList() {
    if (!drawer || drawer.hidden) return;
    drawer.classList.remove("is-open"); scrim.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(function () { drawer.hidden = true; scrim.hidden = true; }, 320);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest("[data-open-list]")) { e.preventDefault(); openList(); }
    if (e.target.closest("[data-close-list]") || e.target === scrim) closeList();
    var addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      e.preventDefault();
      var slug = addBtn.getAttribute("data-add");
      if (inList(slug)) openList(); else add(slug, 1, "");
    }
    var send = e.target.closest("[data-send]");
    if (send && !list.length) e.preventDefault();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeList();
    if (e.key === "Tab" && drawer && !drawer.hidden) {
      var f = $$('a[href], button:not([disabled]), input, textarea', drawer).filter(function (el) { return el.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- mobile menu ---------- */
  var menuBtn = $("[data-menu]"), nav = $("#nav");
  var navScrim = $("[data-navscrim]");
  function setMenu(open) {
    if (!menuBtn) return;
    nav.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (navScrim) { navScrim.hidden = !open; }
    document.body.classList.toggle("menu-open", open);
    if (!open && document.activeElement && nav.contains(document.activeElement)) menuBtn.focus();
  }
  if (menuBtn) {
    menuBtn.addEventListener("click", function () { setMenu(!nav.classList.contains("is-open")); });
    if (navScrim) navScrim.addEventListener("click", function () { setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    window.addEventListener("resize", function () { if (window.innerWidth > 880) setMenu(false); });
  }

  /* ---------- product page add box ---------- */
  $$("[data-addbox]").forEach(function (form) {
    var slug = form.getAttribute("data-addbox"), q = $("[data-qty]", form), note = $("[data-note]", form), wa = $("[data-wa-product]", form);
    var existing = list.find(function (l) { return l.slug === slug; });
    if (existing) { q.value = existing.qty; note.value = existing.note || ""; }
    function waSync() {
      var p = BY[slug];
      wa.href = waHref("Hello DezaCo, I would like a price for: " + p.name + " - Qty " + (parseInt(q.value, 10) || 1) + (note.value.trim() ? " - " + note.value.trim() : ""));
    }
    form.addEventListener("click", function (e) {
      var s = e.target.closest("[data-step]"); if (!s) return;
      q.value = Math.max(1, Math.min(9999, (parseInt(q.value, 10) || 1) + parseInt(s.getAttribute("data-step"), 10))); waSync();
    });
    form.addEventListener("input", waSync);
    var sub = $("[data-add-submit]", form);
    function paintSub() {
      if (!sub) return;
      var on = inList(slug);
      sub.classList.toggle("btn--inlist", on); sub.classList.toggle("btn--red", !on);
      sub.innerHTML = '<svg class="i" aria-hidden="true"><use href="#i-' + (on ? "check" : "plus") + '"/></svg><span>' + (on ? "In your list" : "Add to enquiry list") + "</span>";
    }
    form.addEventListener("submit", function (e) { e.preventDefault(); add(slug, q.value, note.value.trim()); paintSub(); });
    document.addEventListener("dezaco:list", paintSub);
    paintSub();
    waSync();
  });

  /* ---------- gallery ---------- */
  $$("[data-gallery]").forEach(function (g) {
    var main = $("[data-main]", g);
    g.addEventListener("click", function (e) {
      var t = e.target.closest("[data-thumb]"); if (!t) return;
      main.src = t.getAttribute("data-thumb");
      $$("[data-thumb]", g).forEach(function (b) { b.removeAttribute("aria-current"); });
      t.setAttribute("aria-current", "true");
    });
  });

  /* ---------- part finder (combobox) ---------- */
  function norm(s) { return s.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim(); }
  var INDEX = D.products.map(function (p) { return { p: p, hay: norm(p.name + " " + p.aliases.join(" ") + " " + p.short) , name: norm(p.name + " " + p.aliases.join(" ")) }; });
  function search(q) {
    q = norm(q); if (!q) return [];
    var words = q.split(" ");
    return INDEX.map(function (x) {
      var score = 0;
      if (x.name.indexOf(q) === 0) score += 6; else if (x.name.indexOf(q) > -1) score += 4;
      words.forEach(function (w) { if (x.name.indexOf(w) > -1) score += 2; else if (x.hay.indexOf(w) > -1) score += 1; });
      var all = words.every(function (w) { return x.hay.indexOf(w) > -1; });
      return { p: x.p, s: all ? score : 0 };
    }).filter(function (r) { return r.s > 0; }).sort(function (a, b) { return b.s - a.s; }).slice(0, 7).map(function (r) { return r.p; });
  }
  var catName = {}; D.cats.forEach(function (c) { catName[c.slug] = c.sign; });
  $$("[data-finder]").forEach(function (f) {
    var input = $("input", f), lb = $("[role=listbox]", f), results = [], active = -1;
    function close() { lb.hidden = true; input.setAttribute("aria-expanded", "false"); input.removeAttribute("aria-activedescendant"); active = -1; }
    function render() {
      results = search(input.value);
      if (!input.value.trim()) return close();
      if (!results.length) {
        lb.innerHTML = '<li class="finder__empty" role="option" aria-disabled="true">No match. Try another name, or ask us on WhatsApp.</li>';
      } else {
        lb.innerHTML = results.map(function (p, i) {
          return '<li class="finder__opt" role="option" id="' + input.id + '-o' + i + '" data-i="' + i + '" aria-selected="false">' +
            '<img src="' + BASE + p.img + '" alt=""><span><b>' + esc(p.name) + '</b><br><small>' + esc(p.short) + '</small></span><small class="num">' + esc(catName[p.cat]) + '</small></li>';
        }).join("");
      }
      lb.hidden = false; input.setAttribute("aria-expanded", "true"); active = -1;
    }
    function highlight(i) {
      var opts = $$(".finder__opt", lb); if (!opts.length) return;
      active = (i + opts.length) % opts.length;
      opts.forEach(function (o, j) { o.setAttribute("aria-selected", j === active ? "true" : "false"); });
      input.setAttribute("aria-activedescendant", opts[active].id);
      opts[active].scrollIntoView({ block: "nearest" });
    }
    function go(p) { location.href = BASE + "product/" + p.slug + ".html"; }
    input.addEventListener("input", render);
    input.addEventListener("focus", function () { if (input.value.trim()) render(); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown") { e.preventDefault(); if (lb.hidden) render(); highlight(active + 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); highlight(active - 1); }
      else if (e.key === "Enter") { e.preventDefault(); var p = results[active > -1 ? active : 0]; if (p) go(p); }
      else if (e.key === "Escape") { close(); }
    });
    lb.addEventListener("mousedown", function (e) { e.preventDefault(); });
    lb.addEventListener("click", function (e) { var o = e.target.closest("[data-i]"); if (o) go(results[+o.getAttribute("data-i")]); });
    input.addEventListener("blur", function () { setTimeout(close, 100); });
  });

  /* ---------- catalog filter ---------- */
  var groups = $("[data-groups]");
  if (groups) {
    var fi = $("[data-filter-input]"), chipsEl = $$("[data-filter]"), cat = "all", none = $("[data-noresults]");
    function apply() {
      var q = norm(fi.value), shown = 0;
      $$("[data-group]").forEach(function (g) {
        var gs = g.getAttribute("data-group"), vis = 0;
        $$(".tile", g).forEach(function (t) {
          var ok = (cat === "all" || cat === gs) && (!q || q.split(" ").every(function (w) { return t.getAttribute("data-search").indexOf(w) > -1; }));
          t.hidden = !ok; if (ok) vis++;
        });
        g.hidden = vis === 0; shown += vis;
      });
      none.hidden = shown > 0;
    }
    chipsEl.forEach(function (c) {
      c.addEventListener("click", function () {
        cat = c.getAttribute("data-filter");
        chipsEl.forEach(function (x) { x.setAttribute("aria-pressed", x === c ? "true" : "false"); });
        apply();
      });
    });
    fi.addEventListener("input", apply);
    var h = (location.hash || "").slice(1);
    if (h) { var c0 = chipsEl.find(function (c) { return c.getAttribute("data-filter") === h; }); if (c0) c0.click(); }
  }

  /* ---------- contact form ---------- */
  $$("[data-contact]").forEach(function (form) {
    var via = "wa";
    $$("[data-via]", form).forEach(function (b) { b.addEventListener("click", function () { via = b.getAttribute("data-via"); }); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      ["name", "message"].forEach(function (n) {
        var el = form.elements[n], err = el.parentNode.querySelector(".err"), bad = !el.value.trim();
        el.setAttribute("aria-invalid", bad ? "true" : "false"); err.hidden = !bad; if (bad && ok) { el.focus(); ok = false; }
      });
      if (!ok) return;
      var v = function (n) { return form.elements[n].value.trim(); };
      var text = "Hello DezaCo,\n\n" + v("message") + "\n\nName: " + v("name") + (v("company") ? "\nCompany: " + v("company") : "") + (v("phone") ? "\nPhone: " + v("phone") : "");
      if (list.length) text += "\n\n" + listText("").replace("Hello DezaCo, I would like a price for:", "Items from my enquiry list:");
      if (via === "wa") { var a = document.createElement("a"); a.href = waHref(text); a.target = "_blank"; a.rel = "noopener"; document.body.appendChild(a); a.click(); a.remove(); }
      else location.href = mailHref("Enquiry from " + v("name"), text);
    });
  });

  /* ---------- tabs (home "Browse the range") ---------- */
  $$("[data-tabs]").forEach(function (list) {
    var tabs = $$("[role=tab]", list);
    function select(t, focus) {
      tabs.forEach(function (x) {
        var on = x === t, panel = document.getElementById(x.getAttribute("aria-controls"));
        x.setAttribute("aria-selected", on ? "true" : "false");
        x.tabIndex = on ? 0 : -1;
        panel.hidden = !on;
        if (on) { panel.classList.remove("is-in"); void panel.offsetWidth; panel.classList.add("is-in"); }
      });
      if (focus) t.focus();
    }
    list.addEventListener("click", function (e) { var t = e.target.closest("[role=tab]"); if (t) select(t); });
    list.addEventListener("keydown", function (e) {
      var i = tabs.indexOf(document.activeElement); if (i < 0) return;
      if (e.key === "ArrowRight") { e.preventDefault(); select(tabs[(i + 1) % tabs.length], true); }
      if (e.key === "ArrowLeft") { e.preventDefault(); select(tabs[(i - 1 + tabs.length) % tabs.length], true); }
      if (e.key === "Home") { e.preventDefault(); select(tabs[0], true); }
      if (e.key === "End") { e.preventDefault(); select(tabs[tabs.length - 1], true); }
    });
  });

  /* ---------- mobile dock ---------- */
  var dock = $("[data-dock]");
  if (dock) {
    var addForm = $("[data-addbox]"), firstItem = $("[data-dock-first]", dock);
    if (addForm && firstItem) {
      var slugD = addForm.getAttribute("data-addbox");
      var btn = document.createElement("button");
      btn.type = "button"; btn.className = "dock__item dock__item--add";
      function paint() {
        var on = inList(slugD);
        btn.classList.toggle("is-in", on);
        btn.innerHTML = '<svg class="i" aria-hidden="true"><use href="#i-' + (on ? "check" : "plus") + '"/></svg><span>' + (on ? "In your list" : "Add to list") + "</span>";
      }
      btn.addEventListener("click", function () {
        if (inList(slugD)) { openList(); return; }
        add(slugD, $("[data-qty]", addForm).value, $("[data-note]", addForm).value.trim()); paint();
      });
      addForm.addEventListener("submit", function () { setTimeout(paint, 0); });
      firstItem.replaceWith(btn); paint();
      document.addEventListener("dezaco:list", paint);
    }
    /* get out of the way of the on-screen keyboard */
    document.addEventListener("focusin", function (e) { if (e.target.matches("input, textarea")) dock.classList.add("is-away"); });
    document.addEventListener("focusout", function () { dock.classList.remove("is-away"); });
  }

  /* hero shelf: arrow plate scrolls it on, and the edge mask lifts at the end */
  $$("[data-lineup]").forEach(function (l) {
    var more = $("[data-shelf-more]");
    function ends() {
      var atEnd = l.scrollLeft + l.clientWidth >= l.scrollWidth - 12;
      l.classList.toggle("is-end", atEnd);
      if (more) more.classList.toggle("is-gone", atEnd || l.scrollWidth <= l.clientWidth + 12);
    }
    l.addEventListener("scroll", ends, { passive: true });
    window.addEventListener("resize", ends);
    if (more) more.addEventListener("click", function () { l.scrollBy({ left: l.clientWidth * 0.7, behavior: "smooth" }); });
    ends();
  });

  /* hero shelf: one small nudge so people know it swipes */
  $$("[data-lineup]").forEach(function (l) {
    if (window.innerWidth > 560 || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    var done = false;
    function stop() { done = true; }
    l.addEventListener("touchstart", stop, { passive: true, once: true });
    setTimeout(function () {
      if (done || l.scrollLeft > 0) return;
      l.scrollTo({ left: 72, behavior: "smooth" });
      setTimeout(function () { if (!done) l.scrollTo({ left: 0, behavior: "smooth" }); }, 700);
    }, 2600);
  });

  /* ---------- motion system (v3) ---------- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* hero: sync each product's rise to the moment the pressure front reaches it */
  $$("[data-lineup]").forEach(function (l) {
    var row = $(".lineup__row", l), items = $$(".lineup__item", l);
    var w = Math.min(row.scrollWidth, window.innerWidth) || 1;
    items.forEach(function (it, i) {
      var r = it.getBoundingClientRect(), frac = Math.max(0, Math.min(1, (r.left + r.width / 2) / w));
      /* fill runs 1.1s on an ease-in-out curve starting at 0.9s; invert roughly */
      var t = frac < 0.5 ? Math.sqrt(frac / 2) : 1 - Math.sqrt((1 - frac) / 2);
      it.style.setProperty("--d", (0.9 + 1.1 * t - 0.05).toFixed(2) + "s");
      it.style.setProperty("--pz", [0.7, 1.1, 0.85, 1.2, 0.9, 1.05, 0.75][i % 7]);
    });
    var onScreen = true;
    function apply() { l.classList.toggle("is-paused", !onScreen || document.hidden); }
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { onScreen = en[0].isIntersecting; apply(); }).observe(l);
    document.addEventListener("visibilitychange", apply);
  });

  /* reveal vocabulary */
  function prep(el, kind, i, d0) {
    el.classList.add("rv", "pre"); if (kind) el.classList.add(kind);
    if (i != null) el.style.setProperty("--i", i);
    if (d0) el.style.setProperty("--d0", d0);
    return el;
  }
  function mask(h) {
    if (!h || h.querySelector(".mline")) return h;
    h.innerHTML = '<span class="mline"><span>' + h.innerHTML + "</span></span>";
    return h;
  }
  var targets = [];
  if (!reduce && "IntersectionObserver" in window) {
    /* when Motion is loaded, motion-fx.js slides headings and their copy in word by word */
    var mfx = !!window.Motion;
    if (!mfx) $$(".section__head, .catgroup__head").forEach(function (head) {
      var h = $("h2", head); if (h) targets.push(prep(mask(h), "rv-mask"));
      var p = $("p", head); if (p) targets.push(prep(p, "rv-up", null, "0.12s"));
      var a = $(".link-arrow", head); if (a) targets.push(prep(a, "rv-right", null, "0.2s"));
    });
    /* clip-path hides an element from IntersectionObserver, so clipped reveals watch a proxy */
    var proxies = new Map();
    function viaProxy(proxy, el) { var l = proxies.get(proxy); if (!l) { l = []; proxies.set(proxy, l); targets.push(proxy); } l.push(el); }
    $$(".catpanel").forEach(function (el, i) { el.classList.remove("reveal"); prep(el, null, i); viaProxy(el.parentNode, el); });
    $$(".feature__copy").forEach(function (c) {
      c.classList.remove("reveal");
      var h = $("h2", c); if (h && !mfx) targets.push(prep(mask(h), "rv-mask"));
      if (!mfx) $$(":scope > p, :scope > .btn", c).forEach(function (el, i) { targets.push(prep(el, "rv-up", i, "0.15s")); });
      $$(".prows li", c).forEach(function (el, i) { targets.push(prep(el, "rv-left", i, "0.25s")); });
    });
    $$(".feature__media").forEach(function (m) { m.classList.remove("reveal"); m.classList.add("pre"); viaProxy(m.parentNode, m); });
    $$(".steps").forEach(function (s) { $$(".step", s).forEach(function (st) { st.classList.remove("reveal", "pre"); }); s.classList.add("pre"); targets.push(s); });
    $$(".tabs").forEach(function (t) { targets.push(prep(t, "rv-up")); });
    $$(".who").forEach(function (w, wi) {
      var h = $("h3", w); if (h && !mfx) targets.push(prep(h, "rv-up", wi));
      var p = $("p", w); if (p && !mfx) targets.push(prep(p, "rv-up", wi, "0.1s"));
      $$("li", w).forEach(function (li, i) { targets.push(prep(li, "rv-up", i, (0.2 + wi * 0.1) + "s")); });
    });
    $$(".cta").forEach(function (c) {
      var h = $("h2", c); if (h && !mfx) targets.push(prep(mask(h), "rv-mask"));
      var p = $("p", c); if (p && !mfx) targets.push(prep(p, "rv-up", null, "0.12s"));
      $$(".cta__line", c).forEach(function (el, i) { targets.push(prep(el, "rv-right", i, "0.1s")); });
    });
    $$(".grid .tile").forEach(function (t) { if (!t.closest("[hidden]")) targets.push(prep(t, "rv-up")); });
    $$(".pdp__info > *, .prose > *, .form > *, .card-ink").forEach(function (el, i) { targets.push(prep(el, "rv-up", Math.min(i, 8))); });
    $$(".gallery").forEach(function (g) { targets.push(prep(g, "rv-up")); });
    $$(".footer .wrap > *").forEach(function (el, i) { targets.push(prep(el, "rv-up", i)); });

    var io = new IntersectionObserver(function (entries) {
      /* tiles entering together cascade by their order in this batch */
      var batch = 0;
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, list = proxies.get(el) || [el];
        if (el.classList.contains("tile")) el.style.setProperty("--i", Math.min(batch++, 7));
        requestAnimationFrame(function () { list.forEach(function (x) { x.classList.remove("pre"); x.classList.add("in"); }); });
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.01 });
    targets.forEach(function (el) { io.observe(el); });

    /* tab switch: reveal tiles of the newly shown panel */
    $$("[data-tabs] [role=tab]").forEach(function (t) {
      t.addEventListener("click", function () {
        var p = document.getElementById(t.getAttribute("aria-controls"));
        $$(".tile.pre", p).forEach(function (el) { el.classList.remove("pre"); el.classList.add("in"); });
      });
    });
  }

  /* riser: a vertical fire main whose valves open as you pass each section */
  var floors = $$("[data-floor]");
  var riser = null, nodes = [];
  if (floors.length >= 4) {
    riser = document.createElement("nav");
    riser.className = "riser"; riser.setAttribute("aria-label", "Page sections");
    riser.innerHTML = '<span class="riser__pipe"><span class="riser__fill"></span></span>';
    floors.forEach(function (f, i) {
      var h = f.querySelector("h2"), id = h && h.id;
      var a = document.createElement("a");
      a.className = "riser__node"; a.href = id ? "#" + id : "#";
      a.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16"/></svg><span class="riser__label">' + f.getAttribute("data-floor") + "</span>";
      a.style.top = ((i + 0.5) / floors.length * 100) + "%";
      riser.appendChild(a); nodes.push(a);
    });
    document.body.appendChild(riser);
    document.body.classList.add("has-riser");
    requestAnimationFrame(function () { riser.classList.add("is-ready"); });
  }

  /* one rAF loop drives every scroll-linked value */
  var hdr = $("[data-header]"), lastY = window.scrollY, shelf = $("[data-lineup]");
  var stage = $(".stage"), tickers = $$("[data-ticker]"), tickerBox = $(".ticker"), prog = $(".progress");
  var pars = $$(".feature__media");
  var lastHere = -1, ticking = false;
  function frame() {
    ticking = false;
    var y = window.scrollY, vh = window.innerHeight, docH = document.documentElement.scrollHeight - vh;
    var p = docH > 0 ? Math.min(1, y / docH) : 0;
    if (prog) prog.style.setProperty("--p", p.toFixed(4));
    if (dock) dock.style.setProperty("--p", p.toFixed(4));
    if (hdr) {
      var down = y > lastY + 4, up = y < lastY - 4;
      if (y < 120 || up || document.body.classList.contains("menu-open")) hdr.classList.remove("is-tucked");
      else if (down && y > 240) hdr.classList.add("is-tucked");
      lastY = y;
    }
    if (reduce) return;
    if (stage) { var sh = stage.offsetHeight; if (y < sh) stage.style.setProperty("--sy", y.toFixed(1)); }
    if (shelf) {
      var lr = shelf.getBoundingClientRect();
      if (lr.bottom > -50 && lr.top < vh) shelf.style.setProperty("--ly", (Math.max(0, (window.innerWidth <= 960 ? 72 : Math.max(84, vh * 0.2)) - lr.top) * (window.innerWidth <= 960 ? 0.55 : 1)).toFixed(1));
    }
    if (tickerBox && !window.Motion) {
      var tr = tickerBox.getBoundingClientRect();
      if (tr.bottom > 0 && tr.top < vh) {
        var k = (vh - tr.top);
        tickers.forEach(function (t) {
          var dir = +t.getAttribute("data-ticker");
          var base = dir > 0 ? -k * 0.45 : -t.scrollWidth / 3 + k * 0.45;
          t.style.setProperty("--tx", base.toFixed(1) + "px");
        });
      }
    }
    if (!window.Motion) pars.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var c = (r.top + r.height / 2 - vh / 2) / vh;
      el.style.setProperty("--par", (c * -40).toFixed(1));
    });
    if (riser) {
      var mid = y + vh * 0.45, here = -1;
      floors.forEach(function (f, i) { var top = f.getBoundingClientRect().top + y; if (mid >= top) here = i; });
      var first = floors[0].getBoundingClientRect().top + y, last = floors[floors.length - 1].getBoundingClientRect().top + y;
      var rp = here < 0 ? 0 : Math.min(1, (here + 0.5 + Math.max(0, Math.min(1, (mid - (floors[here].getBoundingClientRect().top + y)) / Math.max(1, floors[here].offsetHeight)))) / floors.length);
      riser.style.setProperty("--p", (y < 40 ? 0 : rp).toFixed(4));
      riser.querySelector(".riser__fill").style.transform = "scaleY(" + (y < 40 ? 0 : rp).toFixed(4) + ")";
      nodes.forEach(function (n, i) { n.classList.toggle("is-on", i <= here); n.classList.toggle("is-here", i === here); });
      lastHere = here;
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  frame();

  /* gallery crossfade */
  $$("[data-gallery]").forEach(function (g) {
    var main = $("[data-main]", g);
    g.addEventListener("click", function (e) {
      if (!e.target.closest("[data-thumb]")) return;
      main.classList.remove("is-swapping"); void main.offsetWidth; main.classList.add("is-swapping");
    });
  });

  sync();
})();
