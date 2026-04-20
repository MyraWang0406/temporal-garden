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

      <section className="report-main-card">
        <div className="report-header">
          <div className="report-title">最小家长报告</div>
          <p className="report-subtitle">只看行为，不看孩子自评。这里展示的是当前作品原型阶段的最小判断结果。</p>
        </div>

        <div className="report-metrics-grid">
          <ReportCard label="增长直觉等级" value={`${report.growthIntuitionLevel}`} />
          <ReportCard label="线性/指数区分度" value={`${report.linearExpDiff}`} />
          <ReportCard label="失败后策略调整" value={`${report.strategyShiftAfterFailure}`} />
          <ReportCard label="郁金香迁移表现" value={`${report.migrationSuccessTulip}`} />
        </div>

        <div className="report-sections-grid">
          <section className="report-sub-section white-bg">
            <div className="sub-section-title">当前误解标签</div>
            {report.mislabels.length > 0 ? (
              <div className="mislabels-list">
                {report.mislabels.map((label) => (
                  <div key={label} className="mislabel-item">
                    {labelMap[label]}
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-text">暂未触发误解标签。</div>
            )}
          </section>

          <section className="report-sub-section green-bg">
            <div className="sub-section-title">自动总结</div>
            <div className="summary-text">{report.summary}</div>
          </section>

          <section className="report-sub-section white-bg">
            <div className="sub-section-title">尝试概况</div>
            <div className="stats-list">
              <div className="stat-item">蔷薇花墙尝试数：<strong>{roseAttempts.length}</strong></div>
              <div className="stat-item">郁金香花海尝试数：<strong>{tulipAttempts.length}</strong></div>
            </div>
          </section>
        </div>
      </section>

      <div className="report-navigation">
        <Link href="/rose-growth" className="nav-link-text">
          ← 回到主关
        </Link>
        <Link href="/evaluation" className="nav-link-text">
          查看评测与 Bad Case →
        </Link>
      </div>

      <style jsx>{`
        .report-main-card {
          background: rgba(251, 244, 232, 0.95);
          border-radius: 28px;
          padding: 24px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.14);
          display: grid;
          gap: 24px;
        }

        .report-title { font-family: 'ZCOOL XiaoWei', serif; font-size: clamp(32px, 5vw, 40px); color: #2b5e4f; }
        .report-subtitle { line-height: 1.6; color: #5a655e; font-size: 15px; margin-top: 8px; }

        .report-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
        }

        .report-sections-grid {
          display: grid;
          gap: 18px;
        }

        .report-sub-section {
          border-radius: 22px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .white-bg { background: #fff; }
        .green-bg { background: #edf7e7; }

        .sub-section-title { fontSize: 20px; fontWeight: 800; color: #223127; }
        
        .mislabels-list { display: grid; gap: 8px; }
        .mislabel-item { background: #f7efe2; border-radius: 12px; padding: 10px 14px; font-size: 14px; font-weight: 600; }
        
        .summary-text { line-height: 1.8; color: #334139; font-size: 15px; }
        
        .stats-list { display: grid; gap: 8px; color: #506055; font-size: 15px; }
        .stat-item strong { color: #2b5e4f; font-size: 18px; margin-left: 4px; }
        
        .empty-text { color: #617065; font-style: italic; }

        .report-navigation {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding: 0 8px;
        }

        .nav-link-text {
          color: #f5ebdb;
          font-weight: 800;
          font-size: 16px;
          transition: opacity 0.2s ease;
        }
        .nav-link-text:hover { opacity: 0.8; }

        @media (max-width: 640px) {
          .report-main-card { padding: 16px; }
          .report-metrics-grid { grid-template-columns: 1fr; }
          .report-navigation { flex-direction: column; align-items: center; text-align: center; }
        }
      `}</style>
    </div>
  );
}

function ReportCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="report-card">
      <div className="card-label">{label}</div>
      <div className="card-value">{value}</div>
      <style jsx>{`
        .report-card {
          background: #fff;
          border-radius: 20px;
          padding: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .card-label { font-size: 12px; color: #677266; margin-bottom: 6px; font-weight: 700; }
        .card-value { font-size: 24px; font-weight: 800; color: #2b5e4f; }
      `}</style>
    </div>
  );
}
