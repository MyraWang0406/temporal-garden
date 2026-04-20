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
    <section className="feedback-container">
      <div className="feedback-header">
        <div className="result-info">
          <div className="label">结果判断</div>
          <div className="title-row">
            <strong className="result-title">{copy.title}</strong>
            <span className="result-badge">{copy.badgeText}</span>
          </div>
        </div>

        <div className="final-coverage-card">
          <div className="label">最终覆盖</div>
          <div className="coverage-value">{finalCoveragePercent}%</div>
        </div>
      </div>

      <div className="metrics-row">
        <MetricCard label="状态" value={copy.badgeText} accent={copy.badge} />
        <MetricCard label="目标差值" value={deltaLabel} accent={copy.badge} />
      </div>

      {outcome === 'overflow' && (
        <div className="overflow-note">
          真实覆盖率已经达到 {rawCoveragePercent}% ，只是舞台显示会封顶到 100%，所以它看起来像“满了”，但其实已经长过头。
        </div>
      )}

      <div className="role-bubbles">
        <RoleBubble title="守护兽" text={copy.guardian} />
        <RoleBubble title="小同伴" text={copy.peer} />
        <RoleBubble title="园丁导师" text={copy.mentor} />
      </div>

      <style jsx>{`
        .feedback-container {
          background: ${copy.tone};
          border-radius: 24px;
          padding: 20px;
          box-shadow: 0 16px 40px rgba(18, 28, 23, 0.12);
          display: grid;
          gap: 16px;
          border: 2px solid ${copy.border};
        }

        .feedback-header {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          align-items: start;
        }

        .label { fontSize: 12px; color: #6a7168; margin-bottom: 4px; }
        .title-row { display: flex; gap: 10px; alignItems: center; flex-wrap: wrap; }
        .result-title { font-size: clamp(24px, 4vw, 30px); color: ${copy.badge}; }
        
        .result-badge {
          background: ${copy.badge};
          color: #fff;
          border-radius: 999px;
          padding: 4px 12px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.4px;
        }

        .final-coverage-card {
          min-width: 120px;
          background: rgba(255,255,255,0.72);
          border-radius: 18px;
          padding: 10px 14px;
          text-align: right;
        }

        .coverage-value { font-size: 32px; font-weight: 800; color: ${copy.badge}; }

        .metrics-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        .overflow-note {
          background: rgba(255,255,255,0.72);
          border-radius: 16px;
          padding: 12px;
          color: #6a2440;
          line-height: 1.6;
          font-size: 14px;
        }

        .role-bubbles { display: grid; gap: 10px; }

        @media (max-width: 640px) {
          .feedback-container { padding: 16px; }
          .final-coverage-card { width: 100%; text-align: left; }
          .metrics-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

function MetricCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <style jsx>{`
        .metric-card {
          background: rgba(255,255,255,0.72);
          border-radius: 16px;
          padding: 12px 14px;
        }
        .metric-label { font-size: 11px; color: #6a7168; margin-bottom: 4px; }
        .metric-value { font-weight: 800; color: ${accent}; line-height: 1.4; font-size: 14px; }
      `}</style>
    </div>
  );
}

function RoleBubble({ title, text }: { title: string; text: string }) {
  return (
    <div className="role-bubble">
      <div className="role-title">{title}</div>
      <div className="role-text">{text}</div>
      <style jsx>{`
        .role-bubble {
          background: rgba(255,255,255,0.72);
          border-radius: 18px;
          padding: 12px 14px;
        }
        .role-title { font-weight: 800; font-size: 14px; margin-bottom: 4px; color: #223127; }
        .role-text { line-height: 1.6; font-size: 14px; color: #445046; }
      `}</style>
    </div>
  );
}
