import type { NextConfig } from "next";

/**
 * Content-Security-Policy.
 *
 * Aqui vale um registro, porque a primeira versão derrubou o site: ela usava
 * `'nonce-<valor>' 'strict-dynamic'` gerado por um middleware. O problema é
 * que `strict-dynamic` faz o navegador ignorar `'self'`, e o Next só carimba
 * o atributo `nonce` nas tags <script> quando encontra o CSP no header da
 * *requisição* — o middleware só o punha na resposta. Resultado: nenhum
 * script tinha nonce, o navegador bloqueou todos, e o preloader ficou preso
 * na tela cobrindo o site inteiro.
 *
 * Esta versão é estática e não depende de nada em runtime: `'self'` libera
 * os chunks do próprio domínio e continua bloqueando script de terceiro,
 * que é o ganho principal. Voltar ao nonce é possível, mas só com o CSP
 * propagado no request e validado em preview antes de ir para produção.
 *
 * `'unsafe-inline'` em style-src é inevitável: o Next e o next/image aplicam
 * estilos inline em atributos, onde não há como anexar nonce.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

/** Headers de segurança aplicados a todas as rotas. */
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    // Larguras alinhadas aos breakpoints reais do projeto.
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 128, 256, 384],
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  // As páginas legadas em .html deixaram de existir: preserva o link
  // de quem salvou ou compartilhou a URL antiga.
  async redirects() {
    const legacy: Array<[string, string]> = [
      ["/index.html", "/"],
      ["/refugio.html", "/projetos/refugio"],
      ["/turingbox.html", "/projetos/turingbox"],
      ["/patafeliz.html", "/projetos/pata-feliz"],
      ["/aurafinance.html", "/projetos/aura-finance"],
      ["/drikoquirino.html", "/projetos/driko-quirino"],
      ["/aura.html", "/projetos/aura-architecture"],
      ["/etoile.html", "/projetos/etoile-academy"],
      ["/solen.html", "/projetos/solen"],
    ];

    return legacy.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
