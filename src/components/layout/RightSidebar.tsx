"use client";

import { useState } from "react";
import type { FC } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import type { TrendingItemProps, SuggestionItemProps } from "@/types";
import Avatar from "@/components/Avatar";
import { SunIcon, MoonIcon } from "@/components/icons";

// ─── Static Data ──────────────────────────────────────────────────────────────

const TRENDING: TrendingItemProps[] = [
  { category: "Công nghệ", tag: "#nextjs", count: "2,841", active: true },
  { category: "Lập trình", tag: "#nodejs", count: "1,920" },
  { category: "Đồ án", tag: "#tốtnghiệp2025", count: "984" },
];

const SUGGESTIONS: SuggestionItemProps[] = [
  {
    initials: "BK",
    name: "Bùi Khánh",
    handle: "@khanh.fullstack",
    avatarColor: "bg-teal-500",
    following: false,
  },
  {
    initials: "ML",
    name: "Mai Lê Phương",
    handle: "@phuong.ml",
    avatarColor: "bg-indigo-500",
    following: true,
  },
];

// ─── TrendingItem ─────────────────────────────────────────────────────────────

const TrendingItem: FC<TrendingItemProps> = ({
  category,
  tag,
  count,
  active = false,
}) => {
  const t = useTranslations("RightSidebar");
  return (
    <div className="group cursor-pointer">
      <p className="text-[11px] text-gray-400 font-medium">{category}</p>
      <p
        className={`font-bold group-hover:underline ${
          active ? "text-violet-600" : "text-gray-800"
        }`}
      >
        {tag}
      </p>
      <p className="text-[11px] text-gray-400">{t("posts", { count })}</p>
    </div>
  );
};

// ─── SuggestionItem ───────────────────────────────────────────────────────────

const SuggestionItem: FC<SuggestionItemProps> = ({
  initials,
  name,
  handle,
  avatarColor,
  following = false,
}) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(following);
  const t = useTranslations("RightSidebar");

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-3 overflow-hidden">
        <Avatar initials={initials} color={avatarColor} size="md" />
        <div className="overflow-hidden">
          <p className="font-bold text-sm truncate">{name}</p>
          <p className="text-xs text-gray-400 truncate">{handle}</p>
        </div>
      </div>
      <button
        onClick={() => setIsFollowing((p) => !p)}
        className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap min-w-[90px] border ${
          isFollowing
            ? "border-violet-200 bg-violet-50 text-violet-700 hover:bg-red-50 hover:border-red-200 hover:text-red-600"
            : "border-gray-200 hover:bg-violet-600 hover:text-white hover:border-violet-600"
        }`}
      >
        {isFollowing ? t("following") : t("follow")}
      </button>
    </div>
  );
};

// ─── Right Sidebar ────────────────────────────────────────────────────────────

const RightSidebar: FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("RightSidebar");

  const toggleLocale = () => {
    const nextLocale = locale === "vi" ? "en" : "vi";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <aside className="hidden lg:flex w-96 border-l border-gray-100 px-8 py-6 flex-col gap-6 sticky top-0 h-screen overflow-y-auto [&::-webkit-scrollbar]:hidden">
      {/* Settings bar */}
      <div className="flex justify-between items-center">
        {/* Language Switcher */}
        <button
          onClick={toggleLocale}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors text-xs font-bold text-gray-700 active:scale-95"
        >
          <span className={locale === "vi" ? "text-violet-600" : "text-gray-400"}>VI</span>
          <span className="text-gray-300">|</span>
          <span className={locale === "en" ? "text-violet-600" : "text-gray-400"}>EN</span>
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode((p) => !p)}
          className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5 border border-gray-200 hover:border-gray-300 transition-colors"
          aria-label={t("toggleDark")}
        >

          <SunIcon />
          <div className="w-8 h-4 bg-gray-300 rounded-full relative">
            <div
              className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all shadow-sm ${
                darkMode ? "left-4 bg-violet-600" : "left-0.5"
              }`}
            />
          </div>
          <MoonIcon />
        </button>
      </div>

      {/* Trending */}
      <section className="bg-gray-50/70 rounded-3xl p-6 border border-gray-100">
        <h3 className="text-base font-bold mb-5">{t("trending")}</h3>
        <div className="space-y-5">
          {TRENDING.map((t) => (
            <TrendingItem key={t.tag} {...t} />
          ))}
        </div>
      </section>

      {/* Suggestions */}
      <section className="bg-gray-50/70 rounded-3xl p-6 border border-gray-100">
        <h3 className="text-base font-bold mb-5">{t("suggestions")}</h3>
        <div className="space-y-5">
          {SUGGESTIONS.map((s) => (
            <SuggestionItem key={s.handle} {...s} />
          ))}
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;

