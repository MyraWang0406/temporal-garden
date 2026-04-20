export type GrowthMode = 'linear' | 'exponential';

export type RoseMislabel =
  | 'mis_only_initial'
  | 'mis_bigger_is_better'
  | 'mis_conflate_linear_exponential';

export type AttemptOutcome = 'too_slow' | 'slightly_slow' | 'success' | 'overflow';

export type NamingReflection =
  | 'fixed_addition'
  | 'accelerating_growth'
  | 'try_again';

export interface GrowthConfig {
  initialBuds: number;
  growthMode: GrowthMode;
  linearRate: number;
  multiplier: number;
  prune: boolean;
}

export interface DailyGrowthPoint {
  day: number;
  buds: number;
  coveragePercent: number;
}

export interface SimulateGrowthOptions {
  totalDays: number;
  capacity: number;
}

export interface GrowthSimulationResult {
  timeline: DailyGrowthPoint[];
  finalBuds: number;
  finalCoveragePercent: number;
  finalRawCoveragePercent: number;
  outcome: AttemptOutcome;
  differenceFromTarget: number;
}

export interface AttemptRecord {
  id: string;
  sequence: number;
  stage: 'rose' | 'tulip';
  createdAt: number;
  config: GrowthConfig;
  result: GrowthSimulationResult;
}

export interface ParentReport {
  growthIntuitionLevel: 0 | 1 | 2 | 3;
  linearExpDiff: boolean;
  strategyShiftAfterFailure: boolean;
  migrationSuccessTulip: boolean;
  mislabels: RoseMislabel[];
  summary: string;
}
