import type { NextConfig } from "next";

/**
 * Headers de segurança aplicados a todas as rotas.
 * A Content-Security-Policy fica no middleware, porque depende de um nonce
 * gerado por requisição — aqui só entram os headers estáticos.
 */
const securityHeaders = [
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
