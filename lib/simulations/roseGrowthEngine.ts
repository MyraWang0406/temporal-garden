import {
  GrowthConfig,
  GrowthSimulationResult,
  SimulateGrowthOptions,
} from '@/lib/types/growth';

/**
 * 纯 deterministic engine：按天推进，而不是直接套终值公式。
 * 只要输入参数相同，timeline 与最终结果就始终一致。
 */
export function simulateGrowth(
  config: GrowthConfig,
  options: SimulateGrowthOptions,
): GrowthSimulationResult {
  const timeline = [] as GrowthSimulationResult['timeline'];
  let buds = config.initialBuds;

  timeline.push({
    day: 0,
    buds,
    coveragePercent: toCoveragePercent(buds, options.capacity),
  });

  for (let day = 0; day < options.totalDays; day += 1) {
    if (config.growthMode === 'linear') {
      buds += config.linearRate;
    } else {
      buds *= config.multiplier;
    }

    /**
     * prune 规则：第 4 天迭代结束后触发。
     * 这里的 day 是“刚完成的这一天”，所以 day === 3 代表完成 day4。
     */
    if (config.prune && day === 3) {
      buds *= 0.5;
    }

    timeline.push({
      day: day + 1,
      buds,
      coveragePercent: toCoveragePercent(buds, options.capacity),
    });
  }

  const finalCoveragePercent = timeline[timeline.length - 1].coveragePercent;
  const finalRawCoveragePercent = Number(((buds / options.capacity) * 100).toFixed(2));

  return {
    timeline,
    finalBuds: buds,
    finalCoveragePercent,
    finalRawCoveragePercent,
    outcome: getAttemptOutcome(finalRawCoveragePercent),
    differenceFromTarget: Number(Math.abs(100 - finalCoveragePercent).toFixed(2)),
  };
}

/**
 * 判定使用未封顶的覆盖率，
 * 这样超过 100% 时可以识别为 overflow，而不是被 min(100, ...) 吞掉。
 */
export function getAttemptOutcome(finalRawCoveragePercent: number) {
  if (finalRawCoveragePercent < 70) {
    return 'too_slow' as const;
  }

  if (finalRawCoveragePercent < 95) {
    return 'slightly_slow' as const;
  }

  if (finalRawCoveragePercent <= 100) {
    return 'success' as const;
  }

  return 'overflow' as const;
}

export function toCoveragePercent(buds: number, capacity: number) {
  return Number(Math.min(100, (buds / capacity) * 100).toFixed(2));
}

export const roseGrowthDefaults: GrowthConfig = {
  initialBuds: 2,
  growthMode: 'linear',
  linearRate: 3,
  multiplier: 1.8,
  prune: false,
};

export const roseGrowthOptions = {
  totalDays: 7,
  capacity: 100,
};

export const tulipGrowthOptions = {
  totalDays: 8,
  capacity: 100,
};
