(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.strip__btn'));
  var photoNum = document.getElementById('photoNum');
  var current = 0;

  function pad(n) { return (n < 10 ? '0' : '') + n; }

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
    // left/right (or up/down) arrows move through the strip
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
  var heroInner = document.querySelector('.hero__inner');
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY;

      nav.classList.toggle('is-scrolled', y > 40);

      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

      // hero drifts a little slower than the page and fades as it leaves
      if (heroInner && !reduced) {
        var vh = window.innerHeight;
        if (y < vh) {
          heroInner.style.transform = 'translate3d(0,' + (y * 0.18) + 'px,0)';
          heroInner.style.opacity = String(Math.max(0, 1 - (y / vh) * 1.35));
        }
      }

      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (reduced || !('IntersectionObserver' in window)) return;

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
  }, { rootMargin: '0px 0px 6% 0px', threshold: 0.02 });

  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

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
