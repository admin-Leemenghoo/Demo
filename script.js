(function() {
  // Elements
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
      spans[0].style.transform = navMenu.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
      spans[1].style.opacity = navMenu.classList.contains('open') ? '0' : '1';
      spans[2].style.transform = navMenu.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
    });
  }
  // 3D Tilt Effect (restricted to only trigger on deskop/larger devices for UX)
  if (container && anchor && window.innerWidth > 768) {
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      const rotateX = (mouseY / (rect.height / 2)) * -10;
      const rotateY = (mouseX / (rect.width / 2)) * 10;
      anchor.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      const content = card.querySelector('.ms-login-content');
      if (content) {
        content.style.transform = `translateX(${rotateY * 0.3}px) translateY(${rotateX * -0.3}px)`;
      }
      container.style.backgroundPosition = `${50 + (mouseX / rect.width) * 2}% ${50 + (mouseY / rect.height) * 2}%`;
    });
    container.addEventListener('mouseleave', () => {
      anchor.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
      anchor.style.transform = 'rotateX(0deg) rotateY(0deg)';
      const content = card.querySelector('.ms-login-content');
      if (content) content.style.transform = 'none';
      container.style.backgroundPosition = 'center';
      setTimeout(() => {
        anchor.style.transition = 'transform 0.1s ease-out';
      }, 600);
    });
  }
  // Form Simulation
  const form = document.querySelector('.ms-login-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.ms-login-submit');
      const textSpan = btn.querySelector('.ms-btn-text');
      const originalText = textSpan.innerText;
      btn.style.pointerEvents = 'none';
      textSpan.innerText = 'BYPASSING FIREWALL...';
      btn.style.background = '#333';
      setTimeout(() => {
        textSpan.innerText = 'ACCESS DENIED: LEVEL 7 REQUIRED';
        btn.style.background = '#ff0000';
        setTimeout(() => {
          textSpan.innerText = originalText;
          btn.style.background = '';
          btn.style.pointerEvents = 'all';
        }, 2000);
      }, 1500);
    });
  }
})();
