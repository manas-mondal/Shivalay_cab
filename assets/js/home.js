/* --- Active nav link on scroll --- */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
      }
    });
  },
  { threshold: 0.4 },
);

sections.forEach((sec) => sectionObserver.observe(sec));

/* --- Section headers fade-up animation --- */
const sectionHeaders = document.querySelectorAll(
  "#car-categories .section-header, #featured-cars .section-header, #hotels .section-header, #services .section-header, #why-us .section-header, #gallery .section-header, #contact .section-header",
);

const headerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        headerObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

sectionHeaders.forEach((header) => headerObserver.observe(header));

/* --- Contact grid animation --- */
const contactGrid = document.querySelector("#contact .contact-grid");

const contactObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        contactObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

if (contactGrid) {
  contactObserver.observe(contactGrid);
}

/* --- Card fade-in animations on scroll --- */
const fadeEls = document.querySelectorAll(
  ".cat-card, .car-card, .hotel-card, .service-card, .why-card, .gallery-item, .contact-info-item",
);

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = entry.target.style.transform
            ? entry.target.style.transform.replace(
                "translateY(20px)",
                "translateY(0)",
              )
            : "translateY(0)";
        }, 80);
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

fadeEls.forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = `opacity 0.5s ease ${(i % 4) * 0.08}s, transform 0.5s ease ${(i % 4) * 0.08}s, box-shadow 0.3s ease, border-color 0.3s ease`;
  fadeObserver.observe(el);
});

/* --- Home Page Contact Form Validation --- */
document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS
  emailjs.init("cXRIWcYT8GXVcnihW");
  const homeContactForm = document.getElementById("homeContactForm");
  const formSuccess = document.getElementById("homeFormSuccess");

  if (homeContactForm) {
    const inputs = homeContactForm.querySelectorAll("input, textarea, select");

    inputs.forEach((input) => {
      input.addEventListener("input", function () {
        if (this.classList.contains("form-error")) {
          this.classList.remove("form-error");
          const errorMsg = this.parentElement.querySelector(
            ".form-error-message",
          );
          if (errorMsg) {
            errorMsg.remove();
          }
        }
      });
    });

    homeContactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;
      let firstErrorField = null;

      inputs.forEach((input) => {
        const errorMsg = input.parentElement.querySelector(
          ".form-error-message",
        );
        if (errorMsg) {
          errorMsg.remove();
        }
        input.classList.remove("form-error");
      });

      inputs.forEach((input) => {
        const value = input.value.trim();
        const name = input.name;
        let error = "";

        if (name === "name") {
          if (!value) {
            error = "Name is required";
          } else if (value.length < 3) {
            error = "Name must be at least 3 characters";
          } else if (!/^[a-zA-Z\s]+$/.test(value)) {
            error = "Name can only contain letters and spaces";
          }
        } else if (name === "phone") {
          if (!value) {
            error = "Phone number is required";
          } else if (!/^\d{10}$/.test(value)) {
            error = "Phone must be exactly 10 digits";
          }
        } else if (name === "service") {
          if (!value) {
            error = "Please select a service";
          }
        } else if (name === "date") {
          if (!value) {
            error = "Travel date is required";
          }
        } else if (name === "passengers") {
          if (!value) {
            error = "Number of passengers is required";
          } else if (parseInt(value) < 1) {
            error = "At least 1 passenger is required";
          }
        } else if (name === "message") {
          if (!value) {
            error = "Message is required";
          } else if (value.length < 10) {
            error = "Message must be at least 10 characters";
          }
        }

        if (error) {
          isValid = false;
          input.classList.add("form-error");

          const errorElement = document.createElement("div");
          errorElement.className = "form-error-message";
          errorElement.textContent = error;
          input.parentElement.appendChild(errorElement);

          if (!firstErrorField) {
            firstErrorField = input;
          }
        }
      });

      if (!isValid && firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => {
          firstErrorField.focus();
        }, 300);
        return;
      }

      if (isValid) {
        const submitBtn = homeContactForm.querySelector(".form-submit");
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          Sending...
        `;

        emailjs
          .sendForm("service_jgl53mk", "template_t3z2p6h", homeContactForm)
          .then(function () {
            if (formSuccess) {
              formSuccess.style.display = "flex";
            }

            homeContactForm.reset();

            submitBtn.disabled = false;

            submitBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle; margin-right: 6px">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
    Send Enquiry
  `;

            setTimeout(function () {
              if (formSuccess) {
                formSuccess.style.display = "none";
              }
            }, 5000);
          })
          .catch(function (error) {
            console.error("EmailJS Error:", error);

            let errorMessage = "Something went wrong. Please try again.";

            if (error && error.text) {
              if (
                error.text.toLowerCase().includes("quota") ||
                error.text.toLowerCase().includes("limit") ||
                error.text.toLowerCase().includes("exceeded")
              ) {
                errorMessage =
                  "⚠️ Our enquiry limit has been reached for this month. Please call or WhatsApp us directly.";
              }
            }

            alert(errorMessage);

            submitBtn.disabled = false;

            submitBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
    Send Enquiry
  `;
          });
      }
    });
  }
});
