import type { FC } from "react";
import type { Conversation } from "@/types";
import Avatar from "@/components/Avatar";

interface ConversationListProps {
  conversations: Conversation[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  searchPlaceholder: string;
  youLabel: string;
}

// ─── ConversationList ─────────────────────────────────────────────────────────

const ConversationList: FC<ConversationListProps> = ({
  conversations,
  selectedId,
  onSelect,
  searchPlaceholder,
  youLabel,
}) => (
  <div className="flex flex-col h-full">
    {/* Search */}
    <div className="p-3 border-b border-gray-100">
      <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </div>
    </div>

    {/* List */}
    <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
      {conversations.map((conv) => {
        const isSelected = selectedId === conv.id;
        const lastMsg = conv.messages[conv.messages.length - 1];
        const isFromMe = lastMsg?.senderId === 0;

        return (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left hover:bg-gray-50 ${
              isSelected ? "bg-primary/5 border-r-2 border-primary" : ""
            }`}
          >
            {/* Avatar with online indicator */}
            <div className="relative flex-shrink-0">
              <Avatar
                initials={conv.participant.initials}
                color={conv.participant.avatarColor}
                size="md"
              />
              {conv.participant.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className={`text-sm font-semibold truncate ${isSelected ? "text-primary" : "text-gray-900"}`}>
                  {conv.participant.name}
                </p>
                <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">
                  {conv.lastTime}
                </span>
              </div>
              <p className="text-xs text-gray-400 truncate">
                {isFromMe && <span className="font-medium">{youLabel}: </span>}
                {conv.lastMessage}
              </p>
            </div>

            {/* Unread badge */}
            {conv.unreadCount > 0 && (
              <span className="flex-shrink-0 min-w-[18px] h-[18px] bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                {conv.unreadCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  </div>
);

export default ConversationList;
