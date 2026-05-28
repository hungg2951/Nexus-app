import Link from "next/link";
import { HubIcon } from "../icons/hub-icon";

interface LogoProps {
  href?: string;
  fontSize?: number;
}

export default function Logo({ href = "/", fontSize = 32 }: LogoProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 no-underline text-primary"
    >
      <HubIcon
        style={{
          width: fontSize,
          height: fontSize,
        }}
      />

      <span
        style={{
          fontSize,
          fontWeight: 900,
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        Nexus
      </span>
    </Link>
  );
}
