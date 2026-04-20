'use client';

import { AttemptRecord } from '@/lib/types/growth';

const lineColors = ['#d85b7a', '#2f7d59', '#efb449'];
const areaColors = ['rgba(216,91,122,0.12)', 'rgba(47,125,89,0.12)', 'rgba(239,180,73,0.12)'];

/**
 * 只展示最近三次尝试，帮助孩子把“参数变化”和“曲线形状变化”对上。
 */
export function AttemptComparisonChart({ attempts }: { attempts: AttemptRecord[] }) {
  const width = 560;
  const height = 300;
  const padding = 42;
  const latestThree = attempts.slice(-3);

  return (
    <section
      style={{
        background: 'rgba(255,250,241,0.96)',
        borderRadius: 24,
        padding: 20,
        boxShadow: '0 18px 36px rgba(0,0,0,0.12)',
        display: 'grid',
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'end' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>最近 3 次覆盖曲线</div>
          <div style={{ color: '#5e675d', lineHeight: 1.7 }}>重点看两件事：起点差多少，后几天有没有突然变陡。</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {latestThree.map((attempt, index) => (
            <div
              key={attempt.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: '#fff',
                borderRadius: 999,
                padding: '8px 12px',
                boxShadow: 'inset 0 0 0 1px rgba(34,49,39,0.08)',
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  background: lineColors[index],
                  flexShrink: 0,
                }}
              />
              <span style={{ fontWeight: 800 }}>第 {attempt.sequence} 次</span>
            </div>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
        {[0, 25, 50, 75, 100].map((tick) => {
          const y = height - padding - (tick / 100) * (height - padding * 2);
          return (
            <g key={tick}>
              <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="rgba(34,49,39,0.12)" strokeDasharray={tick === 100 ? '0' : '4 6'} />
              <text x={10} y={y + 4} fontSize="12" fill="#5d695d">
                {tick}%
              </text>
            </g>
          );
        })}

        <rect
          x={padding}
          y={padding}
          width={width - padding * 2}
          height={height - padding * 2}
          rx={18}
          fill="rgba(255,255,255,0.45)"
        />

        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#233127" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#233127" />

        {Array.from({ length: 8 }, (_, day) => {
          const x = padding + (day / 7) * (width - padding * 2);
          return (
            <g key={day}>
              <line x1={x} y1={padding} x2={x} y2={height - padding} stroke="rgba(34,49,39,0.08)" />
              <line x1={x} y1={height - padding} x2={x} y2={height - padding + 6} stroke="#233127" />
              <text x={x - 8} y={height - 12} fontSize="12" fill="#5d695d">
                D{day}
              </text>
            </g>
          );
        })}

        {latestThree.map((attempt, index) => {
          const coordinates = attempt.result.timeline.map((point) => {
            const x = padding + (point.day / 7) * (width - padding * 2);
            const y = height - padding - (point.coveragePercent / 100) * (height - padding * 2);
            return { x, y, day: point.day, coveragePercent: point.coveragePercent };
          });

          const linePoints = coordinates.map((point) => `${point.x},${point.y}`).join(' ');
          const areaPoints = `${padding},${height - padding} ${linePoints} ${width - padding},${height - padding}`;
          const lastPoint = coordinates[coordinates.length - 1];

          return (
            <g key={attempt.id}>
              <polygon points={areaPoints} fill={areaColors[index]} />
              <polyline
                fill="none"
                stroke={lineColors[index]}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={linePoints}
              />
              {coordinates.map((point) => (
                <g key={`${attempt.id}-${point.day}`}>
                  <circle cx={point.x} cy={point.y} r="6" fill="#fff9f0" stroke={lineColors[index]} strokeWidth="3" />
                </g>
              ))}
              <g>
                <rect
                  x={lastPoint.x - 22}
                  y={lastPoint.y - 34}
                  width="44"
                  height="22"
                  rx="11"
                  fill={lineColors[index]}
                />
                <text x={lastPoint.x} y={lastPoint.y - 19} textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">
                  {attempt.result.finalCoveragePercent}%
                </text>
              </g>
            </g>
          );
        })}
      </svg>

      <div style={{ display: 'grid', gap: 10 }}>
        {latestThree.map((attempt, index) => {
          const finalDay = attempt.result.timeline[attempt.result.timeline.length - 1];
          const earlyDay = attempt.result.timeline[Math.min(2, attempt.result.timeline.length - 1)];

          return (
            <div
              key={attempt.id}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto auto',
                gap: 12,
                alignItems: 'center',
                background: '#fff',
                borderRadius: 18,
                padding: '12px 14px',
                boxShadow: 'inset 0 0 0 1px rgba(34,49,39,0.08)',
              }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 999,
                  background: lineColors[index],
                  flexShrink: 0,
                }}
              />
              <div style={{ lineHeight: 1.6 }}>
                <strong>第 {attempt.sequence} 次</strong>：
                {attempt.config.growthMode === 'linear' ? '固定增加' : '按倍数增长'} / 起点 {attempt.config.initialBuds}
                {attempt.config.growthMode === 'linear'
                  ? ` / 每天 +${attempt.config.linearRate}`
                  : ` / ×${attempt.config.multiplier.toFixed(1)}`}
                {attempt.config.prune ? ' / 第 4 天修剪' : ''}
              </div>
              <div style={{ textAlign: 'right', color: '#5c655b' }}>
                <div style={{ fontSize: 12 }}>前段</div>
                <div style={{ fontWeight: 800 }}>D2 {earlyDay.coveragePercent}%</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: '#5c655b' }}>终点</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: lineColors[index] }}>{finalDay.coveragePercent}%</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
