"use client";

import { useEffect, useState } from "react";

/**
 * Contador de 0% a 100% da cortina de abertura.
 *
 * Por que isto é um componente e não uma linha dentro do SiteEffects:
 * o número vive num nó que o React renderiza. Quando o GSAP escrevia nele
 * por `textContent`, a escrita disputava com a reconciliação do React e o
 * contador ficava preso em 0% em produção. Animando com estado do próprio
 * React, não há dois donos do mesmo nó.
 *
 * A curva reproduz o `power2.inOut` do GSAP e a duração de 1,3s do
 * original, então o resultado na tela é o mesmo de antes.
 */

const DURATION = 1300;

/** Equivalente ao power2.inOut do GSAP. */
function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function PreloaderCounter() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(100);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min(1, (now - start) / DURATION);
      setValue(Math.floor(easeInOutQuad(elapsed) * 100));
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  // suppressHydrationWarning porque o servidor sempre entrega 0% e o
  // cliente já pode ter avançado quando a hidratação acontece.
  return <span suppressHydrationWarning>{value}%</span>;
}
