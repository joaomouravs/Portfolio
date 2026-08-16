import manifest from "./image-manifest.json";

type Size = { width: number; height: number };

const sizes = manifest as Record<string, Size>;

/**
 * Dimensões reais de cada imagem, gravadas pelo script de otimização.
 *
 * Sem isto as galerias declaravam uma proporção fixa (1600×1000) que não
 * correspondia à imagem real, e o layout se deslocava quando ela carregava.
 * O original não declarava dimensão nenhuma — todo o CLS vinha daí.
 */
export function imageSize(src: string, fallback: Size = { width: 1600, height: 1000 }): Size {
  const name = src.replace(/^\/img\//, "").replace(/\.[^.]+$/, "");
  return sizes[name] ?? fallback;
}
