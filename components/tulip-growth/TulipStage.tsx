'use client';

import { GrowthControls } from '@/components/rose-growth/GrowthControls';
import { RoseFeedback } from '@/components/rose-growth/RoseFeedback';
import { simulateGrowth, tulipGrowthOptions } from '@/lib/simulations/roseGrowthEngine';
import { useGrowthStore } from '@/lib/store/growthStore';

export function TulipStage() {
  const { tulipDraft, updateTulipDraft, runTulipAttempt, attempts } = useGrowthStore();
  const tulipAttempts = attempts.filter((attempt) => attempt.stage === 'tulip');
  const latestResult = tulipAttempts[tulipAttempts.length - 1]?.result ?? simulateGrowth(tulipDraft, tulipGrowthOptions);
  const timeline = latestResult.timeline;
  const current = timeline[timeline.length - 1];
  const previous = timeline.length > 1 ? timeline[timeline.length - 2] : timeline[0];
  const delta = Number((current.coveragePercent - previous.coveragePercent).toFixed(2));

  return (
    <div className="tulip-stage-wrapper">
      <section className="tulip-main-card">
        <div className="tulip-header">
          <div className="tulip-title-group">
            <div className="tulip-title">郁金香花海</div>
            <p className="tulip-subtitle">
              迁移小关：让郁金香在第 8 天早晨刚好开满花海。场景变了，但增长方式的节奏还在。
            </p>
          </div>
          <div className="tulip-stats-grid">
            <StatBox label="当前天数" value={`D${current.day}`} />
            <StatBox label="最终覆盖" value={`${current.coveragePercent}%`} />
            <StatBox label="比前一天" value={`${delta >= 0 ? '+' : ''}${delta}%`} />
          </div>
        </div>

        <div className="tulip-content-layout">
          <div className="tulip-visualizer">
            {[25, 50, 75].map((tick) => (
              <div
                key={tick}
                className="grid-line"
                style={{ bottom: `${tick}%` }}
              />
            ))}
            <div className="y-axis-labels">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
            </div>
            <div
              className="tulip-growth-fill"
              style={{ height: `${latestResult.finalCoveragePercent}%` }}
            />
            <div
              className="tulip-growth-indicator"
              style={{ bottom: `${latestResult.finalCoveragePercent}%` }}
            />
            <div className="floating-badge">
              <div className="badge-label">第 8 天清晨</div>
              <div className="badge-value">{latestResult.finalCoveragePercent}%</div>
            </div>
          </div>

          <div className="tulip-timeline-panel">
            <div className="timeline-title">每天怎么长</div>
            <div className="timeline-scroll">
              {timeline.map((point, index) => {
                const previousPoint = index === 0 ? point : timeline[index - 1];
                const pointDelta = Number((point.coveragePercent - previousPoint.coveragePercent).toFixed(2));
                const isCurrent = index === timeline.length - 1;

                return (
                  <div
                    key={point.day}
                    className={`timeline-row ${isCurrent ? 'active' : ''}`}
                  >
                    <strong className="day-label">D{point.day}</strong>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${point.coveragePercent}%` }}
                      />
                    </div>
                    <div className="progress-val">
                      {point.coveragePercent}% {index === 0 ? '' : `(${pointDelta >= 0 ? '+' : ''}${pointDelta})`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="tulip-controls-layout">
        <GrowthControls
          value={tulipDraft}
          title="花海调节器"
          helper="试试看：换了场景后，你还会观察后几天的变化吗？"
          onChange={updateTulipDraft}
        />
        <RoseFeedback
          outcome={latestResult.outcome}
          difference={latestResult.differenceFromTarget}
          finalCoveragePercent={latestResult.finalCoveragePercent}
          rawCoveragePercent={latestResult.finalRawCoveragePercent}
        />
      </div>

      <div className="tulip-action-bar">
        <div className="action-info">已尝试 {tulipAttempts.length} 次，重点是看看你能不能在新场景里再次做到“刚好”。</div>
        <button
          type="button"
          className="run-button"
          onClick={() => runTulipAttempt()}
        >
          让郁金香开始生长
        </button>
      </div>

      <style jsx>{`
        .tulip-stage-wrapper { display: grid; gap: 18px; }
        
        .tulip-main-card {
          background: rgba(251, 241, 224, 0.94);
          border-radius: 28px;
          padding: 24px;
          display: grid;
          gap: 24px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.14);
        }

        .tulip-header {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          align-items: start;
        }

        .tulip-title { font-family: 'ZCOOL XiaoWei', serif; font-size: clamp(32px, 5vw, 40px); color: #d76a28; }
        .tulip-subtitle { font-size: clamp(14px, 2vw, 18px); lineHeight: 1.6; max-width: 760px; margin: 8px 0 0; }

        .tulip-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          min-width: 300px;
        }

        .tulip-content-layout {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 24px;
          align-items: stretch;
        }

        .tulip-visualizer {
          min-height: 300px;
          border-radius: 24px;
          background: linear-gradient(180deg, #b7dcff 0%, #eef7ff 38%, #94c96a 38%, #6ea74f 100%);
          position: relative;
          overflow: hidden;
        }

        .grid-line {
          position: absolute;
          left: 0;
          right: 0;
          border-top: 1px dashed rgba(255,255,255,0.36);
        }

        .y-axis-labels {
          position: absolute;
          left: 18px;
          top: 18px;
          display: flex;
          flex-direction: column;
          gap: 38px;
          color: #fffaf0;
          font-weight: 800;
          text-shadow: 0 2px 8px rgba(0,0,0,0.18);
          font-size: 12px;
        }

        .tulip-growth-fill {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 10% 20%, rgba(255,134,125,0.95) 0 12px, transparent 12px), radial-gradient(circle at 35% 34%, rgba(255,200,95,0.96) 0 12px, transparent 12px), radial-gradient(circle at 65% 28%, rgba(245,86,128,0.94) 0 13px, transparent 13px), radial-gradient(circle at 85% 24%, rgba(255,155,57,0.92) 0 12px, transparent 12px), linear-gradient(180deg, rgba(255,255,255,0.15), rgba(37,123,61,0.92));
          background-size: 120px 120px, 140px 140px, 120px 120px, 130px 130px, 100% 100%;
          transition: height 850ms ease;
        }

        .tulip-growth-indicator {
          position: absolute;
          left: 0;
          right: 0;
          border-top: 3px solid rgba(255,250,241,0.92);
        }

        .floating-badge {
          position: absolute;
          right: 18px;
          top: 18px;
          background: rgba(255,250,241,0.9);
          border-radius: 18px;
          padding: 10px 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .badge-label { font-size: 11px; color: #6c7269; }
        .badge-value { font-size: 28px; font-weight: 800; color: #d76a28; }

        .tulip-timeline-panel {
          background: rgba(255,255,255,0.72);
          border-radius: 22px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .timeline-title { font-size: 18px; font-weight: 800; color: #516055; }
        .timeline-scroll { display: grid; gap: 8px; }

        .timeline-row {
          display: grid;
          grid-template-columns: 40px 1fr auto;
          gap: 10px;
          align-items: center;
          background: #fff;
          border-radius: 12px;
          padding: 6px 10px;
          box-shadow: inset 0 0 0 1px rgba(34,49,39,0.06);
        }

        .timeline-row.active {
          background: #fff4de;
          box-shadow: inset 0 0 0 2px rgba(215,106,40,0.18);
        }

        .day-label { font-size: 13px; color: #435244; }
        .timeline-row.active .day-label { color: #d76a28; }

        .progress-bar { height: 8px; border-radius: 999px; background: #eadfce; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 999px; background: #5aaf66; }
        .timeline-row.active .progress-fill { background: #d76a28; }
        .progress-val { min-width: 70px; text-align: right; color: #516055; font-weight: 700; font-size: 12px; }

        .tulip-controls-layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 18px;
        }

        .tulip-action-bar {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          align-items: center;
          background: rgba(255,250,242,0.92);
          border-radius: 24px;
          padding: 18px 24px;
        }

        .action-info { color: #49594f; font-size: 15px; }
        .run-button {
          border: none;
          border-radius: 999px;
          padding: 12px 28px;
          fontWeight: 800;
          background: #d76a28;
          color: #fff;
          transition: transform 0.2s ease;
        }
        .run-button:active { transform: scale(0.96); }

        @media (max-width: 1024px) {
          .tulip-content-layout, .tulip-controls-layout {
            grid-template-columns: 1fr;
          }
          .tulip-visualizer { height: 240px; }
        }

        @media (max-width: 640px) {
          .tulip-main-card { padding: 16px; }
          .tulip-stats-grid { grid-template-columns: 1fr; min-width: 100%; }
          .tulip-action-bar { flex-direction: column; text-align: center; padding: 20px; }
          .run-button { width: 100%; }
          .timeline-row { grid-template-columns: 36px 1fr 70px; }
        }
      `}</style>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-box">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <style jsx>{`
        .stat-box {
          background: rgba(255,250,241,0.92);
          border-radius: 16px;
          padding: 10px 12px;
        }
        .stat-label { font-size: 11px; color: #6c7269; margin-bottom: 2px; }
        .stat-value { font-size: 22px; font-weight: 800; color: #d76a28; }
      `}</style>
    </div>
  );
}
