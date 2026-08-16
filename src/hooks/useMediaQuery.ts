"use client";

import { useEffect, useState } from "react";

/**
 * Media query reativa.
 *
 * A versão anterior do portfólio decidia capacidade com
 * `window.innerWidth > 768` medido uma única vez no carregamento: girar o
 * tablet ou redimensionar a janela deixava o cursor customizado e o tilt 3D
 * presos no estado inicial. matchMedia com listener corrige isso.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Verdadeiro quando o visitante pediu menos movimento no sistema. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * Verdadeiro apenas em dispositivos com ponteiro preciso e hover real.
 * É a condição correta para efeitos de cursor — um tablet de 1024px com
 * toque não deveria receber cursor magnético só por causa da largura.
 */
export function useHasFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}
