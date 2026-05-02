/* =========================================================
   SANTHIYA K — PORTFOLIO  |  main.js
   Features: Theme toggle, typing animation, AOS scroll,
             project filtering, mobile nav, contact form
   ========================================================= */

(() => {
  'use strict';

  /* ─── THEME ────────────────────────────────────────────── */
  const html       = document.documentElement;
  const themeBtn   = document.getElementById('themeBtn');
  const themeIcon  = document.getElementById('themeIcon');

  const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const applyTheme = (t) => {
    html.setAttribute('data-theme', t);
    themeIcon.textContent = t === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', t);
  };
  applyTheme(savedTheme);
  themeBtn.addEventListener('click', () => {
    applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ─── MOBILE MENU ───────────────────────────────────────── */
  const menuBtn   = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
  });

  /* ─── ACTIVE NAV LINK ON SCROLL ─────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
  const activateNav = () => {
    let active = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) active = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + active);
    });
  };
  window.addEventListener('scroll', activateNav, { passive: true });
  activateNav();

  /* ─── TYPING ANIMATION ──────────────────────────────────── */
  const roles = [
    'Backend Developer',
    'Java Enthusiast',
    'Problem Solver',
    'DSA Practitioner',
    'Full Stack Developer'
  ];
  const typedEl = document.getElementById('typedText');
  let roleIdx = 0, charIdx = 0, deleting = false;
  const typeLoop = () => {
    const current = roles[roleIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) { deleting = true; return setTimeout(typeLoop, 1800); }
    } else {
      typedEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
    }
    setTimeout(typeLoop, deleting ? 60 : 100);
  };
  setTimeout(typeLoop, 600);

  /* ─── SCROLL AOS ──────────────────────────────────────────  */
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = +(e.target.dataset.aosDelay || 0);
        setTimeout(() => e.target.classList.add('aos-animate'), delay);
        aosObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

  /* ─── SKILL BAR ANIMATION ───────────────────────────────── */
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill[data-level]').forEach(bar => {
          setTimeout(() => { bar.style.width = bar.dataset.level + '%'; }, 200);
        });
        skillObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  const skillSection = document.getElementById('skills');
  if (skillSection) skillObserver.observe(skillSection);

  /* ─── PROJECT FILTERING ─────────────────────────────────── */
  const filterBtns    = document.querySelectorAll('.filter-btn');
  const projectCards  = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tag = btn.dataset.filter;
      projectCards.forEach(card => {
        const show = tag === 'all' || card.dataset.tags.includes(tag);
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.animation = 'none';
          requestAnimationFrame(() => {
            card.style.animation = 'fadeUp 0.4s ease both';
          });
        }
      });
    });
  });

  /* ─── SKILLS CATEGORY FILTER ────────────────────────────── */
  const catBtns   = document.querySelectorAll('.cat-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      skillCards.forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
      });
    });
  });

  /* ─── CONTACT FORM ──────────────────────────────────────── */
  const form   = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name    = data.get('name').trim();
      const email   = data.get('email').trim();
      const message = data.get('message').trim();
      if (!name || !email || !message) {
        status.textContent = 'Please fill in all fields.';
        status.className   = 'form-status error';
        return;
      }
      const sub  = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:sandkrish3511@gmail.com?subject=${sub}&body=${body}`;
      status.textContent = '✓ Opening your mail app…';
      status.className   = 'form-status success';
      form.reset();
    });
  }

  /* ─── FOOTER YEAR ───────────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
