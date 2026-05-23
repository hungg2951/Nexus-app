"use client";

import type { FC } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  HouseIcon,
  CompassIcon,
  BellIcon,
  UserIcon,
  PlusIcon,
} from "@/components/icons";

// ─── Mobile Bottom Navigation ────────────────────────────────────────────────

const MobileNav: FC = () => {
  const t = useTranslations("MobileNav");

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-3 z-30">
      <Link
        href="/"
        className="text-violet-600 flex flex-col items-center"
        aria-label={t("feed")}
      >
        <HouseIcon />
      </Link>
      <Link
        href="/explore"
        className="text-gray-400 flex flex-col items-center"
        aria-label={t("explore")}
      >
        <CompassIcon />
      </Link>
      <button
        className="w-12 h-12 bg-violet-600 text-white rounded-full flex items-center justify-center shadow-lg -mt-8 border-4 border-white"
        aria-label={t("createPost")}
      >
        <PlusIcon />
      </button>
      <Link
        href="/notifications"
        className="text-gray-400 flex flex-col items-center relative"
        aria-label={t("notifications")}
      >
        <BellIcon />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold px-1 rounded-full leading-tight">
          4
        </span>
      </Link>
      <Link
        href="/profile"
        className="text-gray-400 flex flex-col items-center"
        aria-label={t("profile")}
      >
        <UserIcon />
      </Link>
    </nav>
  );
};

export default MobileNav;

