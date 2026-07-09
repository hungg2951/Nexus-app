"use client";

import { useState } from "react";
import type { FC } from "react";
import { useTranslations } from "next-intl";
import PageHeader from "@/components/common/PageHeader";
import SearchBar from "@/components/explore/SearchBar";
import TrendingSection from "@/components/explore/TrendingSection";
import UserCard from "@/components/common/UserCard";

// ─── Static Data ──────────────────────────────────────────────────────────────

const TRENDING_TOPICS = [
  {
    tag: "#nextjs",
    category: "Công nghệ",
    count: "2,841",
    gradient: "bg-gradient-to-br from-violet-500 to-purple-600",
  },
  {
    tag: "#react2025",
    category: "Lập trình",
    count: "1,920",
    gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
  },
  {
    tag: "#tốtnghiệp2025",
    category: "Đồ án",
    count: "984",
    gradient: "bg-gradient-to-br from-emerald-500 to-teal-600",
  },
  {
    tag: "#AI_Vietnam",
    category: "Trí tuệ nhân tạo",
    count: "3,271",
    gradient: "bg-gradient-to-br from-orange-500 to-rose-600",
  },
  {
    tag: "#devlife",
    category: "Lifestyle",
    count: "5,102",
    gradient: "bg-gradient-to-br from-pink-500 to-fuchsia-600",
  },
  {
    tag: "#nodejs",
    category: "Backend",
    count: "1,408",
    gradient: "bg-gradient-to-br from-green-600 to-emerald-700",
  },
];

const SUGGESTED_USERS = [
  {
    initials: "NM",
    name: "Nguyễn Minh Đức",
    handle: "@minhduc.dev",
    avatarColor: "bg-blue-500",
    bio: "Full-stack developer | Next.js enthusiast | Open source contributor",
    following: false,
  },
  {
    initials: "TL",
    name: "Trần Lệ Thu",
    handle: "@lethu.ux",
    avatarColor: "bg-pink-500",
    bio: "UI/UX Designer | Figma lover | Coffee addict ☕",
    following: false,
  },
  {
    initials: "PH",
    name: "Phạm Hùng Anh",
    handle: "@hunganh.be",
    avatarColor: "bg-amber-500",
    bio: "Backend engineer @ Nexus | Node.js | PostgreSQL",
    following: true,
  },
  {
    initials: "DV",
    name: "Đinh Văn Long",
    handle: "@vanlong.ai",
    avatarColor: "bg-violet-600",
    bio: "AI researcher | ML practitioner | Building the future 🤖",
    following: false,
  },
];

const EXPLORE_IMAGES = [
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&auto=format&fit=crop",
];

const TABS = ["forYou", "trending", "people", "media"] as const;

// ─── Explore Page ─────────────────────────────────────────────────────────────

const ExplorePage: FC = () => {
  const t = useTranslations("Explore");
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <PageHeader title={t("title")} />

      {/* Search */}
      <div className="px-4 lg:px-6 pt-4 pb-2">
        <SearchBar placeholder={t("searchPlaceholder")} />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 px-4 lg:px-6 sticky top-[65px] bg-white/80 backdrop-blur-md z-10">
        {TABS.map((key, i) => (
          <button
            key={key}
            onClick={() => setActiveTab(i)}
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

      <div className="p-4 lg:p-6 space-y-8">
        {/* Trending Topics */}
        {(activeTab === 0 || activeTab === 1) && (
          <TrendingSection
            title={t("trending")}
            subtitle={t("trendingSubtitle")}
            postsLabel={t("posts", { count: "{count}" })}
            topics={TRENDING_TOPICS}
          />
        )}

        {/* Suggested Users */}
        {(activeTab === 0 || activeTab === 2) && (
          <section>
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900">
                {t("suggestedUsers")}
              </h3>
              <p className="text-xs text-gray-400">{t("suggestedSubtitle")}</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {SUGGESTED_USERS.map((user) => (
                <UserCard
                  key={user.handle}
                  {...user}
                  followLabel={t("follow")}
                  followingLabel={t("following")}
                />
              ))}
            </div>
          </section>
        )}

        {/* Explore Media Grid */}
        {(activeTab === 0 || activeTab === 3) && (
          <section>
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-900">
                {t("explorePosts")}
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {EXPLORE_IMAGES.map((src, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
                >
                  <img
                    src={src}
                    alt={`explore-${i}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default ExplorePage;
