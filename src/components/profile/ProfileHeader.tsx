"use client";

import type { FC } from "react";
import Avatar from "@/components/Avatar";
import type { UserProfile } from "@/types";
import { MapPinIcon, LinkIcon, CalendarIcon, EnvelopeIcon } from "@/components/icons";

interface ProfileHeaderProps {
  profile: UserProfile;
  editLabel: string;
  followLabel: string;
  followingLabel: string;
  messageLabel: string;
  onEditClick?: () => void;
  onFollowToggle?: () => void;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({
  profile,
  editLabel,
  followLabel,
  followingLabel,
  messageLabel,
  onEditClick,
  onFollowToggle,
}) => {
  return (
    <div className="border-b border-gray-100 bg-white">
      {/* Cover Photo */}
      <div className={`h-40 md:h-52 w-full bg-gradient-to-r ${profile.coverGradient} relative`} />

      {/* Profile Details Container */}
      <div className="px-4 md:px-6 pb-6 relative">
        {/* Avatar & Action Button Row */}
        <div className="flex justify-between items-end -mt-12 md:-mt-16 mb-4">
          <div className="border-4 border-white rounded-full bg-white shadow-sm overflow-hidden">
            <Avatar
              initials={profile.initials}
              avatarUrl={profile.avatarUrl}
              color={profile.avatarColor}
              size="xl"
            />
          </div>

          <div className="flex gap-2">
            {profile.isOwnProfile ? (
              <button
                onClick={onEditClick}
                className="px-4 py-2 border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 rounded-xl text-xs md:text-sm font-bold transition-all shadow-sm"
              >
                {editLabel}
              </button>
            ) : (
              <>
                <button className="p-2 border border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all shadow-sm">
                  <EnvelopeIcon />
                </button>
                <button
                  onClick={onFollowToggle}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all border shadow-sm ${
                    profile.isFollowing
                      ? "border-primary/30 bg-primary/5 text-primary hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                      : "border-primary bg-primary text-white hover:bg-primary-hover"
                  }`}
                >
                  {profile.isFollowing ? followingLabel : followLabel}
                </button>
              </>
            )}
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-xs md:text-sm text-gray-400">{profile.handle}</p>
          </div>

          {profile.bio ? (
            <p className="text-sm text-gray-700 leading-relaxed max-w-2xl">{profile.bio}</p>
          ) : (
            <p className="text-sm text-gray-400 italic">Chưa có tiểu sử.</p>
          )}

          {/* Meta Info: Location, Website, Join Date */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-500">
            {profile.location && (
              <div className="flex items-center gap-1">
                <MapPinIcon />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.website && (
              <div className="flex items-center gap-1">
                <LinkIcon />
                <a
                  href={`https://${profile.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {profile.website}
                </a>
              </div>
            )}
            <div className="flex items-center gap-1">
              <CalendarIcon />
              <span>{profile.joinDate}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 pt-2 border-t border-gray-50">
            <div className="flex gap-1 text-sm">
              <span className="font-bold text-gray-900">
                {profile.followingCount >= 1000
                  ? `${(profile.followingCount / 1000).toFixed(1)}k`
                  : profile.followingCount}
              </span>
              <span className="text-gray-400">Đang theo dõi</span>
            </div>
            <div className="flex gap-1 text-sm">
              <span className="font-bold text-gray-900">
                {profile.followersCount >= 1000
                  ? `${(profile.followersCount / 1000).toFixed(1)}k`
                  : profile.followersCount}
              </span>
              <span className="text-gray-400">Người theo dõi</span>
            </div>
            <div className="flex gap-1 text-sm">
              <span className="font-bold text-gray-900">
                {profile.postsCount >= 1000
                  ? `${(profile.postsCount / 1000).toFixed(1)}k`
                  : profile.postsCount}
              </span>
              <span className="text-gray-400">Bài viết</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
