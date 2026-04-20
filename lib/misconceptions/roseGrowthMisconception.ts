import { AttemptRecord, GrowthConfig, RoseMislabel } from '@/lib/types/growth';

function isConfigBigger(next: GrowthConfig, prev: GrowthConfig) {
  return (
    next.initialBuds >= prev.initialBuds &&
    next.linearRate >= prev.linearRate &&
    next.multiplier >= prev.multiplier &&
    Number(next.prune) >= Number(prev.prune)
  );
}

function getConsecutiveRoseAttempts(attempts: AttemptRecord[]) {
  const orderedRoseAttempts = attempts
    .filter((attempt) => attempt.stage === 'rose')
    .slice()
    .sort((left, right) => left.sequence - right.sequence);

  return orderedRoseAttempts;
}

/**
 * 行为误解识别：只根据连续尝试的参数变化判断，不推断孩子心理。
 */
export function detectRoseMisconceptions(attempts: AttemptRecord[]): RoseMislabel[] {
  const roseAttempts = getConsecutiveRoseAttempts(attempts);
  const labels = new Set<RoseMislabel>();

  if (roseAttempts.length >= 3) {
    for (let index = 0; index <= roseAttempts.length - 3; index += 1) {
      const windowAttempts = roseAttempts.slice(index, index + 3);
      const allLinear = windowAttempts.every((attempt) => attempt.config.growthMode === 'linear');
      const initialValues = new Set(windowAttempts.map((attempt) => attempt.config.initialBuds)).size;
      const linearValues = new Set(windowAttempts.map((attempt) => attempt.config.linearRate)).size;

      if (allLinear && initialValues > 1 && linearValues === 1) {
        labels.add('mis_only_initial');
      }
    }
  }

  if (roseAttempts.length >= 3) {
    for (let index = 0; index <= roseAttempts.length - 3; index += 1) {
      const first = roseAttempts[index];
      const second = roseAttempts[index + 1];
      const third = roseAttempts[index + 2];

      if (
        first.result.outcome === 'overflow' &&
        second.result.outcome === 'overflow' &&
        isConfigBigger(third.config, second.config) &&
        (third.config.initialBuds > second.config.initialBuds ||
          third.config.linearRate > second.config.linearRate ||
          third.config.multiplier > second.config.multiplier)
      ) {
        labels.add('mis_bigger_is_better');
      }
    }
  }

  if (roseAttempts.length >= 2) {
    for (let index = 0; index < roseAttempts.length - 1; index += 1) {
      const current = roseAttempts[index];
      const next = roseAttempts[index + 1];

      if (
        current.result.outcome !== 'success' &&
        current.config.growthMode === 'linear' &&
        next.config.growthMode === 'linear' &&
        next.config.linearRate > current.config.linearRate
      ) {
        labels.add('mis_conflate_linear_exponential');
      }
    }
  }

  return Array.from(labels);
}
