/**
 * Estado de carregamento entre rotas.
 *
 * Reaproveita a barra de progresso laranja que já existe na identidade do
 * site, em vez de introduzir um indicador novo. A cortina de transição do
 * GSAP costuma cobrir a troca antes disso aparecer.
 */
export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: "0 0 auto 0",
        height: 3,
        overflow: "hidden",
        zIndex: 999999,
      }}
    >
      <div className="route-progress" />
      <span className="sr-only" role="status">
        Carregando
      </span>

      <style>{`
        .route-progress {
          height: 100%;
          width: 30%;
          background: #FF4400;
          animation: route-progress 1.1s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        @keyframes route-progress {
          from { transform: translateX(-100%); }
          to   { transform: translateX(400%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .route-progress { animation: none; width: 100%; opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
