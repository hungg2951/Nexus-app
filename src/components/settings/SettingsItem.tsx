"use client";

import type { FC, ReactNode } from "react";

interface SettingsItemProps {
  label: string;
  description?: string;
  control: "toggle" | "input" | "select" | "button" | "custom";
  value?: any;
  onChange?: (val: any) => void;
  // Options for select control
  options?: Array<{ label: string; value: string }>;
  // Input placeholder
  placeholder?: string;
  // Button text
  buttonText?: string;
  // Button type
  buttonVariant?: "primary" | "danger" | "secondary";
  onButtonClick?: () => void;
  // Custom control node
  customControl?: ReactNode;
}

const SettingsItem: FC<SettingsItemProps> = ({
  label,
  description,
  control,
  value,
  onChange,
  options = [],
  placeholder = "",
  buttonText = "",
  buttonVariant = "secondary",
  onButtonClick,
  customControl,
}) => {
  const renderControl = () => {
    switch (control) {
      case "toggle":
        return (
          <button
            type="button"
            onClick={() => onChange?.(!value)}
            className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 focus:outline-none ${
              value ? "bg-primary" : "bg-gray-200"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${
                value ? "left-[22px]" : "left-0.5"
              }`}
            />
          </button>
        );
      case "input":
        return (
          <input
            type="text"
            value={value || ""}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className="w-full md:w-64 px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          />
        );
      case "select":
        return (
          <select
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full md:w-48 px-3 py-2 text-sm rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white cursor-pointer transition-all"
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      case "button":
        const btnClasses = {
          primary: "bg-primary text-white hover:bg-primary-hover",
          danger: "bg-red-50 text-red-600 border border-red-100 hover:bg-red-100",
          secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
        };
        return (
          <button
            type="button"
            onClick={onButtonClick}
            className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${btnClasses[buttonVariant]}`}
          >
            {buttonText}
          </button>
        );
      case "custom":
        return customControl;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex-1 min-w-0 pr-4">
        <h4 className="font-bold text-gray-900 text-sm">{label}</h4>
        {description && <p className="text-xs text-gray-400 mt-1 leading-relaxed">{description}</p>}
      </div>
      <div className="flex items-center justify-start md:justify-end">{renderControl()}</div>
    </div>
  );
};

export default SettingsItem;
