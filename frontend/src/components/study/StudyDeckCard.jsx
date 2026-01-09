"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Languages,
  Calculator,
  BookOpen,
  Brain,
  GraduationCap,
  Atom,
  Globe,
  Music,
  Palette,
  Code,
  FileQuestion,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StudySettingsDialog } from "./StudySettingsDialog";

const iconMap = {
  Languages,
  Calculator,
  BookOpen,
  Brain,
  GraduationCap,
  Atom,
  Globe,
  Music,
  Palette,
  Code,
};

export function StudyDeckCard({ deck }) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const IconComponent = iconMap[deck.icon] || FileQuestion;

  const handleCardClick = () => {
    router.push(`/nauka/${deck.id}`);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    setDialogOpen(true);
  };

  return (
    <>
      <Card
        className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/50"
        onClick={handleCardClick}
      >
        <CardContent className="flex flex-col items-center justify-center gap-3 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <IconComponent className="h-6 w-6" />
          </div>
          <h3 className="font-medium text-center">{deck.title}</h3>
          <Button
            size="sm"
            onClick={handleButtonClick}
            className="mt-1"
          >
            Nauka
          </Button>
        </CardContent>
      </Card>

      <StudySettingsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        deck={deck}
      />
    </>
  );
}
