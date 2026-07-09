"use client";

import type { FC } from "react";

interface ProfileTabsProps {
  activeTab: "posts" | "photos" | "likes";
  onTabChange: (tab: "posts" | "photos" | "likes") => void;
  labels: {
    posts: string;
    photos: string;
    likes: string;
  };
}

const ProfileTabs: FC<ProfileTabsProps> = ({ activeTab, onTabChange, labels }) => {
  const tabs: Array<{ id: "posts" | "photos" | "likes"; label: string }> = [
    { id: "posts", label: labels.posts },
    { id: "photos", label: labels.photos },
    { id: "likes", label: labels.likes },
  ];

  return (
    <div className="flex border-b border-gray-100 bg-white sticky top-0 z-10">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="flex-1 py-4 text-center text-sm font-semibold relative transition-colors"
          >
            <span className={isActive ? "text-primary" : "text-gray-500 hover:text-gray-900"}>
              {tab.label}
            </span>
            {isActive && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-t-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ProfileTabs;
