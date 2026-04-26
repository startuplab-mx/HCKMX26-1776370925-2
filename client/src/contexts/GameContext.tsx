import { createContext, useContext, useState, ReactNode } from 'react';
import {
  PlayerProfile, initialProfile, ModuleId, ModuleProgress,
  allModules, defaultBadges, Badge,
  InteractionRecord, ModuleStats, AnyIndicator,
} from '@/lib/gameData';

interface SimulationResult {
  moduleId: ModuleId;
  score: number;
  maxScore: number;
  correctAnswers: number;
  totalQuestions: number;
  flagsDetected: string[];
  missedFlags: string[];
  riskScore: number;
}

interface GameContextType {
  profile: PlayerProfile;
  currentResult: SimulationResult | null;
  interactionHistory: InteractionRecord[];
  setCurrentResult: (r: SimulationResult) => void;
  completeModule: (moduleId: ModuleId, result: SimulationResult) => void;
  resetModule: (moduleId: ModuleId) => void;
  getModuleProgress: (moduleId: ModuleId) => ModuleProgress | undefined;
  recordInteraction: (record: InteractionRecord) => void;
  getModuleStats: (moduleId: ModuleId) => ModuleStats;
  getAllStats: () => ModuleStats[];
}

const GameContext = createContext<GameContextType | null>(null);

// ─── Helpers de estadísticas ────────────────────────────────────────────────
function computeModuleStats(moduleId: ModuleId, records: InteractionRecord[]): ModuleStats {
  const moduleRecords = records.filter(r => r.moduleId === moduleId);

  if (moduleRecords.length === 0) {
    return {
      moduleId,
      totalInteracciones: 0,
      decisionesSeguras: 0,
      decisionesRiesgosas: 0,
      porcentajeDeteccion: 0,
      tiempoPromedioMs: 0,
      faseMasVulnerable: 0,
      indicadorMasFrecuente: '—',
      indicadoresFrecuencia: {},
    };
  }

  const totalInteracciones = moduleRecords.length;
  const decisionesSeguras = moduleRecords.filter(r => r.decisionSegura).length;
  const decisionesRiesgosas = totalInteracciones - decisionesSeguras;

  const totalFlagsPresent = moduleRecords.reduce((s, r) => s + r.flagsPresent, 0);
  const totalFlagsDetected = moduleRecords.reduce((s, r) => s + r.flagsDetected, 0);
  const porcentajeDeteccion = totalFlagsPresent > 0
    ? Math.round((totalFlagsDetected / totalFlagsPresent) * 100)
    : 0;

  const tiempoPromedioMs = Math.round(
    moduleRecords.reduce((s, r) => s + r.responseTimeMs, 0) / totalInteracciones
  );

  // Fase más vulnerable: stage con más decisiones riesgosas
  const stageRisk: Record<number, number> = {};
  moduleRecords.forEach(r => {
    if (!r.decisionSegura) {
      stageRisk[r.stageIndex] = (stageRisk[r.stageIndex] || 0) + 1;
    }
  });
  const faseMasVulnerable = Object.keys(stageRisk).length > 0
    ? parseInt(Object.entries(stageRisk).sort((a, b) => b[1] - a[1])[0][0])
    : 0;

  // Frecuencia de indicadores
  const indicadoresFrecuencia: Record<string, number> = {};
  moduleRecords.forEach(r => {
    r.indicators.forEach(ind => {
      indicadoresFrecuencia[ind] = (indicadoresFrecuencia[ind] || 0) + 1;
    });
  });
  const indicadorMasFrecuente = Object.keys(indicadoresFrecuencia).length > 0
    ? Object.entries(indicadoresFrecuencia).sort((a, b) => b[1] - a[1])[0][0]
    : '—';

  return {
    moduleId,
    totalInteracciones,
    decisionesSeguras,
    decisionesRiesgosas,
    porcentajeDeteccion,
    tiempoPromedioMs,
    faseMasVulnerable,
    indicadorMasFrecuente,
    indicadoresFrecuencia,
  };
}

// ─── Provider ───────────────────────────────────────────────────────────────
export function GameProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<PlayerProfile>(initialProfile);
  const [currentResult, setCurrentResult] = useState<SimulationResult | null>(null);
  const [interactionHistory, setInteractionHistory] = useState<InteractionRecord[]>([]);

  const getModuleProgress = (moduleId: ModuleId) =>
    profile.moduleProgress.find(p => p.moduleId === moduleId);

  const recordInteraction = (record: InteractionRecord) => {
    setInteractionHistory(prev => [...prev, record]);
  };

  const getModuleStats = (moduleId: ModuleId): ModuleStats =>
    computeModuleStats(moduleId, interactionHistory);

  const getAllStats = (): ModuleStats[] =>
    allModules.map(m => computeModuleStats(m.id, interactionHistory));

  const completeModule = (moduleId: ModuleId, result: SimulationResult) => {
    setProfile(prev => {
      const moduleData = allModules.find(m => m.id === moduleId);
      const earnedXP = moduleData ? Math.round((result.score / result.maxScore) * moduleData.xp) : 0;

      const updatedProgress = prev.moduleProgress.map(p =>
        p.moduleId === moduleId
          ? {
              ...p,
              completed: true,
              score: result.score,
              maxScore: result.maxScore,
              flagsDetected: result.flagsDetected.length,
              completedAt: new Date(),
            }
          : p
      );

      const completedCount = updatedProgress.filter(p => p.completed).length;
      const totalXP = prev.totalXP + earnedXP;
      const newLevel = Math.floor(totalXP / 200) + 1;
      const defenseRating = Math.min(100, prev.defenseRating + Math.round(result.score / result.maxScore * 15));

      const updatedBadges: Badge[] = prev.badges.map(b => {
        if (b.id === 'b6') return { ...b, earned: true };
        if (b.id === 'b2' && moduleId === 'grooming' && result.score === result.maxScore) return { ...b, earned: true };
        if (b.id === 'b3' && moduleId === 'fraud' && result.score === result.maxScore) return { ...b, earned: true };
        if (b.id === 'b4' && moduleId === 'disinfo') return { ...b, earned: true };
        if (b.id === 'b5' && completedCount === 4) return { ...b, earned: true };
        if (b.id === 'b1' && result.flagsDetected.length === result.flagsDetected.length + result.missedFlags.length) return { ...b, earned: true };
        return b;
      });

      return {
        ...prev,
        level: newLevel,
        totalXP,
        xpToNext: newLevel * 200,
        defenseRating,
        moduleProgress: updatedProgress,
        badges: updatedBadges,
      };
    });
  };

  const resetModule = (moduleId: ModuleId) => {
    setProfile(prev => ({
      ...prev,
      moduleProgress: prev.moduleProgress.map(p =>
        p.moduleId === moduleId
          ? { ...p, completed: false, score: 0, flagsDetected: 0, completedAt: undefined, maxScore: p.maxScore }
          : p
      ),
    }));
  };

  return (
    <GameContext.Provider value={{
      profile, currentResult, interactionHistory,
      setCurrentResult, completeModule, resetModule,
      getModuleProgress, recordInteraction, getModuleStats, getAllStats,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
