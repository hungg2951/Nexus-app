"use client";

import { useState } from "react";
import type { FC } from "react";
import Avatar from "@/components/Avatar";
import type { SuggestionItemProps } from "@/types";

interface UserCardProps extends SuggestionItemProps {
  bio?: string;
  followLabel: string;
  followingLabel: string;
}

// ─── UserCard ─────────────────────────────────────────────────────────────────

const UserCard: FC<UserCardProps> = ({
  initials,
  name,
  handle,
  avatarColor,
  following = false,
  bio,
  followLabel,
  followingLabel,
}) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(following);

  return (
    <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-sm transition-all group">
      <Avatar initials={initials} color={avatarColor} size="md" />
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm text-gray-900 truncate group-hover:text-primary transition-colors">
          {name}
        </p>
        <p className="text-xs text-gray-400 truncate">{handle}</p>
        {bio && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{bio}</p>
        )}
      </div>
      <button
        onClick={() => setIsFollowing((p) => !p)}
        className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border flex-shrink-0 ${
          isFollowing
            ? "border-primary/30 bg-primary/5 text-primary hover:bg-red-50 hover:border-red-200 hover:text-red-600"
            : "border-primary bg-primary text-white hover:bg-primary-hover"
        }`}
      >
        {isFollowing ? followingLabel : followLabel}
      </button>
    </div>
  );
};

export default UserCard;
