document.addEventListener("DOMContentLoaded", () => {
    // Initial load
    initGlobal();
    initNavigation(); // Set up global link interception once
    initPage();

    // Handle Browser Back/Forward
    window.onpopstate = (event) => {
        if (event.state) {
            loadContent(window.location.pathname, false);
        } else {
            // Fallback for initial state if not set
            loadContent(window.location.pathname, false);
        }
    };
});

// Global components (Header, Mobile Menu)
function initGlobal() {
    // 1. Mobile Menu Toggle
    // Clean up existing listener if replacing (crucial for re-running)
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        // Clone and replace to strip existing listeners
        const newHamburger = hamburger.cloneNode(true);
        hamburger.parentNode.replaceChild(newHamburger, hamburger);
        
        const currentHamburger = document.querySelector(".hamburger");
        
        currentHamburger.addEventListener("click", () => {
            navLinks.classList.toggle("mobile-active");

            // Animate Hamburger
            const icon = currentHamburger.querySelector("i");
            if (navLinks.classList.contains("mobile-active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    }
}

// Initialize Navigation (Run ONCE)
function initNavigation() {
    document.body.addEventListener("click", (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        // Check if it's an internal link
        const href = link.getAttribute("href");
        if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return;

        // Prevent default navigation
        e.preventDefault();
        
        // Close mobile menu if open
        const navLinks = document.querySelector(".nav-links");
        if (navLinks && navLinks.classList.contains("mobile-active")) {
            navLinks.classList.remove("mobile-active");
            const icon = document.querySelector(".hamburger i");
            if (icon) {
               icon.classList.remove("fa-xmark");
               icon.classList.add("fa-bars"); 
            }
        }

        loadContent(href);
    });
}

// Page-specific Logic
function initPage() {
    // 2. Typing Effect for Hero Section
    initTypingEffect();

    // 3. Dynamic Year in Footer
    initFooterYear();

    // 4. Contact Form Submission
    initContactForm();

    // 5. Highlight Active Link
    updateActiveLink();

    // 6. Smooth Scrolling for Anchor Links
    initSmoothScroll();
    
    // 6. Smooth Scrolling for Anchor Links
    initSmoothScroll();
    
    // 7. No need to re-attach global interceptors because of Event Delegation in initNavigation()
}

async function loadContent(url, push = true) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to load page");

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Swap Main Content
        const newMain = doc.querySelector("main");
        const currentMain = document.querySelector("main");
        
        if (newMain && currentMain) {
            // Instant Swap
            currentMain.innerHTML = newMain.innerHTML;
            
            // Update Title
            document.title = doc.title;

            // Update URL
            if (push) {
                window.history.pushState({}, "", url);
            }

            // Scroll to top
            window.scrollTo(0, 0);

            // Re-initialize scripts
            initPage();
        }

    } catch (error) {
        console.error("Error loading page:", error);
    }
}

function initTypingEffect() {
    const typingTextElement = document.querySelector(".typing-text");
    if (typingTextElement && !typingTextElement.querySelector("span")) {
        const words = ["Developer", "Engineer", "Architect", "Enthusiast"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        let timerId = null; // Store timer to clear if needed

        function type() {
            // Check if element still exists (user might have navigated away)
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

        // Check helper to prevent overwriting if already running/initialized
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
}

function updateActiveLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-links a");
    
    navLinks.forEach(link => {
        link.classList.remove("active");
        
        // Exact match or default home
        const href = link.getAttribute("href");
        
        // Handle / vs /index.html and clean URLs
        const cleanPath = currentPath.replace(".html", "").replace(/^\//, "");
        const cleanHref = href.replace(".html", "").replace(/^\//, "");

        if (cleanPath === cleanHref || (cleanPath === "" && cleanHref === "index")) {
            link.classList.add("active");
        }
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        // Clone to replace/remove old listeners
        const newAnchor = anchor.cloneNode(true);
        anchor.parentNode.replaceChild(newAnchor, anchor);
        
        newAnchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}
