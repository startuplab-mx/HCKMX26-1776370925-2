import { useEffect, useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import AppLayout from '@/components/AppLayout';
import { useGame } from '@/contexts/GameContext';
import { allModules, getRiskLevel, getRiskLabel } from '@/lib/gameData';
import ContactCard from '@/components/ContactCard';

function RiskMeter({ score, color }: { score: number; color: string }) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  const segments = [
    { label: 'Alerta alta', range: '60-100', color: 'hsl(4 90% 58%)' },
    { label: 'Precaución', range: '30-59', color: 'hsl(38 95% 56%)' },
    { label: 'Bien protegido', range: '0-29', color: 'hsl(152 69% 44%)' },
  ];

  const meterColor = score >= 60 ? 'hsl(4 90% 58%)' : score >= 30 ? 'hsl(38 95% 56%)' : 'hsl(152 69% 44%)';

  return (
    <div className="text-center">
      {/* Circular score */}
      <div className="relative inline-flex items-center justify-center w-32 h-32 mx-auto mb-4">
        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
          <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(222 30% 20%)" strokeWidth="10" />
          <circle
            cx="60" cy="60" r="50" fill="none"
            stroke={meterColor}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - animated / 100)}`}
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)', filter: `drop-shadow(0 0 8px ${meterColor}88)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-bold font-display text-white" style={{ fontSize: '1.8rem', lineHeight: 1 }}>{score}</span>
          <span className="text-xs mt-0.5" style={{ color: 'hsl(215 20% 55%)' }}>/ 100</span>
        </div>
      </div>

      <p className="font-bold text-lg text-white font-display mb-1">{getRiskLabel(score)}</p>
      <p className="text-xs" style={{ color: 'hsl(215 20% 55%)' }}>
        {score >= 60 ? 'Pasaste por alto varias señales importantes' :
          score >= 30 ? 'Detectaste algunas señales, pero hay áreas por mejorar' :
          '¡Excelente! Identificaste la mayoría de las señales'}
      </p>
    </div>
  );
}

export default function AnalysisPage() {
  const [, params] = useRoute('/analysis/:moduleId');
  const [, navigate] = useLocation();
  const { currentResult, completeModule, profile } = useGame();

  const moduleId = params?.moduleId as string;
  const module = allModules.find(m => m.id === moduleId);

  useEffect(() => {
    if (currentResult && module) {
      completeModule(module.id, currentResult);
    }
  }, []);

  if (!module || !currentResult) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-64 text-center px-4">
          <div>
            <p className="text-white mb-4">No hay análisis disponible</p>
            <button onClick={() => navigate('/modules')} style={{ color: 'hsl(186 100% 60%)' }}>← Ir a módulos</button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const scorePercent = Math.round((currentResult.score / currentResult.maxScore) * 100);
  const detectedFlags = module.redFlags.filter(f => currentResult.flagsDetected.includes(f.id));
  const missedFlags = module.redFlags.filter(f => currentResult.missedFlags.includes(f.id));
  const accuracy = Math.round((currentResult.correctAnswers / currentResult.totalQuestions) * 100);

  const recommendations = [
    {
      icon: '🔒',
      title: 'Bloquea y reporta',
      text: 'Si recibes mensajes sospechosos, usa siempre la función de bloqueo y reporte de la plataforma.',
      color: 'hsl(4 90% 58%)',
    },
    {
      icon: '🗣️',
      title: 'Habla con un adulto',
      text: 'Siempre comparte con un adulto de confianza si algo te hace sentir incómodo o asustado en línea.',
      color: 'hsl(38 95% 56%)',
    },
    {
      icon: '📸',
      title: 'Guarda evidencia',
      text: 'Toma capturas de pantalla antes de bloquear. La evidencia es necesaria para denunciar.',
      color: 'hsl(152 69% 44%)',
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">

        {/* Header */}
        <div className="flex items-center gap-3 animate-fade-up">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
            style={{ background: module.color + '15', border: `1px solid ${module.color}33` }}>
            {module.icon}
          </div>
          <div>
            <p className="text-xs" style={{ color: 'hsl(215 20% 55%)' }}>Resultado · {module.title}</p>
            <h1 className="font-bold text-white text-sm font-display">Análisis de amenazas</h1>
          </div>
        </div>

        {/* Score card */}
        <div className="rounded-2xl p-6 text-center animate-fade-up delay-100"
          style={{ background: 'hsl(222 43% 14%)', border: `1px solid ${module.color}33` }}>
          <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'hsl(215 20% 50%)' }}>
            Score de riesgo
          </p>
          <RiskMeter score={currentResult.riskScore} color={module.color} />

          <div className="grid grid-cols-3 gap-3 mt-6 pt-6" style={{ borderTop: '1px solid hsl(222 30% 22%)' }}>
            {[
              { label: 'Aciertos', value: `${currentResult.correctAnswers}/${currentResult.totalQuestions}`, color: 'hsl(152 69% 55%)' },
              { label: 'Puntuación', value: `${scorePercent}%`, color: module.color },
              { label: 'XP ganado', value: `+${Math.round(scorePercent / 100 * module.xp)}`, color: 'hsl(38 95% 60%)' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="font-bold font-display text-lg" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs" style={{ color: 'hsl(215 20% 50%)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Flags detected */}
        {detectedFlags.length > 0 && (
          <div className="rounded-2xl p-5 animate-fade-up delay-200"
            style={{ background: 'hsl(152 69% 44% / 0.07)', border: '1px solid hsl(152 69% 44% / 0.2)' }}>
            <p className="text-sm font-semibold mb-3" style={{ color: 'hsl(152 69% 60%)' }}>
              ✅ Señales que detectaste ({detectedFlags.length})
            </p>
            <div className="space-y-2">
              {detectedFlags.map(f => (
                <div key={f.id} className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: 'hsl(152 69% 44% / 0.08)' }}>
                  <span className="text-sm mt-0.5">🚩</span>
                  <div>
                    <p className="text-sm font-medium text-white">{f.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'hsl(215 20% 60%)' }}>{f.explanation}</p>
                  </div>
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: 'hsl(152 69% 44% / 0.2)', color: 'hsl(152 69% 65%)' }}>
                    {f.severity === 'high' ? 'Alta' : 'Media'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Flags missed */}
        {missedFlags.length > 0 && (
          <div className="rounded-2xl p-5 animate-fade-up delay-300"
            style={{ background: 'hsl(4 90% 58% / 0.07)', border: '1px solid hsl(4 90% 58% / 0.2)' }}>
            <p className="text-sm font-semibold mb-3" style={{ color: 'hsl(4 90% 68%)' }}>
              ⚠️ Señales que pasaste por alto ({missedFlags.length})
            </p>
            <div className="space-y-2">
              {missedFlags.map(f => (
                <div key={f.id} className="flex items-start gap-3 p-3 rounded-xl"
                  style={{ background: 'hsl(4 90% 58% / 0.08)' }}>
                  <span className="text-sm mt-0.5">🚩</span>
                  <div>
                    <p className="text-sm font-medium text-white">{f.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'hsl(215 20% 60%)' }}>{f.explanation}</p>
                  </div>
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: 'hsl(4 90% 58% / 0.2)', color: 'hsl(4 90% 68%)' }}>
                    {f.severity === 'high' ? 'Alta' : 'Media'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What to do in real life */}
        <div className="rounded-2xl p-5 animate-fade-up delay-400"
          style={{ background: 'hsl(222 43% 14%)', border: '1px solid hsl(222 30% 22%)' }}>
          <p className="text-sm font-semibold mb-3 text-white">🎯 Acción recomendada</p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'hsl(210 40% 80%)' }}>{module.finalAdvice}</p>
          <div className="p-3 rounded-xl mb-4"
            style={{ background: 'hsl(186 100% 50% / 0.07)', border: '1px solid hsl(186 100% 50% / 0.2)' }}>
            <p className="text-xs font-semibold mb-1" style={{ color: 'hsl(186 100% 60%)' }}>¿Qué hacer en la vida real?</p>
            <p className="text-xs leading-relaxed" style={{ color: 'hsl(210 40% 75%)' }}>{module.realWorldAction}</p>
          </div>
          <ContactCard />
        </div>

        {/* Safety tips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fade-up delay-500">
          {recommendations.map(r => (
            <div key={r.title} className="rounded-xl p-4" style={{ background: 'hsl(222 43% 14%)', border: '1px solid hsl(222 30% 22%)' }}>
              <div className="text-xl mb-2">{r.icon}</div>
              <p className="text-sm font-semibold text-white mb-1">{r.title}</p>
              <p className="text-xs" style={{ color: 'hsl(215 20% 55%)' }}>{r.text}</p>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 animate-fade-up delay-600">
          <button
            data-testid="button-see-learning"
            onClick={() => navigate(`/learning/${module.id}`)}
            className="flex-1 py-3.5 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
            style={{
              background: `linear-gradient(135deg, ${module.color}, ${module.color}bb)`,
              color: 'hsl(222 47% 8%)',
              boxShadow: `0 0 20px ${module.color}44`,
            }}
          >
            Ver lección completa →
          </button>
          <button
            data-testid="button-back-modules"
            onClick={() => navigate('/modules')}
            className="flex-1 py-3.5 rounded-xl font-medium text-sm transition-all hover:bg-white/5"
            style={{ border: '1px solid hsl(222 30% 28%)', color: 'hsl(215 20% 70%)' }}
          >
            Otro módulo
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
