"use client";

import { useState } from "react";
import type { FC } from "react";
import { useTranslations } from "next-intl";
import type { Conversation } from "@/types";
import ConversationList from "@/components/messages/ConversationList";
import ChatPanel from "@/components/messages/ChatPanel";
import EmptyState from "@/components/common/EmptyState";
import { EnvelopeIcon, PlusIcon } from "@/components/icons";

// ─── Static Data ──────────────────────────────────────────────────────────────

const CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    participant: { name: "Bùi Khánh", handle: "@khanh.fullstack", initials: "BK", avatarColor: "bg-teal-500", online: true },
    lastMessage: "Bạn thấy API mới thế nào?",
    lastTime: "2 phút",
    unreadCount: 3,
    messages: [
      { id: 1, senderId: 1, text: "Hey! Bạn có thấy cập nhật Next.js 16 không?", time: "10:20" },
      { id: 2, senderId: 0, text: "Có! Cái server actions mới khá xịn 🚀", time: "10:21" },
      { id: 3, senderId: 1, text: "Đúng rồi, mình đang thử dùng cho project mới", time: "10:22" },
      { id: 4, senderId: 1, text: "Bạn thấy API mới thế nào?", time: "10:23" },
    ],
  },
  {
    id: 2,
    participant: { name: "Võ Thanh Tùng", handle: "@tungtung.dev", initials: "VT", avatarColor: "bg-orange-500", online: false },
    lastMessage: "Tối nay mình livestream nhé!",
    lastTime: "1 giờ",
    unreadCount: 0,
    messages: [
      { id: 1, senderId: 0, text: "Tùng ơi, bài viết về Web3 của bạn hay lắm!", time: "09:00" },
      { id: 2, senderId: 2, text: "Cảm ơn! Mình sẽ ra thêm bài nữa 😄", time: "09:05" },
      { id: 3, senderId: 2, text: "Tối nay mình livestream nhé!", time: "09:10" },
    ],
  },
  {
    id: 3,
    participant: { name: "Mai Lê Phương", handle: "@phuong.ml", initials: "ML", avatarColor: "bg-indigo-500", online: true },
    lastMessage: "Bạn: Thanks nha!",
    lastTime: "3 giờ",
    unreadCount: 0,
    messages: [
      { id: 1, senderId: 3, text: "Mình đang nghiên cứu về ML, bạn có tài liệu gợi ý không?", time: "07:00" },
      { id: 2, senderId: 0, text: "Bạn thử xem Coursera của Andrew Ng nha, rất hay!", time: "07:15" },
      { id: 3, senderId: 3, text: "Cảm ơn bạn nhiều lắm! 🙏", time: "07:16" },
      { id: 4, senderId: 0, text: "Thanks nha!", time: "07:20" },
    ],
  },
  {
    id: 4,
    participant: { name: "Hoàng Thị Thu", handle: "@thu.design", initials: "HT", avatarColor: "bg-rose-500", online: false },
    lastMessage: "UI design hay quá 😍",
    lastTime: "Hôm qua",
    unreadCount: 1,
    messages: [
      { id: 1, senderId: 4, text: "Bạn có thể review giúp mình design này không?", time: "Hôm qua 15:00" },
      { id: 2, senderId: 0, text: "Được, gửi file figma cho mình nha", time: "Hôm qua 15:10" },
      { id: 3, senderId: 4, text: "UI design hay quá 😍", time: "Hôm qua 18:00" },
    ],
  },
  {
    id: 5,
    participant: { name: "Phạm Hùng Anh", handle: "@hunganh.be", initials: "PH", avatarColor: "bg-amber-500", online: true },
    lastMessage: "Bạn: OK mình sẽ check lại",
    lastTime: "2 ngày",
    unreadCount: 0,
    messages: [
      { id: 1, senderId: 5, text: "API bị lỗi 500 rồi, bạn xem thử nhé", time: "2 ngày trước" },
      { id: 2, senderId: 0, text: "OK mình sẽ check lại", time: "2 ngày trước" },
    ],
  },
];

// ─── Messages Page ────────────────────────────────────────────────────────────

const MessagesPage: FC = () => {
  const t = useTranslations("Messages");
  const [selectedId, setSelectedId] = useState<number | null>(1);

  const selectedConversation = CONVERSATIONS.find((c) => c.id === selectedId);

  return (
    <div className="flex h-screen">
      {/* Conversation List — fixed width */}
      <div className={`w-full md:w-80 lg:w-96 border-r border-gray-100 flex flex-col flex-shrink-0 ${selectedId ? "hidden md:flex" : "flex"}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold">{t("title")}</h2>
          <button className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors">
            <PlusIcon />
          </button>
        </div>
        <ConversationList
          conversations={CONVERSATIONS}
          selectedId={selectedId}
          onSelect={setSelectedId}
          searchPlaceholder={t("searchConversations")}
          youLabel={t("you")}
        />
      </div>

      {/* Chat Panel */}
      <div className={`flex-1 ${!selectedId ? "hidden md:flex" : "flex"} flex-col`}>
        {selectedConversation ? (
          <ChatPanel
            conversation={selectedConversation}
            onlineLabel={t("online")}
            offlineLabel={t("offline")}
            placeholder={t("typingPlaceholder")}
            sendLabel={t("send")}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon={<EnvelopeIcon />}
              title={t("noConversation.title")}
              subtitle={t("noConversation.subtitle")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
