"use client";

import { DeckCard } from "./DeckCard";
import { AddDeckCard } from "./AddDeckCard";

export function DeckGrid({ decks, onAddClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <AddDeckCard onClick={onAddClick} />
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} />
      ))}
    </div>
  );
}
