"use client";

import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProcessButton({ onClick, disabled, hasUnprocessed }) {
  if (!hasUnprocessed) {
    return null;
  }

  return (
    <Button onClick={onClick} disabled={disabled}>
      <Play className="h-4 w-4 mr-2" />
      Utwórz fiszki
    </Button>
  );
}
