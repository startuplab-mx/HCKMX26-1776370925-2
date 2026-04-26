import { RiskStage } from '@/lib/gameData';

interface RiskProgressBarProps {
  stages: RiskStage[];
  activeStageIndex: number;
  color: string;         // e.g. 'hsl(258 85% 65%)'
  stagesIntro?: string;
}

export default function RiskProgressBar({ stages, activeStageIndex, color, stagesIntro }: RiskProgressBarProps) {
  return (
    <div
      className="rounded-2xl p-4 mb-5 animate-fade-up"
      style={{
        background: 'hsl(222 43% 12%)',
        border: `1px solid ${color}22`,
      }}
    >
      {/* Intro text */}
      {stagesIntro && (
        <p className="text-xs mb-4 leading-relaxed" style={{ color: 'hsl(215 20% 58%)' }}>
          {stagesIntro}
        </p>
      )}

      {/* Stage label header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color }}>
          📊 Fase del riesgo
        </span>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: `${color}18`, color, border: `1px solid ${color}35` }}
        >
          {stages[activeStageIndex]?.label}
        </span>
      </div>

      {/* Progress steps — desktop: horizontal, mobile: compact */}
      <div className="hidden sm:flex items-start gap-0">
        {stages.map((stage, i) => {
          const isActive = i === activeStageIndex;
          const isPast = i < activeStageIndex;
          const isLast = i === stages.length - 1;

          return (
            <div key={i} className="flex items-start flex-1 min-w-0">
              {/* Step + label */}
              <div className="flex flex-col items-center flex-1 min-w-0">
                {/* Circle */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all"
                  style={{
                    background: isActive
                      ? color
                      : isPast
                      ? `${color}40`
                      : 'hsl(222 35% 20%)',
                    color: isActive
                      ? 'hsl(222 47% 8%)'
                      : isPast
                      ? color
                      : 'hsl(215 20% 40%)',
                    border: isActive
                      ? `2px solid ${color}`
                      : isPast
                      ? `1px solid ${color}60`
                      : '1px solid hsl(222 30% 28%)',
                    boxShadow: isActive ? `0 0 12px ${color}55` : 'none',
                  }}
                >
                  {isPast ? '✓' : i + 1}
                </div>

                {/* Label */}
                <p
                  className="text-center mt-1.5 leading-tight px-0.5"
                  style={{
                    fontSize: '10px',
                    fontWeight: isActive ? 700 : 400,
                    color: isActive
                      ? color
                      : isPast
                      ? `${color}90`
                      : 'hsl(215 20% 38%)',
                    maxWidth: '72px',
                  }}
                >
                  {stage.label}
                </p>
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  className="h-0.5 flex-shrink-0 mt-3.5 w-full"
                  style={{
                    maxWidth: '28px',
                    background: isPast
                      ? `linear-gradient(90deg, ${color}60, ${color}30)`
                      : 'hsl(222 30% 24%)',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: compact dots */}
      <div className="flex sm:hidden items-center gap-1.5">
        {stages.map((stage, i) => {
          const isActive = i === activeStageIndex;
          const isPast = i < activeStageIndex;
          const isLast = i === stages.length - 1;

          return (
            <div key={i} className="flex items-center flex-1 min-w-0">
              <div
                className="flex-shrink-0 rounded-full flex items-center justify-center"
                style={{
                  width: isActive ? '28px' : '20px',
                  height: isActive ? '28px' : '20px',
                  fontSize: isActive ? '11px' : '9px',
                  fontWeight: isActive ? 700 : 400,
                  background: isActive
                    ? color
                    : isPast
                    ? `${color}40`
                    : 'hsl(222 35% 20%)',
                  color: isActive
                    ? 'hsl(222 47% 8%)'
                    : isPast
                    ? color
                    : 'hsl(215 20% 40%)',
                  border: isActive
                    ? `2px solid ${color}`
                    : '1px solid hsl(222 30% 28%)',
                  boxShadow: isActive ? `0 0 10px ${color}50` : 'none',
                  transition: 'all 0.3s ease',
                }}
              >
                {isPast ? '✓' : i + 1}
              </div>
              {!isLast && (
                <div
                  className="h-px flex-1"
                  style={{
                    background: isPast ? `${color}50` : 'hsl(222 30% 24%)',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Active stage description */}
      {stages[activeStageIndex]?.description && (
        <p
          className="text-xs mt-3 pt-3 leading-relaxed"
          style={{
            color: 'hsl(215 20% 52%)',
            borderTop: '1px solid hsl(222 30% 20%)',
          }}
        >
          <span style={{ color, fontWeight: 600 }}>
            {stages[activeStageIndex].label}:{' '}
          </span>
          {stages[activeStageIndex].description}
        </p>
      )}
    </div>
  );
}
