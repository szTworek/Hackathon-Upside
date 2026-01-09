"use client";

import { FlashcardItem } from "./FlashcardItem";

export function FlashcardList({ flashcards }) {
  return (
    <div className="space-y-3">
      {flashcards.map((flashcard) => (
        <FlashcardItem key={flashcard.id} flashcard={flashcard} />
      ))}
    </div>
  );
}
