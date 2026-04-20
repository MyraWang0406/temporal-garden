import './globals.css';
import type { Metadata } from 'next';
import React from 'react';

import { SiteNav } from '@/components/SiteNav';

export const metadata: Metadata = {
  title: '时序花园｜AI 思维训练产品原型',
  description:
    '时序花园是一个面向 8–12 岁孩子及家长的 AI 思维训练产品原型，通过条件变化实验、方法分流、错因回放和家长报告，把抽象的数理训练转化为可操作、可反馈、可迁移的互动任务。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <main>
          <div className="site-shell">
            <SiteNav />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
