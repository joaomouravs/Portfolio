// =========================================
// SCRIPTS EXCLUSIVOS: TURINGBOX.HTML
// =========================================

document.addEventListener("DOMContentLoaded", () => {
    
    gsap.registerPlugin(ScrollTrigger);

    // 1. REVELAÇÃO EM CORTINA (CLIP-PATH)
    // Seleciona todas as imagens da galeria e revela quando aparecem na tela
    const revealContainers = document.querySelectorAll(".clip-reveal");
    
    revealContainers.forEach((container) => {
        ScrollTrigger.create({
            trigger: container,
            start: "top 85%", // Dispara quando o topo da imagem atinge 85% da tela
            onEnter: () => {
                container.classList.add("revealed");
            }
        });
    });

    // 2. EFEITO 3D MAGNÉTICO NAS FOTOS (TILT)
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    // Só aplica o Tilt 3D se não for celular (mobile não tem mouse)
    if (window.innerWidth > 768) {
        tiltCards.forEach(card => {
            const img = card.querySelector('img');
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // Posição do mouse dentro do card
                const y = e.clientY - rect.top;
                
                // Calcula a origem (-0.5 a 0.5) para saber de qual lado o mouse está
                const xOrigin = (x / rect.width) - 0.5;
                const yOrigin = (y / rect.height) - 0.5;
                
                // Multiplica para gerar a angulação (máximo de 15 graus de inclinação)
                const rotateY = xOrigin * 15;
                const rotateX = yOrigin * -15; // Negativo para inclinar para o lado certo
                
                gsap.to(img, { 
                    rotationY: rotateY, 
                    rotationX: rotateX, 
                    transformPerspective: 1000, 
                    ease: "power2.out", 
                    duration: 0.5 
                });
            });
            
            // Quando o mouse sai, volta a imagem pro eixo original (0) suavemente
            card.addEventListener('mouseleave', () => {
                gsap.to(img, { 
                    rotationY: 0, 
                    rotationX: 0, 
                    ease: "elastic.out(1, 0.3)", 
                    duration: 1.2 
                });
            });
        });
    }

    // 3. SCROLL TIMELINE (LINHA DO TEMPO)
    // Anima o preenchimento da linha vertical
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

    // Faz os textos "01. System", "02. Interfaces" acenderem conforme a rolagem
    const steps = document.querySelectorAll('.timeline-steps .step');
    steps.forEach((step) => {
        const targetId = step.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        
        if(targetSection) {
            ScrollTrigger.create({
                trigger: targetSection,
                start: "top 50%", // Quando a seção chega no meio da tela
                end: "bottom 50%",
                onEnter: () => {
                    steps.forEach(s => s.classList.remove('active'));
                    step.classList.add('active');
                },
                onEnterBack: () => {
                    steps.forEach(s => s.classList.remove('active'));
                    step.classList.add('active');
                }
            });
        }
    });

    // 4. ANIMAÇÃO DE ENTRADA DO DESIGN SYSTEM
    gsap.from(".color-box", {
        scrollTrigger: {
            trigger: ".design-system-section",
            start: "top 70%"
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1, // Anima um de cada vez
        ease: "power3.out"
    });

});