function init() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true,
        multiplier: 1,
        lerp: 0.06,
        smartphone: { smooth: true },
        tablet: { smooth: true }
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    return locoScroll;
}

const locoScrollInstance = init();

function isMobileDevice() {
    return window.innerWidth <= 768;
}

// cursor follow
var crsr = document.querySelector(".cursor");
document.addEventListener("mousemove", function (dets) {
    if (crsr) {
        crsr.style.left = dets.x + "px";
        crsr.style.top = dets.y + "px";
    }
});

// hero intro
gsap.from(".hero-eyebrow, .hero-section h1, .hero-section h2, .hero-desc", {
    y: 55,
    rotate: 4,
    scale: 0.96,
    opacity: 0,
    delay: 0.3,
    duration: 1.05,
    ease: "power3.out",
    stagger: 0.12
});

var tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".hero-section h1",
        scroller: ".main",
        start: "top 27%",
        end: "top 0",
        scrub: 3
    }
});
tl.to(".hero-section h1", { x: -180, rotate: -2, scale: 0.95 }, "anim");
tl.to(".hero-section h2", { x: 180, rotate: 2, scale: 1.04 }, "anim");

// centered statement reveal below the hero (headline lines, subtext, SM logo)
tl.to(".hero-reveal .reveal-line span", { y: "0%", stagger: 0.18, ease: "power3.out" }, "anim");
tl.to(".reveal-sub", { opacity: 1, y: 0, ease: "power2.out" }, "anim+=0.45");
tl.to(".reveal-photo-frame", { opacity: 1, y: 0, scale: 1, rotate: 0, ease: "power3.out" }, "anim+=0.58");
tl.to(".reveal-logo", { opacity: 1, ease: "power2.out" }, "anim+=0.6");

var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".hero-section h1",
        scroller: ".main",
        start: "top 5%",
        end: "top -120%",
        scrub: 3
    }
});
tl2.to(".main", { backgroundColor: "#fff" });

var tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".hero-section h1",
        scroller: ".main",
        start: "top -180%",
        end: "top -200%",
        scrub: 3
    }
});
tl3.to(".main", { backgroundColor: "#0F0D0D" });

// project reveal
gsap.utils.toArray('.project-item').forEach((item) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            scroller: ".main",
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 140,
        rotate: 1.5,
        scale: 0.96,
        duration: 1.15,
        ease: "power3.out"
    });
});

// UX/UI design strip
gsap.from(".ux-title span", {
    scrollTrigger: {
        trigger: ".ux-section",
        scroller: ".main",
        start: "top 72%",
        end: "top 18%",
        scrub: 2
    },
    y: 120,
    opacity: 0,
    scale: 0.9,
    stagger: 0.16,
    ease: "power3.out"
});

gsap.from(".ux-visual-left", {
    scrollTrigger: {
        trigger: ".ux-section",
        scroller: ".main",
        start: "top 78%",
        end: "top 20%",
        scrub: 2
    },
    x: -180,
    y: 80,
    rotate: -8,
    opacity: 0,
    ease: "power3.out"
});

gsap.from(".ux-visual-right", {
    scrollTrigger: {
        trigger: ".ux-section",
        scroller: ".main",
        start: "top 78%",
        end: "top 20%",
        scrub: 2
    },
    x: 180,
    y: -80,
    rotate: 8,
    opacity: 0,
    ease: "power3.out"
});

gsap.from(".ux-caption span", {
    scrollTrigger: {
        trigger: ".ux-section",
        scroller: ".main",
        start: "top 52%",
        end: "top 12%",
        scrub: 2
    },
    y: 36,
    opacity: 0,
    stagger: 0.1,
    ease: "power2.out"
});

// lens statement reveal
gsap.from(".lens-section h1", {
    rotate: 5,
    y: 100,
    opacity: 0,
    stagger: 1,
    scrollTrigger: {
        trigger: ".lens-section",
        scroller: ".main",
        start: "top 60%",
        end: "top 40%",
        scrub: 3
    }
});

// nav hover accent (optional purple dot, no-op if absent)
var h4 = document.querySelectorAll("#nav h4");
var purple = document.querySelector("#purple");
h4.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
        if (purple) { purple.style.display = "block"; purple.style.opacity = "1"; }
    });
    elem.addEventListener("mouseleave", function () {
        if (purple) { purple.style.display = "none"; purple.style.opacity = "0"; }
    });
});

// sticky bar visibility
const stickyBar = document.querySelector(".sticky-bar");
const clientsSection = document.querySelector(".clients");
const triggerFooter = document.querySelector(".trigger-footer");
const footerElement = document.querySelector("footer");

if (stickyBar) {
    stickyBar.style.opacity = "0";
    stickyBar.style.pointerEvents = "none";
}

function manageStickyBarVisibility() {
    if (!stickyBar || !clientsSection || !triggerFooter || !footerElement) return;

    const clientsRect = clientsSection.getBoundingClientRect();
    const triggerFooterRect = triggerFooter.getBoundingClientRect();
    const footerRect = footerElement.getBoundingClientRect();

    const clientsTop = clientsRect.top;
    const clientsBottom = clientsRect.bottom;
    const triggerFooterTop = triggerFooterRect.top;
    const footerTop = footerRect.top;

    if (clientsTop <= window.innerHeight * 0.8 && clientsBottom >= window.innerHeight * 0.2) {
        stickyBar.style.opacity = "1";
    } else if (triggerFooterTop <= window.innerHeight * 0.8) {
        stickyBar.style.opacity = "0";
    } else if (footerTop <= window.innerHeight * 0.9) {
        stickyBar.style.opacity = "0";
    } else {
        stickyBar.style.opacity = "0";
    }
}

// stack logos row breathing effect - disabled on mobile
if (!isMobileDevice()) {
    document.querySelectorAll(".row").forEach((row) => {
        ScrollTrigger.create({
            trigger: row,
            scroller: ".main",
            start: "top 70%",
            end: "top 30%",
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const maxGap = window.innerWidth < 900 ? 10 : 1;
                const minGap = window.innerWidth < 900 ? 0.5 : 15;
                const currentGap = minGap + (maxGap - minGap) * progress;
                row.style.gap = `${currentGap}em`;
            }
        });
    });

    document.querySelectorAll(".row").forEach((row) => {
        ScrollTrigger.create({
            trigger: row,
            scroller: ".main",
            start: "top 30%",
            end: "top 10%",
            scrub: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const maxGap = window.innerWidth < 900 ? 0.5 : 15;
                const minGap = window.innerWidth < 900 ? 10 : 1;
                const currentGap = minGap + (maxGap - minGap) * progress;
                row.style.gap = `${currentGap}em`;
            }
        });
    });
}

window.addEventListener("scroll", manageStickyBarVisibility);
if (locoScrollInstance) {
    locoScrollInstance.on("scroll", () => { manageStickyBarVisibility(); });
}
manageStickyBarVisibility();

window.addEventListener('beforeunload', () => {
    if (locoScrollInstance) { locoScrollInstance.destroy(); }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});

// footer counter loader
let footerAnimationTriggered = false;

function startFooterLoader() {
    if (isMobileDevice()) {
        const counterEl = document.querySelector(".counter");
        if (counterEl) counterEl.textContent = "100%";
        return;
    }
    if (footerAnimationTriggered) return;
    footerAnimationTriggered = true;

    let counterElement = document.querySelector(".counter");
    let currentValue = 0;

    function updateCounter() {
        if (currentValue === 100) return;
        currentValue += Math.floor(Math.random() * 5) + 1;
        if (currentValue > 100) currentValue = 100;
        if (counterElement) counterElement.textContent = currentValue + "%";
        let delay = Math.floor(Math.random() * 20) + 100;
        setTimeout(updateCounter, delay);
    }
    updateCounter();

    gsap.to(".counter-wrap h1", 2.5, { delay: 1.5, y: -400, ease: "power2.inOut" });
    gsap.to(".item h1, .item p", 2.5, { delay: 2, y: -40, ease: "power2.inOut", stagger: { amount: 0.8 } });
    gsap.to(".item-main h1", 2.5, { delay: 2, y: -200, ease: "power2.inOut", stagger: { amount: 0.8 } });
}

ScrollTrigger.create({
    trigger: "footer",
    scroller: ".main",
    start: "top 0%",
    once: true,
    onEnter: () => { startFooterLoader(); }
});

// smooth scroll for in-page nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { locoScrollInstance.scrollTo(target); }
    });
});