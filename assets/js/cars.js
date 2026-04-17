/* ========================
   Car Listing — cars.js
   Filter tabs + scroll-reveal
 ======================== */

/* ---- FILTER TABS ---- */
const filterTabs = document.querySelectorAll(".filter-tab");
const categoryBlocks = document.querySelectorAll(".car-category-block");

filterTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    filterTabs.forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    categoryBlocks.forEach((block) => {
      if (filter === "all" || block.dataset.category === filter) {
        block.classList.remove("hidden");
        block.querySelectorAll(".car-card.reveal").forEach((c) => {
          c.classList.remove("in-view");
          requestAnimationFrame(() => observer.observe(c));
        });
      } else {
        block.classList.add("hidden");
      }
    });

    const listing = document.getElementById("car-listing");
    if (listing) listing.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ---- SCROLL-REVEAL ---- */
const cards = document.querySelectorAll(".car-card");
const categoryLabels = document.querySelectorAll(".category-label");

cards.forEach((card) => card.classList.add("reveal"));
categoryLabels.forEach((label) => label.classList.add("reveal"));
categoryBlocks.forEach((block) => block.classList.add("reveal"));

document.querySelectorAll(".cars-grid").forEach((grid) => {
  grid.querySelectorAll(".car-card").forEach((card, i) => {
    card.style.transitionDelay = `${i * 80}ms`;
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);

cards.forEach((card) => observer.observe(card));
categoryLabels.forEach((label) => observer.observe(label));
categoryBlocks.forEach((block) => observer.observe(block));
