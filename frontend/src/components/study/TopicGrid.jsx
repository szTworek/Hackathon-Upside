"use client";

import { TopicCard } from "./TopicCard";

export function TopicGrid({ topics, deckId }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} deckId={deckId} />
      ))}
    </div>
  );
}
