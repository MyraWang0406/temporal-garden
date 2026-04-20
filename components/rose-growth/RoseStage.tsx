'use client';

import { DailyGrowthPoint } from '@/lib/types/growth';

export function RoseStage({
  title,
  subtitle,
  timeline,
  dayLabel,
}: {
  title: string;
  subtitle: string;
  timeline: DailyGrowthPoint[];
  dayLabel: string;
}) {
  const current = timeline[timeline.length - 1];
  const previous = timeline.length > 1 ? timeline[timeline.length - 2] : timeline[0];
  const growthDelta = Number((current.coveragePercent - previous.coveragePercent).toFixed(2));

  return (
    <section className="rose-stage-container">
      <div className="stage-overlay" />

      <div className="stage-header">
        <div className="stage-title">{title}</div>
        <div className="stage-subtitle">{subtitle}</div>
      </div>

      <div className="stage-content">
        {/* 可视化图表区 */}
        <div className="growth-visualizer">
          <div className="y-axis">
            {[100, 75, 50, 25, 0].map((tick) => (
              <div key={tick} className="tick">
                {tick}%
              </div>
            ))}
          </div>

          <div className="growth-bar-container">
            {[25, 50, 75].map((tick) => (
              <div
                key={tick}
                className="grid-line"
                style={{ bottom: `${tick}%` }}
              />
            ))}
            <div className="grid-pattern" />
            <div
              className="growth-fill"
              style={{ height: `${current.coveragePercent}%` }}
            />
            <div
              className="growth-indicator"
              style={{ bottom: `${current.coveragePercent}%` }}
            />
          </div>
        </div>

        {/* 数据面板区 */}
        <div className="data-panel">
          <div className="main-stats">
            <div className="stat-label">{dayLabel}</div>
            <div className="stat-value">{current.coveragePercent}%</div>
            <p className="stat-desc">花墙覆盖正在一点点显形，真正关键的是后几天会不会突然加速。</p>
          </div>

          <div className="mini-metrics-grid">
            <MiniMetric label="当前天数" value={`D${current.day}`} />
            <MiniMetric label="花苞数" value={`${Number(current.buds.toFixed(2))}`} />
            <MiniMetric label="比前一天" value={`${growthDelta >= 0 ? '+' : ''}${growthDelta}%`} />
          </div>

          <div className="timeline-list-container">
            <div className="timeline-header">每天怎么长</div>
            <div className="timeline-list">
              {timeline.map((point, index) => {
                const prev = index === 0 ? point : timeline[index - 1];
                const delta = Number((point.coveragePercent - prev.coveragePercent).toFixed(2));
                const isCurrent = index === timeline.length - 1;

                return (
                  <div
                    key={point.day}
                    className={`timeline-item ${isCurrent ? 'current' : ''}`}
                  >
                    <strong className="day-tag">D{point.day}</strong>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${point.coveragePercent}%` }}
                      />
                    </div>
                    <div className="progress-text">
                      {point.coveragePercent}% {index === 0 ? '' : `(${delta >= 0 ? '+' : ''}${delta})`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .rose-stage-container {
          position: relative;
          min-height: 420px;
          border-radius: 28px;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(246,219,178,0.95) 0%, rgba(212,168,116,0.96) 22%, rgba(133,88,52,0.96) 22%, rgba(115,72,39,0.98) 100%);
          box-shadow: 0 28px 60px rgba(0, 0, 0, 0.18);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .stage-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.18), transparent 30%), repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0, rgba(255,255,255,0.07) 8px, transparent 8px, transparent 56px);
          pointerEvents: none;
          z-index: 1;
        }

        .stage-header {
          position: relative;
          z-index: 2;
          color: #fff8ef;
        }

        .stage-title {
          font-family: 'ZCOOL XiaoWei', serif;
          font-size: clamp(24px, 5vw, 32px);
        }

        .stage-subtitle {
          max-width: 460px;
          line-height: 1.6;
          opacity: 0.92;
          font-size: clamp(14px, 2vw, 16px);
        }

        .stage-content {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 32px;
          align-items: end;
          flex: 1;
        }

        .growth-visualizer {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 12px;
          height: 274px;
          align-items: stretch;
        }

        .y-axis {
          display: grid;
          grid-template-rows: repeat(5, 1fr);
          color: rgba(255,248,239,0.82);
          font-size: 12px;
          font-weight: 700;
        }

        .tick {
          display: flex;
          align-items: center;
        }
        .tick:last-child { align-items: flex-end; }

        .growth-bar-container {
          position: relative;
          border-radius: 18px;
          background: linear-gradient(180deg, #d8c0a0, #c59b70);
          border: 10px solid #704522;
          box-shadow: inset 0 0 0 3px rgba(255,255,255,0.15);
          overflow: hidden;
        }

        .grid-line {
          position: absolute;
          left: 0;
          right: 0;
          border-top: 1px dashed rgba(255,255,255,0.22);
        }

        .grid-pattern {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 22px, transparent 22px, transparent 46px);
        }

        .growth-fill {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 20%, rgba(255,208,224,0.95) 0 8px, transparent 9px), radial-gradient(circle at 50% 30%, rgba(235,111,146,0.95) 0 11px, transparent 12px), radial-gradient(circle at 80% 18%, rgba(193,54,95,0.95) 0 9px, transparent 10px), linear-gradient(180deg, rgba(63,125,82,0.35), rgba(36,97,63,0.95));
          background-size: 90px 90px, 120px 110px, 100px 100px, 100% 100%;
          transition: height 900ms cubic-bezier(.2,.9,.2,1);
          animation: bloom-rise 1.1s ease;
        }

        .growth-indicator {
          position: absolute;
          left: 0;
          right: 0;
          border-top: 3px solid rgba(255,248,239,0.82);
          box-shadow: 0 0 0 2px rgba(167,39,75,0.18);
          z-index: 3;
        }

        .data-panel {
          padding: 18px;
          border-radius: 22px;
          background: rgba(255,247,231,0.9);
          color: #274033;
          box-shadow: 0 18px 36px rgba(0,0,0,0.18);
          display: grid;
          gap: 14px;
        }

        .stat-label { font-size: 14px; color: #6b6d63; }
        .stat-value { font-size: 42px; font-weight: 800; color: #2f7d59; }
        .stat-desc { margin: 0; line-height: 1.6; font-size: 14px; }

        .mini-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .timeline-list-container { display: grid; gap: 8px; }
        .timeline-header { font-size: 13px; font-weight: 800; color: #5f665d; }
        .timeline-list { display: grid; gap: 6px; }

        .timeline-item {
          display: grid;
          grid-template-columns: 40px 1fr auto;
          gap: 10px;
          align-items: center;
          background: rgba(255,255,255,0.68);
          border-radius: 12px;
          padding: 6px 10px;
        }

        .timeline-item.current {
          background: #fff4e4;
          box-shadow: inset 0 0 0 2px rgba(167,39,75,0.14);
        }

        .day-tag { font-size: 13px; color: #445046; }
        .timeline-item.current .day-tag { color: #a7274b; }

        .progress-track {
          height: 8px;
          border-radius: 999px;
          background: #eadfce;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 999px;
          background: #2f7d59;
        }
        .timeline-item.current .progress-fill { background: #a7274b; }

        .progress-text { min-width: 60px; text-align: right; color: #516055; font-weight: 700; font-size: 12px; }

        @keyframes bloom-rise {
          0% { filter: saturate(0.8); transform: translateY(10px); }
          100% { filter: saturate(1); transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .stage-content {
            grid-template-columns: 1fr;
            align-items: stretch;
          }
          .growth-visualizer {
            height: 200px;
          }
        }

        @media (max-width: 640px) {
          .rose-stage-container {
            padding: 16px;
          }
          .stat-value { font-size: 32px; }
          .mini-metrics-grid { grid-template-columns: 1fr; }
          .timeline-item { grid-template-columns: 36px 1fr 80px; }
        }
      `}</style>
    </section>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="mini-metric-card">
      <div className="mini-label">{label}</div>
      <div className="mini-value">{value}</div>
      <style jsx>{`
        .mini-metric-card {
          background: #fffdf8;
          border-radius: 12px;
          padding: 8px 10px;
        }
        .mini-label { font-size: 11px; color: #6b6d63; margin-bottom: 2px; }
        .mini-value { font-weight: 800; font-size: 14px; }
      `}</style>
    </div>
  );
}
