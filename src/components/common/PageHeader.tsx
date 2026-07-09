import type { FC, ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: ReactNode;
}

// ─── PageHeader ────────────────────────────────────────────────────────────────

const PageHeader: FC<PageHeaderProps> = ({ title, subtitle, rightAction }) => (
  <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-20 px-4 lg:px-6 py-4 flex items-center justify-between">
    <div>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {subtitle && (
        <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
      )}
    </div>
    {rightAction && <div>{rightAction}</div>}
  </header>
);

export default PageHeader;
