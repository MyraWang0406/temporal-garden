import Link from 'next/link';

import { TulipStage } from '@/components/tulip-growth/TulipStage';

export default function TulipGrowthPage() {
  return (
    <div className="page-stack">
      <section className="page-intro">
        <h1>郁金香花海</h1>
        <p>这是时序花园的迁移小关：场景变了，但判断增长节奏的方法不该丢。这里用来验证孩子是否真正理解，而不是只记住一个例子。</p>
      </section>

      <TulipStage />

      <section className="ai-note">
        <h2>AI 提示如何工作</h2>
        <p>当前版本的 AI 主要用于训练后的提示生成、错因解释和结果总结，不直接给出标准答案。</p>
      </section>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <Link href="/rose-growth" style={{ color: '#f5ebdb', fontWeight: 800 }}>
          ← 回到蔷薇花墙
        </Link>
        <Link href="/parent-report" style={{ color: '#f5ebdb', fontWeight: 800 }}>
          看家长报告 →
        </Link>
      </div>
    </div>
  );
}
