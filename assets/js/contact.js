/* ========================
   CONTACT PAGE — contact.js
   Form validation and interactions
   ======================== */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS
  emailjs.init("cXRIWcYT8GXVcnihW");
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  if (contactForm) {
    const inputs = contactForm.querySelectorAll("input, textarea");

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

    contactForm.addEventListener("submit", function (e) {
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
        } else if (name === "email") {
          if (!value) {
            error = "Email is required";
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "Please enter a valid email address";
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
        contactForm.querySelector(".submit-btn").disabled = true;
        contactForm.querySelector(".submit-btn").textContent = "Sending...";

        emailjs
          .sendForm("service_jgl53mk", "template_xrro4yf", contactForm)
          .then(function () {
            formSuccess.style.display = "flex";

            contactForm.reset();

            contactForm.querySelector(".submit-btn").disabled = false;

            contactForm.querySelector(".submit-btn").innerHTML = `
    <svg
      stroke="currentColor"
      fill="none"
      stroke-width="2"
      width="18"
      height="18"
      viewBox="0 0 24 24"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
    Send Message
  `;

            setTimeout(function () {
              formSuccess.style.display = "none";
            }, 5000);
          })
          .catch(function (error) {
            alert("Failed to send message. Please try again.");

            contactForm.querySelector(".submit-btn").disabled = false;

            contactForm.querySelector(".submit-btn").innerHTML = `
    <svg
      stroke="currentColor"
      fill="none"
      stroke-width="2"
      width="18"
      height="18"
      viewBox="0 0 24 24"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
    Send Message
  `;
          });
      }
    });
  }

  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    reveals.forEach((reveal) => {
      revealObserver.observe(reveal);
    });
  }
});
