// ─── Types ────────────────────────────────────────────────────────────────────

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  initials: string;
  avatarUrl?: string | null;
  color?: string;
  size?: AvatarSize;
}

export interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href?: string;
  active?: boolean;
  badge?: string | number;
}

export interface IconWithSolidProps {
  solid?: boolean;
}

export interface Post {
  id: number;
  initials: string;
  avatarColor: string;
  name: string;
  handle: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares?: number;
  liked?: boolean;
}

export interface PostCardProps {
  post: Post;
}

export interface TrendingItemProps {
  category: string;
  tag: string;
  count: string;
  active?: boolean;
}

export interface SuggestionItemProps {
  initials: string;
  name: string;
  handle: string;
  avatarColor: string;
  following?: boolean;
}

// ─── Notification ─────────────────────────────────────────────────────────────

export type NotificationType = "like" | "comment" | "follow" | "share" | "mention";

export interface Notification {
  id: number;
  type: NotificationType;
  actor: {
    name: string;
    handle: string;
    initials: string;
    avatarColor: string;
  };
  content?: string;
  postPreview?: string;
  time: string;
  read: boolean;
}

// ─── Messages ─────────────────────────────────────────────────────────────────

export interface Message {
  id: number;
  senderId: number;
  text: string;
  time: string;
  read?: boolean;
}

export interface Conversation {
  id: number;
  participant: {
    name: string;
    handle: string;
    initials: string;
    avatarColor: string;
    online: boolean;
  };
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
  messages: Message[];
}

// ─── User Profile ─────────────────────────────────────────────────────────────

export interface UserProfile {
  id: number;
  name: string;
  handle: string;
  initials: string;
  avatarColor: string;
  avatarUrl?: string;
  bio: string;
  location?: string;
  website?: string;
  joinDate: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  coverGradient: string;
  isFollowing: boolean;
  isOwnProfile: boolean;
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export type SettingsCategory =
  | "account"
  | "privacy"
  | "notifications"
  | "appearance"
  | "language";
