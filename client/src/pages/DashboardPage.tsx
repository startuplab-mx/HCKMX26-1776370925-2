import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import AppLayout from '@/components/AppLayout';
import { useGame } from '@/contexts/GameContext';
import { allModules, Module, ModuleId } from '@/lib/gameData';

// ─── Helpers ─────────────────────────────────────────────────────────────────
const STAGE_LABELS = ['Exposición', 'Acercamiento', 'Vinculación', 'Prueba o encargo', 'Control'];

function fmtTime(ms: number): string {
  if (ms === 0) return '—';
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function fmtIndicator(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ─── DefenseGauge ─────────────────────────────────────────────────────────────
function DefenseGauge({ value }: { value: number }) {
  const segments = [
    { label: 'Bajo', color: 'hsl(4 90% 58%)', threshold: 33 },
    { label: 'Medio', color: 'hsl(38 95% 56%)', threshold: 66 },
    { label: 'Alto', color: 'hsl(152 69% 44%)', threshold: 100 },
  ];
  const activeColor = value < 33 ? segments[0].color : value < 66 ? segments[1].color : segments[2].color;
  const activeLabel = value < 33 ? 'En desarrollo' : value < 66 ? 'Moderado' : 'Avanzado';

  return (
    <div className="relative">
      <div className="flex items-end justify-between mb-2">
        <div>
          <div className="font-bold text-white font-display" style={{ fontSize: '2rem' }}>{value}%</div>
          <div className="text-xs font-medium" style={{ color: activeColor }}>{activeLabel}</div>
        </div>
        <div className="text-4xl mb-1">🛡️</div>
      </div>
      <div className="h-3 rounded-full overflow-hidden" style={{ background: 'hsl(222 30% 18%)' }}>
        <div className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${value}%`,
            background: `linear-gradient(90deg, ${activeColor}, ${activeColor}cc)`,
            boxShadow: `0 0 12px ${activeColor}77`,
          }} />
      </div>
      <div className="flex justify-between mt-1">
        {segments.map(s => (
          <span key={s.label} className="text-xs" style={{ color: 'hsl(215 20% 45%)' }}>{s.label}</span>
        ))}
      </div>
    </div>
  );
}

// ─── ModuleCard ───────────────────────────────────────────────────────────────
function ModuleCard({ module }: { module: Module }) {
  const { profile } = useGame();
  const [, navigate] = useLocation();
  const progress = profile.moduleProgress.find(p => p.moduleId === module.id);
  const isCompleted = progress?.completed ?? false;
  const pct = isCompleted && progress && progress.maxScore > 0
    ? Math.round((progress.score / progress.maxScore) * 100)
    : 0;

  const difficultyColor = {
    'Básico': 'hsl(152 69% 44%)',
    'Intermedio': 'hsl(38 95% 56%)',
    'Avanzado': 'hsl(4 90% 58%)',
  }[module.difficulty];

  return (
    <div
      data-testid={`card-module-${module.id}`}
      onClick={() => navigate(`/simulation/${module.id}`)}
      className="rounded-2xl p-5 cursor-pointer transition-all hover:scale-[1.02] hover:-translate-y-1 group"
      style={{
        background: isCompleted ? 'hsl(222 43% 16%)' : 'hsl(222 43% 14%)',
        border: `1px solid ${isCompleted ? module.color + '44' : 'hsl(222 30% 22%)'}`,
        boxShadow: isCompleted ? `0 0 20px ${module.color}1a` : 'none',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
          style={{ background: module.color + '1a', border: `1px solid ${module.color}33` }}>
          {module.icon}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ color: difficultyColor, background: difficultyColor + '18', border: `1px solid ${difficultyColor}33` }}>
            {module.difficulty}
          </span>
          {isCompleted && (
            <span className="text-xs px-2 py-0.5 rounded-full font-bold"
              style={{ color: 'hsl(152 69% 60%)', background: 'hsl(152 69% 44% / 0.15)', border: '1px solid hsl(152 69% 44% / 0.3)' }}>
              ✓ Hecho
            </span>
          )}
        </div>
      </div>

      <h3 className="font-semibold text-white mb-1 text-sm">{module.title}</h3>
      <p className="text-xs mb-4 line-clamp-2" style={{ color: 'hsl(215 20% 55%)' }}>{module.subtitle}</p>

      {isCompleted ? (
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span style={{ color: 'hsl(215 20% 55%)' }}>Puntuación</span>
            <span className="font-semibold" style={{ color: module.color }}>{pct}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'hsl(222 30% 20%)' }}>
            <div className="h-full rounded-full transition-all"
              style={{ width: `${pct}%`, background: module.color, boxShadow: `0 0 6px ${module.color}` }} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium" style={{ color: module.color }}>+{module.xp} XP</span>
          <div className="flex items-center gap-1 text-xs font-medium" style={{ color: 'hsl(215 20% 55%)' }}>
            <span>Iniciar</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ModuleStatsCard ───────────────────────────────────────────────────────────
function ModuleStatsCard({ moduleId, color, icon, title }: { moduleId: ModuleId; color: string; icon: string; title: string }) {
  const { getModuleStats } = useGame();
  const stats = getModuleStats(moduleId);
  const hasData = stats.totalInteracciones > 0;

  const detectionColor = stats.porcentajeDeteccion >= 70
    ? 'hsl(152 69% 44%)'
    : stats.porcentajeDeteccion >= 40
    ? 'hsl(38 95% 56%)'
    : 'hsl(4 90% 58%)';

  return (
    <div
      data-testid={`stats-card-${moduleId}`}
      className="rounded-2xl p-5"
      style={{
        background: 'hsl(222 43% 13%)',
        border: `1px solid ${hasData ? color + '33' : 'hsl(222 30% 20%)'}`,
        boxShadow: hasData ? `0 0 16px ${color}0d` : 'none',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
          style={{ background: color + '1a', border: `1px solid ${color}33` }}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-white truncate">{title}</p>
          <p className="text-xs" style={{ color: 'hsl(215 20% 45%)' }}>
            {hasData ? `${stats.totalInteracciones} interacciones` : 'Sin datos aún'}
          </p>
        </div>
      </div>

      {!hasData ? (
        <div className="text-center py-4">
          <p className="text-xs" style={{ color: 'hsl(215 20% 35%)' }}>Completa este módulo para ver estadísticas</p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Detection rate */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span style={{ color: 'hsl(215 20% 50%)' }}>% Detección de flags</span>
              <span className="font-bold" style={{ color: detectionColor }}>{stats.porcentajeDeteccion}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'hsl(222 30% 20%)' }}>
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width: `${stats.porcentajeDeteccion}%`, background: detectionColor, boxShadow: `0 0 5px ${detectionColor}88` }} />
            </div>
          </div>

          {/* Decisions row */}
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl p-2.5 text-center"
              style={{ background: 'hsl(152 69% 44% / 0.1)', border: '1px solid hsl(152 69% 44% / 0.2)' }}>
              <div className="font-bold text-base" style={{ color: 'hsl(152 69% 55%)' }}>{stats.decisionesSeguras}</div>
              <div className="text-xs mt-0.5" style={{ color: 'hsl(152 69% 40%)' }}>✅ Seguras</div>
            </div>
            <div className="rounded-xl p-2.5 text-center"
              style={{ background: 'hsl(4 90% 58% / 0.1)', border: '1px solid hsl(4 90% 58% / 0.2)' }}>
              <div className="font-bold text-base" style={{ color: 'hsl(4 90% 65%)' }}>{stats.decisionesRiesgosas}</div>
              <div className="text-xs mt-0.5" style={{ color: 'hsl(4 90% 50%)' }}>⚠️ Riesgosas</div>
            </div>
          </div>

          {/* Avg response time */}
          <div className="flex items-center justify-between rounded-xl px-3 py-2"
            style={{ background: 'hsl(222 30% 18%)', border: '1px solid hsl(222 30% 22%)' }}>
            <span className="text-xs" style={{ color: 'hsl(215 20% 50%)' }}>⏱ Tiempo promedio</span>
            <span className="text-xs font-bold" style={{ color: 'hsl(186 100% 60%)' }}>{fmtTime(stats.tiempoPromedioMs)}</span>
          </div>

          {/* Most vulnerable phase */}
          <div className="flex items-center justify-between rounded-xl px-3 py-2"
            style={{ background: 'hsl(222 30% 18%)', border: '1px solid hsl(222 30% 22%)' }}>
            <span className="text-xs" style={{ color: 'hsl(215 20% 50%)' }}>🎯 Fase más vulnerable</span>
            <span className="text-xs font-bold" style={{ color: 'hsl(38 95% 60%)' }}>
              {STAGE_LABELS[stats.faseMasVulnerable] ?? '—'}
            </span>
          </div>

          {/* Most frequent indicator */}
          <div className="rounded-xl px-3 py-2"
            style={{ background: 'hsl(258 85% 65% / 0.08)', border: '1px solid hsl(258 85% 65% / 0.2)' }}>
            <p className="text-xs mb-0.5" style={{ color: 'hsl(215 20% 50%)' }}>🚩 Indicador más frecuente</p>
            <p className="text-xs font-semibold truncate" style={{ color: 'hsl(258 85% 75%)' }}>
              {fmtIndicator(stats.indicadorMasFrecuente)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── GlobalStatsBar ───────────────────────────────────────────────────────────
function GlobalStatsBar() {
  const { getAllStats } = useGame();
  const allStats = getAllStats();

  const totalInteracciones = allStats.reduce((s, x) => s + x.totalInteracciones, 0);
  const totalSeguras = allStats.reduce((s, x) => s + x.decisionesSeguras, 0);
  const totalRiesgosas = allStats.reduce((s, x) => s + x.decisionesRiesgosas, 0);
  const tiemposConDatos = allStats.filter(x => x.tiempoPromedioMs > 0);
  const avgTime = tiemposConDatos.length > 0
    ? Math.round(tiemposConDatos.reduce((s, x) => s + x.tiempoPromedioMs, 0) / tiemposConDatos.length)
    : 0;

  const allFrecuencias: Record<string, number> = {};
  allStats.forEach(s => {
    Object.entries(s.indicadoresFrecuencia).forEach(([k, v]) => {
      allFrecuencias[k] = (allFrecuencias[k] || 0) + v;
    });
  });
  const topIndicador = Object.keys(allFrecuencias).length > 0
    ? Object.entries(allFrecuencias).sort((a, b) => b[1] - a[1])[0][0]
    : null;

  if (totalInteracciones === 0) return null;

  return (
    <div className="rounded-2xl p-5 animate-fade-up"
      style={{ background: 'hsl(186 100% 50% / 0.05)', border: '1px solid hsl(186 100% 50% / 0.15)' }}>
      <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'hsl(186 100% 60%)' }}>
        📊 Resumen global de sesión
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Interacciones totales', value: `${totalInteracciones}`, icon: '🔢', color: 'hsl(186 100% 60%)' },
          { label: 'Decisiones seguras', value: `${totalSeguras}`, icon: '✅', color: 'hsl(152 69% 55%)' },
          { label: 'Decisiones riesgosas', value: `${totalRiesgosas}`, icon: '⚠️', color: 'hsl(4 90% 65%)' },
          { label: 'Tiempo promedio', value: fmtTime(avgTime), icon: '⏱', color: 'hsl(38 95% 60%)' },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl p-3"
            style={{ background: 'hsl(222 43% 14%)', border: '1px solid hsl(222 30% 22%)' }}>
            <div className="text-lg mb-1">{stat.icon}</div>
            <div className="font-bold font-display" style={{ color: stat.color, fontSize: '1.1rem' }}>{stat.value}</div>
            <div className="text-xs mt-0.5" style={{ color: 'hsl(215 20% 45%)' }}>{stat.label}</div>
          </div>
        ))}
      </div>
      {topIndicador && (
        <div className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2"
          style={{ background: 'hsl(258 85% 65% / 0.07)', border: '1px solid hsl(258 85% 65% / 0.18)' }}>
          <span className="text-xs" style={{ color: 'hsl(215 20% 50%)' }}>🚩 Indicador global más frecuente:</span>
          <span className="text-xs font-bold" style={{ color: 'hsl(258 85% 75%)' }}>{fmtIndicator(topIndicador)}</span>
        </div>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { profile } = useGame();
  const [statsOpen, setStatsOpen] = useState(false);

  const completedCount = profile.moduleProgress.filter(p => p.completed).length;
  const totalModules = allModules.length;
  const overallPct = Math.round((completedCount / totalModules) * 100);

  const tips = [
    { icon: '💡', text: 'Los groomer siempre piden mover la conversación a apps privadas. Es una señal roja inmediata.' },
    { icon: '🔍', text: 'Antes de compartir una noticia, busca la fuente en Google. Los primeros 30 segundos cuentan.' },
    { icon: '🚫', text: 'Ninguna plataforma legítima te pide tu contraseña por mensaje directo.' },
  ];
  const dailyTip = tips[new Date().getDay() % tips.length];

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* Welcome row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-up">
          <div>
            <p className="text-sm font-medium mb-0.5" style={{ color: 'hsl(186 100% 60%)' }}>
              ⚡ Panel de entrenamiento
            </p>
            <h1 className="text-xl font-bold text-white font-display">Tu radar digital</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs" style={{ color: 'hsl(215 20% 50%)' }}>Nivel</p>
              <p className="font-bold text-white font-display text-lg">{profile.level}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm font-display"
              style={{
                background: 'linear-gradient(135deg, hsl(186 100% 40%), hsl(258 85% 55%))',
                color: 'white',
                boxShadow: '0 0 20px hsl(186 100% 50% / 0.3)',
              }}>
              {profile.level}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-up delay-100">
          {[
            { label: 'XP Total', value: `${profile.totalXP}`, icon: '⚡', color: 'hsl(186 100% 60%)' },
            { label: 'Módulos completados', value: `${completedCount}/${totalModules}`, icon: '🎯', color: 'hsl(258 85% 70%)' },
            { label: 'Insignias ganadas', value: `${profile.badges.filter(b => b.earned).length}`, icon: '🏆', color: 'hsl(38 95% 60%)' },
            { label: 'Nivel defensa', value: `${profile.defenseRating}%`, icon: '🛡️', color: 'hsl(152 69% 55%)' },
          ].map(stat => (
            <div key={stat.label} className="rounded-2xl p-4"
              data-testid={`stat-${stat.label.replace(/\s/g,'-').toLowerCase()}`}
              style={{ background: 'hsl(222 43% 14%)', border: '1px solid hsl(222 30% 22%)' }}>
              <div className="text-xl mb-2">{stat.icon}</div>
              <div className="font-bold font-display text-white text-lg">{stat.value}</div>
              <div className="text-xs mt-0.5" style={{ color: 'hsl(215 20% 50%)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-5">

          {/* Left column */}
          <div className="lg:col-span-1 space-y-4">

            {/* Defense gauge */}
            <div className="rounded-2xl p-5 animate-fade-up delay-200"
              style={{ background: 'hsl(222 43% 14%)', border: '1px solid hsl(222 30% 22%)' }}>
              <p className="text-xs font-semibold mb-4 uppercase tracking-wider" style={{ color: 'hsl(215 20% 50%)' }}>
                Nivel de defensa digital
              </p>
              <DefenseGauge value={profile.defenseRating} />
            </div>

            {/* Overall progress */}
            <div className="rounded-2xl p-5 animate-fade-up delay-300"
              style={{ background: 'hsl(222 43% 14%)', border: '1px solid hsl(222 30% 22%)' }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'hsl(215 20% 50%)' }}>
                  Progreso general
                </p>
                <span className="text-sm font-bold" style={{ color: 'hsl(186 100% 60%)' }}>{overallPct}%</span>
              </div>
              <div className="space-y-3">
                {allModules.map(m => {
                  const p = profile.moduleProgress.find(x => x.moduleId === m.id);
                  const pct = p?.completed && p.maxScore > 0 ? Math.round((p.score / p.maxScore) * 100) : 0;
                  return (
                    <div key={m.id}>
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: 'hsl(215 20% 60%)' }}>{m.title.split(' ')[0]}</span>
                        <span className="font-medium" style={{ color: p?.completed ? m.color : 'hsl(215 20% 40%)' }}>
                          {p?.completed ? `${pct}%` : 'Pendiente'}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'hsl(222 30% 20%)' }}>
                        <div className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${pct}%`, background: m.color, boxShadow: `0 0 6px ${m.color}88` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Daily tip */}
            <div className="rounded-2xl p-5 animate-fade-up delay-400"
              style={{ background: 'hsl(186 100% 50% / 0.06)', border: '1px solid hsl(186 100% 50% / 0.2)' }}>
              <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'hsl(186 100% 60%)' }}>
                💡 Tip del día
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'hsl(210 40% 85%)' }}>
                {dailyTip.text}
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 space-y-4">

            {/* Module cards */}
            <div className="flex items-center justify-between animate-fade-up delay-200">
              <p className="text-sm font-semibold text-white">Módulos de entrenamiento</p>
              <Link href="/modules">
                <span className="text-xs font-medium cursor-pointer hover:underline" style={{ color: 'hsl(186 100% 60%)' }}>
                  Ver todos →
                </span>
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {allModules.map((m, i) => (
                <div key={m.id} className="animate-fade-up" style={{ animationDelay: `${0.2 + i * 0.08}s` }}>
                  <ModuleCard module={m} />
                </div>
              ))}
            </div>

            {/* Badges preview */}
            <div className="rounded-2xl p-5 animate-fade-up delay-500"
              style={{ background: 'hsl(222 43% 14%)', border: '1px solid hsl(222 30% 22%)' }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-white">Insignias recientes</p>
                <Link href="/profile">
                  <span className="text-xs font-medium cursor-pointer hover:underline" style={{ color: 'hsl(186 100% 60%)' }}>
                    Ver perfil →
                  </span>
                </Link>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {profile.badges.map(b => (
                  <div key={b.id}
                    data-testid={`badge-${b.id}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${b.earned ? '' : 'opacity-30'}`}
                    style={{
                      background: b.earned ? 'hsl(222 35% 20%)' : 'hsl(222 30% 17%)',
                      border: '1px solid hsl(222 30% 24%)',
                    }}
                    title={b.description}
                  >
                    <span className="text-lg">{b.icon}</span>
                    <span className="text-xs font-medium" style={{ color: b.earned ? 'white' : 'hsl(215 20% 40%)' }}>
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Sección de Estadísticas Educativas ──────────────────────────── */}
        <div className="animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <button
            data-testid="toggle-stats-panel"
            onClick={() => setStatsOpen(v => !v)}
            className="w-full rounded-2xl p-5 flex items-center justify-between group transition-all"
            style={{
              background: statsOpen ? 'hsl(258 85% 65% / 0.1)' : 'hsl(222 43% 14%)',
              border: `1px solid ${statsOpen ? 'hsl(258 85% 65% / 0.35)' : 'hsl(222 30% 22%)'}`,
              cursor: 'pointer',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{ background: 'hsl(258 85% 65% / 0.15)', border: '1px solid hsl(258 85% 65% / 0.3)' }}>
                📈
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">Estadísticas educativas por módulo</p>
                <p className="text-xs" style={{ color: 'hsl(215 20% 45%)' }}>
                  Indicadores de riesgo, detección y tiempo de respuesta
                </p>
              </div>
            </div>
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              className="transition-transform duration-300 flex-shrink-0"
              style={{
                color: 'hsl(258 85% 70%)',
                transform: statsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>

          {statsOpen && (
            <div className="mt-4 space-y-4">

              {/* Global summary bar */}
              <GlobalStatsBar />

              {/* Per-module stats grid */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {allModules.map(m => (
                  <ModuleStatsCard
                    key={m.id}
                    moduleId={m.id}
                    color={m.color}
                    icon={m.icon}
                    title={m.title}
                  />
                ))}
              </div>

              {/* Legend */}
              <div className="rounded-2xl p-4"
                style={{ background: 'hsl(222 43% 12%)', border: '1px solid hsl(222 30% 20%)' }}>
                <p className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: 'hsl(215 20% 45%)' }}>
                  Guía de indicadores
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  {[
                    { color: 'hsl(152 69% 44%)', label: '% detección ≥ 70%', desc: 'Buen reconocimiento de señales' },
                    { color: 'hsl(38 95% 56%)', label: '% detección 40–69%', desc: 'Reconocimiento moderado' },
                    { color: 'hsl(4 90% 58%)', label: '% detección < 40%', desc: 'Área de mejora crítica' },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-2">
                      <div className="w-2.5 h-2.5 rounded-full mt-0.5 flex-shrink-0" style={{ background: item.color }} />
                      <div>
                        <p className="text-xs font-medium text-white">{item.label}</p>
                        <p className="text-xs" style={{ color: 'hsl(215 20% 40%)' }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </AppLayout>
  );
}
