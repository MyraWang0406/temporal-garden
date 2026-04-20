'use client';

import type { CSSProperties } from 'react';

import { GrowthConfig } from '@/lib/types/growth';

const sliderStyle: CSSProperties = {
  width: '100%',
  accentColor: '#a7274b',
};

export function GrowthControls({
  value,
  title,
  helper,
  onChange,
}: {
  value: GrowthConfig;
  title: string;
  helper: string;
  onChange: (patch: Partial<GrowthConfig>) => void;
}) {
  return (
    <section
      style={{
        background: 'rgba(255,248,239,0.95)',
        borderRadius: 24,
        padding: 20,
        boxShadow: '0 18px 36px rgba(0,0,0,0.12)',
        display: 'grid',
        gap: 18,
      }}
    >
      <div>
        <div style={{ fontSize: 22, fontWeight: 800 }}>{title}</div>
        <div style={{ color: '#5c655b', lineHeight: 1.7 }}>{helper}</div>
      </div>

      <label style={{ display: 'grid', gap: 8 }}>
        <span>初始花苞数：{value.initialBuds}</span>
        <input
          style={sliderStyle}
          type="range"
          min={1}
          max={8}
          step={1}
          value={value.initialBuds}
          onChange={(event) => onChange({ initialBuds: Number(event.target.value) })}
        />
      </label>

      <div style={{ display: 'grid', gap: 10 }}>
        <span>生长模式</span>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <ModeButton
            active={value.growthMode === 'linear'}
            label="每天固定增加"
            onClick={() => onChange({ growthMode: 'linear' })}
          />
          <ModeButton
            active={value.growthMode === 'exponential'}
            label="每天按倍数增长"
            onClick={() => onChange({ growthMode: 'exponential' })}
          />
        </div>
      </div>

      {value.growthMode === 'linear' ? (
        <label style={{ display: 'grid', gap: 8 }}>
          <span>linearRate：每天 +{value.linearRate}</span>
          <input
            style={sliderStyle}
            type="range"
            min={1}
            max={5}
            step={1}
            value={value.linearRate}
            onChange={(event) => onChange({ linearRate: Number(event.target.value) })}
          />
        </label>
      ) : (
        <label style={{ display: 'grid', gap: 8 }}>
          <span>multiplier：每天 ×{value.multiplier.toFixed(1)}</span>
          <input
            style={sliderStyle}
            type="range"
            min={1.2}
            max={2.5}
            step={0.1}
            value={value.multiplier}
            onChange={(event) => onChange({ multiplier: Number(event.target.value) })}
          />
        </label>
      )}

      <label
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          background: '#fff',
          borderRadius: 16,
          padding: '12px 14px',
        }}
      >
        <input type="checkbox" checked={value.prune} onChange={(event) => onChange({ prune: event.target.checked })} />
        <span>第 4 天修剪一半</span>
      </label>
    </section>
  );
}

function ModeButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        border: 'none',
        borderRadius: 999,
        padding: '10px 16px',
        background: active ? '#a7274b' : '#e7dfd0',
        color: active ? '#fff' : '#304036',
        fontWeight: 800,
      }}
    >
      {label}
    </button>
  );
}
