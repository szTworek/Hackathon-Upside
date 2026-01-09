"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getDeck, getTopics } from "@/lib/api";
import { TopicGrid } from "@/components/study/TopicGrid";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function DeckTopicsPage({ params }) {
  const { deckId } = use(params);
  const [deck, setDeck] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getDeck(deckId), getTopics(deckId)])
      .then(([deckData, topicsData]) => {
        setDeck(deckData);
        setTopics(topicsData);
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [deckId]);

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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !deck) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Nie znaleziono talii</h1>
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
        <Link href="/nauka">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{deck.title}</h1>
          <p className="text-muted-foreground">
            Wybierz temat do nauki
          </p>
        </div>
      </div>

      {topics.length > 0 ? (
        <TopicGrid topics={topics} deckId={deckId} />
      ) : (
        <p className="text-muted-foreground">
          Brak tematow w tej talii.
        </p>
      )}
    </div>
  );
}
