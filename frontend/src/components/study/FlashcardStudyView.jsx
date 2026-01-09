"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FlashcardStudyView({ flashcards }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const currentFlashcard = flashcards[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === flashcards.length - 1;

  // Reset answer visibility when changing flashcard
  useEffect(() => {
    setIsAnswerRevealed(false);
  }, [currentIndex]);

  const goNext = () => {
    if (!isLast) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const goPrev = () => {
    if (!isFirst) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const revealAnswer = () => {
    setIsAnswerRevealed(true);
  };

  if (flashcards.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Brak fiszek</h1>
        <p className="text-muted-foreground">
          Wybrane tematy nie zawierają żadnych fiszek.
        </p>
        <Button variant="outline" onClick={() => router.push("/nauka")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Powrót do nauki
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={() => router.push("/nauka")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="text-muted-foreground">
          {currentIndex + 1} / {flashcards.length}
        </span>
      </div>

      {/* Flashcard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[300px]">
        {/* Question */}
        <Card className="flex items-center justify-center">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Pytanie</p>
            <p className="text-xl font-medium">{currentFlashcard.question}</p>
          </CardContent>
        </Card>

        {/* Answer */}
        <Card
          className={`flex items-center justify-center transition-all ${
            !isAnswerRevealed ? "cursor-pointer hover:border-primary/50" : ""
          }`}
          onClick={!isAnswerRevealed ? revealAnswer : undefined}
        >
          <CardContent className="p-6 text-center">
            {isAnswerRevealed ? (
              <>
                <p className="text-sm text-muted-foreground mb-2">Odpowiedź</p>
                <p className="text-xl font-medium text-primary">
                  {currentFlashcard.answer}
                </p>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Eye className="h-8 w-8" />
                <p>Kliknij, aby odkryć odpowiedź</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={isFirst}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Poprzednia
        </Button>
        <Button
          variant="outline"
          onClick={goNext}
          disabled={isLast}
        >
          Następna
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
