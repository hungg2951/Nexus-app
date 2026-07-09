"use client";

import { useState } from "react";
import type { FC } from "react";
import { useTranslations } from "next-intl";
import type { Post } from "@/types";
import PageHeader from "@/components/common/PageHeader";
import EmptyState from "@/components/common/EmptyState";
import PostCard from "@/components/PostCard";
import { BookmarkIcon, TrashIcon } from "@/components/icons";

// ─── Static Bookmarked Data ───────────────────────────────────────────────────

const INITIAL_BOOKMARKS: Post[] = [
  {
    id: 1,
    initials: "HT",
    avatarColor: "bg-rose-500",
    name: "Hoàng Thị Thu",
    handle: "@thu.design",
    time: "1 ngày trước",
    content:
      "Sản phẩm mới ra lò 🎨 Thiết kế UI cho app quản lý tài chính cá nhân. Mọi người cảm thấy thế nào về palette màu này?",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
    likes: 2100,
    comments: 124,
    shares: 89,
    liked: false,
  },
  {
    id: 2,
    initials: "ML",
    avatarColor: "bg-indigo-500",
    name: "Mai Lê Phương",
    handle: "@phuong.ml",
    time: "8 giờ trước",
    content:
      "Vừa đọc xong cuốn 'Atomic Habits' — thực sự thay đổi cách mình nhìn nhận về thói quen hàng ngày. Ai muốn mình review không? 📚✨",
    likes: 876,
    comments: 63,
    shares: 34,
    liked: false,
  },
  {
    id: 3,
    initials: "BK",
    avatarColor: "bg-teal-500",
    name: "Bùi Khánh",
    handle: "@khanh.fullstack",
    time: "2 ngày trước",
    content:
      "Một số nguyên tắc thiết kế CSS Layout hữu ích mà mình đúc kết được sau 5 năm làm việc chuyên nghiệp. Link bài viết chi tiết bên dưới comment nhé! 👇",
    likes: 452,
    comments: 29,
    shares: 15,
    liked: true,
  },
];

// ─── Bookmarks Page ───────────────────────────────────────────────────────────

const BookmarksPage: FC = () => {
  const t = useTranslations("Bookmarks");
  const [bookmarks, setBookmarks] = useState<Post[]>(INITIAL_BOOKMARKS);
  const [activeTab, setActiveTab] = useState<"posts" | "photos" | "videos">("posts");

  const handleClearAll = () => {
    setBookmarks([]);
  };

  // Filter bookmarks based on selected tab
  const getFilteredBookmarks = () => {
    if (activeTab === "photos") {
      return bookmarks.filter((post) => !!post.image);
    }
    if (activeTab === "videos") {
      // Mock videos tab (empty since we don't have video posts in mock data)
      return [];
    }
    return bookmarks;
  };

  const filteredItems = getFilteredBookmarks();

  const renderTabs = () => {
    const tabs: Array<{ id: "posts" | "photos" | "videos"; label: string }> = [
      { id: "posts", label: t("tabs.posts") },
      { id: "photos", label: t("tabs.photos") },
      { id: "videos", label: t("tabs.videos") },
    ];

    return (
      <div className="flex border-b border-gray-100 bg-white sticky top-[68px] z-10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 py-4 text-center text-sm font-semibold relative transition-colors"
            >
              <span className={isActive ? "text-primary" : "text-gray-500 hover:text-gray-900"}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    );
  };

  const clearButton = bookmarks.length > 0 ? (
    <button
      onClick={handleClearAll}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-100 bg-red-50/50 text-red-600 hover:bg-red-50 text-xs font-bold transition-all"
    >
      <TrashIcon />
      <span>{t("clearAll")}</span>
    </button>
  ) : null;

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        rightAction={clearButton}
      />

      {renderTabs()}

      <div className="divide-y divide-gray-100">
        {filteredItems.length > 0 ? (
          filteredItems.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <EmptyState
            icon={<BookmarkIcon />}
            title={t("empty.title")}
            subtitle={t("empty.subtitle")}
          />
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
