"use client";

import type { FC } from "react";
import { useTranslations } from "next-intl";
import { SearchIcon, GearIcon } from "@/components/icons";

interface FeedHeaderProps {
  activeTab: number;
  onTabChange: (index: number) => void;
}

// ─── Feed Header ──────────────────────────────────────────────────────────────

const FeedHeader: FC<FeedHeaderProps> = ({ activeTab, onTabChange }) => {
  const t = useTranslations("FeedHeader");
  const tabKeys = ["forYou", "following", "trending"] as const;

  return (
    <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-20">
      <div className="px-4 lg:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile logo */}
          <div className="md:hidden w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
          <h2 className="text-xl font-bold">{t("title")}</h2>
        </div>
        {/* Mobile action buttons */}
        <div className="flex gap-4 text-gray-500 md:hidden">
          <button
            className="hover:text-gray-900 transition-colors"
            aria-label={t("search")}
          >
            <SearchIcon />
          </button>
          <button
            className="hover:text-gray-900 transition-colors"
            aria-label={t("settings")}
          >
            <GearIcon />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex">
        {tabKeys.map((key, i) => (
          <button
            key={key}
            onClick={() => onTabChange(i)}
            className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === i
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:bg-gray-50 border-b-2 border-transparent"
            }`}
          >
            {t(`tabs.${key}`)}
          </button>
        ))}
      </div>
    </header>
  );
};

export default FeedHeader;

