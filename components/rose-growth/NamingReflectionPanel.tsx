'use client';

import { NamingReflection } from '@/lib/types/growth';

const options: { value: NamingReflection; label: string }[] = [
  { value: 'fixed_addition', label: '有些增长是一点点加上去' },
  { value: 'accelerating_growth', label: '有些增长会越长越快' },
  { value: 'try_again', label: '我还想再试一次' },
];

export function NamingReflectionPanel({
  open,
  selected,
  onSelect,
  onClose,
}: {
  open: boolean;
  selected: NamingReflection | null;
  onSelect: (value: NamingReflection) => void;
  onClose: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(7, 15, 12, 0.55)',
        display: 'grid',
        placeItems: 'center',
        padding: 20,
        zIndex: 20,
      }}
    >
      <div
        style={{
          width: 'min(520px, 100%)',
          background: '#fff9f0',
          borderRadius: 28,
          padding: 24,
          boxShadow: '0 30px 70px rgba(0,0,0,0.28)',
          display: 'grid',
          gap: 16,
        }}
      >
        <div>
          <div style={{ fontSize: 26, fontWeight: 800 }}>你现在更像哪种理解？</div>
          <div style={{ lineHeight: 1.7, color: '#5a645c' }}>这只是记录你当下的感觉，不会影响 mastery 判定。</div>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {options.map((option) => {
            const active = selected === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onSelect(option.value)}
                style={{
                  border: active ? '2px solid #a7274b' : '2px solid transparent',
                  borderRadius: 18,
                  padding: '14px 16px',
                  textAlign: 'left',
                  background: active ? '#fde4eb' : '#fff',
                  color: '#223127',
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{
            justifySelf: 'end',
            border: 'none',
            background: '#2f7d59',
            color: '#fff',
            borderRadius: 999,
            padding: '10px 18px',
            fontWeight: 800,
          }}
        >
          好，记下来了
        </button>
      </div>
    </div>
  );
}
