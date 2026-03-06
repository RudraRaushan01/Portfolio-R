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
    // Initialise EmailJS with your Public Key
    // Get it from: https://dashboard.emailjs.com/admin/account
    emailjs.init("C7t9Dk01_BiOXk1pV");

    const contactForm = document.getElementById("contactForm");
    const statusDiv = document.getElementById("formStatus");

    function showStatus(message, isSuccess) {
        statusDiv.textContent = message;
        statusDiv.style.display = "block";
        statusDiv.style.color = isSuccess ? "#4ade80" : "#f87171";
        statusDiv.style.fontWeight = "500";
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const submitBtn = document.getElementById("contactSubmitBtn");

            // Validate fields
            const name = document.getElementById("from_name").value.trim();
            const email = document.getElementById("from_email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                showStatus("Please fill in all fields before sending.", false);
                return;
            }

            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
            statusDiv.style.display = "none";

            emailjs.send("service_wqw5oz5", "template_kwi1u78", {
                from_name: name,
                from_email: email,
                message: message
            })
            .then(function () {
                showStatus("✅ Message sent! I'll get back to you soon.", true);
                contactForm.reset();
            })
            .catch(function (error) {
                console.error("EmailJS error:", error);
                showStatus("❌ Failed to send. Please try again or email me directly.", false);
            })
            .finally(function () {
                submitBtn.textContent = "Send Message";
                submitBtn.disabled = false;
            });
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
