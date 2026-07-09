import type { FC, ReactNode } from "react";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import MobileNav from "@/components/nav/MobileNav";

interface MainLayoutProps {
  children: ReactNode;
  /** Ẩn RightSidebar (dùng cho Messages page) */
  hideRightSidebar?: boolean;
}

// ─── MainLayout ────────────────────────────────────────────────────────────────

const MainLayout: FC<MainLayoutProps> = ({ children, hideRightSidebar = false }) => (
  <div className="max-w-[1440px] mx-auto flex min-h-screen bg-white text-gray-900 font-sans antialiased pb-16 md:pb-0">
    <LeftSidebar />
    <main className="flex-1 bg-white border-r border-gray-100 min-w-0">
      {children}
    </main>
    {!hideRightSidebar && <RightSidebar />}
    <MobileNav />
  </div>
);

export default MainLayout;
