import { useRoute, useLocation } from 'wouter';
import AppLayout from '@/components/AppLayout';
import { useGame } from '@/contexts/GameContext';
import { allModules } from '@/lib/gameData';
import ContactCard from '@/components/ContactCard';

export default function LearningPage() {
  const [, params] = useRoute('/learning/:moduleId');
  const [, navigate] = useLocation();
  const { currentResult } = useGame();

  const moduleId = params?.moduleId as string;
  const module = allModules.find(m => m.id === moduleId);

  if (!module) return null;

  const result = currentResult;
  const scorePercent = result ? Math.round((result.score / result.maxScore) * 100) : 0;
  const isGood = scorePercent >= 70;
  const isMedium = scorePercent >= 40 && scorePercent < 70;

  const defenseLevelGained = Math.round(scorePercent / 100 * 15);
  const xpGained = Math.round(scorePercent / 100 * module.xp);

  // Learning points based on module
  const learningPoints: Record<string, string[]> = {
    grooming: [
      'El reclutamiento siempre sigue el patrón: contacto amigable → confianza → secreto → encargo.',
      'Las ofertas de "protección" o "familia" de desconocidos en redes son señales de captación.',
      'Las preguntas sobre tu colonia, rutina o vida personal son para ubicarte físicamente.',
      'Recibir un primer encargo y ser pagado es el cebo — no el trabajo.',
    ],
    coercive: [
      'Las amenazas a tu familia son el mecanismo de control más común en captación organizada.',
      'Obedecer bajo amenaza nunca resuelve el problema — siempre profundiza el control.',
      'Un menor captado por coerción es una víctima. Las autoridades lo saben y tienen protocolos.',
      'Guardar capturas como evidencia es clave para pedir ayuda efectiva.',
    ],
    fraud: [
      'El primer pago siempre llega — ese es el cebo para crear dependencia y compromiso.',
      '"No abras el paquete" y "no preguntes" significan que te harían cómplice si supieras.',
      'Transportar o guardar mercancía desconocida te hace cómplice legal aunque no sepas el contenido.',
      'Un menor que fue captado con promesas económicas es una víctima, no un delincuente.',
    ],
    disinfo: [
      'El contenido que romantica el crimen prepara psicológicamente para el reclutamiento.',
      'Los reclutadores monitorean quién interactúa con perfiles de "narco lifestyle" en redes.',
      '"Somos tu familia" reemplaza deliberadamente tu red de apoyo real para aislarte.',
      'La necesidad de pertenencia es real y válida — el crimen la explota, no la satisface.',
    ],
  };

  const points = learningPoints[module.id] || [];

  const whatToDoNext = [
    { icon: '💬', text: 'Comparte lo que aprendiste con amigos o familiares' },
    { icon: '🔒', text: 'Revisa la configuración de privacidad de tus redes sociales' },
    { icon: '📱', text: 'Practica el siguiente módulo para fortalecer tu defensa digital' },
  ];

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        {/* Header */}
        <div className="text-center py-6 animate-fade-up">
          <div className="text-5xl mb-4">
            {isGood ? '🏆' : isMedium ? '📈' : '💪'}
          </div>
          <h1 className="font-bold text-white font-display text-xl mb-2">
            {isGood ? '¡Misión completada!' : isMedium ? '¡Buen intento!' : '¡Sigue practicando!'}
          </h1>
          <p className="text-sm" style={{ color: 'hsl(215 20% 60%)' }}>
            {isGood
              ? 'Demostraste que tienes un radar digital bien calibrado.'
              : isMedium
              ? 'Identificaste varias señales. Con más práctica lo dominarás.'
              : 'Hay señales que aún debes reforzar. ¡Vuelve a intentarlo!'}
          </p>
        </div>

        {/* Gains */}
        <div className="grid grid-cols-3 gap-3 animate-fade-up delay-100">
          {[
            { icon: '⚡', label: 'XP ganado', value: `+${xpGained}`, color: 'hsl(186 100% 60%)' },
            { icon: '🛡️', label: 'Defensa +', value: `+${defenseLevelGained}%`, color: 'hsl(152 69% 55%)' },
            { icon: '🎯', label: 'Puntuación', value: `${scorePercent}%`, color: module.color },
          ].map(g => (
            <div key={g.label} className="text-center rounded-2xl p-4 animate-count-up"
              style={{ background: 'hsl(222 43% 14%)', border: '1px solid hsl(222 30% 22%)' }}>
              <div className="text-xl mb-1">{g.icon}</div>
              <div className="font-bold font-display" style={{ color: g.color, fontSize: '1.2rem' }}>{g.value}</div>
              <div className="text-xs" style={{ color: 'hsl(215 20% 50%)' }}>{g.label}</div>
            </div>
          ))}
        </div>

        {/* What user did well */}
        {result && result.correctAnswers > 0 && (
          <div className="rounded-2xl p-5 animate-fade-up delay-200"
            style={{ background: 'hsl(152 69% 44% / 0.07)', border: '1px solid hsl(152 69% 44% / 0.2)' }}>
            <p className="text-sm font-semibold mb-3" style={{ color: 'hsl(152 69% 60%)' }}>
              ✅ Lo que hiciste bien
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm" style={{ color: 'hsl(210 40% 80%)' }}>
                <span className="mt-0.5">•</span>
                <span>Tomaste decisiones correctas en {result.correctAnswers} de {result.totalQuestions} escenarios.</span>
              </li>
              {result.flagsDetected.length > 0 && (
                <li className="flex items-start gap-2 text-sm" style={{ color: 'hsl(210 40% 80%)' }}>
                  <span className="mt-0.5">•</span>
                  <span>Identificaste {result.flagsDetected.length} señales de alerta en los mensajes.</span>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* What user missed */}
        {result && result.missedFlags.length > 0 && (
          <div className="rounded-2xl p-5 animate-fade-up delay-300"
            style={{ background: 'hsl(38 95% 56% / 0.07)', border: '1px solid hsl(38 95% 56% / 0.2)' }}>
            <p className="text-sm font-semibold mb-3" style={{ color: 'hsl(38 95% 65%)' }}>
              🔍 Señales que debes reforzar
            </p>
            <ul className="space-y-2">
              {module.redFlags
                .filter(f => result.missedFlags.includes(f.id))
                .map(f => (
                  <li key={f.id} className="flex items-start gap-2 text-sm" style={{ color: 'hsl(210 40% 75%)' }}>
                    <span className="mt-0.5">🚩</span>
                    <span><strong className="text-white">{f.label}:</strong> {f.explanation}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        )}

        {/* Risk stages recap */}
        {module.riskStages && (
          <div className="rounded-2xl p-5 animate-fade-up delay-350"
            style={{ background: 'hsl(222 43% 12%)', border: `1px solid ${module.color}22` }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: module.color }}>
              📊 Cómo escala este riesgo
            </p>
            {module.stagesIntro && (
              <p className="text-xs mb-4 leading-relaxed" style={{ color: 'hsl(215 20% 55%)' }}>
                {module.stagesIntro}
              </p>
            )}
            <div className="flex flex-col gap-2">
              {module.riskStages.map((stage, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{
                      background: `${module.color}20`,
                      color: module.color,
                      border: `1px solid ${module.color}40`,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <span className="text-xs font-semibold" style={{ color: module.color }}>{stage.label}</span>
                    <span className="text-xs" style={{ color: 'hsl(215 20% 55%)' }}> — {stage.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key learnings */}
        <div className="rounded-2xl p-5 animate-fade-up delay-400"
          style={{ background: 'hsl(222 43% 14%)', border: '1px solid hsl(222 30% 22%)' }}>
          <p className="text-sm font-semibold mb-4 text-white">📚 Lo que aprendiste hoy</p>
          <div className="space-y-3">
            {points.map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: module.color + '22', color: module.color, border: `1px solid ${module.color}44` }}>
                  {i + 1}
                </div>
                <p className="text-sm" style={{ color: 'hsl(210 40% 80%)' }}>{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Real life actions */}
        <div className="rounded-2xl p-5 animate-fade-up delay-500"
          style={{ background: 'hsl(186 100% 50% / 0.06)', border: '1px solid hsl(186 100% 50% / 0.2)' }}>
          <p className="text-sm font-semibold mb-3" style={{ color: 'hsl(186 100% 60%)' }}>
            🌐 En la vida real, recuerda:
          </p>
          <p className="text-sm mb-4" style={{ color: 'hsl(210 40% 80%)' }}>{module.realWorldAction}</p>
          <div className="space-y-2 mb-4">
            {whatToDoNext.map((w, i) => (
              <div key={i} className="flex items-center gap-2 text-sm" style={{ color: 'hsl(210 40% 70%)' }}>
                <span>{w.icon}</span>
                <span>{w.text}</span>
              </div>
            ))}
          </div>
          <ContactCard compact />
        </div>

        {/* Defense level update */}
        <div className="rounded-2xl p-5 animate-fade-up delay-600"
          style={{ background: `${module.color}10`, border: `1px solid ${module.color}30` }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-white">🛡️ Tu nivel de defensa digital subió</p>
            <span className="text-sm font-bold" style={{ color: module.color }}>+{defenseLevelGained}%</span>
          </div>
          <p className="text-xs" style={{ color: 'hsl(215 20% 60%)' }}>
            Cada módulo que completes fortalece tu capacidad de detectar amenazas en entornos digitales reales.
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 animate-fade-up" style={{ animationDelay: '0.7s' }}>
          <button
            data-testid="button-go-modules"
            onClick={() => navigate('/modules')}
            className="flex-1 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
            style={{
              background: `linear-gradient(135deg, ${module.color}, ${module.color}bb)`,
              color: 'hsl(222 47% 8%)',
              boxShadow: `0 0 20px ${module.color}44`,
            }}
          >
            Siguiente módulo →
          </button>
          <button
            data-testid="button-retry"
            onClick={() => navigate(`/simulation/${module.id}`)}
            className="flex-1 py-3.5 rounded-xl font-medium text-sm transition-all hover:bg-white/5"
            style={{ border: '1px solid hsl(222 30% 28%)', color: 'hsl(215 20% 70%)' }}
          >
            Repetir misión
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
