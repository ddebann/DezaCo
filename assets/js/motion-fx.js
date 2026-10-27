/* DezaCo motion layer, built on Motion (motion.dev).
   Adds spring press feedback, a "fly to enquiry list" animation, a sliding tab
   indicator, count-ups on the family panels, and moves the scroll-linked ticker
   and pump-photo parallax onto Motion's scroll(), which runs on the browser's
   ScrollTimeline where supported. Everything here is optional: if Motion fails
   to load or the visitor prefers reduced motion, the site works as before. */
(function () {
  "use strict";
  var M = window.Motion, root = document.documentElement;
  if (!M) { root.classList.remove("mfx"); return; }
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var animate = M.animate, scroll = M.scroll, inView = M.inView, press = M.press, stagger = M.stagger;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  root.classList.add("mfx-on");

  /* =====================================================================
     TEXT THAT SLIDES INTO FRAME
     The hero headline arrives word by word from beyond the edges of the
     screen, alternating sides line by line; every section heading then
     slides in from the left as it scrolls into view, its copy follows,
     and its link arrives from the right. With reduced motion requested,
     the same words fade in place instead of travelling.
     ===================================================================== */
  var EXPO = [0.16, 1, 0.3, 1];
  var vw = function () { return window.innerWidth; };

  /* wrap each word of an element in an inline-block span; child elements (an <em>) move as one word */
  function split(el) {
    if (!el || el.__words) return el ? el.__words : [];
    var words = [];
    Array.prototype.slice.call(el.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function (t) {
          if (!t) return;
          if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(t)); return; }
          var w = document.createElement("span"); w.className = "w"; w.textContent = t;
          frag.appendChild(w); words.push(w);
        });
        el.replaceChild(frag, n);
      } else if (n.nodeType === 1 && n.tagName !== "BR") { n.classList.add("w"); words.push(n); }
    });
    el.__words = words;
    return words;
  }
  function hide(els) { (els.length != null ? els : [els]).forEach(function (e) { if (e) e.style.opacity = "0"; }); }

  /* one helper for every entrance: travel along x (or y) and fade, or only fade under reduced motion */
  function slideIn(els, from, opts) {
    els = (els && els.length != null) ? Array.prototype.slice.call(els).filter(Boolean) : (els ? [els] : []);
    if (!els.length) return;
    opts = opts || {};
    var kf = { opacity: [0, 1] };
    if (!reduce) {
      if (from.x != null) kf.x = [from.x, 0];
      if (from.y != null) kf.y = [from.y, 0];
      if (from.blur) kf.filter = ["blur(" + from.blur + "px)", "blur(0px)"];
    }
    return animate(els, kf, {
      duration: reduce ? 0.6 : (opts.duration || 0.95),
      ease: EXPO,
      delay: opts.each ? stagger(opts.each, { startDelay: opts.delay || 0, from: opts.from || "first" }) : (opts.delay || 0)
    });
  }

  function heroIntro() {
    var hero = $(".stage");
    if (!hero) return;
    var mark = $(".stage__mark span", hero), kbar = $(".stage__kbar", hero), ktext = $(".stage__ktext", hero);
    var W = vw();
    /* giant outlined wordmark glides in behind the products */
    if (mark) slideIn(mark, { x: W * 0.35 }, { duration: 1.8, delay: 0.2 });
    /* kicker: red bar draws, then its words follow it in */
    if (kbar) { kbar.parentNode.style.opacity = "1"; animate(kbar, { scaleX: [0, 1] }, { duration: 0.6, ease: EXPO, delay: 0.05 }); }
    if (ktext) slideIn(ktext, { x: -40 }, { duration: 0.8, delay: 0.25 });
    /* headline: line 1 from the left edge, line 2 from the right, line 3 from the left */
    $$(".hero-h .ln > span", hero).forEach(function (ln, i) {
      var ws = split(ln), right = i % 2 === 1;
      hide(ws); ln.style.opacity = "1";
      slideIn(ws, { x: (right ? 1 : -1) * W * 0.6, blur: 10 }, { duration: 1.15, each: 0.07, delay: 0.2 + i * 0.16, from: right ? "last" : "first" });
    });
    slideIn($(".stage__lede", hero), { x: -70 }, { duration: 1, delay: 0.85 });
    slideIn($$(".stage__actions > *", hero), { y: 28 }, { duration: 0.8, each: 0.09, delay: 1.0 });
    slideIn($(".finder", hero), { x: 90 }, { duration: 1, delay: 0.55 });
    slideIn($$(".catlink", hero), { x: 70 }, { duration: 0.9, each: 0.07, delay: 0.7 });
  }

  function pageheadIntro() {
    $$(".pagehead.on-dark h1").forEach(function (h) {
      var ws = split(h); hide(ws); h.style.opacity = "1";
      slideIn(ws, { x: -vw() * 0.4, blur: 8 }, { duration: 1, each: 0.06, delay: 0.1 });
    });
  }

  /* section blocks: heading words from the left, copy behind them, links and buttons from the right */
  function onEnter(el, fn, amount) {
    var done = false;
    inView(el, function () { if (!done) { done = true; fn(); } }, { amount: amount || 0.35, margin: "0px 0px -8% 0px" });
  }
  function block(trigger, heading, copy, side) {
    var ws = split(heading); hide(ws); hide(copy); hide(side);
    onEnter(trigger, function () {
      slideIn(ws, { x: -110, blur: 6 }, { duration: 0.95, each: 0.06 });
      slideIn(copy, { x: -60 }, { duration: 0.95, each: 0.08, delay: 0.18 + ws.length * 0.04 });
      slideIn(side, { x: 70 }, { duration: 0.9, each: 0.08, delay: 0.3 });
    });
  }
  function sectionText() {
    $$(".section__head, .catgroup__head").forEach(function (head) {
      var h = $("h2", head); if (!h) return;
      block(head, h, $$("p", head), $$(".link-arrow", head));
    });
    $$(".feature__copy").forEach(function (c) {
      block(c, $("h2", c), $$(":scope > p", c), $$(":scope > .btn", c));
    });
    $$(".cta").forEach(function (c) {
      var h = $("h2", c); if (h) block(c, h, $$("h2 + p", c), []);
    });
    $$(".who").forEach(function (w, i) {
      var h = $("h3", w), p = $$("p", w), ws = split(h);
      hide(ws); hide(p);
      onEnter(w, function () {
        slideIn(ws, { x: (i % 2 ? 1 : -1) * 90, blur: 4 }, { duration: 0.9, each: 0.05, from: i % 2 ? "last" : "first" });
        slideIn(p, { x: (i % 2 ? 1 : -1) * 50 }, { duration: 0.9, delay: 0.2 });
      });
    });
    /* family panels: titles slide in from the right once the panel doors have opened */
    var grids = [];
    $$(".catpanel").forEach(function (p) { if (grids.indexOf(p.parentNode) < 0) grids.push(p.parentNode); });
    grids.forEach(function (g) {
      var panels = $$(".catpanel", g), sets = panels.map(function (p) {
        var ws = split($("h3", p)), d = $$(".catpanel__text p, .catpanel p", p).slice(0, 1);
        hide(ws); hide(d); return { ws: ws, d: d };
      });
      onEnter(g, function () {
        sets.forEach(function (s, i) {
          slideIn(s.ws, { x: 80 }, { duration: 0.9, each: 0.06, delay: 0.45 + i * 0.1 });
          slideIn(s.d, { x: 50 }, { duration: 0.9, delay: 0.65 + i * 0.1 });
        });
      }, 0.15);
    });
  }

  try { heroIntro(); pageheadIntro(); sectionText(); }
  catch (err) { root.classList.remove("mfx"); $$(".w").forEach(function (w) { w.style.opacity = ""; }); }

  if (reduce) return;
  root.classList.add("has-motion");

  var spring = { type: "spring", stiffness: 520, damping: 30 };
  var settle = { type: "spring", bounce: 0, visualDuration: 0.35 };

  /* ---------- 1. press feedback: a short spring squeeze on every control ---------- */
  press(".btn, .tile__add, .tab, .chip, .dock__item, .catlink, .shelf__more, .iconbtn, .lineup__item, .catpanel", function (el) {
    var w = el.offsetWidth;
    var s = w > 320 ? 0.985 : w > 160 ? 0.97 : 0.92;
    animate(el, { scale: s }, spring);
    return function () { animate(el, { scale: 1 }, spring); };
  });

  /* ---------- 2. fly to the enquiry list ---------- */
  function listTarget() {
    var dock = $(".dock");
    if (dock && getComputedStyle(dock).display !== "none") return $(".dock__item--list", dock);
    return $(".header .list-btn");
  }
  function fly(img) {
    var target = listTarget();
    if (!img || !target || !img.complete) return;
    var r = img.getBoundingClientRect(), t = target.getBoundingClientRect();
    if (!r.width || r.bottom < 0 || r.top > window.innerHeight) return;
    var size = Math.min(r.width, r.height, 160);
    var clone = img.cloneNode();
    clone.removeAttribute("loading");
    clone.className = "fly-clone";
    clone.setAttribute("aria-hidden", "true");
    var left = r.left + (r.width - size) / 2, top = r.top + (r.height - size) / 2;
    clone.style.cssText = "position:fixed;z-index:95;pointer-events:none;object-fit:contain;margin:0;left:" +
      left + "px;top:" + top + "px;width:" + size + "px;height:" + size + "px;";
    document.body.appendChild(clone);
    var dx = t.left + t.width / 2 - (left + size / 2);
    var dy = t.top + t.height / 2 - (top + size / 2);
    /* x eases out and y eases in, so the product travels on a curve, the way a thrown object would */
    animate(clone, { x: [0, dx], y: [0, dy], scale: [1, 0.14], opacity: [1, 1, 0.35] },
      { duration: 0.72, x: { ease: [0.2, 0.7, 0.3, 1] }, y: { ease: [0.6, 0, 0.9, 0.5] }, scale: { ease: "easeIn" } }
    ).then(function () {
      clone.remove();
      animate(target, { scale: [1, 1.14, 1] }, { duration: 0.42, ease: "easeOut" });
    });
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-add]");
    if (b && !b.classList.contains("is-in")) {
      var tile = b.closest(".tile");
      fly(tile && $(".tile__media img", tile));
      return;
    }
    var s = e.target.closest("[data-add-submit], .dock__item--add");
    if (s && !s.classList.contains("btn--inlist") && !s.classList.contains("is-in")) fly($(".gallery__main img"));
  }, true);

  /* ---------- 3. tabs: one indicator slides between choices ---------- */
  $$("[data-tabs]").forEach(function (list) {
    var ind = document.createElement("span");
    ind.className = "tabs__ind"; ind.setAttribute("aria-hidden", "true");
    list.insertBefore(ind, list.firstChild);
    list.classList.add("has-ind");
    function place(instant) {
      var t = $("[role=tab][aria-selected=true]", list);
      if (!t) return;
      var to = { x: t.offsetLeft, y: t.offsetTop, width: t.offsetWidth, height: t.offsetHeight };
      animate(ind, to, instant ? { duration: 0 } : settle);
    }
    new MutationObserver(function () { place(false); }).observe(list, { subtree: true, attributes: true, attributeFilter: ["aria-selected"] });
    window.addEventListener("resize", function () { place(true); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { place(true); });
    place(true);
  });

  /* ---------- 4. count-ups on the family panels ---------- */
  $$("[data-countup]").forEach(function (el) {
    var n = +el.getAttribute("data-countup");
    if (el.getBoundingClientRect().top < window.innerHeight) return; /* already on screen: leave the real number */
    el.textContent = "0";
    inView(el, function () {
      animate(0, n, { duration: 0.9, ease: [0.16, 1, 0.3, 1], onUpdate: function (v) { el.textContent = Math.round(v); } });
    }, { amount: 0.8 });
  });

  /* ---------- 5. pump sets: pointing at a row previews that unit in the big photo ---------- */
  $$(".feature").forEach(function (sec) {
    var media = $(".feature__media", sec), main = media && $("img", media), rows = $$(".prows a", sec);
    if (!main || !rows.length) return;
    var peek = document.createElement("img");
    peek.className = "feature__peek"; peek.alt = ""; peek.setAttribute("aria-hidden", "true"); peek.decoding = "async";
    media.appendChild(peek);
    var label = document.createElement("span");
    label.className = "feature__tag"; label.setAttribute("aria-hidden", "true");
    media.appendChild(label);
    var mainSrc = main.getAttribute("src"), cur = null, out;
    function show(a) {
      clearTimeout(out);
      var src = $("img", a).getAttribute("src");
      if (src === mainSrc) return hide(true);
      if (cur === src) return;
      cur = src;
      peek.src = src;
      label.textContent = $("b", a).textContent;
      animate(main, { opacity: 0.08, scale: 0.94 }, settle);
      animate(peek, { opacity: [0, 1], scale: [0.9, 1] }, settle);
      animate(label, { opacity: [0, 1], y: [8, 0] }, { duration: 0.25, ease: "easeOut" });
    }
    function hide(now) {
      clearTimeout(out);
      out = setTimeout(function () {
        if (!cur) return;
        cur = null;
        animate(main, { opacity: 1, scale: 1 }, settle);
        animate(peek, { opacity: 0, scale: 0.94 }, { duration: 0.2, ease: "easeIn" });
        animate(label, { opacity: 0 }, { duration: 0.15 });
      }, now ? 0 : 120);
    }
    rows.forEach(function (a) {
      M.hover(a, function () { show(a); return function () { hide(false); }; });
      a.addEventListener("focus", function () { show(a); });
      a.addEventListener("blur", function () { hide(false); });
    });
  });

  /* ---------- 6. hero finder: the placeholder types a few trade names, once ---------- */
  var find = $("#find-home");
  if (find) {
    var base = find.getAttribute("placeholder"), names = ["gate valve", "breeching inlet", "jockey pump", "CO2 extinguisher"];
    var stop = false, timer;
    var halt = function () { stop = true; clearTimeout(timer); find.setAttribute("placeholder", base); };
    find.addEventListener("focus", halt); find.addEventListener("input", halt);
    var type = function (i) {
      if (stop) return;
      if (i >= names.length) { find.setAttribute("placeholder", base); return; }
      var word = names[i];
      animate(0, word.length, { duration: word.length * 0.06, ease: "linear", onUpdate: function (v) {
        if (!stop) find.setAttribute("placeholder", "e.g. " + word.slice(0, Math.round(v)));
      } }).then(function () { timer = setTimeout(function () { type(i + 1); }, 1300); });
    };
    timer = setTimeout(function () { type(0); }, 2600);
  }

  /* ---------- 7. scroll-linked effects on Motion's scroll() ---------- */
  var cancels = [];
  function bindScroll() {
    cancels.forEach(function (c) { c(); }); cancels = [];
    var box = $(".ticker");
    if (box) {
      var travel = (window.innerHeight + box.offsetHeight) * 0.45;
      $$("[data-ticker]", box).forEach(function (row) {
        var dir = +row.getAttribute("data-ticker");
        var start = dir > 0 ? 0 : -row.scrollWidth / 3;
        var a = animate(row, { x: [start, start - dir * travel] }, { ease: "linear" });
        cancels.push(scroll(a, { target: box, offset: ["start end", "end start"] }));
      });
    }
    var mk = $(".stage__mark"), stage = $(".stage");
    if (mk && stage) {
      var m = animate(mk, { x: [0, -window.innerWidth * 0.22] }, { ease: "linear" });
      cancels.push(scroll(m, { target: stage, offset: ["start start", "end start"] }));
    }
    $$(".feature").forEach(function (sec) {
      var img = $(".feature__media img", sec);
      if (!img) return;
      var a = animate(img, { y: [48, -48] }, { ease: "linear" });
      cancels.push(scroll(a, { target: sec, offset: ["start end", "end start"] }));
    });
  }
  bindScroll();
  var rz;
  window.addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(bindScroll, 200); });
})();
