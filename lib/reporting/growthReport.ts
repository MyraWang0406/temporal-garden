import { detectRoseMisconceptions } from '@/lib/misconceptions/roseGrowthMisconception';
import { AttemptRecord, ParentReport } from '@/lib/types/growth';

function hasDifferentSuccessParameters(attempts: AttemptRecord[]) {
  const successKeys = attempts
    .filter((attempt) => attempt.result.outcome === 'success')
    .map((attempt) => JSON.stringify(attempt.config));

  return new Set(successKeys).size >= 2;
}

function getOrderedAttempts(allAttempts: AttemptRecord[]) {
  return allAttempts.slice().sort((left, right) => left.sequence - right.sequence);
}

function hasLinearExpDiff(roseAttempts: AttemptRecord[]) {
  const usedLinear = roseAttempts.some((attempt) => attempt.config.growthMode === 'linear');
  const usedExponential = roseAttempts.some((attempt) => attempt.config.growthMode === 'exponential');
  const exponentialSuccess = roseAttempts.some(
    (attempt) => attempt.config.growthMode === 'exponential' && attempt.result.outcome === 'success',
  );

  return usedLinear && usedExponential && exponentialSuccess;
}

function hasStrategyShiftAfterFailure(roseAttempts: AttemptRecord[]) {
  for (let index = 0; index < roseAttempts.length - 1; index += 1) {
    const current = roseAttempts[index];
    const next = roseAttempts[index + 1];

    if (current.result.outcome !== 'success' && current.config.growthMode !== next.config.growthMode) {
      return true;
    }
  }

  return false;
}

function buildSummary(params: {
  roseAttempts: AttemptRecord[];
  tulipAttempts: AttemptRecord[];
  mislabels: ParentReport['mislabels'];
  mainSuccessCount: number;
  migrationSuccessTulip: boolean;
  linearExpDiff: boolean;
}): string {
  const { roseAttempts, tulipAttempts, mislabels, mainSuccessCount, migrationSuccessTulip, linearExpDiff } = params;
  const overflowCount = roseAttempts.filter((attempt) => attempt.result.outcome === 'overflow').length;

  if (mainSuccessCount >= 2 && migrationSuccessTulip) {
    return '孩子已经开始区分“每天固定增加”和“每天按倍数增长”的不同后果，并且能在新场景中再次用出来。';
  }

  if (mainSuccessCount >= 1 && !migrationSuccessTulip && tulipAttempts.length > 0) {
    return '孩子在熟悉场景中已经形成增长直觉，但换到新场景后还需要再巩固。';
  }

  if (overflowCount >= 2 || mislabels.includes('mis_bigger_is_better')) {
    return '孩子目前容易把“越多越好”当成目标，建议继续通过试错理解“刚好铺满”和“越长越快”的区别。';
  }

  if (linearExpDiff) {
    return '孩子正在形成对两种增长方式的区别感，但还需要更多尝试把这种感觉稳定下来。';
  }

  return '孩子目前还在探索阶段，建议继续多比较几次不同增长方式在后几天的变化。';
}

export function buildGrowthReport(allAttempts: AttemptRecord[]): ParentReport {
  const orderedAttempts = getOrderedAttempts(allAttempts);
  const roseAttempts = orderedAttempts.filter((attempt) => attempt.stage === 'rose');
  const tulipAttempts = orderedAttempts.filter((attempt) => attempt.stage === 'tulip');
  const mainSuccesses = roseAttempts.filter((attempt) => attempt.result.outcome === 'success');
  const migrationSuccessTulip = tulipAttempts.some((attempt) => attempt.result.outcome === 'success');
  const linearExpDiff = hasLinearExpDiff(roseAttempts);
  const strategyShiftAfterFailure = hasStrategyShiftAfterFailure(roseAttempts);
  const mislabels = detectRoseMisconceptions(orderedAttempts);

  let growthIntuitionLevel: 0 | 1 | 2 | 3 = 0;

  if (mainSuccesses.length >= 2 && hasDifferentSuccessParameters(mainSuccesses) && migrationSuccessTulip) {
    growthIntuitionLevel = 3;
  } else if (mainSuccesses.length >= 1) {
    growthIntuitionLevel = linearExpDiff || strategyShiftAfterFailure ? 2 : 1;
  } else if (roseAttempts.length >= 2 || linearExpDiff) {
    growthIntuitionLevel = 1;
  }

  return {
    growthIntuitionLevel,
    linearExpDiff,
    strategyShiftAfterFailure,
    migrationSuccessTulip,
    mislabels,
    summary: buildSummary({
      roseAttempts,
      tulipAttempts,
      mislabels,
      mainSuccessCount: mainSuccesses.length,
      migrationSuccessTulip,
      linearExpDiff,
    }),
  };
}
