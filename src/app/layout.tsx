import type { Metadata, Viewport } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import { personSchema } from "@/lib/schema";
import { Chrome } from "@/components/layout/Chrome";
import { Navbar } from "@/components/layout/Navbar";
import { SiteEffects } from "@/components/motion/SiteEffects";
import "./globals.css";

/**
 * As mesmas duas famílias do original — DM Sans para texto e Space Grotesk
 * para display — nos mesmos pesos. A diferença é que agora são baixadas em
 * build e servidas do próprio domínio, em vez de virem do Google Fonts em
 * runtime. Visualmente idênticas; duas origens de terceiro a menos no
 * caminho crítico e sem o flash de texto invisível.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "full stack developer",
    "desenvolvedor full stack",
    "ui ux designer",
    "desenvolvedor next.js",
    "desenvolvedor react",
    "front-end developer",
    "desenvolvimento de sites e aplicações",
    "rio de janeiro",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: `${site.name} — ${site.role}`,
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/img/favicon.png", type: "image/png" }],
    apple: "/img/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${dmSans.variable}`}
    >
      <body id="top">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
        />

        {/* Invisível até receber foco pelo teclado — não altera a tela. */}
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>

        <Chrome />
        <Navbar />
        <SiteEffects />

        {children}
      </body>
    </html>
  );
}
