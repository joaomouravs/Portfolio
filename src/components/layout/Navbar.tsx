"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";

const links = [
  { href: "/#projetos", label: "Projetos" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/#depoimentos", label: "Depoimentos" },
  { href: "/#contato", label: "Contato" },
];

/**
 * Navbar — mesmo visual, mesmo menu de tela cheia no mobile, mesma animação
 * de barras virando X.
 *
 * O que mudou por dentro: a `<div class="menu-btn">` virou `<button>` com
 * `aria-expanded`, o menu fecha no Esc e o foco fica preso enquanto aberto.
 * Nada disso altera um pixel — apenas torna o menu operável por teclado e
 * anunciável por leitor de tela, o que antes não era.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables =
        panelRef.current?.querySelectorAll<HTMLElement>("a[href]");
      if (!focusables?.length) return;

      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Nas páginas de projeto a navbar é só o link de volta, como no original.
  if (pathname.startsWith("/projetos/")) {
    return (
      <nav
        className="navbar"
        style={{ background: "transparent", backdropFilter: "none", zIndex: 200 }}
      >
        <Link href="/" className="logo scramble hover-target click-target">
          © VOLTAR PARA HOME
        </Link>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <Link href="/" className="logo scramble hover-target click-target">
        © {site.name.toUpperCase()} &amp; FULL STACK
      </Link>

      <button
        ref={triggerRef}
        type="button"
        className={`menu-btn hover-target${open ? " active" : ""}`}
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
        <span className="bar" />
        <span className="bar" />
      </button>

      <ul
        ref={panelRef}
        id="nav-links"
        className={`nav-links${open ? " active" : ""}`}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="hover-target click-target"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
