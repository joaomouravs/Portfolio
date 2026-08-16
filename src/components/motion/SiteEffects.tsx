"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Porte completo de legacy/script.js.
 *
 * Cada efeito abaixo existe na versão original e foi reproduzido com a mesma
 * duração, o mesmo easing e a mesma sensação. O que mudou é só o entorno:
 * GSAP e Lenis vêm do bundle em vez de CDN sem SRI, tudo tem função de
 * limpeza, os triggers são recriados a cada navegação (o site agora é uma
 * SPA) e nada é inicializado quando o visitante pede movimento reduzido.
 *
 * Mapa do original → aqui:
 *   0. assinatura no console        →  logSignature()
 *   1. Lenis                        →  setupSmoothScroll()
 *   2. preloader                    →  setupPreloader()
 *   3. transição de página          →  setupPageTransition()
 *   4. barra de progresso + aba     →  setupProgressAndTitle()
 *   5. cursor + magnético           →  setupCursor()
 *   6. copiar e-mail                →  setupCopyEmail()
 *   7. text scramble                →  setupScramble()
 *   8. spotlight                    →  setupSpotlight()
 *   9. sound design                 →  setupSound()
 *  10. deck de projetos + fundo     →  setupProjectDeck()
 *  11. tilt 3D                      →  setupTilt()
 *  12. reveal de texto              →  setupRevealText()
 *  13. ticker de vidro líquido      →  setupGlassTicker()
 *  14. rodapé mágico                →  setupContactTicker()
 *  16. voltar ao topo               →  setupBackToTop()
 *  17. navbar esconde/mostra        →  setupNavbarAutoHide()
 */

type Gsap = typeof import("gsap").gsap;
type ScrollTriggerType = typeof import("gsap/ScrollTrigger").ScrollTrigger;
type Lenis = import("lenis").default;

declare global {
  interface Window {
    __lenis?: Lenis;
    __playClick?: () => void;
  }
}

const EMAIL = "joaoviux@gmail.com";
const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function SiteEffects() {
  const pathname = usePathname();
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    const cleanups: Array<() => void> = [];
    let cancelled = false;

    void Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("lenis"),
    ]).then(([gsapModule, stModule, lenisModule]) => {
      if (cancelled) return;

      const gsap = gsapModule.gsap;
      const ScrollTrigger = stModule.ScrollTrigger;
      const Lenis = lenisModule.default;
      gsap.registerPlugin(ScrollTrigger);

      logSignature();
      cleanups.push(setupSmoothScroll(Lenis, reduced));
      cleanups.push(setupPreloader(gsap, reduced));
      cleanups.push(setupPageTransition(gsap, routerRef, reduced));
      cleanups.push(setupProgressAndTitle(gsap, ScrollTrigger));
      cleanups.push(setupLocalTime());
      if (finePointer && !reduced) cleanups.push(setupCursor(gsap));
      cleanups.push(setupCopyEmail());
      if (!reduced) cleanups.push(setupScramble());
      cleanups.push(setupSpotlight());
      const sound = setupSound();
      cleanups.push(sound.cleanup);
      cleanups.push(setupProjectDeck(gsap, ScrollTrigger, reduced));
      if (finePointer && !reduced) cleanups.push(setupTilt(gsap));
      cleanups.push(setupRevealText(gsap, reduced));
      cleanups.push(setupGlassTicker(gsap, reduced));
      cleanups.push(setupContactTicker(gsap, ScrollTrigger));
      cleanups.push(setupBackToTop(gsap));
      cleanups.push(setupNavbarAutoHide());
      cleanups.push(setupClipReveal(ScrollTrigger, reduced));
      cleanups.push(setupProjectTimeline(gsap, ScrollTrigger, reduced));

      // O layout final só é conhecido depois que fontes e imagens assentam.
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      for (const cleanup of cleanups) cleanup();
    };
  }, [pathname]);

  return null;
}

/* =========================================
   0. A ASSINATURA SECRETA NO CONSOLE
   ========================================= */
function logSignature() {
  console.log(
    "%c// PROJETADO E DESENVOLVIDO POR JOÃO VITOR 🚀\n%cO código fonte é a verdadeira arte.",
    "color: #FF4400; font-size: 20px; font-weight: bold; font-family: 'Space Grotesk', sans-serif;",
    "color: #888; font-size: 14px; font-family: sans-serif;"
  );
}

/* =========================================
   1. LENIS SCROLL (Rolagem fluida)
   ========================================= */
function setupSmoothScroll(
  LenisCtor: new (options?: Record<string, unknown>) => Lenis,
  reduced: boolean
) {
  if (reduced) return () => {};

  const lenis = new LenisCtor({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  window.__lenis = lenis;

  let frame = requestAnimationFrame(function raf(time: number) {
    lenis.raf(time);
    frame = requestAnimationFrame(raf);
  });

  return () => {
    cancelAnimationFrame(frame);
    lenis.destroy();
    delete window.__lenis;
  };
}

/* =========================================
   2. PRELOADER & PAGE TRANSITION (ENTRADA)
   ========================================= */
function setupPreloader(gsap: Gsap, reduced: boolean) {
  const preloader = document.querySelector<HTMLElement>(".preloader");
  if (!preloader) return () => {};

  if (reduced) {
    preloader.style.display = "none";
    return () => {};
  }

  // O número em si é animado pelo componente PreloaderCounter, com estado
  // do React. Aqui cuidamos apenas da saída da cortina — o GSAP não escreve
  // mais no nó do contador, porque dois donos do mesmo nó era exatamente o
  // que travava o contador em 0%.
  const tween = gsap.to(preloader, {
    yPercent: -100,
    duration: 0.8,
    ease: "power4.inOut",
    delay: 1.3,
    onComplete: () => {
      preloader.style.display = "none";
    },
  });

  // Rede de segurança que o original não tinha: se algo travar no meio do
  // caminho, a cortina sai mesmo assim em vez de cobrir o site para sempre.
  const failsafe = window.setTimeout(() => {
    preloader.style.display = "none";
  }, 4000);

  return () => {
    tween.kill();
    window.clearTimeout(failsafe);
  };
}

/* =========================================
   3. PAGE TRANSITION (SAÍDA AO CLICAR EM LINKS)
   ========================================= */
function setupPageTransition(
  gsap: Gsap,
  routerRef: { current: ReturnType<typeof useRouter> },
  reduced: boolean
) {
  const onClick = (event: MouseEvent) => {
    const anchor = (event.target as Element | null)?.closest?.("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("mailto") ||
      href.startsWith("tel") ||
      anchor.target === "_blank" ||
      /^https?:\/\//i.test(href)
    ) {
      return;
    }

    // Correção de comportamento: o original chamava preventDefault sempre,
    // o que quebrava Ctrl+clique e clique do meio — justamente o gesto que
    // recrutadores usam para abrir vários projetos em abas.
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    window.__playClick?.();

    if (reduced) {
      routerRef.current.push(href);
      return;
    }

    gsap.set(".page-transition", { yPercent: 100 });
    gsap.to(".page-transition", {
      yPercent: 0,
      duration: 0.8,
      ease: "power4.inOut",
      onComplete: () => {
        routerRef.current.push(href);
        // Recolhe a cortina depois que a nova rota assume.
        gsap.to(".page-transition", {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          delay: 0.1,
          onComplete: () => gsap.set(".page-transition", { yPercent: 100 }),
        });
      },
    });
  };

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}

/* =========================================
   4. BARRA DE PROGRESSO & EASTER EGG DE ABA
   ========================================= */
function setupProgressAndTitle(gsap: Gsap, ScrollTrigger: ScrollTriggerType) {
  const tween = gsap.to(".scroll-progress", {
    width: "100%",
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });

  const originalTitle = document.title;
  const onVisibility = () => {
    document.title = document.hidden ? "Volte aqui 👀" : originalTitle;
  };
  document.addEventListener("visibilitychange", onVisibility);

  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
    gsap.set(".scroll-progress", { clearProps: "all" });
    document.removeEventListener("visibilitychange", onVisibility);
    document.title = originalTitle;
    void ScrollTrigger;
  };
}

function setupLocalTime() {
  const update = () => {
    const element = document.getElementById("local-time");
    if (!element) return;
    element.textContent = new Date().toLocaleTimeString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  update();
  // O original rodava a cada segundo para exibir só horas e minutos.
  const interval = window.setInterval(update, 30_000);
  return () => window.clearInterval(interval);
}

/* =========================================
   5. CURSOR CUSTOMIZADO & EFEITO MAGNÉTICO
   ========================================= */
function setupCursor(gsap: Gsap) {
  const cursor = document.querySelector<HTMLElement>(".custom-cursor");
  if (!cursor) return () => {};

  document.documentElement.dataset.customCursor = "on";

  const moveX = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
  const moveY = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

  const onMouseMove = (event: MouseEvent) => {
    moveX(event.clientX);
    moveY(event.clientY);
  };
  window.addEventListener("mousemove", onMouseMove);

  // Delegação em vez de um listener por elemento: mesmo comportamento, e
  // funciona para conteúdo que entra na página depois.
  const onOver = (event: MouseEvent) => {
    const target = (event.target as Element | null)?.closest?.(".hover-target");
    if (!target) return;
    cursor.classList.add("active");
    const text = target.getAttribute("data-cursor-text");
    if (text) {
      cursor.classList.add("with-text");
      cursor.innerText = text;
    }
  };

  const onOut = (event: MouseEvent) => {
    const target = (event.target as Element | null)?.closest?.(".hover-target");
    if (!target) return;
    const next = event.relatedTarget as Element | null;
    if (next?.closest?.(".hover-target") === target) return;
    cursor.classList.remove("active", "with-text");
    cursor.innerText = "";
  };

  document.addEventListener("mouseover", onOver);
  document.addEventListener("mouseout", onOut);

  const magnets = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));
  const magnetCleanups = magnets.map((button) => {
    const onMove = (event: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.4;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.4;
      gsap.to(button, { x, y, duration: 0.3, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    };

    button.addEventListener("mousemove", onMove);
    button.addEventListener("mouseleave", onLeave);
    return () => {
      button.removeEventListener("mousemove", onMove);
      button.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(button);
    };
  });

  return () => {
    window.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseover", onOver);
    document.removeEventListener("mouseout", onOut);
    for (const cleanup of magnetCleanups) cleanup();
    delete document.documentElement.dataset.customCursor;
  };
}

/* =========================================
   6. COPIAR E-MAIL COM FEEDBACK
   ========================================= */
function setupCopyEmail() {
  const links = Array.from(document.querySelectorAll<HTMLElement>(".copy-email"));

  const cleanups = links.map((link) => {
    let timeout = 0;

    const onClick = (event: MouseEvent) => {
      if (!navigator.clipboard) return; // deixa o mailto agir
      event.preventDefault();
      const original = link.textContent ?? EMAIL;
      void navigator.clipboard.writeText(EMAIL).then(() => {
        link.textContent = "E-MAIL COPIADO! ✔";
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => {
          link.textContent = original;
        }, 2000);
      });
    };

    link.addEventListener("click", onClick);
    return () => {
      link.removeEventListener("click", onClick);
      window.clearTimeout(timeout);
    };
  });

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

/* =========================================
   7. TEXT SCRAMBLE (HACKER EFFECT)
   ========================================= */
function setupScramble() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".scramble"));

  const cleanups = elements.map((element) => {
    const original = element.innerText;
    let interval = 0;

    const onEnter = () => {
      window.clearInterval(interval);
      let iteration = 0;

      interval = window.setInterval(() => {
        element.innerText = original
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return original[index];
            return SCRAMBLE_CHARS[
              Math.floor(Math.random() * SCRAMBLE_CHARS.length)
            ];
          })
          .join("");

        if (iteration >= original.length) {
          window.clearInterval(interval);
          // O original nunca restaurava o texto exato, e o embaralhado às
          // vezes ficava no lugar. Aqui a última escrita é sempre o texto real.
          element.innerText = original;
        }
        iteration += 1 / 3;
      }, 30);
    };

    element.addEventListener("mouseenter", onEnter);
    return () => {
      element.removeEventListener("mouseenter", onEnter);
      window.clearInterval(interval);
      element.innerText = original;
    };
  });

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

/* =========================================
   8. SPOTLIGHT (Lanterna Mágica)
   ========================================= */
function setupSpotlight() {
  const onMove = (event: MouseEvent) => {
    const card = (event.target as Element | null)?.closest?.(".spotlight-card");
    if (!(card instanceof HTMLElement)) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };

  document.addEventListener("mousemove", onMove);
  return () => document.removeEventListener("mousemove", onMove);
}

/* =========================================
   9. SOUND DESIGN
   ========================================= */
function setupSound() {
  const toggle = document.querySelector<HTMLButtonElement>(".sound-toggle");
  let audioCtx: AudioContext | null = null;
  let enabled = false;

  // O original instanciava um AudioContext no carregamento de toda página,
  // mesmo com o som desligado. Aqui ele só nasce no primeiro clique.
  const getContext = () => {
    audioCtx ??= new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    return audioCtx;
  };

  const tone = (
    type: OscillatorType,
    from: number,
    to: number | null,
    gainValue: number
  ) => {
    if (!enabled || !audioCtx) return;
    const ctx = audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(from, ctx.currentTime);
    if (to !== null) {
      osc.frequency.exponentialRampToValueAtTime(to, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(gainValue, ctx.currentTime);
    } else {
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(gainValue, ctx.currentTime + 0.01);
    }
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  const playPing = () => tone("sine", 800, null, 0.05);
  const playClick = () => tone("triangle", 300, 50, 0.1);
  window.__playClick = playClick;

  const onToggle = () => {
    enabled = !enabled;
    if (!toggle) return;
    if (enabled) {
      void getContext().resume();
      toggle.classList.add("on");
      toggle.setAttribute("aria-pressed", "true");
      toggle.innerHTML = SOUND_ON_ICON;
      playPing();
    } else {
      toggle.classList.remove("on");
      toggle.setAttribute("aria-pressed", "false");
      toggle.innerHTML = SOUND_OFF_ICON;
    }
  };

  toggle?.addEventListener("click", onToggle);

  const onHover = (event: MouseEvent) => {
    if (!enabled) return;
    if ((event.target as Element | null)?.closest?.(".hover-target")) playPing();
  };
  const onClick = (event: MouseEvent) => {
    if (!enabled) return;
    if ((event.target as Element | null)?.closest?.(".click-target")) playClick();
  };

  document.addEventListener("mouseover", onHover);
  document.addEventListener("click", onClick);

  return {
    cleanup: () => {
      toggle?.removeEventListener("click", onToggle);
      document.removeEventListener("mouseover", onHover);
      document.removeEventListener("click", onClick);
      void audioCtx?.close();
      delete window.__playClick;
    },
  };
}

const SOUND_OFF_ICON = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="m23 9-6 6M17 9l6 6"/></svg>`;
const SOUND_ON_ICON = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>`;

export { SOUND_OFF_ICON };

/* =========================================
   10. PROJETOS STACKING & FUNDO DINÂMICO
   ========================================= */
function setupProjectDeck(
  gsap: Gsap,
  ScrollTrigger: ScrollTriggerType,
  reduced: boolean
) {
  const dynamicLayer = document.querySelector<HTMLElement>(".dynamic-bg-layer");
  const cards = gsap.utils.toArray<HTMLElement>(".project-card");
  if (cards.length === 0) return () => {};

  gsap.set(cards, { filter: "brightness(1)" });
  if (reduced) return () => {};

  const triggers: Array<{ kill: () => void }> = [];

  cards.forEach((card, index) => {
    // EFEITO BARALHO: ao ser coberto pelo próximo, o card recua —
    // encolhe e escurece de leve.
    if (index !== cards.length - 1) {
      const nextCard = cards[index + 1];
      const tween = gsap.to(card, {
        scale: 0.93,
        filter: "brightness(0.62)",
        ease: "none",
        scrollTrigger: {
          trigger: nextCard,
          start: "top 90%",
          end: "top 13%",
          scrub: 0.5,
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    }

    const color = card.dataset.color;
    if (dynamicLayer && color) {
      triggers.push(
        ScrollTrigger.create({
          trigger: card,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => (dynamicLayer.style.backgroundColor = color),
          onEnterBack: () => (dynamicLayer.style.backgroundColor = color),
          onLeave: () => (dynamicLayer.style.backgroundColor = "transparent"),
          onLeaveBack: () => (dynamicLayer.style.backgroundColor = "transparent"),
        })
      );
    }
  });

  return () => {
    for (const trigger of triggers) trigger.kill();
    gsap.killTweensOf(cards);
    gsap.set(cards, { clearProps: "all" });
    if (dynamicLayer) dynamicLayer.style.backgroundColor = "transparent";
  };
}

/* =========================================
   11. EFEITO 3D MAGNÉTICO (TILT CARDS)
   ========================================= */
function setupTilt(gsap: Gsap) {
  const cards = Array.from(document.querySelectorAll<HTMLElement>(".tilt-card"));

  const cleanups = cards.map((card) => {
    const target = card.querySelector<HTMLElement>("img") ?? card;

    const onMove = (event: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(target, {
        rotationY: x * 15,
        rotationX: y * -15,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.5,
      });
    };

    const onLeave = () => {
      gsap.to(target, {
        rotationY: 0,
        rotationX: 0,
        ease: "elastic.out(1, 0.3)",
        duration: 1.2,
      });
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(target);
    };
  });

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

/* =========================================
   12. REVEAL TEXT
   ========================================= */
function setupRevealText(gsap: Gsap, reduced: boolean) {
  const blocks = gsap.utils.toArray<HTMLElement>(".reveal-text");
  if (blocks.length === 0) return () => {};

  if (reduced) {
    for (const block of blocks) {
      gsap.set(block.querySelectorAll("span"), { opacity: 1 });
    }
    return () => {};
  }

  const tweens = blocks.map((block) =>
    gsap.to(block.querySelectorAll("span"), {
      scrollTrigger: {
        trigger: block,
        start: "top 85%",
        end: "bottom 45%",
        scrub: 1,
      },
      opacity: 1,
      stagger: 0.2,
    })
  );

  return () => {
    for (const tween of tweens) {
      tween.scrollTrigger?.kill();
      tween.kill();
    }
    // Remove os estilos inline que o GSAP escreveu nos spans.
    for (const block of blocks) {
      gsap.set(block.querySelectorAll("span"), { clearProps: "all" });
    }
  };
}

/* =========================================
   13. TEXTO DESLIZANTE DO FUNDO
   ========================================= */
function setupGlassTicker(gsap: Gsap, reduced: boolean) {
  if (reduced) return () => {};

  const tween = gsap.to(".glass-text", {
    attr: { x: "-300%" },
    duration: 50,
    ease: "none",
    repeat: -1,
  });

  return () => tween.kill();
}

/* =========================================
   14. RODAPÉ FINAL MÁGICO (GET IN TOUCH)
   ========================================= */
function setupContactTicker(gsap: Gsap, ScrollTrigger: ScrollTriggerType) {
  const contact = document.querySelector("#contato");
  if (!contact) return () => {};

  const tickerMain = document.querySelector("#ticker-main");
  const tickerContact = document.querySelector("#ticker-contact");

  const trigger = ScrollTrigger.create({
    trigger: "#contato",
    start: "top 95%",
    onEnter: () => {
      gsap.to(".navbar", { y: -100, opacity: 0, duration: 0.4, ease: "power2.out" });
      if (tickerMain) gsap.to(tickerMain, { opacity: 0, duration: 0.6 });
      if (tickerContact) gsap.to(tickerContact, { opacity: 1, duration: 0.8 });
    },
    onLeaveBack: () => {
      gsap.to(".navbar", { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
      if (tickerContact) gsap.to(tickerContact, { opacity: 0, duration: 0.6 });
      if (tickerMain) gsap.to(tickerMain, { opacity: 1, duration: 0.8 });
    },
  });

  return () => {
    trigger.kill();
    gsap.set(".navbar", { y: 0, opacity: 1 });
  };
}

/* =========================================
   16. SETA "VOLTAR AO TOPO"
   ========================================= */
function setupBackToTop(gsap: Gsap) {
  const buttons = Array.from(document.querySelectorAll<HTMLElement>(".back-to-top"));

  const cleanups = buttons.map((button) => {
    const onClick = (event: MouseEvent) => {
      event.preventDefault();

      gsap.to("#ticker-contact", { opacity: 0, duration: 0.3 });
      gsap.to("#ticker-main", { opacity: 1, duration: 0.3 });
      gsap.to(".navbar", { y: 0, opacity: 1, duration: 0.3 });

      if (window.__lenis) {
        window.__lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    button.addEventListener("click", onClick);
    return () => button.removeEventListener("click", onClick);
  });

  return () => {
    for (const cleanup of cleanups) cleanup();
  };
}

/* =========================================
   PÁGINAS DE PROJETO — cortina de revelação das imagens
   (de legacy/turingbox.js e os demais *.js, todos idênticos)
   ========================================= */
function setupClipReveal(ScrollTrigger: ScrollTriggerType, reduced: boolean) {
  const containers = Array.from(
    document.querySelectorAll<HTMLElement>(".clip-reveal")
  );
  if (containers.length === 0) return () => {};

  if (reduced) {
    for (const container of containers) container.classList.add("revealed");
    return () => {};
  }

  const triggers = containers.map((container) =>
    ScrollTrigger.create({
      trigger: container,
      start: "top 85%",
      onEnter: () => container.classList.add("revealed"),
    })
  );

  return () => {
    for (const trigger of triggers) trigger.kill();
    // Desfaz a mutação: sem isto a classe sobrevive à navegação e o HTML
    // que o React espera deixa de bater com o que está no DOM.
    for (const container of containers) container.classList.remove("revealed");
  };
}

/* =========================================
   PÁGINAS DE PROJETO — linha do tempo e sistema de design
   ========================================= */
function setupProjectTimeline(
  gsap: Gsap,
  ScrollTrigger: ScrollTriggerType,
  reduced: boolean
) {
  const wrapper = document.querySelector(".project-body-wrapper");
  if (!wrapper) return () => {};

  const disposers: Array<() => void> = [];

  if (!reduced) {
    // Preenchimento da linha vertical conforme a rolagem.
    const progress = gsap.to(".timeline-progress", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".project-body-wrapper",
        start: "top 30%",
        end: "bottom 80%",
        scrub: true,
      },
    });
    disposers.push(() => {
      progress.scrollTrigger?.kill();
      progress.kill();
    });

    // Entrada das amostras de cor do sistema de design.
    if (document.querySelector(".color-box")) {
      const swatches = gsap.from(".color-box", {
        scrollTrigger: { trigger: ".design-system-section", start: "top 70%" },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
      disposers.push(() => {
        swatches.scrollTrigger?.kill();
        swatches.kill();
      });
    }
  } else {
    gsap.set(".timeline-progress", { height: "100%" });
  }

  // Os rótulos "01. Conceito", "02. Experiência"… acendem conforme a seção
  // correspondente chega ao meio da tela.
  const steps = Array.from(
    document.querySelectorAll<HTMLElement>(".timeline-steps .step")
  );

  for (const step of steps) {
    const targetId = step.dataset.target;
    const section = targetId ? document.getElementById(targetId) : null;
    if (!section) continue;

    const activate = () => {
      for (const other of steps) other.classList.remove("active");
      step.classList.add("active");
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: activate,
      onEnterBack: activate,
    });
    disposers.push(() => trigger.kill());
  }

  return () => {
    for (const dispose of disposers) dispose();

    // Devolve o DOM ao estado em que o servidor o entregou: só o primeiro
    // marco ativo e a linha de progresso zerada.
    steps.forEach((step, index) =>
      step.classList.toggle("active", index === 0)
    );
    gsap.set(".timeline-progress", { clearProps: "all" });
    if (document.querySelector(".color-box")) {
      gsap.set(".color-box", { clearProps: "all" });
    }
  };
}

/* =========================================
   17. NAVBAR ESCONDE/MOSTRA NO SCROLL
   ========================================= */
function setupNavbarAutoHide() {
  const navbar = document.querySelector<HTMLElement>(".navbar");
  if (!navbar) return () => {};

  let lastScroll = window.scrollY;
  let ticking = false;

  // Mesmo comportamento do original, mas a leitura de posição acontece
  // dentro de um requestAnimationFrame em vez de a cada evento de scroll.
  const onScroll = () => {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      const current = window.scrollY;

      if (current < 50) {
        navbar.classList.remove("nav-hidden");
      } else if (current > lastScroll) {
        navbar.classList.add("nav-hidden");
      } else {
        navbar.classList.remove("nav-hidden");
      }

      lastScroll = current <= 0 ? 0 : current;
      ticking = false;
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}
