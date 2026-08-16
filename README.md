# Portfólio — João Vitor

Full Stack Developer & UI/UX Designer.
Next.js 15 · TypeScript · Tailwind CSS 4 · React 19 · GSAP · Lenis.

**Regra do projeto:** o visual é uma reprodução fiel da versão anterior em
HTML/CSS/JS, preservada em `legacy/`. Cores, tipografia, espaçamentos, raios,
sombras, layout e animações são os mesmos. O que foi modernizado é só o que
está por baixo. Antes de mexer em qualquer estilo, compare com `legacy/style.css`.

## Rodando

```bash
npm install
cp .env.example .env.local
npm run dev                  # http://localhost:3000
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run typecheck` | Checagem de tipos |
| `npm run lint` | ESLint |
| `npm run optimize:images` | Reprocessa `img/` → `public/img/` |

## Estrutura

```
legacy/                   versão original em HTML/CSS/JS — referência visual
img/                      fontes originais das imagens (não servidas)
public/img/               AVIF + WebP otimizados, gerados pelo script
src/
  app/
    globals.css           porte de legacy/style.css, valor por valor
    layout.tsx            fontes, metadata, JSON-LD
    page.tsx              home
    projetos/[slug]/      página de projeto
  components/
    layout/               Chrome (elementos fixos), Navbar, ContactFooter
    sections/             seções da home
    motion/SiteEffects    porte completo de legacy/script.js
    ui/SocialIcons        SVGs que substituem o Font Awesome
  content/
    site.ts               dados institucionais, serviços, stack, depoimentos
    projects/             um arquivo por projeto
  lib/                    projects, schema (JSON-LD)
  types/project.ts        schema Zod dos projetos
```

## Rotas

Mesma estrutura do original: uma home com seções ancoradas
(`#sobre`, `#servicos`, `#projetos`, `#depoimentos`, `#contato`) e uma página
por projeto em `/projetos/[slug]`. As URLs antigas em `.html` redirecionam com
301 — ver `next.config.ts`.

## Adicionando um projeto

1. Crie `src/content/projects/meu-projeto.ts` exportando um objeto `Project`.
2. Registre no array `source` em `src/lib/projects.ts`.

Rota, sitemap, imagem de compartilhamento, card no deck da home e navegação
“mais projetos” passam a existir sozinhos. O schema Zod valida em build: se
faltar campo obrigatório — ou se um projeto marcado como `tier: "case"` não
tiver arquitetura e desafio técnico — o build falha.

## O que mudou por dentro

- **6 pares CSS/JS idênticos viraram um componente.** As oito páginas de
  projeto eram cópias byte a byte (mesmo MD5).
- **21 MB → 2,27 MB de imagens** (−89%). AVIF com fallback WebP, dimensões
  explícitas, lazy loading. Os avatares de depoimento saíram de 1,7 MB para
  ~4 KB cada.
- **Sem CDN de terceiro no caminho crítico.** GSAP, Lenis e as fontes vêm do
  bundle. O Font Awesome inteiro (~70 KB) virou SVG inline.
- **O preloader não pode mais travar o site.** Antes ele só era removido pelo
  GSAP vindo de CDN: qualquer falha de rede deixava uma tela preta permanente.
- **`prefers-reduced-motion` respeitado** em tudo, inclusive no scroll suave.
- **Foco visível, menu e depoimentos operáveis por teclado**, skip link,
  landmarks e alt text descritivo.
- **SEO completo**: metadata por rota, Open Graph gerado em build, canonical,
  sitemap, robots e JSON-LD. O original não tinha nenhuma meta description.
- **Headers de segurança e CSP com nonce** em `src/middleware.ts` (roda em
  Edge runtime — nada de `Buffer` ou APIs de Node ali).
- **Ctrl+clique voltou a funcionar** nos links internos.

## Pendências

Procure por `TODO João` no código:

- URL do GitHub em `src/content/site.ts` (está com um palpite)
- Número de WhatsApp
- Domínio final em `site.url`
- Revisar `challenge` e `result` dos cases Refúgio e TuringBox
- Anos dos projetos de vitrine
