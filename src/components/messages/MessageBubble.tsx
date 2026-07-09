import type { FC } from "react";
import type { Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

// ─── MessageBubble ────────────────────────────────────────────────────────────

const MessageBubble: FC<MessageBubbleProps> = ({ message, isOwn }) => (
  <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`}>
    <div
      className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
        isOwn
          ? "bg-primary text-white rounded-br-sm"
          : "bg-gray-100 text-gray-800 rounded-bl-sm"
      }`}
    >
      <p>{message.text}</p>
      <p
        className={`text-[10px] mt-1 ${
          isOwn ? "text-white/60" : "text-gray-400"
        }`}
      >
        {message.time}
      </p>
    </div>
  </div>
);

export default MessageBubble;
