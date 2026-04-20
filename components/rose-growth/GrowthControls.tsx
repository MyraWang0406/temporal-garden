'use client';

import { GrowthConfig } from '@/lib/types/growth';

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
    <section className="controls-container">
      <div className="controls-header">
        <div className="controls-title">{title}</div>
        <div className="controls-helper">{helper}</div>
      </div>

      <div className="control-group">
        <label className="slider-label">
          <span>初始花苞数：{value.initialBuds}</span>
          <input
            className="custom-slider"
            type="range"
            min={1}
            max={8}
            step={1}
            value={value.initialBuds}
            onChange={(event) => onChange({ initialBuds: Number(event.target.value) })}
          />
        </label>
      </div>

      <div className="control-group">
        <span className="group-title">生长模式</span>
        <div className="mode-buttons">
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

      <div className="control-group">
        {value.growthMode === 'linear' ? (
          <label className="slider-label">
            <span>linearRate：每天 +{value.linearRate}</span>
            <input
              className="custom-slider"
              type="range"
              min={1}
              max={5}
              step={1}
              value={value.linearRate}
              onChange={(event) => onChange({ linearRate: Number(event.target.value) })}
            />
          </label>
        ) : (
          <label className="slider-label">
            <span>multiplier：每天 ×{value.multiplier.toFixed(1)}</span>
            <input
              className="custom-slider"
              type="range"
              min={1.2}
              max={2.5}
              step={0.1}
              value={value.multiplier}
              onChange={(event) => onChange({ multiplier: Number(event.target.value) })}
            />
          </label>
        )}
      </div>

      <label className="checkbox-control">
        <input 
          type="checkbox" 
          checked={value.prune} 
          onChange={(event) => onChange({ prune: event.target.checked })} 
        />
        <span className="checkbox-text">第 4 天修剪一半</span>
      </label>

      <style jsx>{`
        .controls-container {
          background: rgba(255,248,239,0.95);
          border-radius: 24px;
          padding: 20px;
          box-shadow: 0 18px 36px rgba(0,0,0,0.12);
          display: grid;
          gap: 20px;
        }

        .controls-title { font-size: 22px; font-weight: 800; }
        .controls-helper { color: #5c655b; line-height: 1.6; font-size: 14px; margin-top: 4px; }

        .control-group { display: grid; gap: 10px; }
        .group-title { font-size: 14px; font-weight: 700; color: #445046; }

        .slider-label { display: grid; gap: 10px; font-size: 15px; font-weight: 600; }
        
        .custom-slider {
          width: 100%;
          accent-color: #a7274b;
          height: 32px; /* 增大点击区域 */
          cursor: pointer;
        }

        .mode-buttons { display: flex; gap: 10px; flex-wrap: wrap; }

        .checkbox-control {
          display: flex;
          gap: 12px;
          align-items: center;
          background: #fff;
          border-radius: 16px;
          padding: 14px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .checkbox-control:active { background: #f0f0f0; }
        
        .checkbox-text { font-size: 15px; font-weight: 600; }

        @media (max-width: 640px) {
          .controls-container { padding: 16px; }
          .mode-buttons { flex-direction: column; }
        }
      `}</style>
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
      className={`mode-btn ${active ? 'active' : ''}`}
    >
      {label}
      <style jsx>{`
        .mode-btn {
          flex: 1;
          border: none;
          border-radius: 999px;
          padding: 12px 16px;
          background: #e7dfd0;
          color: #304036;
          font-weight: 800;
          font-size: 14px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .mode-btn.active {
          background: #a7274b;
          color: #fff;
        }
        .mode-btn:active { transform: scale(0.96); }
      `}</style>
    </button>
  );
}
