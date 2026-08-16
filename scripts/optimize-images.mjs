/**
 * Otimiza as imagens de img/ para public/img/.
 *
 * O repositório carregava 21 MB de PNG/JPG sem compressão — incluindo três
 * fotos de depoimento de mais de 1 MB cada renderizadas como avatares de 60px.
 * Este script converte tudo para AVIF (com fallback WebP) e redimensiona cada
 * arquivo para o maior tamanho em que ele realmente é exibido.
 *
 * Uso: npm run optimize:images
 */
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "img";
const OUT = path.join("public", "img");

/** Largura máxima em que cada grupo de imagem é exibido, em CSS pixels x2. */
const PROFILES = [
  { match: /^foto-/, width: 160, label: "avatar" },
  { match: /^favicon/, width: 512, label: "ícone", keepPng: true },
  { match: /(thumb|capa)/, width: 1600, label: "capa" },
  { match: /./, width: 2000, label: "galeria" },
];

function profileFor(name) {
  return PROFILES.find((p) => p.match.test(name)) ?? PROFILES.at(-1);
}

const fmt = (bytes) => `${(bytes / 1024).toFixed(0).padStart(6)} KB`;

async function main() {
  await mkdir(OUT, { recursive: true });

  const files = (await readdir(SRC)).filter((f) =>
    /\.(png|jpe?g)$/i.test(f)
  );

  let before = 0;
  let after = 0;
  const manifest = {};

  for (const file of files) {
    const src = path.join(SRC, file);
    const base = path.parse(file).name;
    const profile = profileFor(file);

    before += (await stat(src)).size;

    const image = sharp(src);
    const meta = await image.metadata();
    const width = Math.min(profile.width, meta.width ?? profile.width);

    // Guarda as dimensões finais: sem elas não há como reservar espaço no
    // layout, e toda imagem que carrega provoca deslocamento (CLS).
    const resized = image.clone().resize({ width, withoutEnlargement: true });
    const finalMeta = await resized.clone().toBuffer({ resolveWithObject: true });

    manifest[base] = {
      width: finalMeta.info.width,
      height: finalMeta.info.height,
    };

    const outputs = [
      { ext: "avif", options: { quality: 55, effort: 6 } },
      { ext: "webp", options: { quality: 78 } },
    ];

    for (const { ext, options } of outputs) {
      const dest = path.join(OUT, `${base}.${ext}`);
      await resized.clone()[ext](options).toFile(dest);
      after += (await stat(dest)).size;
    }

    // O favicon precisa continuar em PNG: nem todo consumidor de ícone
    // entende AVIF.
    if (profile.keepPng) {
      const dest = path.join(OUT, `${base}.png`);
      await resized.clone().png({ compressionLevel: 9 }).toFile(dest);
      after += (await stat(dest)).size;
    }

    console.log(
      `${base.padEnd(22)} ${profile.label.padEnd(8)} ${finalMeta.info.width}px`
    );
  }

  await writeFile(
    path.join("src", "lib", "image-manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n"
  );

  console.log(
    `\n${files.length} imagens\nantes: ${fmt(before)}\ndepois: ${fmt(after)}` +
      `\nreducao: ${(100 - (after / before) * 100).toFixed(1)}%`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
