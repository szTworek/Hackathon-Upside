"use client";

import { useState, useEffect } from "react";
import { getDecks, createDeck } from "@/lib/api";
import { DeckGrid } from "@/components/decks/DeckGrid";
import { CreateDeckDialog } from "@/components/decks/CreateDeckDialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function UstawieniaPage() {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    getDecks()
      .then(setDecks)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (data) => {
    setCreating(true);
    try {
      const newDeck = await createDeck(data.name);
      setDecks((prev) => [...prev, newDeck]);
      setDialogOpen(false);
    } catch (err) {
      console.error("Blad przy tworzeniu talii:", err);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-40 mb-2" />
          <Skeleton className="h-4 w-72" />
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
          <h1 className="text-2xl font-bold">Twoje karty</h1>
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
        <h1 className="text-2xl font-bold">Twoje karty</h1>
        <p className="text-muted-foreground">
          Wybierz karte, aby zarzadzac jej materialami.
        </p>
      </div>
      <DeckGrid decks={decks} onAddClick={() => setDialogOpen(true)} />
      <CreateDeckDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreate={handleCreate}
        loading={creating}
      />
    </div>
  );
}
