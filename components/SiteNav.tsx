'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: '首页' },
  { href: '/rose-growth', label: '蔷薇花墙' },
  { href: '/tulip-growth', label: '郁金香花海' },
  { href: '/parent-report', label: '家长报告' },
  { href: '/evaluation', label: '评测与 Bad Case' },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="brand-block">
        <Link href="/" className="brand-title">
          时序花园
        </Link>
        <p className="brand-subtitle">AI 思维训练产品原型</p>
      </div>

      <nav className="site-nav" aria-label="主导航">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link${isActive ? ' active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
