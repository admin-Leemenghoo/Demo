(function() {
  const container = document.querySelector('.ms-login-container');
  const anchor = document.querySelector('.ms-login-card-anchor');
  const card = document.querySelector('.ms-login-card');
  const navToggle = document.querySelector('.ms-nav-toggle');
  const navMenu = document.querySelector('.ms-nav-menu');
  // Mobile Menu Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const spans = navToggle.querySelectorAll('span');
      if (navMenu.classList.contains('open')) {
        navMenu.style.display = 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'rgba(0,0,0,0.95)';
        navMenu.style.flexDirection = 'column';
        navMenu.style.padding = '20px';
      } else {
        navMenu.style.display = 'none';
      }
    });
  }
  // 3D Tilt Effect - strictly limited to desktop viewport
  if (container && anchor && window.innerWidth > 768) {
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      const rotateX = (mouseY / (rect.height / 2)) * -5;
      const rotateY = (mouseX / (rect.width / 2)) * 5;
      anchor.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    container.addEventListener('mouseleave', () => {
      anchor.style.transition = 'transform 0.5s ease';
      anchor.style.transform = 'rotateX(0deg) rotateY(0deg)';
      setTimeout(() => {
        anchor.style.transition = 'transform 0.1s ease-out';
      }, 500);
    });
  }
  // Form Simulation
  const form = document.querySelector('.ms-login-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.ms-login-submit');
      const originalText = btn.innerText;
      btn.innerText = 'VERIFYING...';
      btn.style.opacity = '0.7';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerText = 'ACCESS DENIED';
        btn.style.background = '#000';
        btn.style.color = '#f00';
        btn.style.opacity = '1';
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.background = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 2000);
      }, 1500);
    });
  }
})();
