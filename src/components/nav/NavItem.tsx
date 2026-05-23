import type { FC } from "react";
import { Link } from "@/i18n/routing";
import type { NavItemProps } from "@/types";


// ─── NavItem ──────────────────────────────────────────────────────────────────

const NavItem: FC<NavItemProps> = ({ icon, label, active = false, badge, href = "/" }) => (
  <Link
    href={href}
    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all justify-center lg:justify-start relative ${
      active
        ? "bg-violet-50 text-violet-700 font-semibold"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span className="hidden lg:block text-sm">{label}</span>
    {badge !== undefined && (
      <span className="absolute right-2 lg:right-4 top-2 lg:top-1/2 lg:-translate-y-1/2 bg-violet-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
        {badge}
      </span>
    )}
  </Link>
);

export default NavItem;
