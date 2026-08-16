/**
 * Ícones sociais em SVG inline.
 *
 * Substituem o Font Awesome, que o original carregava inteiro de CDN
 * (~70 KB bloqueantes) para desenhar cinco glifos. Os desenhos seguem as
 * marcas oficiais, no mesmo tamanho e peso visual dos originais.
 */

type Props = { className?: string };

const svg = {
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": true,
  focusable: false,
} as const;

export function GitHubIcon({ className }: Props) {
  return (
    <svg {...svg} className={className}>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}

export function LinkedInIcon({ className }: Props) {
  return (
    <svg {...svg} className={className}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.65h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.76 2.64 4.76 6.08V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.07 1.4-2.07 2.85V21H9z" />
    </svg>
  );
}

export function BehanceIcon({ className }: Props) {
  return (
    /* O logo do Behance é largo e baixo: o desenho ocupa x de 0 a 24,5 e y
       de 5,7 a 18,4. Num viewBox de 24×24 o "e" ficava cortado à direita e
       a marca ficava jogada no meio. Este viewBox envolve o traçado real e
       o centraliza verticalmente, sem precisar remexer nas coordenadas. */
    <svg {...svg} viewBox="0 -0.2 24.5 24.5" className={className}>
      {/* Medido no navegador: nenhum path passa dos limites acima. */}
      <path d="M7.8 5.7c.59 0 1.12.05 1.6.16.49.1.9.27 1.25.51.34.23.61.55.8.94.19.39.28.87.28 1.44 0 .62-.14 1.14-.42 1.55-.28.41-.7.75-1.25 1.01.75.22 1.32.61 1.69 1.15.37.55.56 1.2.56 1.98 0 .62-.12 1.16-.36 1.61-.24.45-.56.82-.97 1.11-.4.3-.87.51-1.4.65-.52.14-1.06.21-1.61.21H0V5.7h7.8zm-.35 4.97c.48 0 .88-.11 1.19-.34.31-.23.46-.6.46-1.12 0-.29-.05-.52-.15-.71a1.07 1.07 0 0 0-.41-.43 1.72 1.72 0 0 0-.59-.22 3.48 3.48 0 0 0-.69-.06H3.45v2.88h4zm.22 5.22c.27 0 .52-.02.76-.08.24-.05.45-.14.64-.26.18-.13.33-.29.44-.49.1-.21.16-.48.16-.8 0-.63-.18-1.08-.53-1.35-.35-.27-.82-.4-1.4-.4H3.45v3.39h4.22z" />
      <path d="M17.77 15.53c.47.46 1.14.69 2.02.69.63 0 1.17-.16 1.63-.47.46-.32.73-.65.84-1h2.11c-.34 1.32-.86 2.27-1.56 2.84-.7.57-1.55.85-2.54.85-.7 0-1.32-.11-1.88-.33a3.99 3.99 0 0 1-1.41-.96 4.01 4.01 0 0 1-.9-1.48 5.51 5.51 0 0 1-.31-1.9c0-.66.11-1.28.32-1.86.22-.58.53-1.08.93-1.5.4-.42.87-.75 1.43-1a4.55 4.55 0 0 1 1.83-.36c.74 0 1.39.14 1.94.43.55.29 1.01.67 1.36 1.16.35.48.61 1.04.77 1.66.15.62.21 1.27.16 1.94h-6.33c.03 1.01.29 1.74.76 2.19zm3.52-5.93c-.37-.41-1.02-.64-1.78-.64-.5 0-.91.09-1.24.25-.33.17-.59.38-.78.62-.19.24-.32.5-.4.77-.07.27-.12.49-.13.66h3.93c-.11-.61-.32-1.07-.6-1.66z" />
      <path d="M15.67 5.68h4.94v1.2h-4.94z" />
    </svg>
  );
}

export function InstagramIcon({ className }: Props) {
  return (
    <svg {...svg} className={className}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9a3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </svg>
  );
}

export function XIcon({ className }: Props) {
  return (
    <svg {...svg} className={className}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.11z" />
    </svg>
  );
}

export function ExternalIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
    </svg>
  );
}

export function CodeIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  );
}
