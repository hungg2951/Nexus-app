import type { FC, ReactNode } from "react";
import MainLayout from "@/components/layout/MainLayout";

interface MainRouteLayoutProps {
  children: ReactNode;
}

const MainRouteLayout: FC<MainRouteLayoutProps> = ({ children }) => (
  <MainLayout>{children}</MainLayout>
);

export default MainRouteLayout;
