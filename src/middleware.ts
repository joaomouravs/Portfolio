import { NextResponse, type NextRequest } from "next/server";

/**
 * Content-Security-Policy com nonce por requisição.
 *
 * O nonce é o que permite abandonar `'unsafe-inline'` em `script-src`: os
 * scripts que o Next injeta recebem o nonce automaticamente a partir deste
 * header, e qualquer script injetado por terceiros passa a ser bloqueado.
 *
 * `style-src` ainda precisa de `'unsafe-inline'` — o Next e o React aplicam
 * estilos inline em elementos (o `next/image`, por exemplo), e não há como
 * anexar nonce a atributos `style`. É a limitação conhecida deste desenho.
 */
/**
 * Gera o nonce com APIs disponíveis no Edge runtime.
 * `Buffer` não existe aqui — usar Buffer.from() derruba o middleware, e como
 * ele intercepta quase todas as rotas, o site inteiro para de responder.
 */
function createNonce(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return btoa(String.fromCharCode(...bytes));
}

export function middleware(request: NextRequest) {
  const nonce = createNonce();
  const isDev = process.env.NODE_ENV === "development";

  const csp = [
    `default-src 'self'`,
    // O modo de desenvolvimento do Next depende de eval para o hot reload.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' blob: data:`,
    `font-src 'self'`,
    // O formulário de contato fala com a API de e-mail pelo servidor, não
    // pelo navegador — então o cliente não precisa de destino externo.
    `connect-src 'self'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-ancestors 'none'`,
    `upgrade-insecure-requests`,
  ].join("; ");

  const headers = new Headers(request.headers);
  headers.set("x-nonce", nonce);

  const response = NextResponse.next({ request: { headers } });
  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    /*
     * Aplica a tudo, menos aos assets estáticos e à otimização de imagem —
     * eles não executam script e o custo por requisição não se justifica.
     */
    {
      source: "/((?!api|_next/static|_next/image|img|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
