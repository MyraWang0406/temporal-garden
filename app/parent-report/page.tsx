'use client';

import Link from 'next/link';

import { useGrowthStore } from '@/lib/store/growthStore';

const labelMap = {
  mis_only_initial: '一直用 linear，只主要改起点',
  mis_bigger_is_better: '连续冲过头后仍继续把参数调大',
  mis_conflate_linear_exponential: '失败后仍只把 linearRate 调大',
} as const;

export default function ParentReportPage() {
  const { report, attempts } = useGrowthStore();
  const roseAttempts = attempts.filter((attempt) => attempt.stage === 'rose');
  const tulipAttempts = attempts.filter((attempt) => attempt.stage === 'tulip');

  return (
    <div className="page-stack">
      <section className="page-intro">
        <h1>家长报告中心</h1>
        <p>这里把孩子在训练中的尝试过程、可能的错因标签和迁移表现整理成一份可读摘要，帮助家长看见“哪里会做、哪里还不会迁移”。</p>
      </section>

      <section
        style={{
          background: 'rgba(251, 244, 232, 0.95)',
          borderRadius: 28,
          padding: 24,
          boxShadow: '0 24px 60px rgba(0,0,0,0.14)',
          display: 'grid',
          gap: 18,
        }}
      >
        <div>
          <div style={{ fontFamily: 'ZCOOL XiaoWei, serif', fontSize: 40, color: '#2b5e4f' }}>最小家长报告</div>
          <div style={{ lineHeight: 1.7, color: '#5a655e' }}>只看行为，不看孩子自评。这里展示的是当前作品原型阶段的最小判断结果。</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          <ReportCard label="growthIntuitionLevel" value={`${report.growthIntuitionLevel}`} />
          <ReportCard label="linearExpDiff" value={`${report.linearExpDiff}`} />
          <ReportCard label="strategyShiftAfterFailure" value={`${report.strategyShiftAfterFailure}`} />
          <ReportCard label="migrationSuccessTulip" value={`${report.migrationSuccessTulip}`} />
        </div>

        <section style={{ background: '#fff', borderRadius: 22, padding: 18 }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>当前误解标签</div>
          {report.mislabels.length > 0 ? (
            <div style={{ display: 'grid', gap: 8 }}>
              {report.mislabels.map((label) => (
                <div key={label} style={{ background: '#f7efe2', borderRadius: 14, padding: '10px 12px' }}>
                  {labelMap[label]}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ color: '#617065' }}>暂未触发误解标签。</div>
          )}
        </section>

        <section style={{ background: '#edf7e7', borderRadius: 22, padding: 18, lineHeight: 1.8 }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>自动总结</div>
          <div>{report.summary}</div>
        </section>

        <section style={{ background: '#fff', borderRadius: 22, padding: 18 }}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>尝试概况</div>
          <div style={{ display: 'grid', gap: 8, color: '#506055' }}>
            <div>蔷薇花墙尝试数：{roseAttempts.length}</div>
            <div>郁金香花海尝试数：{tulipAttempts.length}</div>
          </div>
        </section>
      </section>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <Link href="/rose-growth" style={{ color: '#f5ebdb', fontWeight: 800 }}>
          ← 回到主关
        </Link>
        <Link href="/evaluation" style={{ color: '#f5ebdb', fontWeight: 800 }}>
          查看评测与 Bad Case →
        </Link>
      </div>
    </div>
  );
}

function ReportCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ background: '#fff', borderRadius: 20, padding: 16 }}>
      <div style={{ fontSize: 13, color: '#677266', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color: '#2b5e4f' }}>{value}</div>
    </div>
  );
}
