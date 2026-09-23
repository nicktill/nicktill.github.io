(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- theme: dark (photography), light (paper), flat (structural) ---- */
  var root = document.documentElement;
  var themeBtns = Array.prototype.slice.call(document.querySelectorAll('[data-theme-set]'));

  function usesPhoto(name) { return name === 'dark' || name === 'amber'; }

  function setTheme(name, remember) {
    root.setAttribute('data-theme', name);
    themeBtns.forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.themeSet === name ? 'true' : 'false');
    });
    // dark and amber both sit on the photographs; the others do not
    if (usesPhoto(name)) {
      if (buttons[current]) applyAccent(buttons[current].dataset.src);
    } else {
      root.style.removeProperty('--accent');
      root.style.removeProperty('--accent-2');
      document.body.classList.remove('is-bright');
    }
    if (remember) {
      try { localStorage.setItem('theme', name); } catch (e) {}
    }
  }

  themeBtns.forEach(function (b) {
    b.addEventListener('click', function () { setTheme(b.dataset.themeSet, true); });
  });

  /* ---- hero entrance ---- */
  requestAnimationFrame(function () {
    document.body.classList.add('loaded');
  });

  /* ---- background changer: cross-fade between two layers ---- */
  var layers = [
    document.querySelector('.bg__layer--a'),
    document.querySelector('.bg__layer--b')
  ];
  var front = 0;
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.scenes__dot'));
  var photoNum = document.getElementById('photoNum');
  var current = 0;

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ---- pull an accent colour out of the photo, so the whole page
         re-tints when you change the scenery ---- */
  var accentCache = {};

  function applyAccent(src) {
    if (reduced) return;
    if (accentCache[src]) {
      root.style.setProperty('--accent', accentCache[src][0]);
      root.style.setProperty('--accent-2', accentCache[src][1]);
      return;
    }
    var img = new Image();
    img.onload = function () {
      try {
        var n = 28;
        var c = document.createElement('canvas');
        c.width = n; c.height = n;
        var ctx = c.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, n, n);
        var d = ctx.getImageData(0, 0, n, n).data;

        // average hue as a vector so it wraps correctly, weighted by saturation
        var x = 0, y = 0, satSum = 0, count = 0, lumaSum = 0, lumaCount = 0;
        for (var i = 0; i < d.length; i += 4) {
          var r = d[i] / 255, g = d[i + 1] / 255, b = d[i + 2] / 255;
          lumaSum += 0.2126 * r + 0.7152 * g + 0.0722 * b;
          lumaCount++;
          var max = Math.max(r, g, b), min = Math.min(r, g, b);
          var l = (max + min) / 2;
          if (l < 0.12 || l > 0.93) continue;         // skip crushed shadows and blown sky
          var delta = max - min;
          if (delta < 0.04) continue;                  // skip near-grey
          var s = delta / (1 - Math.abs(2 * l - 1));
          var h;
          if (max === r) h = ((g - b) / delta) % 6;
          else if (max === g) h = (b - r) / delta + 2;
          else h = (r - g) / delta + 4;
          h *= 60;
          if (h < 0) h += 360;
          var rad = h * Math.PI / 180;
          x += Math.cos(rad) * s;
          y += Math.sin(rad) * s;
          satSum += s;
          count++;
        }
        // a bright photo needs a heavier scrim or the hero copy stops being readable
        document.body.classList.toggle('is-bright', (lumaSum / lumaCount) > 0.46);

        if (!count) return;

        var hue = Math.atan2(y, x) * 180 / Math.PI;
        if (hue < 0) hue += 360;
        // clamp into a band that stays legible on the dark ground and takes dark text
        var sat = Math.min(0.80, Math.max(0.52, (satSum / count) * 1.7));
        var accent = 'hsl(' + hue.toFixed(1) + ' ' + (sat * 100).toFixed(0) + '% 68%)';
        // a companion a little way round the wheel, paler and softer, so the
        // quieter text has a second colour to sit in and the page is not one note
        var hue2 = (hue + 44) % 360;
        var sat2 = Math.min(0.72, Math.max(0.46, sat * 0.85));
        var accent2 = 'hsl(' + hue2.toFixed(1) + ' ' + (sat2 * 100).toFixed(0) + '% 76%)';
        accentCache[src] = [accent, accent2];
        if (root.getAttribute('data-theme') !== 'amber') {
          root.style.setProperty('--accent', accent);
          root.style.setProperty('--accent-2', accent2);
        }
        // from here on, changing the scenery cross-fades the colours
        requestAnimationFrame(function () { root.classList.add('accents-ready'); });
      } catch (e) { /* tainted canvas or no 2d context, so keep the default accent */ }
    };
    img.src = src;
  }

  function show(index) {
    if (index === current) return;
    var btn = buttons[index];
    if (!btn) return;

    var src = btn.dataset.src;
    var back = 1 - front;
    layers[back].style.backgroundImage = "url('" + src + "')";

    requestAnimationFrame(function () {
      layers[back].classList.add('is-active');
      layers[front].classList.remove('is-active');
      front = back;
    });

    buttons.forEach(function (b, i) {
      var on = i === index;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });

    current = index;
    if (photoNum) photoNum.textContent = pad(index + 1);
    applyAccent(src);
  }

  // preload the neighbours of the current photo rather than all seven up front
  function warm(index) {
    [index - 1, index + 1].forEach(function (i) {
      var b = buttons[i];
      if (b && !b.dataset.warm) {
        b.dataset.warm = '1';
        var img = new Image();
        img.src = b.dataset.src;
      }
    });
  }
  warm(0);

  // restore the saved theme now that applyAccent and the dots exist
  var saved = 'dark';
  try {
    var q = new URLSearchParams(location.search).get('theme');
    saved = q || localStorage.getItem('theme') || 'dark';
  } catch (e) {}
  setTheme(saved, false);

  buttons.forEach(function (btn, i) {
    btn.addEventListener('mouseenter', function () {
      if (!btn.dataset.warm) {
        btn.dataset.warm = '1';
        var img = new Image();
        img.src = btn.dataset.src;
      }
    });
    btn.addEventListener('click', function () {
      show(i);
      warm(i);
    });
    // left/right (or up/down) arrows move through the scenes
    btn.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % buttons.length;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + buttons.length) % buttons.length;
      if (next === null) return;
      e.preventDefault();
      buttons[next].focus();
      show(next);
      warm(next);
    });
  });

  /* ---- scroll: progress bar, nav state, hero parallax ---- */
  var nav = document.getElementById('nav');
  var bar = document.getElementById('progressBar');
  var heroEl = document.querySelector('.hero');
  var heroInner = document.querySelector('.hero__inner');
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;

      nav.classList.toggle('is-scrolled', y > 40);
      document.documentElement.classList.toggle('is-scrolled', y > 40);

      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

      // the hero lifts away and is gone by halfway down its own height.
      // drifting upward rather than downward means it leaves the frame instead
      // of sliding toward the section underneath it.
      if (heroInner && !reduced) {
        var span = (heroEl ? heroEl.offsetHeight : window.innerHeight) * 0.55;
        var p = Math.min(1, y / span);
        heroInner.style.transform = 'translate3d(0,' + (p * -38).toFixed(1) + 'px,0)';
        heroInner.style.opacity = String(1 - p);
      }

      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- hero drifts a few pixels with the pointer ---- */
  if (!reduced && window.matchMedia('(pointer: fine)').matches) {
    var bgLayers = document.querySelectorAll('.bg__layer');
    heroEl.addEventListener('mousemove', function (e) {
      var dx = (e.clientX / window.innerWidth - 0.5);
      var dy = (e.clientY / window.innerHeight - 0.5);
      bgLayers.forEach(function (l) {
        l.style.setProperty('--px', (dx * -14).toFixed(2) + 'px');
        l.style.setProperty('--py', (dy * -10).toFixed(2) + 'px');
      });
    });
  }

  if (reduced || !('IntersectionObserver' in window)) return;

  /* ---- split section leads into words so they can come in one at a time ---- */
  document.querySelectorAll('.section-lead').forEach(function (p) {
    var words = p.textContent.trim().split(/\s+/);
    p.textContent = '';
    words.forEach(function (word, i) {
      var span = document.createElement('span');
      span.className = 'w';
      span.style.setProperty('--w', Math.min(i, 26));
      span.textContent = word;
      p.appendChild(span);
      if (i < words.length - 1) p.appendChild(document.createTextNode(' '));
    });
  });

  /* ---- reveal on scroll, staggered within each section ---- */
  document.querySelectorAll('.panel .wrap').forEach(function (wrap) {
    var kids = wrap.querySelectorAll(
      ':scope > .sec-num, :scope > .section-title, :scope > .section-lead, ' +
      ':scope > .now-grid > *, :scope > .role, :scope > .kit > div, ' +
      ':scope > .proj, :scope > .also, :scope > .contact__actions'
    );
    kids.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.setProperty('--d', Math.min(i, 4));
    });
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px 14% 0px', threshold: 0.01 });

  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  /* ---- the accent tick on each panel's top edge ---- */
  var lit = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-lit');
        lit.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });
  document.querySelectorAll('.panel').forEach(function (el) { lit.observe(el); });

  /* ---- nav highlights the section you're in ---- */
  var spyLinks = {};
  document.querySelectorAll('[data-spy]').forEach(function (a) { spyLinks[a.dataset.spy] = a; });

  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var link = spyLinks[entry.target.id];
      if (link) link.classList.toggle('is-current', entry.isIntersecting);
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  ['now', 'experience', 'work'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) spy.observe(el);
  });
})();
