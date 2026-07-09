import type { FC } from "react";
import type { AvatarProps, AvatarSize } from "@/types";
import Image from "next/image";

// ─── Avatar ───────────────────────────────────────────────────────────────────

const AVATAR_SIZES: Record<AvatarSize, string> = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-24 h-24 text-2xl md:w-32 md:h-32 md:text-4xl",
};

const Avatar: FC<AvatarProps> = ({
  initials,
  avatarUrl,
  color = "bg-primary",
  size = "md",
}) => {
  return (
    <div
      className={`relative ${AVATAR_SIZES[size]} ${color} rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center text-white font-bold`}
    >
      {avatarUrl ? (
        <Image src={avatarUrl} alt={initials} fill className="object-cover" />
      ) : (
        initials
      )}
    </div>
  );
};

export default Avatar;
