"use client";

import Link from "next/link";
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

export function DeckCard({ deck }) {
  const IconComponent = iconMap[deck.icon] || FileQuestion;

  return (
    <Link href={`/ustawienia/${deck.id}`}>
      <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/50">
        <CardContent className="flex flex-col items-center justify-center gap-3 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <IconComponent className="h-6 w-6" />
          </div>
          <h3 className="font-medium text-center">{deck.title}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
