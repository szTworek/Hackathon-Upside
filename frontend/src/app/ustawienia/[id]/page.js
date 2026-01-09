"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
import { getDeck, getMaterials, getDeckProcessingStatus } from "@/lib/api";
import { MaterialsSection } from "@/components/materials/MaterialsSection";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function DeckPage({ params }) {
  const { id } = use(params);
  const [deck, setDeck] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [processingStatus, setProcessingStatus] = useState("idle");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getDeck(id), getMaterials(id)])
      .then(([deckData, materialsData]) => {
        setDeck(deckData);
        setMaterials(materialsData);
        setProcessingStatus(getDeckProcessingStatus(deckData.status));
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-8 w-48" />
          </div>
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (error || !deck) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Nie znaleziono talii</h1>
        <Link href="/ustawienia">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Powrot do ustawien
          </Button>
        </Link>
      </div>
    );
  }

  const IconComponent = iconMap[deck.icon] || FileQuestion;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/ustawienia">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <IconComponent className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold">{deck.title}</h1>
        </div>
      </div>

      <MaterialsSection
        initialMaterials={materials}
        initialProcessingStatus={processingStatus}
      />
    </div>
  );
}
