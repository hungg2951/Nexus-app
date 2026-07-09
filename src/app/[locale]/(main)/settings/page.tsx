"use client";

import { useState } from "react";
import type { FC } from "react";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/lib/store/auth.store";
import PageHeader from "@/components/common/PageHeader";
import SettingsSection from "@/components/settings/SettingsSection";
import SettingsItem from "@/components/settings/SettingsItem";
import { ArrowLeftIcon } from "@/components/icons";

type Category = "account" | "privacy" | "notifications" | "appearance" | "language";

const SettingsPage: FC = () => {
  const t = useTranslations("Settings");
  const { user, setUser } = useAuthStore();
  const [activeCategory, setActiveCategory] = useState<Category>("account");
  const [showMobileDetail, setShowMobileDetail] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // ─── Settings Form States ───────────────────────────────────────────────────

  // Account
  const [accountForm, setAccountForm] = useState({
    username: user?.username || "khanh.fullstack",
    email: user?.email || "khanh.fullstack@nexus.com",
    phone: user?.phone || "0987654321",
  });

  // Privacy
  const [privacyForm, setPrivacyForm] = useState({
    privateAccount: false,
    showOnlineStatus: true,
    readReceipts: true,
    allowTagging: true,
  });

  // Notifications
  const [notificationsForm, setNotificationsForm] = useState({
    likes: true,
    comments: true,
    follows: true,
    mentions: true,
    messages: true,
    emailNotifications: false,
  });

  // Appearance
  const [appearanceForm, setAppearanceForm] = useState({
    theme: "light",
    fontSize: "medium",
  });

  // Language
  const [languageForm, setLanguageForm] = useState({
    language: "vi",
    timezone: "GMT+7",
    dateFormat: "DD/MM/YYYY",
  });

  // Show Toast helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleSave = () => {
    // Save to auth store if account details changed
    if (user) {
      setUser({
        ...user,
        username: accountForm.username,
        email: accountForm.email,
        phone: accountForm.phone,
      });
    }
    triggerToast(t("saved"));
  };

  // ─── Categories List ────────────────────────────────────────────────────────

  const categories: Array<{ id: Category; label: string }> = [
    { id: "account", label: t("categories.account") },
    { id: "privacy", label: t("categories.privacy") },
    { id: "notifications", label: t("categories.notifications") },
    { id: "appearance", label: t("categories.appearance") },
    { id: "language", label: t("categories.language") },
  ];

  // ─── Render Category Detail ─────────────────────────────────────────────────

  const renderCategoryDetail = () => {
    switch (activeCategory) {
      case "account":
        return (
          <div className="space-y-6">
            <SettingsSection title={t("account.title")}>
              <SettingsItem
                label={t("account.username")}
                control="input"
                value={accountForm.username}
                onChange={(val) => setAccountForm({ ...accountForm, username: val })}
              />
              <SettingsItem
                label={t("account.email")}
                control="input"
                value={accountForm.email}
                onChange={(val) => setAccountForm({ ...accountForm, email: val })}
              />
              <SettingsItem
                label={t("account.phone")}
                control="input"
                value={accountForm.phone}
                onChange={(val) => setAccountForm({ ...accountForm, phone: val })}
              />
              <SettingsItem
                label={t("account.changePassword")}
                description="Cập nhật mật khẩu để bảo vệ tài khoản của bạn"
                control="button"
                buttonText={t("account.changePassword")}
                onButtonClick={() => triggerToast("Chức năng đổi mật khẩu đang được phát triển")}
              />
              <SettingsItem
                label={t("account.deleteAccount")}
                description={t("account.deleteWarning")}
                control="button"
                buttonText={t("account.deleteAccount")}
                buttonVariant="danger"
                onButtonClick={() => alert("Cảnh báo: Bạn có chắc chắn muốn xóa tài khoản?")}
              />
            </SettingsSection>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-6">
            <SettingsSection title={t("privacy.title")}>
              <SettingsItem
                label={t("privacy.privateAccount")}
                description={t("privacy.privateAccountDesc")}
                control="toggle"
                value={privacyForm.privateAccount}
                onChange={(val) => setPrivacyForm({ ...privacyForm, privateAccount: val })}
              />
              <SettingsItem
                label={t("privacy.showOnlineStatus")}
                description={t("privacy.showOnlineStatusDesc")}
                control="toggle"
                value={privacyForm.showOnlineStatus}
                onChange={(val) => setPrivacyForm({ ...privacyForm, showOnlineStatus: val })}
              />
              <SettingsItem
                label={t("privacy.readReceipts")}
                description={t("privacy.readReceiptsDesc")}
                control="toggle"
                value={privacyForm.readReceipts}
                onChange={(val) => setPrivacyForm({ ...privacyForm, readReceipts: val })}
              />
              <SettingsItem
                label={t("privacy.allowTagging")}
                description={t("privacy.allowTaggingDesc")}
                control="toggle"
                value={privacyForm.allowTagging}
                onChange={(val) => setPrivacyForm({ ...privacyForm, allowTagging: val })}
              />
            </SettingsSection>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <SettingsSection title={t("notifications.title")}>
              <SettingsItem
                label={t("notifications.likes")}
                description={t("notifications.likesDesc")}
                control="toggle"
                value={notificationsForm.likes}
                onChange={(val) => setNotificationsForm({ ...notificationsForm, likes: val })}
              />
              <SettingsItem
                label={t("notifications.comments")}
                description={t("notifications.commentsDesc")}
                control="toggle"
                value={notificationsForm.comments}
                onChange={(val) => setNotificationsForm({ ...notificationsForm, comments: val })}
              />
              <SettingsItem
                label={t("notifications.follows")}
                description={t("notifications.followsDesc")}
                control="toggle"
                value={notificationsForm.follows}
                onChange={(val) => setNotificationsForm({ ...notificationsForm, follows: val })}
              />
              <SettingsItem
                label={t("notifications.mentions")}
                description={t("notifications.mentionsDesc")}
                control="toggle"
                value={notificationsForm.mentions}
                onChange={(val) => setNotificationsForm({ ...notificationsForm, mentions: val })}
              />
              <SettingsItem
                label={t("notifications.messages")}
                description={t("notifications.messagesDesc")}
                control="toggle"
                value={notificationsForm.messages}
                onChange={(val) => setNotificationsForm({ ...notificationsForm, messages: val })}
              />
              <SettingsItem
                label={t("notifications.emailNotifications")}
                description={t("notifications.emailNotificationsDesc")}
                control="toggle"
                value={notificationsForm.emailNotifications}
                onChange={(val) =>
                  setNotificationsForm({ ...notificationsForm, emailNotifications: val })
                }
              />
            </SettingsSection>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <SettingsSection title={t("appearance.title")}>
              <SettingsItem
                label={t("appearance.theme")}
                control="select"
                value={appearanceForm.theme}
                onChange={(val) => setAppearanceForm({ ...appearanceForm, theme: val })}
                options={[
                  { label: t("appearance.themeLight"), value: "light" },
                  { label: t("appearance.themeDark"), value: "dark" },
                  { label: t("appearance.themeSystem"), value: "system" },
                ]}
              />
              <SettingsItem
                label={t("appearance.fontSize")}
                control="select"
                value={appearanceForm.fontSize}
                onChange={(val) => setAppearanceForm({ ...appearanceForm, fontSize: val })}
                options={[
                  { label: t("appearance.fontSizeSmall"), value: "small" },
                  { label: t("appearance.fontSizeMedium"), value: "medium" },
                  { label: t("appearance.fontSizeLarge"), value: "large" },
                ]}
              />
            </SettingsSection>
          </div>
        );

      case "language":
        return (
          <div className="space-y-6">
            <SettingsSection title={t("language.title")}>
              <SettingsItem
                label={t("language.language")}
                control="select"
                value={languageForm.language}
                onChange={(val) => setLanguageForm({ ...languageForm, language: val })}
                options={[
                  { label: t("language.vietnamese"), value: "vi" },
                  { label: t("language.english"), value: "en" },
                ]}
              />
              <SettingsItem
                label={t("language.timezone")}
                control="select"
                value={languageForm.timezone}
                onChange={(val) => setLanguageForm({ ...languageForm, timezone: val })}
                options={[
                  { label: "GMT+7 (Hanoi)", value: "GMT+7" },
                  { label: "GMT+0 (UTC)", value: "GMT+0" },
                  { label: "GMT-5 (EST)", value: "GMT-5" },
                ]}
              />
              <SettingsItem
                label={t("language.dateFormat")}
                control="select"
                value={languageForm.dateFormat}
                onChange={(val) => setLanguageForm({ ...languageForm, dateFormat: val })}
                options={[
                  { label: "DD/MM/YYYY", value: "DD/MM/YYYY" },
                  { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
                  { label: "YYYY-MM-DD", value: "YYYY-MM-DD" },
                ]}
              />
            </SettingsSection>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/40 relative pb-20">
      <PageHeader title={t("title")} />

      {/* Main Settings Layout Grid */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Categories Sidebar (desktop) / Menu list (mobile) */}
          <aside
            className={`lg:col-span-4 bg-white rounded-2xl border border-gray-100 p-2 space-y-1 shadow-sm ${
              showMobileDetail ? "hidden lg:block" : "block"
            }`}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setShowMobileDetail(true);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm transition-all flex justify-between items-center ${
                    isActive
                      ? "bg-violet-50 text-primary"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="lg:hidden text-gray-400 font-normal">→</span>
                </button>
              );
            })}
          </aside>

          {/* Setting Details Area */}
          <div
            className={`lg:col-span-8 space-y-6 ${
              showMobileDetail ? "block" : "hidden lg:block"
            }`}
          >
            {/* Back Button on Mobile */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowMobileDetail(false)}
                className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-white border border-gray-100 px-3 py-2 rounded-xl"
              >
                <ArrowLeftIcon />
                <span>Quay lại</span>
              </button>
            </div>

            {renderCategoryDetail()}

            {/* Sticky/Fixed bottom Action Buttons inside content block */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 bg-white p-4 rounded-2xl border border-gray-50 shadow-sm">
              <button
                onClick={() => {
                  triggerToast("Đã hủy thay đổi");
                  setShowMobileDetail(false);
                }}
                className="px-4 py-2 rounded-xl text-sm font-bold border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all"
              >
                {t("cancel")}
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary-hover shadow-sm transition-all"
              >
                {t("save")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Save Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900/95 text-white px-5 py-3 rounded-2xl shadow-xl z-50 text-xs md:text-sm font-semibold flex items-center gap-2 backdrop-blur-md border border-white/10 animate-fade-in">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
