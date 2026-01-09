"use client";

import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AddDeckCard({ onClick }) {
  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/50 border-dashed"
    >
      <CardContent className="flex flex-col items-center justify-center gap-3 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Plus className="h-6 w-6" />
        </div>
        <h3 className="font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors">
          Dodaj talie
        </h3>
      </CardContent>
    </Card>
  );
}
