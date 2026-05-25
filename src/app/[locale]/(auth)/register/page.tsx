"use client";
import Logo from "@/components/logo/Logo";
import { useState } from "react";
import styles from "./Nexusregisterpage.module.css";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Header() {
  const t = useTranslations("Register");
  return (
    <header className={styles.nexusHeader}>
      <div className={styles.navContainer}>
        <Logo />
        <nav className={styles.navLinks}>
          <Link href="/about" className={styles.navLink}>
            {t("nav.about")}
          </Link>
          <Link href="/login" className={styles.btnLogin}>
            {t("nav.login")}
          </Link>
        </nav>
      </div>
    </header>
  );
}

function BrandSection() {
  const t = useTranslations("Register");
  return (
    <div className={styles.brandSection}>
      <div className={styles.brandLogoLarge}>
        <Logo fontSize={60} />
      </div>
      <h2 className={styles.brandSubtitle}>{t("brand.tagline")}</h2>
    </div>
  );
}

function RegistrationCard() {
  const t = useTranslations("Register.form");
  const [gender, setGender] = useState("");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1),
    label: t(`months.${i + 1}`),
  }));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const genders = [
    { key: "female", label: t("genders.female") },
    { key: "male", label: t("genders.male") },
    { key: "other", label: t("genders.other") },
  ];

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.regCard}>
        <div className={styles.cardHeader}>
          <h3>{t("title")}</h3>
          <p>{t("subtitle")}</p>
        </div>

        <form className={styles.nexusForm} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.inputRow}>
            <Input placeholder={t("lastName")} />
            <Input placeholder={t("firstName")} />
          </div>

          <Input placeholder={t("emailOrPhone")} type="text" />
          <Input placeholder={t("newPassword")} type="password" />

          {/* Birthday */}
          <div>
            <Label className={styles.fieldLabel}>{t("birthday")}</Label>
            <div className={styles.grid3}>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t("day")} />
                </SelectTrigger>
                <SelectContent>
                  {days.map((d) => (
                    <SelectItem key={d} value={String(d)}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t("month")} />
                </SelectTrigger>
                <SelectContent>
                  {months.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t("year")} />
                </SelectTrigger>
                <SelectContent>
                  {years.map((y) => (
                    <SelectItem key={y} value={String(y)}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Gender */}
          <div>
            <Label className={styles.fieldLabel}>{t("gender")}</Label>
            <div className={styles.grid3}>
              {genders.map(({ key, label }) => (
                <label className={styles.genderOption} key={key}>
                  <span>{label}</span>
                  <input
                    name="gender"
                    type="radio"
                    value={key}
                    checked={gender === key}
                    onChange={() => setGender(key)}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Terms */}
          <p className={styles.legalText}>
            {t.rich("terms", {
              termsLink: (chunks) => <Link href="/terms">{chunks}</Link>,
              privacyLink: (chunks) => <Link href="/privacy">{chunks}</Link>,
              cookieLink: (chunks) => <Link href="/cookies">{chunks}</Link>,
            })}
          </p>

          <div className={styles.submitContainer}>
            <Button type="submit" className={styles.btnRegister}>
              {t("submit")}
            </Button>
          </div>
        </form>

        <div className={styles.cardFooter}>
          <Link href="/login">{t("alreadyHaveAccount")}</Link>
        </div>
      </div>

    </div>
  );
}

export default function NexusRegisterPage() {
  return (
    <div className={styles.nexusRoot}>
      <Header />
      <main className={styles.nexusMain}>
        <div className={styles.heroContainer}>
          <BrandSection />
          <RegistrationCard />
        </div>
      </main>
    </div>
  );
}
