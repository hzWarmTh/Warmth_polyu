// Lightweight interactivity: theme toggle, copy-to-clipboard, mobile menu
(function(){
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const yearEl = document.getElementById('year');
  yearEl.textContent = new Date().getFullYear();

  // theme (persisted)
  const stored = localStorage.getItem('site-theme');
  if(stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)){
    document.documentElement.classList.add('dark');
    themeIcon.textContent = '☀️';
  } else {
    document.documentElement.classList.remove('dark');
    themeIcon.textContent = '🌙';
  }
  themeToggle.addEventListener('click', ()=>{
    const isDark = document.documentElement.classList.toggle('dark');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('site-theme', isDark ? 'dark' : 'light');
  });

  // mobile menu
  mobileBtn.addEventListener('click', ()=>{
    mobileMenu.classList.toggle('hidden');
  });

  // copy helpers
  async function copy(text, el){
    try{
      await navigator.clipboard.writeText(text);
      const prev = el.innerHTML;
      el.textContent = 'Copied ✓';
      setTimeout(()=> el.innerHTML = prev, 1600);
    }catch(e){
      alert('Copy failed — please copy manually: ' + text);
    }
  }

  const emailBtn = document.getElementById('email-btn');
  const emailCopy2 = document.getElementById('email-copy-2');
  const copyProject = document.getElementById('copy-project');
  const EMAIL = '1269377196@qq.com';
  const PROJECT = 'https://v0-smart-mcq-platform.vercel.app/';

  emailBtn && emailBtn.addEventListener('click', (e)=> copy(EMAIL, e.currentTarget));
  emailCopy2 && emailCopy2.addEventListener('click', (e)=> copy(EMAIL, e.currentTarget));
  copyProject && copyProject.addEventListener('click', (e)=> copy(PROJECT, e.currentTarget));

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const href = a.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({behavior:'smooth', block:'start'});
        mobileMenu.classList.add('hidden');
      }
    });
  });
})();
