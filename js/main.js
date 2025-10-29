// Basic interactive behavior: theme, mobile nav, smooth scroll, edit certs, contact form stub
(() => {
  const body = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('navbar');
  const yearEl = document.getElementById('year');
  const editCertsBtn = document.getElementById('editCertsBtn');
  const certList = document.getElementById('certList');
  const loadSample = document.getElementById('loadSample');
  const downloadResume = document.getElementById('downloadResume');

  // Set year
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme: persist in localStorage
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  if(savedTheme === 'dark') body.setAttribute('data-theme','dark');
  else body.removeAttribute('data-theme');

  themeToggle.addEventListener('click', () => {
    if(body.getAttribute('data-theme') === 'dark') {
      body.removeAttribute('data-theme');
      localStorage.setItem('theme','light');
      themeToggle.textContent = '🌙';
    } else {
      body.setAttribute('data-theme','dark');
      localStorage.setItem('theme','dark');
      themeToggle.textContent = '☀️';
    }
  });

  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', () => {
    if(nav.style.display === 'block') {
      nav.style.display = '';
    } else {
      nav.style.display = 'block';
      nav.style.position = 'absolute';
      nav.style.right = '1rem';
      nav.style.top = '64px';
      nav.style.background = 'var(--card)';
      nav.style.padding = '0.8rem';
      nav.style.borderRadius = '10px';
      nav.style.boxShadow = 'var(--shadow)';
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav
        if(window.innerWidth < 900 && nav.style.display === 'block'){
          nav.style.display = '';
        }
      }
    });
  });

  // Edit certifications (simple prompt-based editing)
  editCertsBtn.addEventListener('click', () => {
    const existing = Array.from(certList.querySelectorAll('li')).map(li => li.textContent).join('\n');
    const input = prompt('Paste your certifications (one per line). You can also paste items copied from LinkedIn page:', existing);
    if(input !== null){
      const lines = input.split('\n').map(s => s.trim()).filter(Boolean);
      certList.innerHTML = '';
      if(lines.length === 0){
        const li = document.createElement('li');
        li.textContent = 'No certifications listed here yet. Click "Edit Certifications" to paste them.';
        certList.appendChild(li);
      } else {
        for(const line of lines){
          const li = document.createElement('li');
          li.textContent = line;
          certList.appendChild(li);
        }
      }
    }
  });

  // Insert sample certs for demonstration
  loadSample.addEventListener('click', () => {
    const sample = [
      'Problem Solving (Intermediate) — HackerRank',
      'Java Programming — Coursera',
      'Data Structures & Algorithms — NPTEL'
    ];
    certList.innerHTML = '';
    for(const s of sample){
      const li = document.createElement('li');
      li.textContent = s;
      certList.appendChild(li);
    }
  });

  // Contact form handler (stub)
window.handleContact = function(e){
  e.preventDefault();
  
  const form = e.target;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // Construct mailto link
  const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  // Replace with your actual email
  const mailtoLink = `mailto:sandkrish3511@gmail.com?subject=${subject}&body=${body}`;

  // Open the user's email client
  window.location.href = mailtoLink;

  return false;
};

  // If resume link is broken, warn in console (helps during local testing)
  if(downloadResume && downloadResume.getAttribute('href') === 'resume.pdf'){
    fetch(downloadResume.getAttribute('href'), { method: 'HEAD' }).catch(()=> {
      console.info('Tip: Place your resume PDF in the site folder as "resume.pdf" or change the link in index.html.');
    });
  }

})();
