'use client';

import { AttemptOutcome } from '@/lib/types/growth';

const feedbackCopy: Record<
  AttemptOutcome,
  {
    title: string;
    tone: string;
    border: string;
    badge: string;
    badgeText: string;
    guardian: string;
    peer: string;
    mentor: string;
  }
> = {
  too_slow: {
    title: '长得太慢了',
    tone: '#eef6ff',
    border: '#76a7d8',
    badge: '#2a6db0',
    badgeText: '还没铺满',
    guardian: '这面墙脾气很怪，前几天总装得很乖，后几天又突然乱来。',
    peer: '是不是前面看起来差不多，但其实后面没有跟上？',
    mentor: '试着留意第 5～7 天：它有没有真正开始变快？',
  },
  slightly_slow: {
    title: '快接近了',
    tone: '#fff7e7',
    border: '#d5a84a',
    badge: '#c48a14',
    badgeText: '差一点点',
    guardian: '这面墙脾气很怪，前几天总装得很乖，后几天又突然乱来。',
    peer: '我感觉已经差不多了，是不是只差最后一点点？',
    mentor: '如果前几天看起来很像，后几天会不会突然拉开差距？',
  },
  success: {
    title: '刚好铺满',
    tone: '#edf7e7',
    border: '#5d9a69',
    badge: '#2f7d59',
    badgeText: '成功',
    guardian: '今天它终于安静地停在刚刚好的地方，像是被你摸清了节奏。',
    peer: '原来不一定要最大，刚刚好也很厉害。',
    mentor: '这次让它刚好铺满的关键，是起点，还是增长方式？',
  },
  overflow: {
    title: '冲过头了',
    tone: '#fff0f3',
    border: '#d86a86',
    badge: '#a7274b',
    badgeText: '长过头',
    guardian: '这面墙脾气很怪，前几天总装得很乖，后几天又突然乱来。',
    peer: '我明明只是多加了一点，怎么后面突然冲过头了？',
    mentor: '哪些变化在前几天看不明显，却会把后几天推得很远？',
  },
};

export function RoseFeedback({
  outcome,
  difference,
  finalCoveragePercent,
  rawCoveragePercent,
}: {
  outcome: AttemptOutcome;
  difference: number;
  finalCoveragePercent: number;
  rawCoveragePercent: number;
}) {
  const copy = feedbackCopy[outcome];
  const deltaLabel = outcome === 'overflow' ? `超出目标 ${Number((rawCoveragePercent - 100).toFixed(2))}%` : `距离目标 ${difference}%`;

  return (
    <section
      style={{
        background: copy.tone,
        borderRadius: 24,
        padding: 20,
        boxShadow: '0 16px 40px rgba(18, 28, 23, 0.12)',
        display: 'grid',
        gap: 14,
        border: `2px solid ${copy.border}`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 13, color: '#6a7168', marginBottom: 6 }}>结果判断</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <strong style={{ fontSize: 30, color: copy.badge }}>{copy.title}</strong>
            <span
              style={{
                background: copy.badge,
                color: '#fff',
                borderRadius: 999,
                padding: '6px 10px',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 0.4,
              }}
            >
              {copy.badgeText}
            </span>
          </div>
        </div>

        <div
          style={{
            minWidth: 130,
            background: 'rgba(255,255,255,0.72)',
            borderRadius: 18,
            padding: '10px 12px',
            textAlign: 'right',
          }}
        >
          <div style={{ fontSize: 12, color: '#6a7168' }}>最终覆盖</div>
          <div style={{ fontSize: 34, fontWeight: 800, color: copy.badge }}>{finalCoveragePercent}%</div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 10,
        }}
      >
        <MetricCard label="状态" value={copy.badgeText} accent={copy.badge} />
        <MetricCard label="目标差值" value={deltaLabel} accent={copy.badge} />
      </div>

      {outcome === 'overflow' ? (
        <div
          style={{
            background: 'rgba(255,255,255,0.72)',
            borderRadius: 16,
            padding: '10px 12px',
            color: '#6a2440',
            lineHeight: 1.6,
          }}
        >
          真实覆盖率已经达到 {rawCoveragePercent}% ，只是舞台显示会封顶到 100%，所以它看起来像“满了”，但其实已经长过头。
        </div>
      ) : null}

      <div style={{ display: 'grid', gap: 10 }}>
        <RoleBubble title="守护兽" tone="rgba(255,255,255,0.72)" text={copy.guardian} />
        <RoleBubble title="小同伴" tone="rgba(255,255,255,0.72)" text={copy.peer} />
        <RoleBubble title="园丁导师" tone="rgba(255,255,255,0.72)" text={copy.mentor} />
      </div>
    </section>
  );
}

function MetricCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.72)',
        borderRadius: 16,
        padding: '12px 14px',
      }}
    >
      <div style={{ fontSize: 12, color: '#6a7168', marginBottom: 6 }}>{label}</div>
      <div style={{ fontWeight: 800, color: accent, lineHeight: 1.5 }}>{value}</div>
    </div>
  );
}

function RoleBubble({ title, text, tone }: { title: string; text: string; tone: string }) {
  return (
    <div style={{ background: tone, borderRadius: 18, padding: '12px 14px' }}>
      <div style={{ fontWeight: 800, marginBottom: 4 }}>{title}</div>
      <div style={{ lineHeight: 1.6 }}>{text}</div>
    </div>
  );
}
