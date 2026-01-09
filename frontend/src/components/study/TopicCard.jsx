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

export function TopicCard({ topic, deckId }) {
  const IconComponent = iconMap[topic.icon] || FileQuestion;

  return (
    <Link href={`/nauka/${deckId}/${topic.id}`}>
      <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/50">
        <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <IconComponent className="h-5 w-5" />
          </div>
          <h3 className="font-medium text-center text-sm">{topic.title}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
