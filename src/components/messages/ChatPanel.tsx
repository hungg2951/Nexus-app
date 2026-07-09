"use client";

import { useState, useRef, useEffect } from "react";
import type { FC } from "react";
import type { Conversation } from "@/types";
import Avatar from "@/components/Avatar";
import MessageBubble from "@/components/messages/MessageBubble";
import { SendIcon, ImageIcon, SmileIcon } from "@/components/icons";

interface ChatPanelProps {
  conversation: Conversation;
  onlineLabel: string;
  offlineLabel: string;
  placeholder: string;
  sendLabel: string;
}

// ─── ChatPanel ────────────────────────────────────────────────────────────────

const ChatPanel: FC<ChatPanelProps> = ({
  conversation,
  onlineLabel,
  offlineLabel,
  placeholder,
  sendLabel,
}) => {
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.id]);

  const handleSend = () => {
    if (!text.trim()) return;
    setText("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white sticky top-0">
        <div className="relative">
          <Avatar
            initials={conversation.participant.initials}
            color={conversation.participant.avatarColor}
            size="md"
          />
          {conversation.participant.online && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
          )}
        </div>
        <div>
          <p className="font-bold text-sm text-gray-900">
            {conversation.participant.name}
          </p>
          <p
            className={`text-xs font-medium ${
              conversation.participant.online
                ? "text-green-500"
                : "text-gray-400"
            }`}
          >
            {conversation.participant.online ? onlineLabel : offlineLabel}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 [&::-webkit-scrollbar]:hidden">
        {conversation.messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.senderId === 0}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-gray-100 bg-white">
        <div className="flex items-end gap-3">
          <div className="flex gap-2 text-gray-400 pb-2.5">
            <button className="hover:text-primary transition-colors">
              <ImageIcon />
            </button>
            <button className="hover:text-primary transition-colors">
              <SmileIcon />
            </button>
          </div>
          <div className="flex-1 relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={placeholder}
              rows={1}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none placeholder:text-gray-400 transition-all max-h-32"
              style={{ minHeight: 42 }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            className={`p-2.5 rounded-xl transition-all flex-shrink-0 mb-0.5 ${
              text.trim()
                ? "bg-primary text-white hover:bg-primary-hover shadow-sm active:scale-95"
                : "bg-gray-100 text-gray-300 cursor-not-allowed"
            }`}
            aria-label={sendLabel}
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
