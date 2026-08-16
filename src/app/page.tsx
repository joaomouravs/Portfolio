import {
  HeroSection,
  IntroSection,
  ProjectsSection,
  ServicesSection,
  SkillsSection,
} from "@/components/sections/HomeSections";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { ContactFooter } from "@/components/layout/ContactFooter";

/**
 * Home — mesma sequência de seções da versão original:
 * hero → intro → serviços → projetos → depoimentos → ferramentas → contato.
 *
 * Tudo renderiza no servidor, exceto os depoimentos (que têm estado) e a
 * camada de efeitos. O `.hover-reveal-img` continua no DOM porque o CSS
 * original o posiciona; ele é decorativo e não recebe conteúdo.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <SkillsSection />
      <div className="hover-reveal-img" aria-hidden="true" />
      <ContactFooter />
    </>
  );
}
