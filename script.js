document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-active");

      // Animate Hamburger (Simple toggle for now, can be enhanced with CSS)
      const icon = hamburger.querySelector("i");
      if (navLinks.classList.contains("mobile-active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }
    });
  }

  // 2. Typing Effect for Hero Section
  const typingTextElement = document.querySelector(".typing-text");
  if (typingTextElement && !typingTextElement.querySelector("span")) {
    // Only run if the element exists and hasn't been processed
    const words = ["Developer", "Engineer", "Architect", "Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Faster deletion
      } else {
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150; // Normal typing
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end of word
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before new word
      }

      setTimeout(type, typeSpeed);
    }

    // Initialize typing only if we are on a page with that element
    if (typingTextElement.parentElement.classList.contains("role")) {
      // To prevent overwriting the static "Developer" text initially, let's clear it or handle it.
      // The HTML has "Backend <span class="typing-text">Developer</span>".
      // We want to replace "Developer" with the typing loop.
      // Actually, the HTML is: <h2 class="role">Backend <span class="typing-text">Developer</span></h2>
    }

    // Start the typing loop
    type();
  }

  // 3. Dynamic Year in Footer
  const footerYear = document.querySelector("footer p");
  if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace("2024", currentYear);
  }

  // 4. Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
      contactForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const submitButton = contactForm.querySelector('button[type="submit"]');
          const originalButtonText = submitButton.innerText;

          submitButton.innerText = "Sending...";
          submitButton.disabled = true;

          const formData = new FormData(contactForm);
          const data = Object.fromEntries(formData.entries());

          try {
              const response = await fetch('/api/contact', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
              });

              if (response.ok) {
                  alert("Message sent successfully!");
                  contactForm.reset();
              } else {
                  alert("Failed to send message. Please try again.");
              }
          } catch (error) {
              console.error("Error:", error);
              alert("An error occurred. Please try again later.");
          } finally {
              submitButton.innerText = originalButtonText;
              submitButton.disabled = false;
          }
      });
  }

  // 5. Smooth Scrolling for Anchor Links (if any remain)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
});
