"use client";
import Logo from "@/components/logo/Logo";
import { useTranslations } from "next-intl";

interface BrandSectionProps {
  taglineKey?: string;
  imageSrc?: string;
}

export function BrandSection({
  imageSrc = "https://res.cloudinary.com/dwp6prxjo/image/upload/v1779702023/83zWJdc6PJI_p0rktj.png",
}: BrandSectionProps) {
  const t = useTranslations("Register");

  return (
    <div className="absolute inset-0 flex flex-col px-10">
      <div className="p-8">
        <Logo fontSize={40} />
      </div>

      <div className="flex-1 relative">
        <img
          src={imageSrc}
          className="absolute right-0 top-0 h-full w-auto object-contain object-right"
          alt=""
        />
        <div className="absolute bottom-28 left-8">
          <h2 className="text-5xl font-black leading-tight max-w-[360px]">
            {t("brand.tagline")}
          </h2>
        </div>
      </div>
    </div>
  );
}