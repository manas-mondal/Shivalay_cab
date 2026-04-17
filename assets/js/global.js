/* --- Navbar Hamburger --- */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

function toggleMenu() {
  const isOpen = hamburger.classList.toggle("open");
  mobileMenu.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", isOpen);
  mobileMenu.setAttribute("aria-hidden", !isOpen);
  if (!isOpen) {
    hamburger.blur();
  }
}

hamburger.addEventListener("click", toggleMenu);

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    hamburger.blur();
  });
});

// Close menu on ESC key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
    hamburger.classList.remove("open");
    mobileMenu.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    hamburger.blur();
  }
});

/* --- Navbar scroll effect --- */
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* --- Scroll to top visibility --- */
const scrollTopBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
});
