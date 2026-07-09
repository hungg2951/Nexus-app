"use client";

import { useState } from "react";
import type { FC } from "react";
import { useTranslations } from "next-intl";
import type { Notification } from "@/types";
import PageHeader from "@/components/common/PageHeader";
import NotificationItem from "@/components/notifications/NotificationItem";
import EmptyState from "@/components/common/EmptyState";
import { BellIcon } from "@/components/icons";

// ─── Static Data ──────────────────────────────────────────────────────────────

const NOTIFICATIONS: Notification[] = [
  {
    id: 1,
    type: "like",
    actor: { name: "Bùi Khánh", handle: "@khanh.fullstack", initials: "BK", avatarColor: "bg-teal-500" },
    postPreview: "Vừa hoàn thành xong bản demo cho dự án Next.js mới...",
    time: "2 phút trước",
    read: false,
  },
  {
    id: 2,
    type: "follow",
    actor: { name: "Nguyễn Minh Đức", handle: "@minhduc.dev", initials: "NM", avatarColor: "bg-blue-500" },
    time: "15 phút trước",
    read: false,
  },
  {
    id: 3,
    type: "comment",
    actor: { name: "Mai Lê Phương", handle: "@phuong.ml", initials: "ML", avatarColor: "bg-indigo-500" },
    postPreview: "Hôm nay là một ngày tuyệt vời để học một thứ gì đó mới...",
    content: "Mình cũng đang tìm hiểu về chủ đề này! 🔥",
    time: "1 giờ trước",
    read: false,
  },
  {
    id: 4,
    type: "share",
    actor: { name: "Hoàng Thị Thu", handle: "@thu.design", initials: "HT", avatarColor: "bg-rose-500" },
    postPreview: "Sản phẩm mới ra lò 🎨 Thiết kế UI cho app quản lý tài chính...",
    time: "3 giờ trước",
    read: true,
  },
  {
    id: 5,
    type: "mention",
    actor: { name: "Võ Thanh Tùng", handle: "@tungtung.dev", initials: "VT", avatarColor: "bg-orange-500" },
    postPreview: "Cảm ơn @you đã chia sẻ bài viết về Web3!",
    time: "5 giờ trước",
    read: true,
  },
  {
    id: 6,
    type: "like",
    actor: { name: "Phạm Hùng Anh", handle: "@hunganh.be", initials: "PH", avatarColor: "bg-amber-500" },
    postPreview: "Atomic Habits thực sự thay đổi cách nhìn nhận...",
    time: "8 giờ trước",
    read: true,
  },
  {
    id: 7,
    type: "follow",
    actor: { name: "Trần Lệ Thu", handle: "@lethu.ux", initials: "TL", avatarColor: "bg-pink-500" },
    time: "1 ngày trước",
    read: true,
  },
  {
    id: 8,
    type: "comment",
    actor: { name: "Đinh Văn Long", handle: "@vanlong.ai", initials: "DV", avatarColor: "bg-violet-600" },
    postPreview: "Thiết kế UI cho app quản lý tài chính cá nhân...",
    content: "UI nhìn clean quá, bạn dùng figma hay sketch?",
    time: "2 ngày trước",
    read: true,
  },
];

const TABS = ["all", "mentions", "likes"] as const;

// ─── Notifications Page ───────────────────────────────────────────────────────

const NotificationsPage: FC = () => {
  const t = useTranslations("Notifications");
  const [activeTab, setActiveTab] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: number) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const filtered = notifications.filter((n) => {
    if (activeTab === 1) return n.type === "mention";
    if (activeTab === 2) return n.type === "like";
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <>
      <PageHeader
        title={t("title")}
        rightAction={
          unreadCount > 0 ? (
            <button
              onClick={markAllRead}
              className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              {t("markAllRead")}
            </button>
          ) : undefined
        }
      />

      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        {TABS.map((key, i) => (
          <button
            key={key}
            onClick={() => setActiveTab(i)}
            className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer relative ${
              activeTab === i
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:bg-gray-50 border-b-2 border-transparent"
            }`}
          >
            {t(`tabs.${key}`)}
            {key === "all" && unreadCount > 0 && (
              <span className="ml-1.5 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<BellIcon />}
          title={t("empty.title")}
          subtitle={t("empty.subtitle")}
        />
      ) : (
        <div>
          {filtered.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              typeLabel={t(`types.${notification.type}`)}
              onRead={markRead}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default NotificationsPage;
