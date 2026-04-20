'use client';

import Link from 'next/link';

const positionCards = [
  {
    title: '目标用户',
    body: '面向 8–12 岁孩子及家长，让孩子能动手试、家长能看懂过程。',
  },
  {
    title: '核心问题',
    body: '解决“听懂但不会做、会做但不会迁移”，以及家长“看不懂具体卡点”的问题。',
  },
  {
    title: '解决方式',
    body: '用条件变化实验、方法分流、错因回放和家长报告，把抽象思维训练变成可体验任务。',
  },
];

const moduleCards = [
  {
    title: '蔷薇花墙',
    href: '/rose-growth',
    body: '核心训练关卡，观察不同增长方式在后几天如何拉开差异。',
  },
  {
    title: '郁金香花海',
    href: '/tulip-growth',
    body: '迁移小关，在新场景里复用同一套思维方式。',
  },
  {
    title: '家长报告中心',
    href: '/parent-report',
    body: '用可读摘要呈现孩子的尝试路径、误解标签和迁移表现。',
  },
  {
    title: '评测与 Bad Case',
    href: '/evaluation',
    body: '展示常见误解、失败案例、提示有效性和后续迭代方向。',
  },
];

const strengths = ['强调试错与反馈', '强调方法理解与迁移', '家长可以读懂孩子卡在哪里'];
const limitations = ['当前仍是 MVP 阶段', '训练内容覆盖范围有限', 'AI 目前主要用于提示与总结'];

export default function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero-section card-surface">
        <div className="eyebrow">可讲、可看、可体验的 AI 教育作品站</div>
        <h1 className="hero-title">时序花园</h1>
        <p className="hero-subtitle">AI 思维训练产品原型</p>
        <p className="hero-description">
          时序花园是一个面向 8–12 岁孩子及家长的 AI 思维训练产品，通过“条件变化实验 + 方法分流 + 错因回放 + 家长报告”解决孩子“听懂但不会做、不会迁移”和家长“看不懂具体卡点”的问题。
        </p>
        <div className="hero-actions">
          <Link href="/rose-growth" className="primary-cta">
            开始体验
          </Link>
          <Link href="/parent-report" className="secondary-cta">
            查看家长报告
          </Link>
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <h2>平台定位</h2>
          <p>把抽象的数理思维训练，拆成孩子能操作、家长能理解、产品能反馈的互动流程。</p>
        </div>
        <div className="three-col-grid">
          {positionCards.map((card) => (
            <article key={card.title} className="info-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section">
        <div className="section-heading">
          <h2>模块导航</h2>
          <p>从核心训练、迁移验证、家长可读报告，到作品化评测说明，形成一个完整展示闭环。</p>
        </div>
        <div className="feature-grid">
          {moduleCards.map((card) => (
            <Link key={card.href} href={card.href} className="feature-card">
              <div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
              <span className="cta-text">进入模块 →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-section split-section">
        <article className="info-card">
          <h2>优势</h2>
          <ul className="bullet-list">
            {strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="info-card muted-card">
          <h2>当前局限</h2>
          <ul className="bullet-list">
            {limitations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <footer className="site-footer card-surface">
        <div className="footer-info">
          <strong>GitHub 仓库入口：</strong>
          <a href="https://github.com/MyraWang0406/temporal-garden" target="_blank" rel="noopener noreferrer">
            MyraWang0406/temporal-garden
          </a>
        </div>
        <div className="footer-info">
          <strong>部署平台：</strong>
          <span>Cloudflare Pages</span>
        </div>
        <div className="footer-note">说明：当前为原型版本，无需登录，可直接在线体验。</div>
      </footer >

      <style jsx>{`
        .feature-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.1);
        }
        .cta-text {
          margin-top: 16px;
          font-weight: 800;
          color: var(--leaf);
        }
        .footer-info {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .footer-note {
          margin-top: 8px;
          font-size: 14px;
          opacity: 0.8;
        }
        @media (max-width: 640px) {
          .footer-info {
            flex-direction: column;
            gap: 4px;
          }
        }
      `}</style>
    </div>
  );
}
