"use client";

import { useState } from "react";
import type { FC } from "react";
import { SearchIcon } from "@/components/icons";

interface SearchBarProps {
  placeholder: string;
}

// ─── SearchBar ────────────────────────────────────────────────────────────────

const SearchBar: FC<SearchBarProps> = ({ placeholder }) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div
      className={`relative flex items-center gap-3 bg-gray-50 border-2 rounded-2xl px-4 py-3 transition-all duration-200 ${
        focused
          ? "border-primary bg-white shadow-md shadow-primary/10"
          : "border-transparent hover:border-gray-200"
      }`}
    >
      <span className={`transition-colors ${focused ? "text-primary" : "text-gray-400"}`}>
        <SearchIcon />
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="text-gray-300 hover:text-gray-500 transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
