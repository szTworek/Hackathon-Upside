"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getFlashcardsByTopicIds } from "@/lib/api";
import { FlashcardStudyView } from "@/components/study/FlashcardStudyView";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudySessionPage() {
  const searchParams = useSearchParams();
  const topicsParam = searchParams.get("topics");

  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const topicIds = topicsParam ? topicsParam.split(",") : [];

    if (topicIds.length === 0) {
      setLoading(false);
      return;
    }

    getFlashcardsByTopicIds(topicIds)
      .then(setFlashcards)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [topicsParam]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="space-y-4 w-full max-w-md">
          <Skeleton className="h-64 w-full" />
          <div className="flex justify-center gap-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-destructive">
          Nie udalo sie zaladowac fiszek. Sprawdz polaczenie z serwerem.
        </p>
      </div>
    );
  }

  return <FlashcardStudyView flashcards={flashcards} />;
}
