import Logo from "../logo/Logo";
import { BrandSection } from "./auth-brand-section";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-['Inter',sans-serif] text-[#141b2b] leading-[1.5] min-h-screen flex flex-col bg-white">
      {/* Logo mobile */}
      <div className="lg:hidden px-6 py-4 border-b border-[#c7c4d7]">
        <Logo />
      </div>

      <main className="flex flex-1">
        {/* Left */}
        <div className="hidden lg:flex flex-[1.5] relative overflow-hidden border-r border-[#c7c4d7] bg-white">
          <BrandSection />
        </div>

        {/* Right */}
        <div className="flex flex-1 items-center justify-center m-auto px-6 py-4 lg:p-0">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
