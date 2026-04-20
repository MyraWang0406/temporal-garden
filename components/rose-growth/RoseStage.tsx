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
    <section
      style={{
        position: 'relative',
        minHeight: 420,
        borderRadius: 28,
        overflow: 'hidden',
        background:
          'linear-gradient(180deg, rgba(246,219,178,0.95) 0%, rgba(212,168,116,0.96) 22%, rgba(133,88,52,0.96) 22%, rgba(115,72,39,0.98) 100%)',
        boxShadow: '0 28px 60px rgba(0, 0, 0, 0.18)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.18), transparent 30%), repeating-linear-gradient(90deg, rgba(255,255,255,0.07) 0, rgba(255,255,255,0.07) 8px, transparent 8px, transparent 56px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'absolute', left: 24, top: 24, color: '#fff8ef' }}>
        <div style={{ fontFamily: 'ZCOOL XiaoWei, serif', fontSize: 32 }}>{title}</div>
        <div style={{ maxWidth: 460, lineHeight: 1.6, opacity: 0.92 }}>{subtitle}</div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: '8%',
          bottom: 34,
          width: '48%',
          height: 274,
          display: 'grid',
          gridTemplateColumns: '48px 1fr',
          alignItems: 'stretch',
          gap: 12,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'repeat(5, 1fr)',
            color: 'rgba(255,248,239,0.82)',
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {[100, 75, 50, 25, 0].map((tick) => (
            <div key={tick} style={{ display: 'flex', alignItems: tick === 0 ? 'end' : 'center' }}>
              {tick}%
            </div>
          ))}
        </div>

        <div
          style={{
            position: 'relative',
            borderRadius: 18,
            background: 'linear-gradient(180deg, #d8c0a0, #c59b70)',
            border: '10px solid #704522',
            boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.15)',
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
                borderTop: '1px dashed rgba(255,255,255,0.22)',
              }}
            />
          ))}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'repeating-linear-gradient(0deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 22px, transparent 22px, transparent 46px)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: `${current.coveragePercent}%`,
              background:
                'radial-gradient(circle at 20% 20%, rgba(255,208,224,0.95) 0 8px, transparent 9px), radial-gradient(circle at 50% 30%, rgba(235,111,146,0.95) 0 11px, transparent 12px), radial-gradient(circle at 80% 18%, rgba(193,54,95,0.95) 0 9px, transparent 10px), linear-gradient(180deg, rgba(63,125,82,0.35), rgba(36,97,63,0.95))',
              backgroundSize: '90px 90px, 120px 110px, 100px 100px, 100% 100%',
              transition: 'height 900ms cubic-bezier(.2,.9,.2,1)',
              animation: 'bloom-rise 1.1s ease',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: `${current.coveragePercent}%`,
              borderTop: '3px solid rgba(255,248,239,0.82)',
              boxShadow: '0 0 0 2px rgba(167,39,75,0.18)',
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: '6%',
          bottom: 44,
          width: 320,
          padding: 18,
          borderRadius: 22,
          background: 'rgba(255,247,231,0.9)',
          color: '#274033',
          boxShadow: '0 18px 36px rgba(0,0,0,0.18)',
          display: 'grid',
          gap: 14,
        }}
      >
        <div>
          <div style={{ fontSize: 14, color: '#6b6d63' }}>{dayLabel}</div>
          <div style={{ fontSize: 42, fontWeight: 800, color: '#2f7d59' }}>{current.coveragePercent}%</div>
          <div style={{ lineHeight: 1.7 }}>花墙覆盖正在一点点显形，真正关键的是后几天会不会突然加速。</div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: 10,
          }}
        >
          <MiniMetric label="当前天数" value={`D${current.day}`} />
          <MiniMetric label="花苞数" value={`${Number(current.buds.toFixed(2))}`} />
          <MiniMetric label="比前一天" value={`${growthDelta >= 0 ? '+' : ''}${growthDelta}%`} />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#5f665d' }}>每天怎么长</div>
          <div style={{ display: 'grid', gap: 6 }}>
            {timeline.map((point, index) => {
              const prev = index === 0 ? point : timeline[index - 1];
              const delta = Number((point.coveragePercent - prev.coveragePercent).toFixed(2));
              const isCurrent = index === timeline.length - 1;

              return (
                <div
                  key={point.day}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '52px 1fr auto',
                    gap: 10,
                    alignItems: 'center',
                    background: isCurrent ? '#fff4e4' : 'rgba(255,255,255,0.68)',
                    borderRadius: 14,
                    padding: '8px 10px',
                    boxShadow: isCurrent ? 'inset 0 0 0 2px rgba(167,39,75,0.14)' : 'none',
                  }}
                >
                  <strong style={{ color: isCurrent ? '#a7274b' : '#445046' }}>D{point.day}</strong>
                  <div
                    style={{
                      height: 10,
                      borderRadius: 999,
                      background: '#eadfce',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${point.coveragePercent}%`,
                        height: '100%',
                        borderRadius: 999,
                        background: isCurrent ? '#a7274b' : '#2f7d59',
                      }}
                    />
                  </div>
                  <div style={{ minWidth: 74, textAlign: 'right', color: '#516055', fontWeight: 700 }}>
                    {point.coveragePercent}% {index === 0 ? '' : `(${delta >= 0 ? '+' : ''}${delta})`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bloom-rise {
          0% {
            filter: saturate(0.8);
            transform: translateY(10px);
          }
          100% {
            filter: saturate(1);
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: '#fffdf8',
        borderRadius: 14,
        padding: '10px 12px',
      }}
    >
      <div style={{ fontSize: 12, color: '#6b6d63', marginBottom: 4 }}>{label}</div>
      <div style={{ fontWeight: 800 }}>{value}</div>
    </div>
  );
}
