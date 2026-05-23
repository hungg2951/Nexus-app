// ─── Types ────────────────────────────────────────────────────────────────────

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
  initials: string;
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
