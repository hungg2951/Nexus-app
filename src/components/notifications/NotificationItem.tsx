"use client";

import type { FC } from "react";
import type { Notification, NotificationType } from "@/types";
import Avatar from "@/components/Avatar";
import { HeartIcon, CommentIcon, UserIcon, ShareIcon, CheckCircleIcon } from "@/components/icons";

interface NotificationItemProps {
  notification: Notification;
  typeLabel: string;
  onRead?: (id: number) => void;
}

// ─── Type icon helper ─────────────────────────────────────────────────────────

const TYPE_ICON: Record<NotificationType, { icon: FC; bg: string; color: string }> = {
  like: { icon: () => <HeartIcon solid />, bg: "bg-red-100", color: "text-red-500" },
  comment: { icon: CommentIcon, bg: "bg-blue-100", color: "text-blue-500" },
  follow: { icon: UserIcon, bg: "bg-primary/10", color: "text-primary" },
  share: { icon: ShareIcon, bg: "bg-green-100", color: "text-green-500" },
  mention: { icon: () => <CheckCircleIcon />, bg: "bg-amber-100", color: "text-amber-500" },
};

// ─── NotificationItem ─────────────────────────────────────────────────────────

const NotificationItem: FC<NotificationItemProps> = ({
  notification,
  typeLabel,
  onRead,
}) => {
  const { icon: IconComponent, bg, color } = TYPE_ICON[notification.type];

  return (
    <div
      onClick={() => onRead?.(notification.id)}
      className={`flex items-start gap-4 px-4 lg:px-6 py-4 cursor-pointer transition-colors hover:bg-gray-50/60 border-b border-gray-100 ${
        !notification.read ? "bg-primary/[0.03]" : ""
      }`}
    >
      {/* Avatar with type badge */}
      <div className="relative flex-shrink-0">
        <Avatar
          initials={notification.actor.initials}
          color={notification.actor.avatarColor}
          size="md"
        />
        <span
          className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${bg} ${color} ring-2 ring-white`}
          style={{ fontSize: 10 }}
        >
          <IconComponent />
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800 leading-snug">
          <span className="font-bold">{notification.actor.name}</span>{" "}
          <span className="text-gray-600">{typeLabel}</span>
        </p>
        {notification.postPreview && (
          <p className="text-xs text-gray-400 mt-1 line-clamp-1 border-l-2 border-gray-200 pl-2">
            {notification.postPreview}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
      </div>

      {/* Unread dot */}
      {!notification.read && (
        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
      )}
    </div>
  );
};

export default NotificationItem;
