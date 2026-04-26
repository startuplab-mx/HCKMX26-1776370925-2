import { useLocation } from 'wouter';
import AppLayout from '@/components/AppLayout';
import { useGame } from '@/contexts/GameContext';
import { allModules } from '@/lib/gameData';

export default function ProfilePage() {
  const [, navigate] = useLocation();
  const { profile, resetModule } = useGame();

  const completedModules = profile.moduleProgress.filter(p => p.completed);
  const pendingModules = profile.moduleProgress.filter(p => !p.completed);
  const earnedBadges = profile.badges.filter(b => b.earned);
  const xpProgress = Math.round((profile.totalXP % 200) / 200 * 100);

  const bestModuleId = completedModules.length > 0
    ? completedModules.reduce((best, cur) =>
        (cur.score / allModules.find(m => m.id === cur.moduleId)!.xp) >
        (best.score / allModules.find(m => m.id === best.moduleId)!.xp)
          ? cur : best
      )
    : null;

  const weakModuleId = completedModules.length > 0
    ? completedModules.reduce((weak, cur) =>
        (cur.score / allModules.find(m => m.id === cur.moduleId)!.xp) <
        (weak.score / allModules.find(m => m.id === weak.moduleId)!.xp)
          ? cur : weak
      )
    : null;

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">

        {/* Profile hero */}
        <div className="rounded-2xl overflow-hidden animate-fade-up"
          style={{ background: 'hsl(222 43% 14%)', border: '1px solid hsl(222 30% 22%)' }}>
          <div className="h-24 w-full" style={{
            background: 'linear-gradient(135deg, hsl(186 100% 15%), hsl(258 85% 20%), hsl(186 100% 10%))',
          }} />
          <div className="px-6 pb-6 -mt-10">
            <div className="flex items-end gap-4 mb-4">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
                style={{
                  background: 'linear-gradient(135deg, hsl(186 100% 40%), hsl(258 85% 55%))',
                  border: '3px solid hsl(222 43% 14%)',
                  boxShadow: '0 0 24px hsl(186 100% 50% / 0.3)',
                }}>
                🛡️
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-bold text-white font-display text-lg">Agente Digital</h1>
                  <div className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                    style={{ background: 'hsl(186 100% 50% / 0.15)', color: 'hsl(186 100% 60%)', border: '1px solid hsl(186 100% 50% / 0.3)' }}>
                    Nivel {profile.level}
                  </div>
                </div>
                <p className="text-xs" style={{ color: 'hsl(215 20% 55%)' }}>
                  {completedModules.length} de {allModules.length} misiones completadas
                </p>
              </div>
            </div>

            {/* XP bar */}
            <div className="mb-2">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span style={{ color: 'hsl(215 20% 55%)' }}>XP hacia nivel {profile.level + 1}</span>
                <span className="font-semibold" style={{ color: 'hsl(186 100% 60%)' }}>
                  {profile.totalXP} / {profile.xpToNext}
                </span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'hsl(222 30% 20%)' }}>
                <div className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${xpProgress}%`,
                    background: 'linear-gradient(90deg, hsl(186 100% 40%), hsl(186 100% 60%))',
                    boxShadow: '0 0 8px hsl(186 100% 50% / 0.5)',
                  }} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-up delay-100">
          {[
            { label: 'XP Total', value: profile.totalXP, icon: '⚡', color: 'hsl(186 100% 60%)' },
            { label: 'Misiones', value: `${completedModules.length}/${allModules.length}`, icon: '🎯', color: 'hsl(258 85% 70%)' },
            { label: 'Insignias', value: earnedBadges.length, icon: '🏆', color: 'hsl(38 95% 60%)' },
            { label: 'Defensa', value: `${profile.defenseRating}%`, icon: '🛡️', color: 'hsl(152 69% 55%)' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl p-4 text-center"
              style={{ background: 'hsl(222 43% 14%)', border: '1px solid hsl(222 30% 22%)' }}>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="font-bold font-display" style={{ color: s.color, fontSize: '1.3rem' }}>{s.value}</div>
              <div className="text-xs" style={{ color: 'hsl(215 20% 50%)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-5">

          {/* Left col */}
          <div className="space-y-4">
            {/* Module history */}
            <div className="rounded-2xl p-5 animate-fade-up delay-200"
              style={{ background: 'hsl(222 43% 14%)', border: '1px solid hsl(222 30% 22%)' }}>
              <p className="text-sm font-semibold text-white mb-4">📋 Historial de misiones</p>
              <div className="space-y-3">
                {allModules.map(m => {
                  const p = profile.moduleProgress.find(x => x.moduleId === m.id);
                  const isCompleted = p?.completed ?? false;
                  const pct = isCompleted && p ? Math.round((p.score / m.xp * 100)) : 0;
                  return (
                    <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: 'hsl(222 35% 17%)' }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                        style={{ background: m.color + '15', border: `1px solid ${m.color}33` }}>
                        {m.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-sm font-medium text-white truncate">{m.title}</p>
                          {isCompleted
                            ? <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium"
                                style={{ color: 'hsl(152 69% 60%)', background: 'hsl(152 69% 44% / 0.15)' }}>✓</span>
                            : <button onClick={() => navigate(`/simulation/${m.id}`)}
                                className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium transition-colors hover:opacity-80"
                                style={{ color: m.color, background: m.color + '18', border: `1px solid ${m.color}33` }}>
                                Jugar
                              </button>
                          }
                        </div>
                        {isCompleted && (
                          <div className="mt-1.5">
                            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'hsl(222 30% 24%)' }}>
                              <div className="h-full rounded-full" style={{ width: `${Math.min(100, pct)}%`, background: m.color }} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Strengths & weaknesses */}
            {completedModules.length > 0 && (
              <div className="rounded-2xl p-5 animate-fade-up delay-300"
                style={{ background: 'hsl(222 43% 14%)', border: '1px solid hsl(222 30% 22%)' }}>
                <p className="text-sm font-semibold text-white mb-3">📊 Tu análisis</p>
                {bestModuleId && (
                  <div className="p-3 rounded-xl mb-2"
                    style={{ background: 'hsl(152 69% 44% / 0.08)', border: '1px solid hsl(152 69% 44% / 0.2)' }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: 'hsl(152 69% 60%)' }}>✅ Mejor detectando</p>
                    <p className="text-sm text-white">{allModules.find(m => m.id === bestModuleId.moduleId)?.title}</p>
                  </div>
                )}
                {weakModuleId && bestModuleId && weakModuleId.moduleId !== bestModuleId.moduleId && (
                  <div className="p-3 rounded-xl"
                    style={{ background: 'hsl(38 95% 56% / 0.08)', border: '1px solid hsl(38 95% 56% / 0.2)' }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: 'hsl(38 95% 65%)' }}>🔁 Sigue practicando</p>
                    <p className="text-sm text-white">{allModules.find(m => m.id === weakModuleId.moduleId)?.title}</p>
                  </div>
                )}
                {pendingModules.length > 0 && (
                  <div className="mt-2 p-3 rounded-xl"
                    style={{ background: 'hsl(186 100% 50% / 0.07)', border: '1px solid hsl(186 100% 50% / 0.2)' }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: 'hsl(186 100% 60%)' }}>🎯 Próxima misión</p>
                    <p className="text-sm text-white">{allModules.find(m => m.id === pendingModules[0].moduleId)?.title}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right col — Badges */}
          <div className="animate-fade-up delay-300">
            <div className="rounded-2xl p-5"
              style={{ background: 'hsl(222 43% 14%)', border: '1px solid hsl(222 30% 22%)' }}>
              <p className="text-sm font-semibold text-white mb-4">🏆 Mis insignias</p>
              <div className="grid grid-cols-2 gap-3">
                {profile.badges.map(badge => (
                  <div key={badge.id}
                    data-testid={`profile-badge-${badge.id}`}
                    className={`rounded-xl p-4 text-center transition-all ${badge.earned ? '' : 'opacity-35'}`}
                    style={{
                      background: badge.earned ? 'hsl(222 35% 20%)' : 'hsl(222 30% 17%)',
                      border: badge.earned ? '1px solid hsl(222 30% 30%)' : '1px solid hsl(222 30% 22%)',
                    }}>
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <p className={`text-xs font-semibold ${badge.earned ? 'text-white' : ''}`}
                      style={{ color: badge.earned ? 'white' : 'hsl(215 20% 40%)' }}>
                      {badge.name}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'hsl(215 20% 45%)' }}>{badge.description}</p>
                    {badge.earned && (
                      <div className="mt-2 inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                        style={{ background: 'hsl(152 69% 44% / 0.2)', color: 'hsl(152 69% 60%)' }}>
                        ✓ Ganada
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        {pendingModules.length > 0 && (
          <div className="text-center pt-4 animate-fade-up delay-500">
            <button
              onClick={() => navigate('/modules')}
              className="px-8 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
              style={{
                background: 'linear-gradient(135deg, hsl(186 100% 40%), hsl(186 100% 55%))',
                color: 'hsl(222 47% 8%)',
                boxShadow: '0 0 24px hsl(186 100% 50% / 0.3)',
              }}
            >
              Continuar entrenamiento →
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
