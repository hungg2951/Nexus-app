"use client";

import type { FC, ReactNode } from "react";

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

const SettingsSection: FC<SettingsSectionProps> = ({ title, description, children }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="p-4 md:p-6 border-b border-gray-50 bg-gray-50/30">
        <h3 className="font-bold text-gray-900 text-base">{title}</h3>
        {description && <p className="text-xs text-gray-400 mt-1">{description}</p>}
      </div>
      <div className="divide-y divide-gray-50">{children}</div>
    </div>
  );
};

export default SettingsSection;
