"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDeck, getTopic, getFlashcards } from "@/lib/api";
import { FlashcardList } from "@/components/study/FlashcardList";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function FlashcardsPage({ params }) {
  const { deckId, topicId } = use(params);
  const [deck, setDeck] = useState(null);
  const [topic, setTopic] = useState(null);
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getDeck(deckId), getTopic(topicId), getFlashcards(topicId)])
      .then(([deckData, topicData, flashcardsData]) => {
        setDeck(deckData);
        setTopic(topicData);
        setFlashcards(flashcardsData);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [deckId, topicId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !deck || !topic) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Nie znaleziono tematu</h1>
        <Link href="/nauka">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrot do nauki
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href={`/nauka/${deckId}`}>
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{topic.title}</h1>
          <p className="text-muted-foreground">
            {deck.title} - {flashcards.length} fiszek
          </p>
        </div>
      </div>

      {flashcards.length > 0 ? (
        <FlashcardList flashcards={flashcards} />
      ) : (
        <p className="text-muted-foreground">
          Brak fiszek w tym temacie.
        </p>
      )}
    </div>
  );
}
