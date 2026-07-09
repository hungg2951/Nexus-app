"use client";

import { useState } from "react";
import type { FC } from "react";
import { useTranslations } from "next-intl";
import type { Post } from "@/types";

import FeedHeader from "@/components/header/FeedHeader";
import PostCard from "@/components/PostCard";
import Avatar from "@/components/Avatar";
import {
  ImageIcon,
  SmileIcon,
  ListBulletIcon,
  CalendarIcon,
} from "@/components/icons";
import { useAuthStore } from "@/lib/store/auth.store";

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
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
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
  {
    id: 3,
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
    id: 4,
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

  const { user } = useAuthStore();

  const initials = `${user?.firstName?.[0] || ""}${
    user?.lastName?.[0] || ""
  }`.toUpperCase();

  return (
    <>
      {/* Header with tabs */}
      <FeedHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Post Compose Box */}
      <section className="p-4 lg:p-6 border-b border-gray-100">
        <div className="flex gap-4">
          <Avatar
            initials={initials || "U"}
            size="lg"
          />
          <div className="flex-1">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="w-full border border-gray-200 rounded-xl p-3 lg:p-4 resize-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm lg:text-base outline-none transition-all placeholder:text-gray-400"
              placeholder={t("placeholder")}
              rows={3}
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-3 text-gray-400">
                {COMPOSE_ICONS.map((Icon, i) => (
                  <button
                    key={i}
                    className="hover:text-primary transition-colors p-1"
                  >
                    <Icon />
                  </button>
                ))}
              </div>
              <button
                className={`px-6 py-2 rounded-xl font-semibold text-sm transition-all active:scale-95 ${
                  postText.trim()
                    ? "bg-primary text-white hover:bg-primary-hover shadow-sm shadow-violet-200"
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
    </>
  );
};

export default HomePage;
