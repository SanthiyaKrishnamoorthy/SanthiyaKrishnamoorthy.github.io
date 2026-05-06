(() => {
  'use strict';

  /* Theme */
  const html = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');
  const themeIcon = document.getElementById('themeIcon');
  const saved = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const applyTheme = t => { html.setAttribute('data-theme', t); themeIcon.textContent = t === 'dark' ? '☀️' : '🌙'; localStorage.setItem('theme', t); };
  applyTheme(saved);
  if (themeBtn) themeBtn.addEventListener('click', () => applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));

  /* Mobile menu */
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
    mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));
  }

  /* Active nav */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
  const activateNav = () => {
    let active = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) active = s.id; });
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + active));
  };
  window.addEventListener('scroll', activateNav, { passive: true });
  activateNav();

  /* Typing animation */
  const roles = ['Backend Developer', 'Java Engineer', 'DSA Practitioner', 'Problem Solver', 'API Builder', 'System Design Learner'];
  const typedEl = document.getElementById('typedText');
  if (typedEl) {
    let ri = 0, ci = 0, del = false;
    const typeLoop = () => {
      const cur = roles[ri];
      if (!del) { typedEl.textContent = cur.slice(0, ++ci); if (ci === cur.length) { del = true; return setTimeout(typeLoop, 1900); } }
      else { typedEl.textContent = cur.slice(0, --ci); if (ci === 0) { del = false; ri = (ri + 1) % roles.length; } }
      setTimeout(typeLoop, del ? 55 : 95);
    };
    setTimeout(typeLoop, 700);
  }

  /* AOS */
  const aosObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('aos-animate'), +(e.target.dataset.aosDelay || 0));
        aosObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-aos]').forEach(el => aosObs.observe(el));

  /* Project filter (new structure) */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.dataset.filter;
        projectCards.forEach(card => {
          const tags = card.dataset.tags;
          const show = filterValue === 'all' || (tags && tags.includes(filterValue));
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* Contact form */
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  if (form && statusEl) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('name')?.trim() || '';
      const email = formData.get('email')?.trim() || '';
      const message = formData.get('message')?.trim() || '';
      if (!name || !email || !message) {
        statusEl.textContent = 'Please fill in all fields.';
        statusEl.className = 'form-status error';
        return;
      }
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:sandkrish3511@gmail.com?subject=${subject}&body=${body}`;
      statusEl.textContent = '✓ Opening your mail app…';
      statusEl.className = 'form-status success';
      form.reset();
      setTimeout(() => { if (statusEl) statusEl.textContent = ''; }, 3000);
    });
  }

  /* Footer year */
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
})();
