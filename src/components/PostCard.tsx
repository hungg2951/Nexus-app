"use client";

import { useState } from "react";
import type { FC } from "react";
import { useTranslations } from "next-intl";
import type { PostCardProps } from "@/types";
import Avatar from "@/components/Avatar";
import {
  HeartIcon,
  CommentIcon,
  ShareIcon,
  BookmarkIcon,
} from "@/components/icons";

// ─── PostCard ─────────────────────────────────────────────────────────────────

const PostCard: FC<PostCardProps> = ({ post }) => {
  const t = useTranslations("PostCard");
  const [liked, setLiked] = useState<boolean>(post.liked ?? false);
  const [likeCount, setLikeCount] = useState<number>(post.likes);
  const [bookmarked, setBookmarked] = useState<boolean>(false);

  const toggleLike = (): void => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const formatCount = (n: number): string =>
    n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  return (
    <article className="p-4 lg:p-6 border-b border-gray-100 bg-white hover:bg-gray-50/40 transition-colors">
      <div className="flex gap-4">
        <Avatar initials={post.initials} color={post.avatarColor} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            <span className="font-bold text-gray-900 text-sm">{post.name}</span>
            <span className="text-gray-400 text-xs">
              {post.handle} · {post.time}
            </span>
          </div>
          <p className="text-gray-800 text-sm leading-relaxed mb-4">
            {post.content}
          </p>
          {post.image && (
            <div className="rounded-2xl overflow-hidden border border-gray-100 mb-4">
              <img
                src={post.image}
                alt={t("postedBy", { name: post.name })}
                className="w-full h-auto object-cover max-h-[480px]"
              />
            </div>
          )}


          {/* Interaction bar */}
          <div className="flex items-center gap-6 text-gray-400">
            {/* Like */}
            <button
              onClick={toggleLike}
              className={`flex items-center gap-1.5 transition-colors group ${
                liked ? "text-red-500" : "hover:text-red-500"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  liked ? "bg-red-50" : "group-hover:bg-red-50"
                }`}
              >
                <HeartIcon solid={liked} />
              </div>
              <span className="text-xs font-medium">{formatCount(likeCount)}</span>
            </button>

            {/* Comment */}
            <button className="flex items-center gap-1.5 hover:text-violet-600 transition-colors group">
              <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-violet-50 transition-colors">
                <CommentIcon />
              </div>
              <span className="text-xs font-medium">{post.comments}</span>
            </button>

            {/* Share */}
            <button className="flex items-center gap-1.5 hover:text-green-500 transition-colors group">
              <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-green-50 transition-colors">
                <ShareIcon />
              </div>
              {post.shares !== undefined && (
                <span className="text-xs font-medium">{post.shares}</span>
              )}
            </button>

            {/* Bookmark */}
            <button
              onClick={() => setBookmarked((p) => !p)}
              className={`flex items-center gap-1.5 transition-colors group ml-auto ${
                bookmarked ? "text-blue-500" : "hover:text-blue-500"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  bookmarked ? "bg-blue-50" : "group-hover:bg-blue-50"
                }`}
              >
                <BookmarkIcon solid={bookmarked} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
