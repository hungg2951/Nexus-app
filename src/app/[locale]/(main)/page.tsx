"use client";

import { useState } from "react";
import type { FC } from "react";
import { useTranslations } from "next-intl";
import type { Post } from "@/types";

import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import MobileNav from "@/components/nav/MobileNav";
import FeedHeader from "@/components/header/FeedHeader";
import PostCard from "@/components/PostCard";
import Avatar from "@/components/Avatar";
import {
  ImageIcon,
  SmileIcon,
  ListBulletIcon,
  CalendarIcon,
} from "@/components/icons";

// ─── Static Data ──────────────────────────────────────────────────────────────

const POSTS: Post[] = [
  {
    id: 1,
    initials: "BK",
    avatarColor: "bg-teal-500",
    name: "Bùi Khánh",
    handle: "@khanh.fullstack",
    time: "2 giờ trước",
    content:
      "Vừa hoàn thành xong bản demo cho dự án Next.js mới. Cảm giác build mọi thứ với Tailwind CSS thật sự rất nhanh và hiệu quả! Mọi người thấy giao diện này thế nào? 🚀",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNgsbSPpAC_pTYf3nbGGyUpksVUAzyAUmDOmuRSUvuihEaPs_g3BOMR1jMvEYp-JoFeJu7PUiR7-gqqyxCJWq2P_cVKzEmn0jfR_vxUzv5UQtW-WeNGaAqHQN_2tycHyHyAgKzHIQJ0cNsDlwVekl4ZLYRBKMfSYM8eAbRzI7XV9DaPn3WJzfCHJpjZgZRlc7-ZBsNbkqjBq6CImqlgwXor_PZAhqaOljfL8eDqV-sLxDJKVbrVIVCJPFKZdtcMO0gnZLXSRqMaUc",
    likes: 1200,
    comments: 48,
    shares: 12,
    liked: false,
  },
  {
    id: 2,
    initials: "VT",
    avatarColor: "bg-orange-500",
    name: "Võ Thanh Tùng",
    handle: "@tungtung.dev",
    time: "5 giờ trước",
    content:
      "Hôm nay là một ngày tuyệt vời để học một thứ gì đó mới. Ai đang tìm hiểu về Web3 không? 👋",
    likes: 245,
    comments: 15,
    liked: true,
  },
];

const COMPOSE_ICONS: Array<FC> = [
  ImageIcon,
  SmileIcon,
  ListBulletIcon,
  CalendarIcon,
];

// ─── Home Page ────────────────────────────────────────────────────────────────

const HomePage: FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [postText, setPostText] = useState<string>("");
  const t = useTranslations("Compose");

  return (
    <div className="max-w-[1440px] mx-auto flex min-h-screen bg-white text-gray-900 font-sans antialiased pb-16 md:pb-0">
      {/* Left Sidebar */}
      <LeftSidebar />

      {/* Main Content */}
      <main className="flex-1 bg-white border-r border-gray-100 min-w-0">
        {/* Header with tabs */}
        <FeedHeader activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Post Compose Box */}
        <section className="p-4 lg:p-6 border-b border-gray-100">
          <div className="flex gap-4">
            <Avatar initials="NT" color="bg-violet-600" size="lg" />
            <div className="flex-1">
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-3 lg:p-4 resize-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 text-sm lg:text-base outline-none transition-all placeholder:text-gray-400"
                placeholder={t("placeholder")}
                rows={3}
              />
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-3 text-gray-400">
                  {COMPOSE_ICONS.map((Icon, i) => (
                    <button
                      key={i}
                      className="hover:text-violet-600 transition-colors p-1"
                    >
                      <Icon />
                    </button>
                  ))}
                </div>
                <button
                  className={`px-6 py-2 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
                    postText.trim()
                      ? "bg-violet-600 text-white hover:bg-violet-700 shadow-sm shadow-violet-200"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!postText.trim()}
                >
                  {t("post")}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feed */}
        <div>
          {POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <RightSidebar />

      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  );
};

export default HomePage;

