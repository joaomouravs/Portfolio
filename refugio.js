// =========================================
// SCRIPTS EXCLUSIVOS: REFÚGIO
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    // 1. REVELAÇÃO EM CORTINA (CLIP-PATH)
    const revealContainers = document.querySelectorAll(".clip-reveal");
    revealContainers.forEach((container) => {
        ScrollTrigger.create({
            trigger: container,
            start: "top 88%",
            onEnter: () => container.classList.add("revealed")
        });
    });

    // 2. TILT 3D SUAVE (somente desktop)
    const tiltCards = document.querySelectorAll('.tilt-card');
    if (window.innerWidth > 768) {
        tiltCards.forEach(card => {
            const img = card.querySelector('img') || card;
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const xOrigin = ((e.clientX - rect.left) / rect.width) - 0.5;
                const yOrigin = ((e.clientY - rect.top) / rect.height) - 0.5;
                gsap.to(img, {
                    rotationY: xOrigin * 10,
                    rotationX: yOrigin * -10,
                    transformPerspective: 1000,
                    ease: "power2.out",
                    duration: 0.5
                });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(img, { rotationY: 0, rotationX: 0, ease: "elastic.out(1, 0.4)", duration: 1.2 });
            });
        });
    }

    // 3. SCROLL TIMELINE (LINHA DO TEMPO)
    gsap.to(".timeline-progress", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: ".project-body-wrapper",
            start: "top 30%",
            end: "bottom 80%",
            scrub: true
        }
    });

    const steps = document.querySelectorAll('.timeline-steps .step');
    steps.forEach((step) => {
        const targetId = step.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            ScrollTrigger.create({
                trigger: targetSection,
                start: "top 50%",
                end: "bottom 50%",
                onEnter: () => { steps.forEach(s => s.classList.remove('active')); step.classList.add('active'); },
                onEnterBack: () => { steps.forEach(s => s.classList.remove('active')); step.classList.add('active'); }
            });
        }
    });

    // 4. ENTRADA DO GUIA DE ESTILO (swatches em cascata)
    gsap.from(".refugio-palette .swatch", {
        scrollTrigger: { trigger: ".design-system-section", start: "top 72%" },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: "power3.out"
    });

});
