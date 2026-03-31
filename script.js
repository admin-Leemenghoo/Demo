(function() {
  // Select elements scoped to the component
  const container = document.querySelector('.ms-login-container');
  const anchor = document.querySelector('.ms-login-card-anchor');
  const card = document.querySelector('.ms-login-card');
  // Add interaction listener for 3D Tilt Effect
  if (container && anchor) {
    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      const rotateX = (mouseY / (rect.height / 2)) * -12;
      const rotateY = (mouseX / (rect.width / 2)) * 12;
      anchor.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      // Parallax effect for the content layers
      const content = card.querySelector('.ms-login-content');
      if (content) {
        content.style.transform = `translateX(${rotateY * 0.4}px) translateY(${rotateX * -0.4}px)`;
      }
      // Slight movement of background for depth
      container.style.backgroundPosition = `${50 + (mouseX / rect.width) * 2}% ${50 + (mouseY / rect.height) * 2}%`;
    });
    // Reset on mouse leave
    container.addEventListener('mouseleave', () => {
      anchor.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
      anchor.style.transform = 'rotateX(0deg) rotateY(0deg)';
      const content = card.querySelector('.ms-login-content');
      if (content) {
        content.style.transform = 'none';
      }
      container.style.backgroundPosition = 'center';
      setTimeout(() => {
        anchor.style.transition = 'transform 0.1s ease-out';
      }, 600);
    });
  }
  // Handle Form Submission visual feedback
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
      // Simulated authentication delay
      setTimeout(() => {
        textSpan.innerText = 'ACCESS DENIED: CLEARANCE LEVEL 7 REQUIRED';
        btn.style.background = '#ff0000';
        setTimeout(() => {
          textSpan.innerText = originalText;
          btn.style.background = '';
          btn.style.pointerEvents = 'all';
        }, 2500);
      }, 1800);
    });
  }
})();
