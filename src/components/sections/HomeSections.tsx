import Image from "next/image";
import Link from "next/link";
import { services, site, socials, stackLayers } from "@/content/site";
import { projects } from "@/lib/projects";
import {
  BehanceIcon,
  CodeIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/ui/SocialIcons";

/* =========================================
   HERO
   ========================================= */

const socialIcons: Record<string, typeof GitHubIcon> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Behance: BehanceIcon,
  Instagram: InstagramIcon,
  X: XIcon,
};

/**
 * Hero — mesma composição do original: links sociais empilhados à esquerda,
 * título alinhado à direita, ambos ancorados na base da tela sobre a
 * fotografia de fundo.
 *
 * O texto foi ajustado ao reposicionamento Full Stack mantendo o formato de
 * duas linhas curtas que este layout comporta. O tratamento visual — fonte,
 * tamanho, alinhamento, tracking, efeito scramble — é o mesmo.
 */
export function HeroSection() {
  return (
    <div className="content-wrapper">
      <main className="hero" id="conteudo">
        <div className="social-links">
          {socials.map((social) => {
            const Icon = socialIcons[social.label];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-target magnetic click-target"
              >
                <span className="sr-only">{social.label}</span>
                {Icon && <Icon />}
              </a>
            );
          })}
        </div>

        <div className="hero-text">
          <h1 className="scramble">
            {"// FULL STACK DEV"}
            <br />
            {"UI/UX DESIGNER"}
          </h1>
        </div>
      </main>
    </div>
  );
}

/* =========================================
   INTRO
   ========================================= */

/**
 * O `reveal-text` original quebra a frase em spans que acendem um a um
 * conforme a página rola. Manter esse efeito exige que cada palavra seja um
 * span — por isso o texto é dividido aqui em vez de escrito à mão no markup,
 * como era antes.
 */
function RevealWords({
  text,
  highlight = [],
}: {
  text: string;
  highlight?: string[];
}) {
  return (
    <>
      {text.split(" ").map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={highlight.includes(word) ? "text-highlight" : undefined}
        >
          {word}{" "}
        </span>
      ))}
    </>
  );
}

export function IntroSection() {
  return (
    <section className="intro-section" id="sobre">
      <div className="intro-container">
        <span className="section-tag">{"// "}Intro</span>
        <h2 className="reveal-text">
          <RevealWords
            text="Desenvolvedor Full Stack e designer de interfaces. Desenho a interface e construo o sistema por trás dela — do Figma ao deploy."
            highlight={[
              "Full",
              "Stack",
              "construo",
              "o",
              "sistema",
              "deploy.",
            ]}
          />
        </h2>
        <div className="intro-secondary">
          <p>
            O mesmo profissional que define a tipografia também modela o banco,
            escreve a rota de API e configura o deploy — sem tradução perdida
            entre design e engenharia.
          </p>
          <Link href="#projetos" className="btn-outline hover-target magnetic click-target">
            Veja meu trabalho
          </Link>
        </div>
      </div>
    </section>
  );
}

/* =========================================
   SERVIÇOS
   ========================================= */

export function ServicesSection() {
  return (
    <section className="services-section" id="servicos">
      <div className="services-container">
        <span className="section-tag">{"// "}Serviços</span>

        {services.map((service, index) => (
          <div className="service-category spotlight-card" key={service.id}>
            <div className="service-big-num" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="service-content-wrapper">
              <div className="service-header">
                <h3 className="scramble">{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <div className="service-list">
                {service.items.map((item, itemIndex) => (
                  <div className="service-row hover-target" key={item}>
                    <span>{item}</span>
                    <span className="row-num">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================================
   PROJETOS — deck empilhado
   ========================================= */

/**
 * O empilhamento é feito por `position: sticky` no CSS e pelo GSAP, que
 * encolhe e escurece cada card conforme o próximo o cobre. A ordem dos cards
 * define o `z-index` e o degrau do topo — por isso a lista renderiza os
 * projetos na mesma sequência do original.
 *
 * O primeiro card usa o layout `spotlight-card` com efeito lanterna e cor de
 * fundo dinâmica; os demais usam `tilt-card` com inclinação 3D. Era
 * exatamente assim antes.
 */
export function ProjectsSection() {
  const [first, ...rest] = projects;

  return (
    <section className="projects-section" id="projetos">
      <div className="projects-container">
        <span className="section-tag">{"// "}Projetos</span>
        <div className="projects-stack">
          {first && (
            <div
              className="project-card spotlight-card"
              data-color="rgba(0, 40, 100, 0.4)"
            >
              <div className="project-content">
                <div className="project-info">
                  <h3 className="scramble">{first.title}</h3>
                  <p>{first.tagline}</p>
                  <Link
                    href={`/projetos/${first.slug}`}
                    className="btn-outline hover-target magnetic click-target"
                  >
                    Ver Projeto
                  </Link>
                </div>
                <div className="project-visual hover-target">
                  <Image
                    src={first.cover.src}
                    alt={first.cover.alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="parallax-img"
                  />
                </div>
              </div>
            </div>
          )}

          {rest.map((project, index) => (
            <div className="project-card tilt-card" key={project.slug}>
              <div className="project-info">
                <h2>{project.title}</h2>
                <p>{project.tagline}</p>
                <Link
                  href={`/projetos/${project.slug}`}
                  className="btn btn-outline hover-target magnetic"
                >
                  Ver Projeto
                </Link>
              </div>
              <div className="project-image">
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  width={1200}
                  height={800}
                  loading={index < 2 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
              </div>
            </div>
          ))}

          {/* Card "em desenvolvimento" — mesmo placeholder tracejado que
              fechava o deck no original. */}
          <div className="project-card tilt-card dark-card">
            <div className="project-info">
              <CodeIcon className="dev-icon" />
              <h2>
                Em
                <br />
                desenvolvimento
              </h2>
              <p>
                Um novo case de sucesso está sendo construído nos bastidores.
                Fique atento..
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================
   FERRAMENTAS
   ========================================= */

/**
 * Lista de ferramentas com o mesmo tratamento: texto vazado com contorno,
 * preenchendo em branco no hover.
 *
 * O original trazia `data-img` apontando para `img/logos/`, uma pasta que não
 * existe no repositório, e nenhum código lia esse atributo — a revelação de
 * logo nunca chegou a funcionar. O atributo morto foi removido; o visual da
 * seção é o mesmo.
 *
 * O conteúdo agora sai de `stackLayers`, então Node, Supabase e PostgreSQL
 * aparecem junto das ferramentas de design.
 */
export function SkillsSection() {
  const tools = [...new Set(stackLayers.flatMap((layer) => layer.items))];

  return (
    <section className="skills-reveal-section">
      <div className="skills-reveal-container">
        <span className="section-tag">{"// "}Ferramentas</span>
        <ul className="skills-list">
          {tools.map((tool) => (
            <li className="skill-item scramble" key={tool}>
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export { site };
