import { useLocation } from 'wouter';
import { useGame } from '@/contexts/GameContext';

export default function WelcomePage() {
  const [, navigate] = useLocation();
  const { profile } = useGame();

  const stats = [
    { icon: '🧠', value: '4', label: 'Módulos de entrenamiento' },
    { icon: '🚩', value: '20+', label: 'Banderas rojas a detectar' },
    { icon: '🎮', value: '100%', label: 'Interactivo y gamificado' },
  ];

  const threatTypes = [
    { icon: '💬', label: 'Grooming y captación', color: 'text-purple-400', bg: 'hsl(258 85% 65% / 0.1)', border: 'hsl(258 85% 65% / 0.25)' },
    { icon: '⚠️', label: 'Presión y control', color: 'text-red-400', bg: 'hsl(4 90% 58% / 0.1)', border: 'hsl(4 90% 58% / 0.25)' },
    { icon: '💰', label: 'Falsas ofertas', color: 'text-amber-400', bg: 'hsl(38 95% 56% / 0.1)', border: 'hsl(38 95% 56% / 0.25)' },
    { icon: '📱', label: 'Normalización digital', color: 'text-cyan-400', bg: 'hsl(186 100% 50% / 0.1)', border: 'hsl(186 100% 50% / 0.25)' },
  ];

  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden dot-grid"
      style={{ background: 'linear-gradient(135deg, hsl(222 55% 8%) 0%, hsl(240 50% 11%) 50%, hsl(222 55% 8%) 100%)' }}>

      {/* Background glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, hsl(186 100% 50%) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, hsl(258 85% 65%) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      {/* Top bar */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, hsl(186 100% 40%), hsl(258 85% 55%))' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-label="Logo">
              <path d="M3 3v18M3 6l8-3 4 2 6-2v12l-6 2-4-2-8 3" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="2.5" fill="white"/>
            </svg>
          </div>
          <div>
            <span className="font-bold text-sm" style={{ color: 'hsl(186 100% 60%)' }}>Radar</span>
            <span className="font-bold text-sm text-white"> Digital</span>
          </div>
        </div>
        <div className="text-xs px-3 py-1.5 rounded-full font-medium"
          style={{ background: 'hsl(152 69% 44% / 0.15)', color: 'hsl(152 69% 60%)', border: '1px solid hsl(152 69% 44% / 0.3)' }}>
          🛡️ Uso ético · Sin datos reales
        </div>
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10 text-center">

        {/* Tag chip */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 animate-fade-up"
          style={{ background: 'hsl(186 100% 50% / 0.1)', border: '1px solid hsl(186 100% 50% / 0.25)', color: 'hsl(186 100% 65%)' }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'hsl(186 100% 50%)' }} />
          Simulador educativo · Modo demo activo
        </div>

        {/* Main title */}
        <div className="max-w-3xl mx-auto mb-4 animate-fade-up delay-100">
          <h1 className="font-display font-bold text-white mb-2"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05 }}>
            Entrena tu
          </h1>
          <h1 className="font-display font-bold gradient-text"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05 }}>
            radar digital
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-lg max-w-2xl mx-auto mb-6 animate-fade-up delay-200"
          style={{ color: 'hsl(215 20% 65%)' }}>
          Aprende a reconocer cómo el crimen organizado recluta menores en entornos digitales: captación, presión, falsas ofertas y normalización.
        </p>

        {/* Team attribution */}
        <p className="text-xs font-medium tracking-wide mb-10 animate-fade-up delay-250"
          style={{ color: 'hsl(215 20% 42%)' }}>
          Una iniciativa de{' '}
          <span style={{ color: 'hsl(215 20% 58%)' }}>Alianza Digital de Protección Infantil</span>
        </p>

        {/* Threat type chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 animate-fade-up delay-300">
          {threatTypes.map(t => (
            <div key={t.label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${t.color}`}
              style={{ background: t.bg, border: `1px solid ${t.border}` }}>
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-16 animate-fade-up delay-400">
          <button
            data-testid="button-start"
            onClick={() => navigate('/dashboard')}
            className="relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:scale-105 active:scale-100"
            style={{
              background: 'linear-gradient(135deg, hsl(186 100% 40%), hsl(186 100% 55%))',
              color: 'hsl(222 47% 8%)',
              boxShadow: '0 0 32px hsl(186 100% 50% / 0.4)',
            }}
          >
            <span>Comenzar entrenamiento</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button
            data-testid="button-proyecto"
            onClick={() => navigate('/about')}
            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-semibold text-sm transition-all hover:scale-105 active:scale-100"
            style={{
              background: 'linear-gradient(135deg, hsl(258 85% 55% / 0.25), hsl(258 85% 65% / 0.15))',
              color: 'hsl(258 85% 80%)',
              border: '1px solid hsl(258 85% 65% / 0.45)',
              boxShadow: '0 0 18px hsl(258 85% 65% / 0.2)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
            </svg>
            Proyecto
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-lg w-full animate-fade-up delay-500">
          {stats.map(s => (
            <div key={s.label} className="text-center p-4 rounded-2xl"
              style={{ background: 'hsl(222 43% 14% / 0.8)', border: '1px solid hsl(222 30% 22%)' }}>
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-bold text-white text-lg font-display">{s.value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'hsl(215 20% 50%)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom disclaimer */}
      <footer className="relative z-10 text-center py-4 px-6 text-xs" style={{ color: 'hsl(215 20% 38%)' }}>
        Esta app usa escenarios sintéticos. No analiza ni almacena datos personales de menores. Diseñada para educación y prevención.
        <span className="mx-2 opacity-40">·</span>
        Alianza Digital de Protección Infantil
      </footer>
    </div>
  );
}
