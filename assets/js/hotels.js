/* ========================
  Hotel Listing Filter Tabs
======================== */
const hotelFilterTabs = document.querySelectorAll('.filter-tab');
const hotelCategoryBlocks = document.querySelectorAll('.hotel-category-block');

hotelFilterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;

    // Update active tab
    hotelFilterTabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    // Show/hide category blocks
    hotelCategoryBlocks.forEach(block => {
      if (filter === 'all' || block.dataset.category === filter) {
        block.classList.remove('hidden');
      } else {
        block.classList.add('hidden');
      }
    });

    // Smooth scroll to listing section
    const listing = document.getElementById('hotel-listing');
    if (listing) {
      listing.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ========================
  Scroll Reveal Animation
======================== */
const revealElements = document.querySelectorAll('.hotel-card, .category-label, .cat-pill');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
  el.classList.add('reveal-item');
  revealObserver.observe(el);
});
