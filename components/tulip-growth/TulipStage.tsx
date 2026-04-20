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
    <div style={{ display: 'grid', gap: 18 }}>
      <section
        style={{
          background: 'rgba(251, 241, 224, 0.94)',
          borderRadius: 28,
          padding: 24,
          display: 'grid',
          gap: 18,
          boxShadow: '0 24px 60px rgba(0,0,0,0.14)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap', alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: 'ZCOOL XiaoWei, serif', fontSize: 40, color: '#d76a28' }}>郁金香花海</div>
            <div style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 760 }}>
              迁移小关：让郁金香在第 8 天早晨刚好开满花海。场景变了，但增长方式的节奏还在。
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))', gap: 10, minWidth: 320 }}>
            <StatBox label="当前天数" value={`D${current.day}`} />
            <StatBox label="最终覆盖" value={`${current.coveragePercent}%`} />
            <StatBox label="比前一天" value={`${delta >= 0 ? '+' : ''}${delta}%`} />
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: 18,
            alignItems: 'stretch',
          }}
        >
          <div
            style={{
              minHeight: 340,
              borderRadius: 24,
              background:
                'linear-gradient(180deg, #b7dcff 0%, #eef7ff 38%, #94c96a 38%, #6ea74f 100%)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {[25, 50, 75].map((tick) => (
              <div
                key={tick}
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: `${tick}%`,
                  borderTop: '1px dashed rgba(255,255,255,0.36)',
                }}
              />
            ))}
            <div
              style={{
                position: 'absolute',
                left: 18,
                top: 18,
                display: 'grid',
                gap: 6,
                color: '#fffaf0',
                fontWeight: 800,
                textShadow: '0 2px 8px rgba(0,0,0,0.18)',
              }}
            >
              <span>100%</span>
              <span style={{ marginTop: 38 }}>75%</span>
              <span style={{ marginTop: 38 }}>50%</span>
              <span style={{ marginTop: 38 }}>25%</span>
            </div>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: `${latestResult.finalCoveragePercent}%`,
                background:
                  'radial-gradient(circle at 10% 20%, rgba(255,134,125,0.95) 0 12px, transparent 12px), radial-gradient(circle at 35% 34%, rgba(255,200,95,0.96) 0 12px, transparent 12px), radial-gradient(circle at 65% 28%, rgba(245,86,128,0.94) 0 13px, transparent 13px), radial-gradient(circle at 85% 24%, rgba(255,155,57,0.92) 0 12px, transparent 12px), linear-gradient(180deg, rgba(255,255,255,0.15), rgba(37,123,61,0.92))',
                backgroundSize: '120px 120px, 140px 140px, 120px 120px, 130px 130px, 100% 100%',
                transition: 'height 850ms ease',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: `${latestResult.finalCoveragePercent}%`,
                borderTop: '3px solid rgba(255,250,241,0.92)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 18,
                top: 18,
                background: 'rgba(255,250,241,0.9)',
                borderRadius: 18,
                padding: '12px 14px',
              }}
            >
              <div style={{ fontSize: 12, color: '#6c7269' }}>第 8 天清晨</div>
              <div style={{ fontSize: 34, fontWeight: 800, color: '#d76a28' }}>{latestResult.finalCoveragePercent}%</div>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.72)',
              borderRadius: 22,
              padding: 16,
              display: 'grid',
              gap: 10,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: '#516055' }}>每天怎么长</div>
            {timeline.map((point, index) => {
              const previousPoint = index === 0 ? point : timeline[index - 1];
              const pointDelta = Number((point.coveragePercent - previousPoint.coveragePercent).toFixed(2));
              const isCurrent = index === timeline.length - 1;

              return (
                <div
                  key={point.day}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '52px 1fr auto',
                    gap: 10,
                    alignItems: 'center',
                    background: isCurrent ? '#fff4de' : '#fff',
                    borderRadius: 14,
                    padding: '8px 10px',
                    boxShadow: isCurrent ? 'inset 0 0 0 2px rgba(215,106,40,0.18)' : 'inset 0 0 0 1px rgba(34,49,39,0.06)',
                  }}
                >
                  <strong style={{ color: isCurrent ? '#d76a28' : '#435244' }}>D{point.day}</strong>
                  <div style={{ height: 10, borderRadius: 999, background: '#eadfce', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${point.coveragePercent}%`,
                        height: '100%',
                        borderRadius: 999,
                        background: isCurrent ? '#d76a28' : '#5aaf66',
                      }}
                    />
                  </div>
                  <div style={{ minWidth: 84, textAlign: 'right', color: '#516055', fontWeight: 700 }}>
                    {point.coveragePercent}% {index === 0 ? '' : `(${pointDelta >= 0 ? '+' : ''}${pointDelta})`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 18 }}>
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

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 12,
          flexWrap: 'wrap',
          alignItems: 'center',
          background: 'rgba(255,250,242,0.92)',
          borderRadius: 24,
          padding: 18,
        }}
      >
        <div style={{ color: '#49594f' }}>已尝试 {tulipAttempts.length} 次，重点是看看你能不能在新场景里再次做到“刚好”。</div>
        <button
          type="button"
          onClick={() => runTulipAttempt()}
          style={{
            border: 'none',
            borderRadius: 999,
            padding: '12px 18px',
            fontWeight: 800,
            background: '#d76a28',
            color: '#fff',
          }}
        >
          让郁金香开始生长
        </button>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: 'rgba(255,250,241,0.92)',
        borderRadius: 16,
        padding: '10px 12px',
      }}
    >
      <div style={{ fontSize: 12, color: '#6c7269', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 800, color: '#d76a28' }}>{value}</div>
    </div>
  );
}
