"use client";

import { useState } from "react";
import type { FC } from "react";
import { useTranslations } from "next-intl";
import type { UserProfile, Post } from "@/types";
import { useAuthStore } from "@/lib/store/auth.store";
import PageHeader from "@/components/common/PageHeader";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileTabs from "@/components/profile/ProfileTabs";
import PostCard from "@/components/PostCard";
import EmptyState from "@/components/common/EmptyState";
import { CameraIcon, XMarkIcon } from "@/components/icons";

// ─── Static Mock Data for User Profile Posts ───────────────────────────────────

const USER_POSTS: Post[] = [
  {
    id: 101,
    initials: "BK",
    avatarColor: "bg-teal-500",
    name: "Bùi Khánh",
    handle: "@khanh.fullstack",
    time: "2 giờ trước",
    content:
      "Vừa hoàn thành xong bản demo cho dự án Next.js mới. Cảm giác build mọi thứ với Tailwind CSS thật sự rất nhanh và hiệu quả! Mọi người thấy giao diện này thế nào? 🚀",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
    likes: 124,
    comments: 8,
    shares: 2,
    liked: true,
  },
  {
    id: 102,
    initials: "BK",
    avatarColor: "bg-teal-500",
    name: "Bùi Khánh",
    handle: "@khanh.fullstack",
    time: "3 ngày trước",
    content:
      "Hôm nay làm cốc cà phê sữa đá rồi ngồi code. Cảm giác flow thật tuyệt vời! ☕💻 #codinglife #developer",
    likes: 85,
    comments: 3,
    liked: false,
  },
];

const LIKED_POSTS: Post[] = [
  {
    id: 201,
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
    id: 202,
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
    liked: true,
  },
];

// ─── Profile Page ─────────────────────────────────────────────────────────────

const ProfilePage: FC = () => {
  const t = useTranslations("Profile");
  const { user } = useAuthStore();

  const initials = user
    ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase()
    : "BK";
  const fullName = user
    ? `${user.firstName} ${user.lastName}`
    : "Bùi Khánh";
  const handle = user ? `@${user.username}` : "@khanh.fullstack";

  // Local state for profile details (updates on Edit)
  const [profile, setProfile] = useState<UserProfile>({
    id: 1,
    name: fullName,
    handle: handle,
    initials: initials,
    avatarColor: "bg-teal-500",
    avatarUrl: user?.avatarUrl || undefined,
    bio: "Fullstack Developer đam mê công nghệ, yêu thích Next.js, React Native và xây dựng các sản phẩm thực tế hữu ích cho người dùng. 🚀",
    location: "Hà Nội, Việt Nam",
    website: "github.com/khanh-fullstack",
    joinDate: t("joinedOn", { date: "Tháng 6, 2024" }),
    postsCount: USER_POSTS.length,
    followersCount: 1420,
    followingCount: 582,
    coverGradient: "from-violet-600 via-indigo-600 to-primary",
    isFollowing: false,
    isOwnProfile: true,
  });

  const [activeTab, setActiveTab] = useState<"posts" | "photos" | "likes">("posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: profile.name,
    bio: profile.bio,
    location: profile.location || "",
    website: profile.website || "",
  });

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      name: editForm.name,
      bio: editForm.bio,
      location: editForm.location,
      website: editForm.website,
    }));
    setIsEditModalOpen(false);
  };

  const getFilteredPosts = () => {
    if (activeTab === "photos") {
      return USER_POSTS.filter((post) => !!post.image);
    }
    if (activeTab === "likes") {
      return LIKED_POSTS;
    }
    return USER_POSTS;
  };

  const filteredPosts = getFilteredPosts();

  return (
    <div className="min-h-screen bg-white relative">
      <PageHeader title={profile.name} subtitle={`${profile.postsCount} bài viết`} />

      <ProfileHeader
        profile={profile}
        editLabel={t("editProfile")}
        followLabel={t("follow")}
        followingLabel={t("following")}
        messageLabel={t("message")}
        onEditClick={() => {
          setEditForm({
            name: profile.name,
            bio: profile.bio,
            location: profile.location || "",
            website: profile.website || "",
          });
          setIsEditModalOpen(true);
        }}
      />

      <ProfileTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        labels={{
          posts: t("tabs.posts"),
          photos: t("tabs.photos"),
          likes: t("tabs.likes"),
        }}
      />

      <div className="divide-y divide-gray-100 pb-10">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard key={post.id} post={{ ...post, initials: initials, name: profile.name, handle: profile.handle }} />
          ))
        ) : (
          <EmptyState
            icon={<CameraIcon />}
            title={t("noPostsYet")}
            subtitle="Bài đăng của bạn sẽ xuất hiện ở đây khi bạn tạo bài mới."
          />
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-lg">{t("editProfile")}</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-all"
              >
                <XMarkIcon />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleEditSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Cover Gradient Preview */}
              <div className="relative">
                <div className={`h-28 w-full rounded-xl bg-gradient-to-r ${profile.coverGradient} opacity-90`} />
                <div className="absolute -bottom-8 left-6 border-4 border-white rounded-full bg-white shadow-sm overflow-hidden">
                  <div className="relative group cursor-pointer">
                    <Avatar
                      initials={profile.initials}
                      avatarUrl={profile.avatarUrl}
                      color={profile.avatarColor}
                      size="lg"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                      <CameraIcon />
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-6" /> {/* spacer */}

              {/* Name Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Tên hiển thị
                </label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                />
              </div>

              {/* Bio Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Tiểu sử (Bio)
                </label>
                <textarea
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm resize-none"
                />
              </div>

              {/* Location Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Vị trí
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  placeholder="Ví dụ: Hà Nội, Việt Nam"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                />
              </div>

              {/* Website Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Trang web
                </label>
                <input
                  type="text"
                  value={editForm.website}
                  onChange={(e) => setEditForm({ ...editForm, website: e.target.value })}
                  placeholder="Ví dụ: github.com/username"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-sm font-bold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary-hover shadow-sm transition-all"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
