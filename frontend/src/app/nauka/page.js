"use client";

import { useState, useEffect } from "react";
import { getDecks } from "@/lib/api";
import { StudyDeckGrid } from "@/components/study/StudyDeckGrid";
import { Skeleton } from "@/components/ui/skeleton";

export default function NaukaPage() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDecks()
      .then(setDecks)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Nauka</h1>
          <p className="text-destructive">
            Nie udalo sie zaladowac talii. Sprawdz polaczenie z serwerem.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Nauka</h1>
        <p className="text-muted-foreground">
          Wybierz talie, aby rozpoczac nauke z fiszek.
        </p>
      </div>
      <StudyDeckGrid decks={decks} />
    </div>
  );
}
