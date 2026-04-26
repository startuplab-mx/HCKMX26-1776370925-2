// Tarjeta de contacto oficial de la Policía Cibernética CDMX
// Reutilizable en Analysis, Learning y About pages

export default function ContactCard({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div
        className="rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3"
        style={{
          background: 'hsl(186 100% 50% / 0.07)',
          border: '1px solid hsl(186 100% 50% / 0.22)',
        }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: 'hsl(186 100% 50% / 0.15)' }}
        >
          🚔
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold mb-0.5" style={{ color: 'hsl(186 100% 62%)' }}>
            Policía Cibernética · Ciudad de México
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5">
            <a
              href="tel:5552425100"
              className="text-xs font-medium transition-opacity hover:opacity-80"
              style={{ color: 'hsl(210 40% 82%)' }}
            >
              📞 55 5242 5100 ext. 5086
            </a>
            <a
              href="mailto:policia.cibernetica@ssc.cdmx.gob.mx"
              className="text-xs font-medium transition-opacity hover:opacity-80 break-all"
              style={{ color: 'hsl(210 40% 82%)' }}
            >
              ✉️ policia.cibernetica@ssc.cdmx.gob.mx
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: 'hsl(186 100% 50% / 0.07)',
        border: '1px solid hsl(186 100% 50% / 0.25)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ background: 'hsl(186 100% 50% / 0.15)' }}
        >
          🚔
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-tight">
            Policía Cibernética
          </p>
          <p className="text-xs" style={{ color: 'hsl(186 100% 62%)' }}>
            Secretaría de Seguridad Ciudadana · CDMX
          </p>
        </div>
        <div
          className="ml-auto text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0"
          style={{
            background: 'hsl(152 69% 44% / 0.18)',
            color: 'hsl(152 69% 62%)',
            border: '1px solid hsl(152 69% 44% / 0.3)',
          }}
        >
          Oficial
        </div>
      </div>

      {/* Contact items */}
      <div className="space-y-2.5">
        <a
          href="tel:5552425100"
          className="flex items-center gap-3 p-3 rounded-xl transition-all hover:opacity-90 active:scale-[0.99]"
          style={{
            background: 'hsl(222 43% 17%)',
            border: '1px solid hsl(222 30% 26%)',
            textDecoration: 'none',
          }}
        >
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
            style={{ background: 'hsl(152 69% 44% / 0.18)' }}
          >
            📞
          </span>
          <div>
            <p className="text-xs" style={{ color: 'hsl(215 20% 52%)' }}>Teléfono</p>
            <p className="text-sm font-semibold text-white">55 5242 5100 ext. 5086</p>
          </div>
        </a>

        <a
          href="mailto:policia.cibernetica@ssc.cdmx.gob.mx"
          className="flex items-center gap-3 p-3 rounded-xl transition-all hover:opacity-90 active:scale-[0.99]"
          style={{
            background: 'hsl(222 43% 17%)',
            border: '1px solid hsl(222 30% 26%)',
            textDecoration: 'none',
          }}
        >
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
            style={{ background: 'hsl(186 100% 50% / 0.15)' }}
          >
            ✉️
          </span>
          <div className="min-w-0">
            <p className="text-xs" style={{ color: 'hsl(215 20% 52%)' }}>Correo electrónico</p>
            <p
              className="text-sm font-semibold text-white break-all"
              style={{ wordBreak: 'break-word' }}
            >
              policia.cibernetica@ssc.cdmx.gob.mx
            </p>
          </div>
        </a>
      </div>

      {/* Disclaimer */}
      <p className="text-xs mt-3 leading-relaxed" style={{ color: 'hsl(215 20% 48%)' }}>
        Este contacto es gratuito y confidencial. Si estás en peligro inmediato llama al 911.
      </p>
    </div>
  );
}
