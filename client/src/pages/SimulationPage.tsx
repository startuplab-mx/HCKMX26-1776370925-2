import { useState, useEffect, useRef } from 'react';
import { useRoute, useLocation } from 'wouter';
import AppLayout from '@/components/AppLayout';
import { useGame } from '@/contexts/GameContext';
import { allModules, Module, SimulationStep, Choice, ChatMessage, RedFlag, calculateRiskScore, InteractionRecord } from '@/lib/gameData';
import RiskProgressBar from '@/components/RiskProgressBar';

// ─── Chat simulation UI ─────────────────────────────────────────────────────
function ChatUI({ step, onAnswer }: { step: SimulationStep; onAnswer: (choice: Choice, detectedFlags: string[]) => void }) {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const messages: ChatMessage[] = step.content.messages || [];

  useEffect(() => {
    let timer: any;
    if (visibleMessages < messages.length) {
      timer = setTimeout(() => setVisibleMessages(v => v + 1), 700);
    }
    return () => clearTimeout(timer);
  }, [visibleMessages, messages.length]);

  const handleChoice = (choice: Choice) => {
    if (answered) return;
    setSelectedChoice(choice.id);
    setAnswered(true);
    const allFlagIds = messages.flatMap(m => m.flagIds || []);
    setTimeout(() => onAnswer(choice, allFlagIds), 1200);
  };

  return (
    <div className="space-y-4">
      {/* Profile header */}
      <div className="flex items-center gap-3 p-4 rounded-2xl"
        style={{ background: 'hsl(222 43% 16%)', border: '1px solid hsl(222 30% 24%)' }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
          style={{ background: 'hsl(222 35% 22%)' }}>
          {step.content.profilePic || '👤'}
        </div>
        <div>
          <p className="font-semibold text-white text-sm">{step.content.profileName || step.content.senderName}</p>
          {step.content.profileBio && (
            <p className="text-xs" style={{ color: 'hsl(215 20% 50%)' }}>{step.content.profileBio}</p>
          )}
        </div>
        <div className="ml-auto">
          <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'hsl(4 90% 58% / 0.15)', color: 'hsl(4 90% 68%)', border: '1px solid hsl(4 90% 58% / 0.3)' }}>
            ⚠️ Desconocido
          </span>
        </div>
      </div>

      {/* Chat messages */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'hsl(222 43% 12%)', border: '1px solid hsl(222 30% 20%)' }}>
        <div className="p-4 space-y-3 min-h-[200px]">
          {messages.slice(0, visibleMessages).map((msg, i) => (
            <div key={msg.id} className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'} animate-slide-right`}
              style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`max-w-[80%] px-4 py-2.5 ${msg.sender === 'you' ? 'chat-bubble-you' : 'chat-bubble-them'}`}>
                <p className="text-sm text-white">{msg.text}</p>
                <div className="flex items-center justify-between gap-2 mt-1">
                  <p className="text-xs" style={{ color: 'hsl(215 20% 45%)' }}>{msg.timestamp}</p>
                  {msg.flagIds && msg.flagIds.length > 0 && (
                    <div className="flex gap-1">
                      {msg.flagIds.map(fid => (
                        <span key={fid} className="text-xs" title="Señal de alerta detectada">🚩</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {visibleMessages < messages.length && (
            <div className="flex gap-1 pl-2">
              {[0,1,2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full animate-bounce"
                  style={{ background: 'hsl(215 20% 45%)', animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Question */}
      <div className="p-4 rounded-2xl"
        style={{ background: 'hsl(186 100% 50% / 0.06)', border: '1px solid hsl(186 100% 50% / 0.2)' }}>
        <p className="text-sm font-semibold text-white mb-1">❓ {step.content.question}</p>
      </div>

      {/* Choices */}
      {visibleMessages >= messages.length && (
        <div className="space-y-2">
          {step.choices.map(choice => {
            const isSelected = selectedChoice === choice.id;
            const showResult = answered && isSelected;
            const isCorrect = choice.isCorrect;

            return (
              <button
                key={choice.id}
                data-testid={`choice-${choice.id}`}
                onClick={() => handleChoice(choice)}
                disabled={answered}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all choice-btn"
                style={{
                  background: showResult
                    ? isCorrect ? 'hsl(152 69% 44% / 0.2)' : 'hsl(4 90% 58% / 0.2)'
                    : 'hsl(222 35% 20%)',
                  border: showResult
                    ? isCorrect ? '1px solid hsl(152 69% 44% / 0.5)' : '1px solid hsl(4 90% 58% / 0.5)'
                    : '1px solid hsl(222 30% 28%)',
                  color: showResult
                    ? isCorrect ? 'hsl(152 69% 65%)' : 'hsl(4 90% 68%)'
                    : 'hsl(210 40% 85%)',
                  cursor: answered ? 'default' : 'pointer',
                }}
              >
                <div className="flex items-start gap-2">
                  <span>{showResult ? (isCorrect ? '✅' : '❌') : '→'}</span>
                  <span>{choice.text}</span>
                </div>
                {showResult && (
                  <p className="text-xs mt-2 opacity-90" style={{ color: isCorrect ? 'hsl(152 69% 55%)' : 'hsl(4 90% 60%)' }}>
                    {choice.feedback}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Social post UI ─────────────────────────────────────────────────────────
function PostUI({ step, onAnswer }: { step: SimulationStep; onAnswer: (choice: Choice, detectedFlags: string[]) => void }) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const post = step.content;

  const handleChoice = (choice: Choice) => {
    if (answered) return;
    setSelectedChoice(choice.id);
    setAnswered(true);
    setTimeout(() => onAnswer(choice, post.flagIds || []), 1200);
  };

  return (
    <div className="space-y-4">
      {/* Social media post mockup */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'hsl(222 43% 14%)', border: '1px solid hsl(222 30% 22%)' }}>
        {/* Post header */}
        <div className="px-4 py-3 flex items-center gap-3" style={{ borderBottom: '1px solid hsl(222 30% 20%)' }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
            style={{ background: 'hsl(222 35% 22%)' }}>
            {post.accountPic}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-white text-sm">{post.accountName}</span>
              {post.verified
                ? <span className="text-blue-400 text-xs">✓</span>
                : <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: 'hsl(4 90% 58% / 0.15)', color: 'hsl(4 90% 68%)' }}>Sin verificar</span>
              }
            </div>
            {post.followers && <p className="text-xs" style={{ color: 'hsl(215 20% 50%)' }}>{post.followers}</p>}
          </div>
          <div className="ml-auto">
            <button className="text-xs px-2 py-1 rounded-lg" style={{ color: 'hsl(215 20% 55%)', background: 'hsl(222 30% 20%)' }}>···</button>
          </div>
        </div>

        {/* Post content */}
        <div className="px-4 py-4">
          <p className="text-sm text-white leading-relaxed mb-2">{post.postText || post.post?.text}</p>
          {post.subtext && (
            <div className="mt-2 p-3 rounded-xl text-xs italic"
              style={{ background: 'hsl(38 95% 56% / 0.1)', color: 'hsl(38 95% 65%)', border: '1px solid hsl(38 95% 56% / 0.2)' }}>
              ℹ️ {post.subtext}
            </div>
          )}
        </div>

        {/* Post metrics */}
        <div className="px-4 py-3 flex items-center gap-4 text-xs" style={{ borderTop: '1px solid hsl(222 30% 20%)', color: 'hsl(215 20% 50%)' }}>
          <span>❤️ {(post.metrics?.likes || post.post?.likes || 0).toLocaleString()}</span>
          <span>🔁 {(post.metrics?.shares || 0).toLocaleString()}</span>
          <span>💬 {(post.metrics?.comments || post.post?.comments || 0).toLocaleString()}</span>
          {!post.hasSource && <span style={{ color: 'hsl(4 90% 60%)' }}>⚠️ Sin fuente</span>}
        </div>
      </div>

      {/* Question */}
      <div className="p-4 rounded-2xl"
        style={{ background: 'hsl(186 100% 50% / 0.06)', border: '1px solid hsl(186 100% 50% / 0.2)' }}>
        <p className="text-sm font-semibold text-white">❓ {post.question || step.content.question}</p>
      </div>

      {/* Choices */}
      <div className="space-y-2">
        {step.choices.map(choice => {
          const isSelected = selectedChoice === choice.id;
          const showResult = answered && isSelected;
          const isCorrect = choice.isCorrect;

          return (
            <button
              key={choice.id}
              data-testid={`choice-${choice.id}`}
              onClick={() => handleChoice(choice)}
              disabled={answered}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all choice-btn"
              style={{
                background: showResult
                  ? isCorrect ? 'hsl(152 69% 44% / 0.2)' : 'hsl(4 90% 58% / 0.2)'
                  : 'hsl(222 35% 20%)',
                border: showResult
                  ? isCorrect ? '1px solid hsl(152 69% 44% / 0.5)' : '1px solid hsl(4 90% 58% / 0.5)'
                  : '1px solid hsl(222 30% 28%)',
                color: showResult
                  ? isCorrect ? 'hsl(152 69% 65%)' : 'hsl(4 90% 68%)'
                  : 'hsl(210 40% 85%)',
                cursor: answered ? 'default' : 'pointer',
              }}
            >
              <div className="flex items-start gap-2">
                <span>{showResult ? (isCorrect ? '✅' : '❌') : '→'}</span>
                <span>{choice.text}</span>
              </div>
              {showResult && (
                <p className="text-xs mt-2 opacity-90">{choice.feedback}</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Profile UI ─────────────────────────────────────────────────────────────
function ProfileUI({ step, onAnswer }: { step: SimulationStep; onAnswer: (choice: Choice, detectedFlags: string[]) => void }) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const profile = step.content;

  const handleChoice = (choice: Choice) => {
    if (answered) return;
    setSelectedChoice(choice.id);
    setAnswered(true);
    setTimeout(() => onAnswer(choice, profile.post?.flagIds || []), 1200);
  };

  return (
    <div className="space-y-4">
      {/* Profile card mockup */}
      <div className="rounded-2xl overflow-hidden" style={{ background: 'hsl(222 43% 14%)', border: '1px solid hsl(222 30% 22%)' }}>
        <div className="h-20 w-full" style={{ background: 'linear-gradient(135deg, hsl(258 85% 20%), hsl(186 100% 15%))' }} />
        <div className="px-4 pb-4 -mt-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-3"
            style={{ background: 'hsl(222 43% 18%)', border: '3px solid hsl(222 43% 14%)' }}>
            {profile.accountPic}
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-white">{profile.accountName}</span>
            {!profile.verified && (
              <span className="text-xs px-1.5 py-0.5 rounded-full"
                style={{ background: 'hsl(4 90% 58% / 0.15)', color: 'hsl(4 90% 68%)' }}>Sin verificar</span>
            )}
          </div>
          <p className="text-xs mb-2" style={{ color: 'hsl(215 20% 55%)' }}>{profile.followers}</p>
          <p className="text-sm text-white">{profile.bio}</p>
        </div>

        {/* Post */}
        <div className="px-4 pb-4">
          <div className="p-4 rounded-xl text-sm text-white"
            style={{ background: 'hsl(222 35% 18%)', border: '1px solid hsl(222 30% 25%)' }}>
            {profile.post?.text}
          </div>
          <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: 'hsl(215 20% 50%)' }}>
            <span>❤️ {profile.post?.likes?.toLocaleString()}</span>
            <span>💬 {profile.post?.comments?.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="p-4 rounded-2xl"
        style={{ background: 'hsl(186 100% 50% / 0.06)', border: '1px solid hsl(186 100% 50% / 0.2)' }}>
        <p className="text-sm font-semibold text-white">❓ {profile.question}</p>
      </div>

      {/* Choices */}
      <div className="space-y-2">
        {step.choices.map(choice => {
          const isSelected = selectedChoice === choice.id;
          const showResult = answered && isSelected;
          const isCorrect = choice.isCorrect;
          return (
            <button
              key={choice.id}
              data-testid={`choice-${choice.id}`}
              onClick={() => handleChoice(choice)}
              disabled={answered}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all choice-btn"
              style={{
                background: showResult ? (isCorrect ? 'hsl(152 69% 44% / 0.2)' : 'hsl(4 90% 58% / 0.2)') : 'hsl(222 35% 20%)',
                border: showResult ? (isCorrect ? '1px solid hsl(152 69% 44% / 0.5)' : '1px solid hsl(4 90% 58% / 0.5)') : '1px solid hsl(222 30% 28%)',
                color: showResult ? (isCorrect ? 'hsl(152 69% 65%)' : 'hsl(4 90% 68%)') : 'hsl(210 40% 85%)',
                cursor: answered ? 'default' : 'pointer',
              }}
            >
              <div className="flex items-start gap-2">
                <span>{showResult ? (isCorrect ? '✅' : '❌') : '→'}</span>
                <span>{choice.text}</span>
              </div>
              {showResult && <p className="text-xs mt-2">{choice.feedback}</p>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Simulation Page ────────────────────────────────────────────────────
export default function SimulationPage() {
  const [, params] = useRoute('/simulation/:moduleId');
  const [, navigate] = useLocation();
  const { setCurrentResult, recordInteraction, completeModule } = useGame();

  const moduleId = params?.moduleId as string;
  const module = allModules.find(m => m.id === moduleId);

  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [answers, setAnswers] = useState<{ choice: Choice; detectedFlags: string[] }[]>([]);
  const [stepKey, setStepKey] = useState(0);
  const stepStartTimeRef = useRef<number>(Date.now());

  if (!module) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-64 text-center px-4">
          <div>
            <p className="text-white mb-4">Módulo no encontrado</p>
            <button onClick={() => navigate('/modules')} className="text-sm" style={{ color: 'hsl(186 100% 60%)' }}>← Volver a módulos</button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const currentStep = module.steps[currentStepIdx];
  const totalSteps = module.steps.length;
  const progress = Math.round((currentStepIdx / totalSteps) * 100);

  const handleAnswer = (choice: Choice, detectedFlags: string[]) => {
    const responseTimeMs = Date.now() - stepStartTimeRef.current;
    const newAnswers = [...answers, { choice, detectedFlags }];
    setAnswers(newAnswers);

    // Registrar interacción con indicadores y tiempo
    const step = module.steps[currentStepIdx];
    const allFlagIdsInStep = (step.content.messages || []).flatMap((m: any) => m.flagIds || [])
      .concat(step.content.flagIds || []);
    const flagsPresent = [...new Set(allFlagIdsInStep)].length;

    const record: InteractionRecord = {
      stepId: step.id,
      moduleId: module.id,
      stageIndex: step.stageIndex,
      difficultyLabel: module.difficulty,
      indicators: (step as any).indicators || [],
      decisionSegura: choice.isCorrect,
      responseTimeMs,
      pointsEarned: choice.pointsEarned,
      maxPoints: Math.max(...step.choices.map(c => c.pointsEarned)),
      flagsPresent,
      flagsDetected: detectedFlags.length,
      timestamp: Date.now(),
    };
    recordInteraction(record);

    if (currentStepIdx < totalSteps - 1) {
      setTimeout(() => {
        stepStartTimeRef.current = Date.now();
        setCurrentStepIdx(i => i + 1);
        setStepKey(k => k + 1);
      }, 1500);
    } else {
      // All steps done — compute result and navigate
      setTimeout(() => {
        const correctCount = newAnswers.filter(a => a.choice.isCorrect).length;
        const totalScore = newAnswers.reduce((sum, a) => sum + a.choice.pointsEarned, 0);
        const allDetectedFlags = [...new Set(newAnswers.flatMap(a => a.detectedFlags))];
        const allFlags = module.redFlags.map(f => f.id);
        const missedFlags = allFlags.filter(f => !allDetectedFlags.includes(f));

        const result = {
          moduleId: module.id as any,
          score: totalScore,
          maxScore: module.steps.reduce((sum, s) => sum + Math.max(...s.choices.map(c => c.pointsEarned)), 0),
          correctAnswers: correctCount,
          totalQuestions: totalSteps,
          flagsDetected: allDetectedFlags,
          missedFlags,
          riskScore: calculateRiskScore(correctCount, totalSteps),
        };
        setCurrentResult(result);
        completeModule(module.id, result);
        navigate(`/analysis/${module.id}`);
      }, 1800);
    }
  };

  const renderStep = () => {
    if (!currentStep) return null;
    const props = { step: currentStep, onAnswer: handleAnswer };
    if (currentStep.type === 'chat' || currentStep.type === 'message') return <ChatUI key={stepKey} {...props} />;
    if (currentStep.type === 'post') return <PostUI key={stepKey} {...props} />;
    if (currentStep.type === 'profile') return <ProfileUI key={stepKey} {...props} />;
    return <ChatUI key={stepKey} {...props} />;
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Module header */}
        <div className="flex items-center gap-3 mb-6 animate-fade-up">
          <button onClick={() => navigate('/modules')}
            className="p-2 rounded-xl transition-colors hover:bg-white/5"
            style={{ color: 'hsl(215 20% 55%)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </button>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
            style={{ background: module.color + '15', border: `1px solid ${module.color}33` }}>
            {module.icon}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white text-sm">{module.title}</p>
            <p className="text-xs" style={{ color: 'hsl(215 20% 50%)' }}>Escenario {currentStepIdx + 1} de {totalSteps}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold" style={{ color: module.color }}>{progress}%</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full mb-6 overflow-hidden" style={{ background: 'hsl(222 30% 20%)' }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: module.color, boxShadow: `0 0 8px ${module.color}88` }} />
        </div>

        {/* Step label */}
        <div className="flex items-center gap-2 mb-4 animate-fade-up delay-100">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: module.color + '22', color: module.color, border: `1px solid ${module.color}44` }}>
            {currentStepIdx + 1}
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'hsl(215 20% 50%)' }}>
            {currentStep?.type === 'chat' ? 'Chat interactivo' :
              currentStep?.type === 'message' ? 'Mensaje sospechoso' :
              currentStep?.type === 'post' ? 'Publicación viral' : 'Perfil sospechoso'}
          </p>
        </div>

        {/* Risk progression bar */}
        {module.riskStages && currentStep && (
          <RiskProgressBar
            stages={module.riskStages}
            activeStageIndex={currentStep.stageIndex ?? 0}
            color={module.color}
          />
        )}

        {/* Simulation content */}
        <div className="animate-fade-up delay-200">
          {renderStep()}
        </div>

        {/* Red flags hint */}
        <div className="mt-6 p-4 rounded-2xl animate-fade-up delay-300"
          style={{ background: 'hsl(222 43% 12%)', border: '1px solid hsl(222 30% 20%)' }}>
          <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: 'hsl(215 20% 50%)' }}>
            🚩 Posibles señales en este escenario
          </p>
          <div className="flex flex-wrap gap-1.5">
            {module.redFlags.slice(0, 4).map(f => (
              <span key={f.id} className="text-xs px-2.5 py-1 rounded-full"
                style={{ background: 'hsl(222 30% 18%)', color: 'hsl(215 20% 65%)', border: '1px solid hsl(222 30% 26%)' }}>
                {f.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
