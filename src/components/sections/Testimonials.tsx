"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { testimonials } from "@/content/site";

/**
 * Depoimentos — mesmo layout de três colunas (contador, texto, avatares) e
 * a mesma coreografia de troca do original:
 *
 *   sai o bloco inteiro (opacity 0, y 10, 0.3s)
 *   → troca o conteúdo
 *   → entra de volta (opacity 1, y 0, 0.3s)
 *   → as palavras acendem uma a uma (0.2 → 1, stagger 0.05, power2.out)
 *
 * Duas mudanças internas que não afetam a aparência: os avatares eram `<img>`
 * com listener de clique, o que não é focável nem anunciado como controle —
 * agora são `<button>` com `aria-pressed`; e o bloco de texto tem `aria-live`,
 * para que a troca seja percebida por leitor de tela.
 */
export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const pending = useRef(false);

  const current = testimonials[active]!;

  const change = useCallback(
    (index: number) => {
      if (index === active || pending.current) return;
      pending.current = true;

      void import("gsap").then(({ gsap }) => {
        const body = bodyRef.current;
        if (!body) {
          setActive(index);
          pending.current = false;
          return;
        }

        gsap.to(body, {
          opacity: 0,
          y: 10,
          duration: 0.3,
          onComplete: () => setActive(index),
        });
      });
    },
    [active]
  );

  // Entrada do novo depoimento, depois que o React trocou o conteúdo.
  useEffect(() => {
    if (!pending.current) return;

    void import("gsap").then(({ gsap }) => {
      const body = bodyRef.current;
      const spans = quoteRef.current?.querySelectorAll("span");
      if (!body) return;

      gsap.to(body, { opacity: 1, y: 0, duration: 0.3 });
      if (spans?.length) {
        gsap.fromTo(
          spans,
          { opacity: 0.2 },
          {
            opacity: 1,
            stagger: 0.05,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.1,
          }
        );
      }
      pending.current = false;
    });
  }, [active]);

  return (
    <section className="testimonials-section" id="depoimentos">
      <div className="testimonials-container">
        <span className="section-tag">{"// "}Depoimentos</span>
        <div className="testimonial-content">
          <div className="testimonial-counter">
            <span className="current">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="total">
              /{String(testimonials.length).padStart(2, "0")}
            </span>
          </div>

          <div className="testimonial-body" ref={bodyRef} aria-live="polite">
            {/* `reveal-text` é o que faz as palavras acenderem com o scroll.
                O destaque em laranja marca a metade final da citação, como
                no original. */}
            <h2 className="reveal-text" ref={quoteRef}>
              {`“${current.quote}”`.split(" ").map((word, index, all) => (
                <span
                  key={`${current.id}-${index}`}
                  className={
                    index >= all.length / 2 ? "text-highlight" : undefined
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </h2>
            <div className="testimonial-author">
              <h4>{"// "}{current.name}</h4>
              <p>{current.role}</p>
            </div>
          </div>

          <div className="testimonial-avatars">
            {testimonials.map((testimonial, index) => (
              <button
                type="button"
                key={testimonial.id}
                onClick={() => change(index)}
                aria-pressed={index === active}
                className={`avatar hover-target click-target magnetic${
                  index === active ? " active" : ""
                }`}
              >
                <span className="sr-only">
                  Ver depoimento de {testimonial.name}
                </span>
                <Image
                  src={testimonial.avatar}
                  alt=""
                  width={120}
                  height={120}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
