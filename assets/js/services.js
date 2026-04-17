/* ========================
   SERVICES PAGE — services.js
   Scroll reveal animations only.
   No jQuery or frameworks.
======================== */

(function() {
  'use strict';

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const revealOnScroll = function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  };

  const observer = new IntersectionObserver(revealOnScroll, observerOptions);

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(function(el) {
    observer.observe(el);
  });

  const staggerCards = function() {
    const sections = [
      { selector: '.services-grid .service-card', delay: 100 },
      { selector: '.why-grid .why-card', delay: 120 },
      { selector: '.process-steps .step-card', delay: 150 }
    ];

    sections.forEach(function(section) {
      const cards = document.querySelectorAll(section.selector);
      cards.forEach(function(card, index) {
        card.style.transitionDelay = (index * section.delay) + 'ms';
      });
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', staggerCards);
  } else {
    staggerCards();
  }

})();
