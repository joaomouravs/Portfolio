// =========================================
// 0. A ASSINATURA SECRETA NO CONSOLE
// =========================================
console.log(
    "%c// PROJETADO E DESENVOLVIDO POR JOÃO VITOR 🚀\n%cO código fonte é a verdadeira arte.", 
    "color: #FF4400; font-size: 20px; font-weight: bold; font-family: 'Space Grotesk', sans-serif;",
    "color: #888; font-size: 14px; font-family: sans-serif;"
);

gsap.registerPlugin(ScrollTrigger);

// =========================================
// 1. LENIS SCROLL (Rolagem fluida)
// =========================================
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// =========================================
// 2. PRELOADER & PAGE TRANSITION (ENTRADA)
// =========================================
let progress = { value: 0 };
gsap.to(progress, {
    value: 100, duration: 2.0, ease: "power3.inOut",
    onUpdate: () => {
        let counter = document.querySelector(".preloader-counter");
        if(counter) counter.textContent = Math.floor(progress.value) + "%";
    },
    onComplete: () => {
        gsap.to(".preloader", { yPercent: -100, duration: 1, ease: "power4.inOut" });
    }
});

// =========================================
// 3. PAGE TRANSITION (SAÍDA AO CLICAR EM LINKS)
// =========================================
document.querySelectorAll('a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = this.getAttribute('href');
        
        // Ignora links de âncora (#) e e-mail (mailto:)
        if (!target || target.startsWith('#') || target.startsWith('mailto')) return;
        
        e.preventDefault(); 
        if (typeof playClick === "function") playClick(); 
        
        gsap.set(".page-transition", { yPercent: 100 });
        gsap.to(".page-transition", {
            yPercent: 0, duration: 0.8, ease: "power4.inOut",
            onComplete: () => { window.location.href = target; } 
        });
    });
});

// =========================================
// 4. BARRA DE PROGRESSO & EASTER EGG DE ABA
// =========================================
gsap.to(".scroll-progress", { width: "100%", ease: "none", scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true }});

let originalTitle = document.title;
document.addEventListener("visibilitychange", () => { document.title = document.hidden ? "Volte aqui 👀" : originalTitle; });

function updateLocalTime() {
    const options = { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', hour12: false };
    const lt = document.getElementById('local-time');
    if(lt) lt.textContent = new Date().toLocaleTimeString('pt-BR', options);
}
setInterval(updateLocalTime, 1000); updateLocalTime();

// =========================================
// 5. CURSOR CUSTOMIZADO & EFEITO MAGNÉTICO
// =========================================
const cursor = document.querySelector('.custom-cursor');
const magnetics = document.querySelectorAll('.magnetic');

if (window.innerWidth > 768 && cursor) {
    let cx = gsap.quickTo(cursor, "x", {duration: 0.1, ease: "power3"}),
        cy = gsap.quickTo(cursor, "y", {duration: 0.1, ease: "power3"});
    
    window.addEventListener("mousemove", e => { cx(e.clientX); cy(e.clientY); });

    document.querySelectorAll('.hover-target').forEach(t => {
        t.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
            if(t.dataset.cursorText) {
                cursor.classList.add('with-text');
                cursor.innerText = t.dataset.cursorText;
            }
        });
        t.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
            cursor.classList.remove('with-text');
            cursor.innerText = ''; 
        });
    });

    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
            gsap.to(btn, { x: x, y: y, duration: 0.3, ease: "power2.out" });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
        });
    });
}

// =========================================
// 6. COPIAR E-MAIL COM FEEDBACK (INDEX)
// =========================================
const emailLink = document.getElementById('email-link');
if(emailLink) {
    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText("joaoviux@gmail.com");
        emailLink.textContent = "E-MAIL COPIADO! ✔";
        setTimeout(() => emailLink.textContent = "JOAOVIUX@GMAIL.COM", 2000);
    });
}

// =========================================
// 7. TEXT SCRAMBLE (HACKER EFFECT)
// =========================================
const chars = '!<>-_\\/[]{}—=+*^?#________';
document.querySelectorAll('.scramble').forEach(el => {
    let originalText = el.innerText;
    el.addEventListener('mouseenter', () => {
        let iter = 0;
        let interval = setInterval(() => {
            el.innerText = originalText.split('').map((c, i) => {
                if (c === ' ') return ' ';
                if (i < iter) return originalText[i];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');
            if (iter >= originalText.length) clearInterval(interval);
            iter += 1/3;
        }, 30);
    });
});

// =========================================
// 8. SPOTLIGHT (Lanterna Mágica)
// =========================================
document.querySelectorAll('.spotlight-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
});

// =========================================
// 9. SOUND DESIGN
// =========================================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const soundToggle = document.querySelector('.sound-toggle');
let isSoundEnabled = false;

if(soundToggle) {
    soundToggle.addEventListener('click', () => {
        isSoundEnabled = !isSoundEnabled;
        if (isSoundEnabled) {
            audioCtx.resume();
            soundToggle.classList.add('on');
            soundToggle.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            playPing();
        } else {
            soundToggle.classList.remove('on');
            soundToggle.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        }
    });
}

function playPing() {
    if (!isSoundEnabled) return;
    const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.type = 'sine'; osc.frequency.setValueAtTime(800, audioCtx.currentTime); 
    gain.gain.setValueAtTime(0, audioCtx.currentTime); gain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.01); gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    osc.start(); osc.stop(audioCtx.currentTime + 0.1);
}

function playClick() {
    if (!isSoundEnabled) return;
    const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.type = 'triangle'; osc.frequency.setValueAtTime(300, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    osc.start(); osc.stop(audioCtx.currentTime + 0.1);
}
document.querySelectorAll('.hover-target').forEach(el => el.addEventListener('mouseenter', playPing));
document.querySelectorAll('.click-target').forEach(el => el.addEventListener('click', playClick));

// =========================================
// 10. PROJETOS STACKING & FUNDO DINÂMICO
// =========================================
const dynamicBgLayer = document.querySelector('.dynamic-bg-layer');
const cards = gsap.utils.toArray(".project-card");

cards.forEach((card, i) => {
    // Animação de escala e escurecimento (SEM TRANSPARÊNCIA!)
    if (i !== cards.length - 1) { 
        const nextCard = cards[i + 1];
        gsap.to(card, { 
            scale: 0.9, 
            filter: "brightness(0.3)", // Deixa o card escuro (profundidade) em vez de transparente
            scrollTrigger: { 
                trigger: nextCard, 
                start: "top 90%",  // Começa o efeito um pouco antes do próximo card encostar
                end: "top 15%",    // Termina de escurecer quando o próximo card cobrir
                scrub: true 
            }
        }); 
    }
    
    // Troca a cor do fundo da tela (Spotlight dinâmico)
    if(dynamicBgLayer && card.dataset.color) {
        ScrollTrigger.create({
            trigger: card, start: "top 50%", end: "bottom 50%",
            onEnter: () => dynamicBgLayer.style.backgroundColor = card.dataset.color,
            onEnterBack: () => dynamicBgLayer.style.backgroundColor = card.dataset.color,
            onLeave: () => dynamicBgLayer.style.backgroundColor = 'transparent',
            onLeaveBack: () => dynamicBgLayer.style.backgroundColor = 'transparent'
        });
    }
});

// =========================================
// 11. EFEITO 3D MAGNÉTICO (TILT CARDS)
// =========================================
const tiltCards = document.querySelectorAll('.tilt-card');
if (window.innerWidth > 768 && tiltCards.length > 0) {
    tiltCards.forEach(card => {
        // Pega a imagem se existir, senão pega o próprio card
        const targetToAnimate = card.querySelector('img') || card;
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xOrigin = (x / rect.width) - 0.5;
            const yOrigin = (y / rect.height) - 0.5;
            
            const rotateY = xOrigin * 15;
            const rotateX = yOrigin * -15;
            
            gsap.to(targetToAnimate, { 
                rotationY: rotateY, 
                rotationX: rotateX, 
                transformPerspective: 1000, 
                ease: "power2.out", 
                duration: 0.5 
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(targetToAnimate, { 
                rotationY: 0, 
                rotationX: 0, 
                ease: "elastic.out(1, 0.3)", 
                duration: 1.2 
            });
        });
    });
}

// =========================================
// 12. NAVBAR MENU E REVEAL TEXT
// =========================================
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if(menuBtn) {
    menuBtn.addEventListener('click', () => { menuBtn.classList.toggle('active'); navLinks.classList.toggle('active'); document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';});
    document.querySelectorAll('.nav-links li a').forEach(link => link.addEventListener('click', () => { menuBtn.classList.remove('active'); navLinks.classList.remove('active'); document.body.style.overflow = 'auto';}));
}

gsap.utils.toArray(".reveal-text").forEach(text => gsap.to(text.querySelectorAll("span"), { scrollTrigger: { trigger: text, start: "top 85%", end: "bottom 45%", scrub: 1 }, opacity: 1, stagger: 0.2 }));

// =========================================
// 13. TEXTO DESLIZANTE DO FUNDO (ATIVADO SEMPRE)
// =========================================
gsap.to(".glass-text", { attr: { x: "-300%" }, duration: 50, ease: "none", repeat: -1 });

// =========================================
// 14. RODAPÉ FINAL MÁGICO (GET IN TOUCH)
// =========================================
const tickerMain = document.querySelector("#ticker-main");
const tickerContact = document.querySelector("#ticker-contact");

ScrollTrigger.create({
    trigger: "#contato", 
    start: "top 95%", // Ativa exatamente quando o contato desponta na tela
    onEnter: () => { 
        gsap.to(".navbar", { y: -100, opacity: 0, duration: 0.4, ease: "power2.out" }); 
        if(tickerMain) gsap.to(tickerMain, { opacity: 0, duration: 0.6 }); 
        if(tickerContact) gsap.to(tickerContact, { opacity: 1, duration: 0.8 }); 
    },
    onLeaveBack: () => { 
        gsap.to(".navbar", { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }); 
        if(tickerContact) gsap.to(tickerContact, { opacity: 0, duration: 0.6 }); 
        if(tickerMain) gsap.to(tickerMain, { opacity: 1, duration: 0.8 }); 
    }
});

// =========================================
// 15. DEPOIMENTOS (TROCA DE FOTOS E TEXTO)
// =========================================
const depoimentosData = [
    { 
        texto: `<span>“Seu</span> <span>olhar</span> <span>apurado</span> <span>para</span> <span>detalhes</span> <span>e</span> <span>abordagem</span> <span>inovadora</span> <span class="text-highlight">impressionaram</span> <span class="text-highlight">nossa</span> <span class="text-highlight">equipe,</span> <span class="text-highlight">transformando</span> <span class="text-highlight">desafios</span> <span class="text-highlight">em</span> <span class="text-highlight">soluções</span> <span class="text-highlight">criativas</span> <span class="text-highlight">que</span> <span>o</span> <span>destacam.”</span>`, 
        nome: "// Adriana Quirino", 
        cargo: "Fundadora, Driko Quirino" 
    },
    { 
        texto: `<span>“Trabalhar</span> <span>com</span> <span>o</span> <span>João</span> <span>foi</span> <span>uma</span> <span>experiência</span> <span>incrível.</span> <span class="text-highlight">A</span> <span class="text-highlight">qualidade</span> <span class="text-highlight">técnica</span> <span>e</span> <span>o</span> <span>design</span> <span>entregue</span> <span>superaram</span> <span>todas</span> <span>as</span> <span>nossas</span> <span>expectativas.”</span>`, 
        nome: "// Fernanda Cristina", 
        cargo: "Fundadora, Nanda Designer" 
    },
    { 
        texto: `<span>“Profissionalismo</span> <span>e</span> <span>agilidade</span> <span>na</span> <span>entrega.</span> <span>O</span> <span>novo</span> <span>site</span> <span class="text-highlight">aumentou</span> <span class="text-highlight">nossas</span> <span class="text-highlight">conversões</span> <span>em</span> <span>mais</span> <span>de</span> <span>50%</span> <span>logo</span> <span>no</span> <span>primeiro</span> <span>mês.”</span>`, 
        nome: "// Anderson Ramos", 
        cargo: "CEO, Sorriso do Gás" 
    }
];

const avatars = document.querySelectorAll('.testimonial-avatars .avatar');
const tBody = document.querySelector('.testimonial-body h2'); 
const tName = document.querySelector('.testimonial-author h4'); 
const tRole = document.querySelector('.testimonial-author p'); 
const tCount = document.querySelector('.testimonial-counter .current');

if(avatars.length > 0) {
    avatars.forEach((avatar, index) => {
        avatar.addEventListener('click', function(e) {
            e.preventDefault(); 
            // Se já for o depoimento ativo, não faz nada
            if (this.classList.contains('active')) return;

            // Remove o active de todos e adiciona no clicado
            avatars.forEach(a => a.classList.remove('active')); 
            this.classList.add('active'); 
            
            // Atualiza o contador (01, 02, 03)
            tCount.textContent = `0${index + 1}`;

            // Faz a animação de saída e entrada do novo texto
            gsap.to([tBody, tName, tRole], { 
                opacity: 0, y: 10, duration: 0.3, 
                onComplete: () => {
                    tBody.innerHTML = depoimentosData[index].texto; 
                    tName.textContent = depoimentosData[index].nome; 
                    tRole.textContent = depoimentosData[index].cargo;

                    gsap.to([tBody, tName, tRole], { opacity: 1, y: 0, duration: 0.3 });
                    gsap.fromTo(tBody.querySelectorAll("span"), { opacity: 0.2 }, { opacity: 1, stagger: 0.05, duration: 0.4, ease: "power2.out", delay: 0.1 });
                }
            });
        });
    });
}

// =========================================
// 16. CORREÇÃO: SETA "VOLTAR AO TOPO"
// =========================================
const backToTopBtns = document.querySelectorAll('.back-to-top');

if (backToTopBtns.length > 0) {
    backToTopBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o pulo "seco" do navegador que trava o texto
            
            // 1. Força o "GET IN TOUCH" a sumir e o "JOÃO VITOR" a voltar imediatamente
            gsap.to("#ticker-contact", { opacity: 0, duration: 0.3 });
            gsap.to("#ticker-main", { opacity: 1, duration: 0.3 });
            gsap.to(".navbar", { y: 0, opacity: 1, duration: 0.3 });
            
            // 2. Sobe até o topo da página de forma suave como uma seda
            if (typeof lenis !== "undefined") {
                lenis.scrollTo(0, { duration: 1.5 });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}