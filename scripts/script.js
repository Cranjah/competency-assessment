/* ==========================================================
   Academic Competency Portfolio
   main.js
   Version 1.0
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initDarkMode();
    initCounterAnimation();
    initProgressBars();
    initNavigation();
    initBackToTop();
    initScrollReveal();
    initPrintButton();

});


/* ==========================================================
   DARK MODE
========================================================== */

function initDarkMode() {

    const button = document.getElementById("theme-toggle");

    if (!button) return;

    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark") {

        document.body.classList.add("dark");

    }

    button.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

    });

}


/* ==========================================================
   ECTS COUNTER
========================================================== */

function initCounterAnimation() {

    const counters = document.querySelectorAll(".counter");

    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = parseInt(counter.dataset.target);

            animateCounter(counter, target);

            observer.unobserve(counter);

        });

    });

    counters.forEach(counter => observer.observe(counter));

}

function animateCounter(element, target) {

    let value = 0;

    const duration = 1500;

    const step = Math.max(1, Math.ceil(target / (duration / 16)));

    function update() {

        value += step;

        if (value > target) value = target;

        element.textContent = value;

        if (value < target) {

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);

}


/* ==========================================================
   PROGRESS BARS
========================================================== */

function initProgressBars() {

    const bars = document.querySelectorAll(".progress-fill");

    if (!bars.length) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const fill = entry.target;

            fill.style.width = fill.dataset.width;

            observer.unobserve(fill);

        });

    });

    bars.forEach(bar => observer.observe(bar));

}


/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

function initNavigation() {

    const current = window.location.pathname.split("/").pop();

    document.querySelectorAll("nav a").forEach(link => {

        if (link.getAttribute("href") === current) {

            link.classList.add("active");

        }

    });

}


/* ==========================================================
   BACK TO TOP
========================================================== */

function initBackToTop() {

    const button = document.getElementById("back-to-top");

    if (!button) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            button.classList.add("visible");

        }

        else {

            button.classList.remove("visible");

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* ==========================================================
   SCROLL REVEAL
========================================================== */

function initScrollReveal() {

    const items = document.querySelectorAll(".reveal");

    if (!items.length) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

            }

        });

    }, {

        threshold: 0.15

    });

    items.forEach(item => observer.observe(item));

}


/* ==========================================================
   PRINT BUTTON
========================================================== */

function initPrintButton() {

    const button = document.getElementById("print-button");

    if (!button) return;

    button.addEventListener("click", () => {

        window.print();

    });

}


/* ==========================================================
   HAMBURGER MENU
========================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navList = document.querySelector("nav ul");

if (menuToggle && navList) {

    menuToggle.addEventListener("click", () => {

        navList.classList.toggle("active");

        const isOpen = navList.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Menü schließen" : "Menü öffnen"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });

}