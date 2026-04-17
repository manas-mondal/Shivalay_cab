/* ========================
    Gallery Page — gallery.js
 ======================== */

/* ---- FILTER TABS ---- */
const galleryTabs = document.querySelectorAll(".filter-tab");
const galleryItems = document.querySelectorAll(".gallery-item");
const galleryEmpty = document.getElementById("galleryEmpty");

/* ---- SCROLL REVEAL ---- */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("reveal");
          }, index * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  galleryItems.forEach((item) => {
    observer.observe(item);
  });
}

galleryTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    // Update active tab
    galleryTabs.forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-selected", "false");
    });
    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    // Show / hide items
    let visible = 0;
    galleryItems.forEach((item) => {
      if (filter === "all" || item.dataset.category === filter) {
        item.classList.remove("hidden");
        visible++;
      } else {
        item.classList.add("hidden");
      }
    });

    // Empty state
    if (visible === 0) {
      galleryEmpty.classList.add("visible");
    } else {
      galleryEmpty.classList.remove("visible");
    }
  });
});

/* ---- LIGHTBOX ---- */
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lightbox-img");
const lbTitle = document.getElementById("lightbox-title");
const lbLabel = document.getElementById("lightbox-label");
const lbClose = document.getElementById("lightbox-close");
const lbPrev = document.getElementById("lightbox-prev");
const lbNext = document.getElementById("lightbox-next");
const lbInner = document.querySelector(".lightbox-inner");

let currentIndex = 0;
let visibleItems = [];

function getVisibleItems() {
  return Array.from(galleryItems).filter(
    (i) => !i.classList.contains("hidden"),
  );
}

function openLightbox(index) {
  visibleItems = getVisibleItems();
  if (!visibleItems.length) return;
  currentIndex = index;
  showLightboxImage(currentIndex);
  lightbox.classList.add("active");
  lbInner.style.animation = "none";
  lbInner.offsetHeight;
  lbInner.style.animation = "lbIn 0.35s cubic-bezier(0.4, 0, 0.2, 1) both";
  document.body.style.overflow = "hidden";
}

function showLightboxImage(index) {
  const item = visibleItems[index];
  if (!item) return;
  const img = item.querySelector("img");
  lbImg.style.opacity = "0";
  lbImg.style.transform = "scale(0.95)";
  setTimeout(() => {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbTitle.textContent = item.dataset.title || "";
    lbLabel.textContent = item.dataset.label || "";
    lbImg.style.opacity = "1";
    lbImg.style.transform = "scale(1)";
  }, 150);
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
  lbImg.src = "";
}

function prevImage() {
  visibleItems = getVisibleItems();
  currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
  showLightboxImage(currentIndex);
}

function nextImage() {
  visibleItems = getVisibleItems();
  currentIndex = (currentIndex + 1) % visibleItems.length;
  showLightboxImage(currentIndex);
}

// Open on item click
galleryItems.forEach((item, i) => {
  item.addEventListener("click", () => {
    visibleItems = getVisibleItems();
    const visibleIndex = visibleItems.indexOf(item);
    openLightbox(visibleIndex >= 0 ? visibleIndex : 0);
  });
});

lbClose.addEventListener("click", closeLightbox);
lbPrev.addEventListener("click", prevImage);
lbNext.addEventListener("click", nextImage);

// Close on backdrop click
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "ArrowRight") nextImage();
});

/* ---- INIT ---- */
document.addEventListener("DOMContentLoaded", initScrollReveal);
