'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';

import { AttemptComparisonChart } from '@/components/rose-growth/AttemptComparisonChart';
import { GrowthControls } from '@/components/rose-growth/GrowthControls';
import { NamingReflectionPanel } from '@/components/rose-growth/NamingReflectionPanel';
import { RoseFeedback } from '@/components/rose-growth/RoseFeedback';
import { RoseStage } from '@/components/rose-growth/RoseStage';
import { roseGrowthOptions, simulateGrowth } from '@/lib/simulations/roseGrowthEngine';
import { useGrowthStore } from '@/lib/store/growthStore';

export default function RoseGrowthPage() {
  const {
    roseDraft,
    attempts,
    roseNamingReflection,
    updateRoseDraft,
    runRoseAttempt,
    resetRoseDraft,
    setRoseNamingReflection,
  } = useGrowthStore();
  const [showComparison, setShowComparison] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showNamingPanel, setShowNamingPanel] = useState(false);

  const preview = useMemo(() => simulateGrowth(roseDraft, roseGrowthOptions), [roseDraft]);
  const roseAttempts = attempts.filter((attempt) => attempt.stage === 'rose');
  const latestResult = roseAttempts[roseAttempts.length - 1]?.result ?? preview;
  const recentThree = roseAttempts.slice(-3);

  return (
    <>
      <div className="page-stack">
        <section className="page-intro">
          <h1>蔷薇花墙</h1>
          <p>这是时序花园的核心训练关卡：孩子通过连续试错，理解“改起点”和“改增长方式”为什么会带来完全不同的结果。</p>
        </section>

        <section
          style={{
            background: 'rgba(250, 241, 226, 0.94)',
            borderRadius: 28,
            padding: 24,
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.14)',
            display: 'grid',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'ZCOOL XiaoWei, serif', fontSize: 42, color: '#a7274b' }}>时序花园 · 蔷薇花墙</div>
              <div style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 780 }}>
                目标：让蔷薇在第 7 天清晨刚好铺满花墙。别只盯着前几天，后面可能会突然变快。
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <MetricChip label="当前尝试次数" value={`${roseAttempts.length}`} />
              <button type="button" onClick={() => setShowHint((value) => !value)} style={topButtonStyle}>
                提示
              </button>
              <button type="button" onClick={() => setShowComparison((value) => !value)} style={topButtonStyle}>
                对比
              </button>
            </div>
          </div>

          {showHint ? (
            <div style={helperCardStyle}>
              提示：如果前面几天差不多，看看第 5～7 天有没有突然拉开。你也可以比较“改起点”和“改增长方式”带来的不同。
            </div>
          ) : null}

          {showComparison && recentThree.length > 0 ? <AttemptComparisonChart attempts={recentThree} /> : null}
        </section>

        <RoseStage
          title="木屋边的蔷薇墙"
          subtitle="墙看起来很安静，但它并不总是按同一种节奏长。"
          timeline={latestResult.timeline}
          dayLabel="第 7 天清晨"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 18 }}>
          <GrowthControls
            value={roseDraft}
            title="生长控制台"
            helper="通过试错摸清：改起点，和改增长方式，结果可能完全不同。"
            onChange={updateRoseDraft}
          />
          <RoseFeedback
            outcome={latestResult.outcome}
            difference={latestResult.differenceFromTarget}
            finalCoveragePercent={latestResult.finalCoveragePercent}
            rawCoveragePercent={latestResult.finalRawCoveragePercent}
          />
        </div>

        <section
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(255, 250, 242, 0.92)',
            borderRadius: 24,
            padding: 18,
          }}
        >
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <ActionButton label="开始生长" onClick={() => runRoseAttempt()} />
            <ActionButton
              label="再试一次"
              onClick={() => {
                resetRoseDraft();
                setShowHint(false);
              }}
              tone="secondary"
            />
            <ActionButton
              label="看看我前两次哪里不同"
              onClick={() => setShowComparison(true)}
              tone="secondary"
            />
            <ActionButton label="我好像懂了" onClick={() => setShowNamingPanel(true)} tone="accent" />
          </div>
          <Link href="/tulip-growth" style={{ color: '#2f7d59', fontWeight: 800 }}>
            去迁移小关 →
          </Link>
        </section>

        <section className="ai-note">
          <h2>AI 提示如何工作</h2>
          <p>当前版本的 AI 主要用于训练后的提示生成、错因解释和结果总结，不直接给出标准答案。</p>
        </section>
      </div>

      <NamingReflectionPanel
        open={showNamingPanel}
        selected={roseNamingReflection}
        onSelect={setRoseNamingReflection}
        onClose={() => setShowNamingPanel(false)}
      />
    </>
  );
}

function MetricChip({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        minWidth: 112,
        background: '#fff8ef',
        borderRadius: 18,
        padding: '10px 14px',
      }}
    >
      <div style={{ fontSize: 12, color: '#6c7269' }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 800 }}>{value}</div>
    </div>
  );
}

function ActionButton({
  label,
  onClick,
  tone = 'primary',
}: {
  label: string;
  onClick: () => void;
  tone?: 'primary' | 'secondary' | 'accent';
}) {
  const toneMap = {
    primary: { background: '#2f7d59', color: '#fff' },
    secondary: { background: '#ece2d0', color: '#28382d' },
    accent: { background: '#a7274b', color: '#fff' },
  } as const;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: 'none',
        borderRadius: 999,
        padding: '12px 18px',
        fontWeight: 800,
        ...toneMap[tone],
      }}
    >
      {label}
    </button>
  );
}

const topButtonStyle: CSSProperties = {
  border: 'none',
  background: '#ece2d0',
  borderRadius: 999,
  padding: '10px 14px',
  fontWeight: 800,
  color: '#223127',
};

const helperCardStyle: CSSProperties = {
  background: '#fff8ef',
  borderRadius: 20,
  padding: '14px 16px',
  lineHeight: 1.7,
};
