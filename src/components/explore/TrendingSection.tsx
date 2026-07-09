import type { FC } from "react";

interface TrendingTopic {
  tag: string;
  category: string;
  count: string;
  gradient: string;
}

interface TrendingSectionProps {
  title: string;
  subtitle: string;
  postsLabel: string;
  topics: TrendingTopic[];
}

// ─── TrendingSection ──────────────────────────────────────────────────────────

const TrendingSection: FC<TrendingSectionProps> = ({
  title,
  subtitle,
  postsLabel,
  topics,
}) => (
  <section>
    <div className="mb-4">
      <h3 className="text-base font-bold text-gray-900">{title}</h3>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
    <div className="flex gap-3 flex-wrap">
      {topics.map((topic) => (
        <button
          key={topic.tag}
          className={`group relative overflow-hidden rounded-2xl px-5 py-3 text-left hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md ${topic.gradient}`}
        >
          <p className="text-[10px] font-semibold text-white/80 uppercase tracking-wider">
            {topic.category}
          </p>
          <p className="text-sm font-bold text-white mt-0.5">{topic.tag}</p>
          <p className="text-[10px] text-white/70 mt-1">
            {postsLabel.replace("{count}", topic.count)}
          </p>
          <div className="absolute -right-2 -bottom-2 w-12 h-12 bg-white/10 rounded-full" />
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/5 rounded-full" />
        </button>
      ))}
    </div>
  </section>
);

export default TrendingSection;
