/* =====================================================
                    THEME SWITCHER
===================================================== */
const themeBtn = document.getElementById("themeBtn");

// Check saved preference from LocalStorage
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
    if (themeBtn) themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
}

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");
        const isLight = document.body.classList.contains("light");

        themeBtn.innerHTML = isLight
            ? '<i class="fa-solid fa-moon"></i>'
            : '<i class="fa-solid fa-sun"></i>';

        localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
    });
}

/* =====================================================
                    MOBILE NAVIGATION
===================================================== */
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".navbar nav");
const navLinks = document.querySelectorAll(".navbar nav a");

if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("show");
        menuBtn.setAttribute("aria-expanded", isOpen);
        menuBtn.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("show");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

/* =====================================================
                    SMOOTH SCROLLING & ACTIVE NAV
===================================================== */
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
    // Dynamic Navbar Background Shadow on Scroll
    if (window.scrollY > 50) {
        navbar?.classList.add("scrolled");
    } else {
        navbar?.classList.remove("scrolled");
    }

    // Active Nav Indicator
    let currentSection = "";
    const scrollY = window.scrollY;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});

/* =====================================================
                    TYPING ANIMATION
===================================================== */
const typingElement = document.querySelector(".typing-text");

if (typingElement) {
    const roles = ["Student", "Programmer", "Web Developer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeEffect = () => {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 80 : 120;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = 2000; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    };

    // Start Animation
    typeEffect();
}

/* =====================================================
                    BACK TO TOP BUTTON
===================================================== */
const topBtn = document.getElementById("topBtn");

if (topBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            topBtn.classList.add("show");
        } else {
            topBtn.classList.remove("show");
        }
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* =====================================================
                    CONTACT FORM HANDLING
===================================================== */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nameInput = document.getElementById("name");
        const submitBtn = contactForm.querySelector("button[type='submit']");
        const name = nameInput ? nameInput.value.trim() : "Friend";

        if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = 'Sent Successfully! <i class="fa-solid fa-check"></i>';
                submitBtn.style.backgroundColor = "#4caf50";

                setTimeout(() => {
                    alert(`Thank you, ${name}! Your message has been sent.`);
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = "";
                    submitBtn.disabled = false;
                }, 1000);
            }, 1200);
        }
    });
}

/* =====================================================
                    SCROLL REVEAL ANIMATION
===================================================== */
const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    revealElements.forEach(element => revealObserver.observe(element));
}