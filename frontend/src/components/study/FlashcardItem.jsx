"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function FlashcardItem({ flashcard }) {
  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Pytanie</p>
          <p className="font-medium">{flashcard.question}</p>
        </div>
        <Separator />
        <div>
          <p className="text-sm text-muted-foreground mb-1">Odpowiedź</p>
          <p className="font-medium text-primary">{flashcard.answer}</p>
        </div>
      </CardContent>
    </Card>
  );
}
