document.addEventListener('DOMContentLoaded',function(){
  // Mobile menu toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('primary-menu');
  toggle && toggle.addEventListener('click', ()=>{
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('show');
  });

  // Close menu on link click (mobile)
  document.querySelectorAll('#primary-menu a').forEach(a=>{
    a.addEventListener('click', ()=>{
      menu.classList.remove('show');
      toggle && toggle.setAttribute('aria-expanded','false');
    });
  });

  // Submenu toggle behavior (accessible)
  document.querySelectorAll('.submenu-toggle').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      // close other submenus
      document.querySelectorAll('.submenu').forEach(s=>{
        if(s !== btn.nextElementSibling) s.classList.remove('show');
      });
      document.querySelectorAll('.submenu-toggle').forEach(b=>{ if(b!==btn) b.setAttribute('aria-expanded','false'); });
      btn.setAttribute('aria-expanded', String(!expanded));
      btn.nextElementSibling.classList.toggle('show');
      e.stopPropagation();
    });
    // keyboard activation (Enter / Space)
    btn.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar'){
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Close submenus when clicking outside
  document.addEventListener('click', (e)=>{
    if(!e.target.closest('.has-submenu')){
      document.querySelectorAll('.submenu').forEach(s=>s.classList.remove('show'));
      document.querySelectorAll('.submenu-toggle').forEach(b=>b.setAttribute('aria-expanded','false'));
    }
  });

  // Fade in on scroll
  const io = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
      }
    });
  },{threshold:0.12});
  document.querySelectorAll('.fade-in').forEach(el=>io.observe(el));

  // Smooth focus for hash navigation
  if(location.hash){
    const target = document.querySelector(location.hash);
    target && setTimeout(()=>target.scrollIntoView({behavior:'smooth'}),100);
  }
});
