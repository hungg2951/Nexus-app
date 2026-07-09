import type { FC, ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

// ─── EmptyState ────────────────────────────────────────────────────────────────

const EmptyState: FC<EmptyStateProps> = ({ icon, title, subtitle, action }) => (
  <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    {subtitle && (
      <p className="text-sm text-gray-400 max-w-xs leading-relaxed">{subtitle}</p>
    )}
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
