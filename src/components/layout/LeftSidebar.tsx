import type { FC } from "react";
import { useTranslations } from "next-intl";
import Avatar from "@/components/Avatar";
import NavItem from "@/components/nav/NavItem";
import {
  HouseIcon,
  CompassIcon,
  BellIcon,
  EnvelopeIcon,
  BookmarkIcon,
  UserIcon,
  GearIcon,
} from "@/components/icons";
import Logo from "../logo/Logo";
import { useAuthStore } from "@/lib/store/auth.store";

// ─── Left Sidebar ─────────────────────────────────────────────────────────────

const LeftSidebar: FC = () => {
  const t = useTranslations("Nav");

  const { user } = useAuthStore();

  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  const initials = `${user?.firstName?.[0] || ""}${
    user?.lastName?.[0] || ""
  }`.toUpperCase();

  return (
    <aside className="hidden md:flex md:w-20 lg:w-72 border-r border-gray-100 px-4 lg:px-6 py-8 flex-col justify-between sticky top-0 h-screen">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10 px-2 justify-center lg:justify-start">
          <Logo />
        </div>

        {/* Nav */}
        <nav className="space-y-1">
          <NavItem href="/" icon={<HouseIcon />} label={t("feed")} active />
          <NavItem
            href="/explore"
            icon={<CompassIcon />}
            label={t("explore")}
          />
          <NavItem
            href="/notifications"
            icon={<BellIcon />}
            label={t("notifications")}
            badge="4"
          />
          <NavItem
            href="/messages"
            icon={<EnvelopeIcon />}
            label={t("messages")}
          />
          <NavItem
            href="/bookmarks"
            icon={<BookmarkIcon />}
            label={t("bookmarks")}
          />
          <NavItem href="/profile" icon={<UserIcon />} label={t("profile")} />
          <NavItem href="/settings" icon={<GearIcon />} label={t("settings")} />
        </nav>
      </div>

      {/* User card */}
      <div className="bg-gray-100 rounded-2xl p-2 lg:p-4 flex items-center gap-3 justify-center lg:justify-start">
        <Avatar
          initials={initials}
          avatarUrl={user?.avatarUrl}
          size="sm"
        />

        <div className="overflow-hidden hidden lg:block">
          <p className="font-semibold text-sm truncate">
            {fullName || "Unknown User"}
          </p>

          <p className="text-xs text-gray-500 truncate">
            @{user?.username || "username"}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
