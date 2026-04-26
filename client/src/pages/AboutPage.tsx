import { useLocation } from 'wouter';
import AppLayout from '@/components/AppLayout';
import ContactCard from '@/components/ContactCard';

// ─── Ficha ejecutiva visual del proyecto ──────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div className="h-px flex-1" style={{ background: 'hsl(222 30% 24%)' }} />
      <span
        className="text-xs font-bold uppercase tracking-widest px-3"
        style={{ color: 'hsl(186 100% 55%)' }}
      >
        {children}
      </span>
      <div className="h-px flex-1" style={{ background: 'hsl(222 30% 24%)' }} />
    </div>
  );
}

export default function AboutPage() {
  const [, navigate] = useLocation();

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">

        {/* ── PORTADA DEL PROYECTO ──────────────────────────────────────── */}
        <div
          className="relative rounded-3xl overflow-hidden animate-fade-up"
          style={{
            background: 'linear-gradient(135deg, hsl(222 55% 9%) 0%, hsl(240 50% 13%) 60%, hsl(258 60% 10%) 100%)',
            border: '1px solid hsl(186 100% 50% / 0.2)',
            boxShadow: '0 0 60px hsl(186 100% 50% / 0.1)',
          }}
        >
          {/* Glow orb */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, hsl(258 85% 65% / 0.18) 0%, transparent 70%)',
              filter: 'blur(40px)',
              transform: 'translate(30%, -30%)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, hsl(186 100% 50% / 0.12) 0%, transparent 70%)',
              filter: 'blur(32px)',
              transform: 'translate(-20%, 30%)',
            }}
          />

          <div className="relative z-10 p-7 sm:p-10">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{
                background: 'hsl(186 100% 50% / 0.12)',
                border: '1px solid hsl(186 100% 50% / 0.28)',
                color: 'hsl(186 100% 65%)',
              }}
            >
              🇲🇽 Proyecto educativo · México · 2026
            </div>

            {/* Title block */}
            <div className="mb-4">
              <h1
                className="font-display font-bold text-white leading-tight"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}
              >
                Radar{' '}
                <span className="gradient-text">Digital</span>
              </h1>
              <p
                className="text-base mt-2 max-w-xl"
                style={{ color: 'hsl(215 20% 68%)' }}
              >
                Simulador educativo gamificado para adolescentes que enseña a identificar
                y responder ante amenazas sociodigitales en entornos digitales.
              </p>
            </div>

            {/* Slogan pill */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: 'hsl(258 85% 65% / 0.15)',
                border: '1px solid hsl(258 85% 65% / 0.3)',
                color: 'hsl(258 85% 75%)',
              }}
            >
              📡 "Entrena tu radar digital"
            </div>

            {/* Team attribution */}
            <p className="mt-5 text-xs font-medium tracking-wide" style={{ color: 'hsl(215 20% 42%)' }}>
              Una iniciativa de{' '}
              <span
                className="font-semibold"
                style={{ color: 'hsl(186 100% 60%)' }}
              >
                Alianza Digital de Protección Infantil
              </span>
            </p>

            {/* Quick stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              {[
                { value: '4', label: 'Módulos', icon: '🎯' },
                { value: '20+', label: 'Red flags', icon: '🚩' },
                { value: '12–17', label: 'Años', icon: '👤' },
                { value: '100%', label: 'Gamificado', icon: '🎮' },
              ].map(s => (
                <div
                  key={s.label}
                  className="text-center rounded-2xl py-3 px-2"
                  style={{
                    background: 'hsl(222 43% 16% / 0.7)',
                    border: '1px solid hsl(222 30% 26%)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <div className="text-lg mb-0.5">{s.icon}</div>
                  <div
                    className="font-bold font-display text-white"
                    style={{ fontSize: '1.25rem' }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs" style={{ color: 'hsl(215 20% 52%)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── PROBLEMA ──────────────────────────────────────────────────── */}
        <div className="animate-fade-up delay-100">
          <SectionLabel>El problema</SectionLabel>
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'hsl(4 90% 58% / 0.06)',
              border: '1px solid hsl(4 90% 58% / 0.18)',
            }}
          >
            <p className="text-sm mb-5" style={{ color: 'hsl(210 40% 78%)' }}>
              En México, millones de adolescentes usan redes sociales sin haber recibido
              entrenamiento específico sobre cómo identificar manipulación, acoso o engaño
              en entornos digitales.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  value: '1 de 5',
                  label: 'adolescentes ha recibido mensajes sexuales no solicitados',
                  color: 'hsl(4 90% 65%)',
                },
                {
                  value: '78%',
                  label: 'de los casos de grooming inician en redes de uso cotidiano',
                  color: 'hsl(38 95% 60%)',
                },
                {
                  value: '<15%',
                  label: 'de los jóvenes sabe qué hacer ante contenido peligroso en línea',
                  color: 'hsl(186 100% 60%)',
                },
              ].map(s => (
                <div
                  key={s.label}
                  className="text-center p-4 rounded-xl"
                  style={{ background: 'hsl(222 43% 14%)' }}
                >
                  <div
                    className="font-bold font-display mb-1"
                    style={{ color: s.color, fontSize: '1.5rem' }}
                  >
                    {s.value}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: 'hsl(215 20% 58%)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── OBJETIVO ──────────────────────────────────────────────────── */}
        <div className="animate-fade-up delay-150">
          <SectionLabel>Objetivo</SectionLabel>
          <div
            className="rounded-2xl p-6 flex flex-col sm:flex-row gap-5"
            style={{
              background: 'hsl(222 43% 14%)',
              border: '1px solid hsl(222 30% 22%)',
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, hsl(186 100% 40% / 0.2), hsl(258 85% 65% / 0.2))',
                border: '1px solid hsl(186 100% 50% / 0.2)',
              }}
            >
              🎯
            </div>
            <div>
              <h2 className="font-bold text-white text-base mb-2">
                Fortalecer el criterio digital de adolescentes de 12 a 17 años
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'hsl(215 20% 62%)' }}>
                Mediante simulaciones seguras e interactivas de amenazas reales (grooming,
                mensajes coercitivos, estafas digitales y desinformación), Radar Digital
                permite practicar decisiones de seguridad digital en un entorno controlado,
                con retroalimentación explicable y lenguaje adaptado a adolescentes.
              </p>
            </div>
          </div>
        </div>

        {/* ── IMPACTO SOCIAL ────────────────────────────────────────────── */}
        <div className="animate-fade-up delay-200">
          <SectionLabel>Impacto social</SectionLabel>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: '🏫',
                title: 'Escuelas y secundarias',
                text: 'Módulo integrable en tutorías, educación socioemocional o talleres de uso responsable de internet.',
                color: 'hsl(186 100% 50%)',
              },
              {
                icon: '🌱',
                title: 'ONG y protección infantil',
                text: 'Herramienta preventiva para organizaciones que trabajan con niñez y adolescencia en contextos vulnerables.',
                color: 'hsl(152 69% 44%)',
              },
              {
                icon: '🏛️',
                title: 'Programas de gobierno',
                text: 'Alinable con @AprendeDigital, Ciberseguridad para Jóvenes (SSC) y programas de prevención de la SEP.',
                color: 'hsl(258 85% 65%)',
              },
              {
                icon: '🤝',
                title: 'Comunidades y familias',
                text: 'Adaptable para centros comunitarios, bibliotecas públicas y espacios de formación ciudadana en todo México.',
                color: 'hsl(38 95% 56%)',
              },
            ].map(p => (
              <div
                key={p.title}
                className="rounded-2xl p-5 flex gap-4"
                style={{
                  background: 'hsl(222 43% 14%)',
                  border: `1px solid ${p.color}22`,
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: p.color + '18', border: `1px solid ${p.color}30` }}
                >
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1">{p.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'hsl(215 20% 58%)' }}>
                    {p.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── USO ÉTICO DE LA IA ────────────────────────────────────────── */}
        <div className="animate-fade-up delay-250">
          <SectionLabel>Uso ético de la IA</SectionLabel>
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'hsl(152 69% 44% / 0.06)',
              border: '1px solid hsl(152 69% 44% / 0.2)',
            }}
          >
            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              {[
                '✅ No analiza ni almacena datos personales de menores',
                '✅ Todos los escenarios son 100% sintéticos y educativos',
                '✅ No muestra contenido sexual gráfico ni violencia extrema',
                '✅ No reemplaza atención psicológica, legal ni institucional',
                '✅ Lenguaje empático, claro y no culpabilizador',
                '✅ Promueve buscar ayuda de adultos de confianza y autoridades',
              ].map((e, i) => (
                <p key={i} className="text-sm" style={{ color: 'hsl(210 40% 78%)' }}>
                  {e}
                </p>
              ))}
            </div>
            <div
              className="p-4 rounded-xl"
              style={{
                background: 'hsl(152 69% 44% / 0.1)',
                border: '1px solid hsl(152 69% 44% / 0.25)',
              }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: 'hsl(152 69% 60%)' }}>
                Principio rector
              </p>
              <p className="text-sm italic" style={{ color: 'hsl(210 40% 80%)' }}>
                "La IA en esta app se usa exclusivamente para retroalimentar decisiones
                educativas, no para vigilar, perfilar ni juzgar a adolescentes. El objetivo
                es empoderar, no controlar."
              </p>
            </div>
          </div>
        </div>

        {/* ── IMPLEMENTACIÓN EN MÉXICO ─────────────────────────────────── */}
        <div className="animate-fade-up delay-300">
          <SectionLabel>Posibilidad de implementación en México</SectionLabel>
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'hsl(222 43% 14%)',
              border: '1px solid hsl(222 30% 22%)',
            }}
          >
            {/* How it works — 4 steps */}
            <p className="text-sm mb-5" style={{ color: 'hsl(215 20% 60%)' }}>
              La arquitectura modular de Radar Digital permite su integración progresiva
              sin infraestructura compleja:
            </p>
            <div className="grid sm:grid-cols-4 gap-4 mb-6">
              {[
                {
                  step: '01',
                  icon: '📋',
                  title: 'Piloto escolar',
                  text: 'Prueba con 1–3 grupos en horas de tutoría o tecnología',
                },
                {
                  step: '02',
                  icon: '📊',
                  title: 'Evaluación',
                  text: 'Medir comprensión, engagement y decisiones de los estudiantes',
                },
                {
                  step: '03',
                  icon: '🔧',
                  title: 'Adaptación',
                  text: 'Agregar escenarios locales y actualizar según amenazas vigentes',
                },
                {
                  step: '04',
                  icon: '🚀',
                  title: 'Escala',
                  text: 'Integrar en currículo SEP, plataformas de gobierno o apps educativas',
                },
              ].map(s => (
                <div key={s.step} className="text-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-2"
                    style={{
                      background: 'hsl(186 100% 50% / 0.15)',
                      color: 'hsl(186 100% 60%)',
                      border: '1px solid hsl(186 100% 50% / 0.3)',
                    }}
                  >
                    {s.step}
                  </div>
                  <div className="text-xl mb-1">{s.icon}</div>
                  <p className="text-xs font-semibold text-white mb-1">{s.title}</p>
                  <p className="text-xs" style={{ color: 'hsl(215 20% 52%)' }}>
                    {s.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Tech stack */}
            <div
              className="p-4 rounded-xl"
              style={{
                background: 'hsl(222 35% 18%)',
                border: '1px solid hsl(222 30% 26%)',
              }}
            >
              <p
                className="text-xs font-semibold mb-2 uppercase tracking-wider"
                style={{ color: 'hsl(215 20% 52%)' }}
              >
                Tecnología
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'React 18',
                  'TypeScript',
                  'Tailwind CSS',
                  'Gamification Engine',
                  'IA Explicable (mock)',
                  'Mobile-first',
                  'Sin base de datos de menores',
                  'Open source ready',
                ].map(t => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: 'hsl(222 35% 22%)',
                      color: 'hsl(210 40% 72%)',
                      border: '1px solid hsl(222 30% 30%)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CONTACTO OFICIAL ─────────────────────────────────────────── */}
        <div className="animate-fade-up delay-350">
          <SectionLabel>Contacto de apoyo oficial</SectionLabel>
          <div className="mb-3">
            <p className="text-sm mb-4" style={{ color: 'hsl(215 20% 60%)' }}>
              Radar Digital siempre dirige a los adolescentes a reportar situaciones de
              riesgo real con la autoridad competente en México:
            </p>
            <ContactCard />
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <div className="text-center py-6 animate-fade-up delay-400">
          <p className="text-xs mb-4" style={{ color: 'hsl(215 20% 45%)' }}>
            Radar Digital · Prototipo educativo · Escenarios sintéticos · Desarrollado
            para uso educativo en México
          </p>
          <button
            data-testid="button-start-training"
            onClick={() => navigate('/modules')}
            className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg, hsl(186 100% 40%), hsl(186 100% 55%))',
              color: 'hsl(222 47% 8%)',
              boxShadow: '0 0 24px hsl(186 100% 50% / 0.3)',
            }}
          >
            Iniciar entrenamiento →
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
