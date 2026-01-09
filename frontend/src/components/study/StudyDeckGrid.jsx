"use client";

import { StudyDeckCard } from "./StudyDeckCard";

export function StudyDeckGrid({ decks }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {decks.map((deck) => (
        <StudyDeckCard key={deck.id} deck={deck} />
      ))}
    </div>
  );
}
