/* =========================================================
   Hanina N · Portfolio
   All content is loaded from data.json and rendered here,
   then the interactions are initialised.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- inline SVG icons (presentational, not data) ---------- */
  var SVG = {
    arrow:   '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    arrowSm: '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    phone:   '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    mail:    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4.5" width="20" height="15" rx="2.5"/><path d="m3 6 8.2 5.6a1.6 1.6 0 0 0 1.6 0L21 6"/></svg>',
    mailSm:  '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4.5" width="20" height="15" rx="2.5"/><path d="m3 6 8.2 5.6a1.6 1.6 0 0 0 1.6 0L21 6"/></svg>',
    location:'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    linkedin:'<svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.25 8.25h4.5V23h-4.5V8.25zM8 8.25h4.31v2.02h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.27c0-1.5-.03-3.42-2.08-3.42-2.08 0-2.4 1.63-2.4 3.31V23H8V8.25z"/></svg>',
    instagram:'<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5.4"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none"/></svg>'
  };

  /* ---------- small helpers ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var nbsp = function (s) { return String(s).replace(/ /g, '&nbsp;'); };
  var gradTitle = function (t) {
    return t.lead + ' <span class="grad">' + t.grad + '</span>' + (t.tail || '');
  };
  var brandHTML = function (b) {
    return '<img class="brand__mark" src="' + b.logo + '" alt="' + b.name + ' logo" width="44" height="44" />' +
           '<span class="brand__text">' + nbsp(b.name) + '<small>' + b.role + '</small></span>';
  };

  /* =========================================================
     RENDER
     ========================================================= */
  function render(d) {
    var b = d.brand;

    /* nav */
    $('navBrand').innerHTML = brandHTML(b);
    $('navLinks').innerHTML =
      d.nav.links.map(function (l) { return '<a href="' + l.href + '">' + l.label + '</a>'; }).join('') +
      '<a href="' + d.nav.cta.href + '" class="nav__cta">' + d.nav.cta.label + '</a>';

    /* hero */
    var h = d.hero;
    $('heroCopy').innerHTML =
      '<span class="badge">' + h.badge + '</span>' +
      '<h1 class="hero__title">' + gradTitle(h.title) + '</h1>' +
      '<p class="hero__lead">' + h.lead + '</p>' +
      '<form class="hero__form" id="leadForm" novalidate>' +
        '<div class="field"><input type="text" id="leadName" placeholder="Your name" autocomplete="name" required /></div>' +
        '<div class="field"><input type="email" id="leadEmail" placeholder="Your best e-mail" autocomplete="email" required /></div>' +
        '<button type="submit" class="btn btn--block">' + h.ctaText + SVG.arrow + '</button>' +
        '<p class="hero__note">' + h.note + '</p>' +
      '</form>';
    var pos = ['float-card--a', 'float-card--b', 'float-card--c'];
    var cardsHTML = h.cards.map(function (c, i) {
      var inner;
      if (c.type === 'dot') inner = '<span class="fc__dot"></span>';
      else if (c.type === 'avatars') inner = '<div class="fc__avatars">' + c.avatars.map(function (a) { return '<span>' + a + '</span>'; }).join('') + '</div>';
      else inner = '<div class="fc__icon">' + (c.icon || '') + '</div>';
      return '<div class="float-card ' + (pos[i] || '') + '">' + inner +
             '<div><strong>' + c.title + '</strong><small>' + c.sub + '</small></div></div>';
    }).join('');
    $('heroVisual').innerHTML =
      '<div class="hero__photo"><img src="' + h.photo + '" alt="' + h.photoAlt + '" /></div>' + cardsHTML;

    /* band */
    $('bandInner').innerHTML =
      '<p class="band__text">' + d.band.text + '</p>' +
      '<div class="band__stats">' + d.band.stats.map(function (s) {
        return '<div class="stat"><span class="stat__num" data-count="' + s.count + '"' +
               (s.suffix ? ' data-suffix="' + s.suffix + '"' : '') + '></span>' +
               '<span class="stat__label">' + nbsp(s.label) + '</span></div>';
      }).join('') + '</div>';

    /* about */
    var a = d.about;
    var facts = a.facts.map(function (f) {
      if (f.dob) return '<li><span>' + f.label + '</span><span id="ageValue" data-dob="' + f.dob + '">—</span></li>';
      return '<li><span>' + f.label + '</span>' + f.value + '</li>';
    }).join('');
    $('aboutInner').innerHTML =
      '<div class="about__photo reveal"><img src="' + a.photo + '" alt="' + a.photoAlt + '" />' +
        '<div class="about__photo-tag">' + nbsp(a.photoTag) + '</div></div>' +
      '<div class="about__copy reveal">' +
        '<span class="eyebrow">' + a.eyebrow + '</span>' +
        '<h2 class="section-title">' + gradTitle(a.title) + '</h2>' +
        a.paragraphs.map(function (p) { return '<p>' + p + '</p>'; }).join('') +
        '<ul class="about__facts">' + facts + '</ul>' +
        '<a href="#contact" class="btn">' + a.ctaText + SVG.arrow + '</a>' +
      '</div>';

    /* approach */
    var ap = d.approach;
    $('approachInner').innerHTML =
      '<div class="mind__copy reveal">' +
        '<span class="eyebrow">' + ap.eyebrow + '</span>' +
        '<h2 class="section-title">' + gradTitle(ap.title) + '</h2>' +
        '<p>' + ap.body + '</p>' +
        '<ul class="mind__points">' + ap.points.map(function (p) {
          return '<li><span class="mind__dot"></span>' + p + '</li>';
        }).join('') + '</ul>' +
        '<a href="#contact" class="btn">' + ap.ctaText + SVG.arrow + '</a>' +
      '</div>' +
      '<div class="mind__art reveal"><img src="' + ap.image + '" alt="' + ap.imageAlt + '" /></div>';

    /* help */
    var hp = d.help;
    $('helpInner').innerHTML =
      '<h2 class="section-title center reveal">' + gradTitle(hp.title) + '</h2>' +
      '<p class="section-sub center reveal">' + hp.sub + '</p>' +
      '<div class="help__grid">' + hp.cards.map(function (c) {
        return '<article class="hcard reveal"><div class="hcard__media" data-letter="' + c.media + '"></div>' +
               '<span class="hcard__num">' + c.num + '</span><h3>' + c.title + '</h3><p>' + c.text + '</p></article>';
      }).join('') + '</div>' +
      '<div class="center"><a href="#contact" class="btn btn--lg reveal">' + hp.ctaText + SVG.arrow + '</a></div>';

    /* expertise */
    var ex = d.expertise;
    $('expertiseInner').innerHTML =
      '<div class="expertise__head reveal"><span class="eyebrow">' + ex.eyebrow + '</span>' +
        '<h2 class="section-title">' + gradTitle(ex.title) + '</h2>' +
        '<p class="section-sub">' + ex.sub + '</p></div>' +
      '<div class="expertise__grid">' +
        '<div class="skills reveal"><h3 class="block-title">' + ex.skillsTitle + '</h3>' +
          '<div class="chips">' + ex.skills.map(function (s) { return '<span class="chip">' + s + '</span>'; }).join('') + '</div></div>' +
        '<div class="langs reveal"><h3 class="block-title">' + ex.languagesTitle + '</h3>' +
          ex.languages.map(function (l) {
            return '<div class="lang"><div class="lang__top"><span>' + l.name + '</span><em>' + l.level + '</em></div>' +
                   '<div class="bar"><i style="--w:' + l.value + '%"></i></div></div>';
          }).join('') + '</div>' +
      '</div>';

    /* journey */
    var j = d.journey;
    var tl = function (it) {
      return '<div class="tl__item"><span class="tl__time">' + it.time + '</span><h4>' + it.title +
             (it.badge ? ' <span class="topper' + (it.badgeMuted ? ' topper--mute' : '') + '">' + it.badge + '</span>' : '') +
             '</h4><p class="tl__org">' + it.org + '</p><p class="tl__desc">' + it.desc + '</p></div>';
    };
    var cred = function (c) {
      return '<li><span class="creds__ico">' + c.icon + '</span><div><strong>' + c.title + '</strong><small>' + c.sub + '</small></div></li>';
    };
    $('journeyInner').innerHTML =
      '<div class="reveal center"><span class="eyebrow">' + j.eyebrow + '</span>' +
        '<h2 class="section-title">' + gradTitle(j.title) + '</h2></div>' +
      '<div class="journey__grid">' +
        '<div class="timeline reveal"><h3 class="block-title"><span class="dotmark"></span>' + j.experienceTitle + '</h3>' +
          '<div class="tl">' + j.experience.map(tl).join('') + '</div></div>' +
        '<div class="timeline reveal"><h3 class="block-title"><span class="dotmark"></span>' + j.educationTitle + '</h3>' +
          '<div class="tl">' + j.education.map(tl).join('') + '</div></div>' +
      '</div>' +
      '<div class="creds">' +
        '<div class="creds__col reveal"><h3 class="block-title">' + j.achievementsTitle + '</h3>' +
          '<ul class="creds__list">' + j.achievements.map(cred).join('') + '</ul></div>' +
        '<div class="creds__col reveal"><h3 class="block-title">' + j.certificatesTitle + '</h3>' +
          '<ul class="creds__list">' + j.certificates.map(cred).join('') + '</ul></div>' +
      '</div>';

    /* sessions */
    var se = d.sessions;
    $('sessionsInner').innerHTML =
      '<div class="reveal center"><span class="eyebrow">' + se.eyebrow + '</span>' +
        '<h2 class="section-title">' + gradTitle(se.title) + '</h2>' +
        '<p class="section-sub center">' + se.sub + '</p></div>' +
      '<div class="sgrid">' + se.items.map(function (s) {
        return '<article class="scard reveal"><span class="scard__tag">' + s.tag + '</span>' +
               '<h4>' + s.title + '</h4><p>' + s.text + '</p></article>';
      }).join('') + '</div>';

    /* reels */
    var r = d.reels;
    $('reelsInner').innerHTML =
      '<div class="reveal center"><span class="eyebrow">' + r.eyebrow + '</span>' +
        '<h2 class="section-title">' + gradTitle(r.title) + '</h2>' +
        '<p class="section-sub center">' + r.sub + '</p></div>' +
      '<div class="reels__grid">' + r.items.map(function (it) {
        var embed = 'https://www.instagram.com/reel/' + it.code + '/embed';
        var url = 'https://www.instagram.com/p/' + it.code + '/';
        return '<button class="reel reveal" type="button" data-embed="' + embed + '" data-url="' + url + '" ' +
               'aria-label="Play reel: ' + it.caption + '">' +
               '<img src="' + it.thumb + '" alt="' + it.caption + '" loading="lazy" />' +
               '<span class="reel__play" aria-hidden="true"></span>' +
               '<span class="reel__meta"><span class="reel__ig" aria-hidden="true"></span>' + it.caption + '</span></button>';
      }).join('') + '</div>' +
      '<div class="reels__more reveal"><a class="btn btn--ghost" href="' + r.moreUrl + '" target="_blank" rel="noopener">' +
        r.moreText + SVG.arrowSm + '</a></div>';

    /* contact */
    var c = d.contact;
    var rows = c.rows.map(function (row) {
      var icon = row.type === 'phone' ? SVG.phone : row.type === 'email' ? SVG.mail : SVG.location;
      var inner = '<span class="contact-row__ico">' + icon + '</span>' +
                  '<span><small>' + row.label + '</small><strong>' + row.value + '</strong></span>';
      return row.href
        ? '<a class="contact-row" href="' + row.href + '">' + inner + '</a>'
        : '<div class="contact-row contact-row--static">' + inner + '</div>';
    }).join('');
    $('contactInner').innerHTML =
      '<div class="cta__left reveal"><h2 class="cta__title">' + c.title.line1 +
        '<br><span class="grad">' + c.title.line2 + '</span><br>' + c.title.line3 + '</h2></div>' +
      '<div class="cta__right reveal">' +
        '<p class="cta__lead">' + c.lead + '</p>' +
        '<div class="cta__contacts">' + rows + '</div>' +
        '<a href="' + c.ctaHref + '" class="btn btn--lg btn--block">' + c.ctaText + SVG.arrow + '</a>' +
      '</div>';

    /* footer */
    var f = d.footer;
    var socialLabel = { linkedin: 'LinkedIn', instagram: 'Instagram', email: 'Email' };
    var socials = f.socials.map(function (s) {
      var icon = s.type === 'linkedin' ? SVG.linkedin : s.type === 'instagram' ? SVG.instagram : SVG.mailSm;
      var ext = s.type === 'email' ? '' : ' target="_blank" rel="noopener"';
      return '<a class="social" href="' + s.href + '"' + ext + ' aria-label="' + (socialLabel[s.type] || '') + '">' + icon + '</a>';
    }).join('');
    $('footerInner').innerHTML =
      '<a href="#hero" class="brand">' + brandHTML(b) + '</a>' +
      '<p class="footer__note">' + f.note + '</p>' +
      '<div class="footer__nav">' +
        '<div class="footer__links">' + f.links.map(function (l) { return '<a href="' + l.href + '">' + l.label + '</a>'; }).join('') + '</div>' +
        '<div class="footer__socials">' + socials + '</div>' +
      '</div>';
    $('footerCopy').textContent = f.copyright;

    /* document title from data (optional) */
    if (b.name && b.role) document.title = b.name + ' · ' + b.role;
  }

  /* =========================================================
     INTERACTIONS (run after render)
     ========================================================= */
  function init() {
    /* year */
    var yearEl = $('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* dynamic age from DOB */
    var ageEl = $('ageValue');
    if (ageEl) {
      var parts = (ageEl.getAttribute('data-dob') || '2002-09-08').split('-');
      var dob = new Date(+parts[0], +parts[1] - 1, +parts[2]);
      var now = new Date();
      var age = now.getFullYear() - dob.getFullYear();
      var m = now.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--;
      ageEl.textContent = age + ' years';
    }

    /* navbar scrolled state + scroll progress bar */
    var nav = $('nav');
    var prog = $('scrollProgress');
    var onScroll = function () {
      if (window.scrollY > 30) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
      if (prog) {
        var de = document.documentElement;
        var max = de.scrollHeight - de.clientHeight;
        prog.style.transform = 'scaleX(' + (max > 0 ? Math.min(window.scrollY / max, 1) : 0) + ')';
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* mobile menu */
    var toggle = $('navToggle');
    var links = $('navLinks');
    var closeMenu = function () {
      toggle.classList.remove('open');
      links.classList.remove('open');
      document.body.classList.remove('menu-open');
    };
    toggle.addEventListener('click', function () {
      var open = toggle.classList.toggle('open');
      links.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
    });
    links.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

    /* reveal on scroll */
    var revealEls = document.querySelectorAll('.reveal');
    var bars = document.querySelectorAll('.bar');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function (el, i) {
        el.style.transitionDelay = (Math.min(i % 4, 3) * 0.08) + 's';
        io.observe(el);
      });
      var barIO = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.5 });
      bars.forEach(function (bar) { barIO.observe(bar); });
    } else {
      revealEls.forEach(function (el) { el.classList.add('in'); });
      bars.forEach(function (bar) { bar.classList.add('in'); });
    }

    /* animated counters */
    var counters = document.querySelectorAll('.stat__num');
    var animateCount = function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var dur = 1400, start = null;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      var cIO = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { animateCount(e.target); obs.unobserve(e.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (cc) { cIO.observe(cc); });
    } else {
      counters.forEach(function (cc) {
        cc.textContent = (cc.getAttribute('data-count') || '') + (cc.getAttribute('data-suffix') || '');
      });
    }

    /* toast */
    var toast = $('toast');
    var toastTimer;
    var showToast = function (msg) {
      toast.textContent = msg;
      toast.classList.add('show');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 4200);
    };

    /* lead form */
    var form = $('leadForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = $('leadName').value.trim();
        var email = $('leadEmail').value.trim();
        var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!name || !emailOk) { showToast('Please enter your name and a valid e-mail.'); return; }
        var subject = encodeURIComponent('Consultation request — ' + name);
        var body = encodeURIComponent('Hi Hanina,\n\nMy name is ' + name + ' and I would like to book a consultation.\n\nReach me at: ' + email + '\n\nThank you!');
        window.location.href = 'mailto:nhanina162@gmail.com?subject=' + subject + '&body=' + body;
        showToast('Thanks, ' + name.split(' ')[0] + '! Opening your e-mail to confirm.');
        form.reset();
      });
    }

    /* reels video lightbox */
    var vmodal = $('vmodal');
    if (vmodal) {
      var vframe = $('vframe');
      var vOpen = $('vmodalOpen');
      var reels = document.querySelectorAll('.reel');
      var lastTrigger = null;
      var openModal = function (embed, url, trigger) {
        lastTrigger = trigger || null;
        vframe.src = embed;
        vOpen.href = url || '#';
        vmodal.classList.add('open');
        vmodal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        var closeBtn = $('vmodalClose');
        if (closeBtn) closeBtn.focus();
      };
      var closeModal = function () {
        vmodal.classList.remove('open');
        vmodal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        vframe.src = 'about:blank';
        if (lastTrigger && typeof lastTrigger.focus === 'function') lastTrigger.focus();
      };
      reels.forEach(function (rl) {
        rl.addEventListener('click', function () {
          openModal(rl.getAttribute('data-embed'), rl.getAttribute('data-url'), rl);
        });
      });
      vmodal.querySelectorAll('[data-close]').forEach(function (el) { el.addEventListener('click', closeModal); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && vmodal.classList.contains('open')) closeModal();
      });
    }

    /* active nav link on scroll */
    var sections = document.querySelectorAll('section[id]');
    var navAnchors = links.querySelectorAll('a');
    if ('IntersectionObserver' in window) {
      var sIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var id = e.target.getAttribute('id');
            navAnchors.forEach(function (a) {
              a.style.color = a.getAttribute('href') === '#' + id && !a.classList.contains('nav__cta') ? 'var(--text)' : '';
            });
          }
        });
      }, { threshold: 0.4, rootMargin: '-20% 0px -60% 0px' });
      sections.forEach(function (s) { sIO.observe(s); });
    }

    /* 3D tilt on cards (pointer devices, motion allowed) */
    var canHover = window.matchMedia && window.matchMedia('(hover: hover)').matches;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (canHover && !reduced) {
      document.querySelectorAll('.hcard, .scard, .reel').forEach(function (card) {
        var raf = null;
        card.addEventListener('mouseenter', function () { card.classList.add('is-tilting'); });
        card.addEventListener('mousemove', function (e) {
          if (raf) return;
          raf = requestAnimationFrame(function () {
            raf = null;
            var r = card.getBoundingClientRect();
            var px = (e.clientX - r.left) / r.width - 0.5;
            var py = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform =
              'perspective(720px) rotateX(' + (-py * 5).toFixed(2) + 'deg) rotateY(' +
              (px * 7).toFixed(2) + 'deg) translateY(-6px)';
          });
        });
        card.addEventListener('mouseleave', function () {
          card.classList.remove('is-tilting');
          card.style.transform = '';
        });
      });
    }

    /* touch feedback — highlight cards/buttons on tap (touch devices) */
    var isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouch) {
      var touchEls = document.querySelectorAll('.hcard, .scard, .reel, .btn, .contact-row:not(.contact-row--static), .social, .chip');
      touchEls.forEach(function (el) {
        el.addEventListener('touchstart', function () { el.classList.add('is-touched'); }, { passive: true });
        var clear = function () { setTimeout(function () { el.classList.remove('is-touched'); }, 260); };
        el.addEventListener('touchend', clear, { passive: true });
        el.addEventListener('touchcancel', clear, { passive: true });
      });
    }
  }

  /* =========================================================
     BOOT — fetch data.json, render, then init
     ========================================================= */
  function showDataError() {
    var box = $('dataError');
    if (!box) return;
    box.hidden = false;
    box.innerHTML =
      '<strong>Couldn’t load data.json.</strong> ' +
      'If you opened this file directly, run it through a local server so the browser can load the data:' +
      '<code>python3 -m http.server</code> then visit <code>http://localhost:8000</code>.';
  }

  fetch('data.json', { cache: 'no-cache' })
    .then(function (res) { if (!res.ok) throw new Error('HTTP ' + res.status); return res.json(); })
    .then(function (data) {
      try { render(data); } catch (e) { console.error('Render error:', e); }
      init();
    })
    .catch(function (err) {
      console.error('Could not load data.json —', err);
      showDataError();
    });
})();
