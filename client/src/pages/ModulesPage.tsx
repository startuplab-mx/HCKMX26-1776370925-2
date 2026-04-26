import { useLocation } from 'wouter';
import AppLayout from '@/components/AppLayout';
import { useGame } from '@/contexts/GameContext';
import { allModules } from '@/lib/gameData';

export default function ModulesPage() {
  const [, navigate] = useLocation();
  const { profile } = useGame();

  const difficultyOrder = { 'Básico': 1, 'Intermedio': 2, 'Avanzado': 3 };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8 animate-fade-up">
          <p className="text-sm font-medium mb-1" style={{ color: 'hsl(186 100% 60%)' }}>🎯 Elige tu misión</p>
          <h1 className="text-xl font-bold text-white font-display mb-2">Módulos de entrenamiento</h1>
          <p className="text-sm" style={{ color: 'hsl(215 20% 55%)' }}>
            Cada módulo simula una amenaza real. Aprende a identificar señales de peligro y actuar correctamente.
          </p>
        </div>

        {/* Progress summary */}
        <div className="rounded-2xl p-4 mb-8 flex items-center gap-4 animate-fade-up delay-100"
          style={{ background: 'hsl(186 100% 50% / 0.06)', border: '1px solid hsl(186 100% 50% / 0.2)' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: 'hsl(186 100% 50% / 0.15)' }}>
            📡
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white mb-1">Tu progreso</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'hsl(222 30% 20%)' }}>
                <div className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${Math.round(profile.moduleProgress.filter(p => p.completed).length / allModules.length * 100)}%`,
                    background: 'linear-gradient(90deg, hsl(186 100% 40%), hsl(186 100% 60%))',
                    boxShadow: '0 0 8px hsl(186 100% 50% / 0.5)',
                  }} />
              </div>
              <span className="text-xs font-semibold" style={{ color: 'hsl(186 100% 60%)' }}>
                {profile.moduleProgress.filter(p => p.completed).length}/{allModules.length} completados
              </span>
            </div>
          </div>
        </div>

        {/* Module cards — vertical list for detailed view */}
        <div className="space-y-4">
          {allModules.map((module, i) => {
            const progress = profile.moduleProgress.find(p => p.moduleId === module.id);
            const isCompleted = progress?.completed ?? false;
            const pct = isCompleted && progress ? Math.round((progress.score / progress.maxScore) * 100) : 0;

            const difficultyColor = {
              'Básico': { text: 'hsl(152 69% 60%)', bg: 'hsl(152 69% 44% / 0.15)', border: 'hsl(152 69% 44% / 0.3)' },
              'Intermedio': { text: 'hsl(38 95% 65%)', bg: 'hsl(38 95% 56% / 0.15)', border: 'hsl(38 95% 56% / 0.3)' },
              'Avanzado': { text: 'hsl(4 90% 68%)', bg: 'hsl(4 90% 58% / 0.15)', border: 'hsl(4 90% 58% / 0.3)' },
            }[module.difficulty];

            return (
              <div
                key={module.id}
                data-testid={`module-card-${module.id}`}
                className="rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.01] hover:-translate-y-0.5 animate-fade-up"
                style={{
                  animationDelay: `${0.1 + i * 0.08}s`,
                  background: 'hsl(222 43% 14%)',
                  border: `1px solid ${isCompleted ? module.color + '44' : 'hsl(222 30% 22%)'}`,
                  boxShadow: isCompleted ? `0 0 24px ${module.color}18` : 'none',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onClick={() => navigate(`/simulation/${module.id}`)}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: module.color + '15', border: `1px solid ${module.color}33` }}>
                    {module.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-white text-sm">{module.title}</h3>
                      {isCompleted && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold"
                          style={{ color: 'hsl(152 69% 60%)', background: 'hsl(152 69% 44% / 0.15)', border: '1px solid hsl(152 69% 44% / 0.3)' }}>
                          ✓ Completado
                        </span>
                      )}
                    </div>
                    <p className="text-sm mb-3" style={{ color: 'hsl(215 20% 55%)' }}>{module.subtitle}</p>

                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{ color: difficultyColor?.text, background: difficultyColor?.bg, border: `1px solid ${difficultyColor?.border}` }}>
                        {module.difficulty}
                      </span>
                      <span className="text-xs font-medium" style={{ color: module.color }}>+{module.xp} XP</span>
                      <span className="text-xs" style={{ color: 'hsl(215 20% 50%)' }}>
                        {module.redFlags.length} banderas rojas · {module.steps.length} escenarios
                      </span>
                    </div>

                    {isCompleted && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span style={{ color: 'hsl(215 20% 50%)' }}>Puntuación obtenida</span>
                          <span className="font-semibold" style={{ color: module.color }}>{pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'hsl(222 30% 20%)' }}>
                          <div className="h-full rounded-full" style={{
                            width: `${pct}%`, background: module.color, boxShadow: `0 0 6px ${module.color}88`,
                          }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 self-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      style={{ color: 'hsl(215 20% 45%)' }}>
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                </div>

                {/* Red flags preview */}
                <div className="mt-4 pt-4 flex flex-wrap gap-1.5" style={{ borderTop: '1px solid hsl(222 30% 22%)' }}>
                  <span className="text-xs" style={{ color: 'hsl(215 20% 45%)' }}>Aprenderás a detectar:</span>
                  {module.redFlags.slice(0, 3).map(f => (
                    <span key={f.id} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'hsl(222 30% 20%)', color: 'hsl(215 20% 65%)', border: '1px solid hsl(222 30% 27%)' }}>
                      🚩 {f.label}
                    </span>
                  ))}
                  {module.redFlags.length > 3 && (
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: 'hsl(215 20% 50%)' }}>
                      +{module.redFlags.length - 3} más
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom disclaimer */}
        <div className="mt-8 text-center animate-fade-up delay-500">
          <p className="text-xs" style={{ color: 'hsl(215 20% 38%)' }}>
            Todos los escenarios son sintéticos y educativos. No reproducen contenido real de menores.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
