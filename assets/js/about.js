document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('#about-intro, #mission-vision, #about-why, #about-stats, #about-cta');
  sections.forEach(section => {
    const header = section.querySelector('.section-header');
    const grid = section.querySelector('.mv-grid, .why-grid, .stats-grid');
    const cards = section.querySelectorAll('.mv-card, .why-card, .stat-card');

    if (header) {
      header.classList.add('reveal-section');
      fadeInObserver.observe(header);
    }
    if (grid) {
      grid.classList.add('reveal-section');
      fadeInObserver.observe(grid);
    }
    cards.forEach((card, i) => {
      card.classList.add('reveal-section');
      card.style.transitionDelay = `${i * 0.1}s`;
      fadeInObserver.observe(card);
    });
  });

  const aboutIntroImg = document.querySelector('.about-intro-img');
  if (aboutIntroImg) {
    aboutIntroImg.classList.add('reveal-section');
    fadeInObserver.observe(aboutIntroImg);
  }

  const aboutIntroText = document.querySelector('.about-intro-text');
  if (aboutIntroText) {
    aboutIntroText.classList.add('reveal-section');
    fadeInObserver.observe(aboutIntroText);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll('.stat-number');
        statNumbers.forEach(num => {
          const target = parseInt(num.textContent.replace(/\D/g, ''));
          if (target && !num.dataset.animated) {
            num.dataset.animated = 'true';
            animateValue(num, 0, target, 1500);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsGrid = document.querySelector('.stats-grid');
  if (statsGrid) {
    statsObserver.observe(statsGrid);
  }
});

function animateValue(element, start, end, duration) {
  const startTime = performance.now();
  const isDecimal = element.textContent.includes('+');

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * easeOut);
    element.textContent = current + (isDecimal ? '+' : '');
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}