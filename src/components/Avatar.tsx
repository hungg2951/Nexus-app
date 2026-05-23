import type { FC } from "react";
import type { AvatarProps, AvatarSize } from "@/types";

// ─── Avatar ───────────────────────────────────────────────────────────────────

const AVATAR_SIZES: Record<AvatarSize, string> = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

const Avatar: FC<AvatarProps> = ({
  initials,
  color = "bg-violet-600",
  size = "md",
}) => (
  <div
    className={`${AVATAR_SIZES[size]} ${color} rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold`}
  >
    {initials}
  </div>
);

export default Avatar;
