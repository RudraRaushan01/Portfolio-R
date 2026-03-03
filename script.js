document.addEventListener("DOMContentLoaded", () => {
    // Initial load
    initGlobal();
    initNavigation();
    initPage();
});

// Global components (Header, Mobile Menu)
function initGlobal() {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");

    if (hamburger && navLinks) {
        // Clone and replace to strip existing listeners
        const newHamburger = hamburger.cloneNode(true);
        hamburger.parentNode.replaceChild(newHamburger, hamburger);
        
        const currentHamburger = document.querySelector(".hamburger");
        
        currentHamburger.addEventListener("click", () => {
             toggleMobileMenu(navLinks, currentHamburger);
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener("click", () => {
                if (navLinks.classList.contains("mobile-active")) {
                    toggleMobileMenu(navLinks, currentHamburger);
                }
            });
        });
    }
}

function toggleMobileMenu(navLinks, hamburgerBtn) {
    navLinks.classList.toggle("mobile-active");
    const icon = hamburgerBtn.querySelector("i");
    if (navLinks.classList.contains("mobile-active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
}

// Initialize Navigation
function initNavigation() {
    // Smooth scrolling is handled by CSS (html { scroll-behavior: smooth; })
    // But we need to update active link on scroll
    
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Offset for fixed header (80px) + some buffer
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });
}

// Page-specific Logic
function initPage() {
    // 1. Typing Effect for Hero Section
    initTypingEffect();

    // 2. Dynamic Year in Footer
    initFooterYear();

    // 3. Contact Form Submission
    initContactForm();

    // 4. Qualification Tabs
    initQualificationTabs();
}

function initTypingEffect() {
    const typingTextElement = document.querySelector(".typing-text");
    if (typingTextElement && !typingTextElement.querySelector("span")) {
        const words = ["Developer", "Engineer", "Architect", "Enthusiast"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        let timerId = null;

        function type() {
            const currentElement = document.querySelector(".typing-text");
            if (!currentElement) return;

            const currentWord = words[wordIndex];

            if (isDeleting) {
                currentElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                currentElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            timerId = setTimeout(type, typeSpeed);
        }

        if (typingTextElement.parentElement.classList.contains("role")) {
             type();
        }
    }
}

function initFooterYear() {
    const footerYear = document.querySelector("footer p");
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        if (footerYear.innerText.includes("2024")) {
             footerYear.innerHTML = footerYear.innerHTML.replace("2024", currentYear);
        }
    }
}

function initContactForm() {
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
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert("Message sent successfully!");
                    contactForm.reset();
                } else {
                    const body = await response.json().catch(() => null);
                    const msg = body && body.error ? body.error : 'Failed to send message. Please try again.';
                    alert(msg);
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
}

function initQualificationTabs() {
    const tabs = document.querySelectorAll(".qualification-button");
    const contents = document.querySelectorAll(".qualification-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const target = document.querySelector(tab.dataset.target);

            // Remove active class from all tabs & contents
            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            // Add active class to clicked tab & target content
            tab.classList.add("active");
            target.classList.add("active");
        });
    });
}
