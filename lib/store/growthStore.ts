'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { buildGrowthReport } from '@/lib/reporting/growthReport';
import {
  roseGrowthDefaults,
  roseGrowthOptions,
  simulateGrowth,
  tulipGrowthOptions,
} from '@/lib/simulations/roseGrowthEngine';
import {
  AttemptRecord,
  GrowthConfig,
  GrowthSimulationResult,
  NamingReflection,
  ParentReport,
  RoseMislabel,
} from '@/lib/types/growth';

interface GrowthStoreState {
  roseDraft: GrowthConfig;
  tulipDraft: GrowthConfig;
  attempts: AttemptRecord[];
  roseNamingReflection: NamingReflection | null;
  migrationSuccessTulip: boolean;
  report: ParentReport;
  updateRoseDraft: (patch: Partial<GrowthConfig>) => void;
  updateTulipDraft: (patch: Partial<GrowthConfig>) => void;
  runRoseAttempt: () => GrowthSimulationResult;
  runTulipAttempt: () => GrowthSimulationResult;
  resetRoseDraft: () => void;
  resetTulipDraft: () => void;
  setRoseNamingReflection: (value: NamingReflection) => void;
  getRecentRoseAttempts: () => AttemptRecord[];
  getRoseMislabels: () => RoseMislabel[];
}

const defaultTulipDraft: GrowthConfig = {
  ...roseGrowthDefaults,
  initialBuds: 3,
  growthMode: 'exponential',
  multiplier: 1.7,
};

const emptyReport: ParentReport = {
  growthIntuitionLevel: 0,
  linearExpDiff: false,
  strategyShiftAfterFailure: false,
  migrationSuccessTulip: false,
  mislabels: [],
  summary: '孩子目前还在探索阶段，建议继续多比较几次不同增长方式在后几天的变化。',
};

function cloneConfig(config: GrowthConfig): GrowthConfig {
  return {
    initialBuds: config.initialBuds,
    growthMode: config.growthMode,
    linearRate: config.linearRate,
    multiplier: config.multiplier,
    prune: config.prune,
  };
}

function normalizeAttempts(attempts: AttemptRecord[]): AttemptRecord[] {
  return attempts
    .map((attempt, index) => {
      const sequence = typeof attempt.sequence === 'number' ? attempt.sequence : index + 1;
      const createdAt = typeof attempt.createdAt === 'number' ? attempt.createdAt : sequence;
      return {
        ...attempt,
        id: attempt.id || `${attempt.stage}-${sequence}`,
        sequence,
        createdAt,
        config: cloneConfig(attempt.config),
      };
    })
    .sort((left, right) => left.sequence - right.sequence);
}

function makeAttempt(stage: 'rose' | 'tulip', sequence: number, config: GrowthConfig, result: GrowthSimulationResult): AttemptRecord {
  return {
    id: `${stage}-${sequence}`,
    sequence,
    stage,
    createdAt: sequence,
    config: cloneConfig(config),
    result,
  };
}

function syncDerivedState(attempts: AttemptRecord[]) {
  const normalizedAttempts = normalizeAttempts(attempts);
  const report = buildGrowthReport(normalizedAttempts);

  return {
    attempts: normalizedAttempts,
    report,
    migrationSuccessTulip: report.migrationSuccessTulip,
  };
}

export const useGrowthStore = create<GrowthStoreState>()(
  persist(
    (set, get) => ({
      roseDraft: roseGrowthDefaults,
      tulipDraft: defaultTulipDraft,
      attempts: [],
      roseNamingReflection: null,
      migrationSuccessTulip: false,
      report: emptyReport,
      updateRoseDraft: (patch) => {
        set((state) => ({
          roseDraft: { ...state.roseDraft, ...patch },
        }));
      },
      updateTulipDraft: (patch) => {
        set((state) => ({
          tulipDraft: { ...state.tulipDraft, ...patch },
        }));
      },
      runRoseAttempt: () => {
        const config = cloneConfig(get().roseDraft);
        const result = simulateGrowth(config, roseGrowthOptions);

        set((state) => {
          const sequence = state.attempts.length + 1;
          const attempts = [...state.attempts, makeAttempt('rose', sequence, config, result)];
          return syncDerivedState(attempts);
        });

        return result;
      },
      runTulipAttempt: () => {
        const config = cloneConfig(get().tulipDraft);
        const result = simulateGrowth(config, tulipGrowthOptions);

        set((state) => {
          const sequence = state.attempts.length + 1;
          const attempts = [...state.attempts, makeAttempt('tulip', sequence, config, result)];
          return syncDerivedState(attempts);
        });

        return result;
      },
      resetRoseDraft: () => set({ roseDraft: roseGrowthDefaults }),
      resetTulipDraft: () => set({ tulipDraft: defaultTulipDraft }),
      setRoseNamingReflection: (value) => set({ roseNamingReflection: value }),
      getRecentRoseAttempts: () => get().attempts.filter((attempt) => attempt.stage === 'rose').slice(-3),
      getRoseMislabels: () => get().report.mislabels,
    }),
    {
      name: 'temporal-garden-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        roseDraft: state.roseDraft,
        tulipDraft: state.tulipDraft,
        attempts: state.attempts,
        roseNamingReflection: state.roseNamingReflection,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) {
          return;
        }

        const derived = syncDerivedState(state.attempts);
        state.attempts = derived.attempts;
        state.report = derived.report;
        state.migrationSuccessTulip = derived.migrationSuccessTulip;
      },
    },
  ),
);
