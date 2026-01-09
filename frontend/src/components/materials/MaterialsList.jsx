"use client";

import { MaterialItem } from "./MaterialItem";

export function MaterialsList({ materials }) {
  if (!materials || materials.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8 border rounded-lg border-dashed">
        Brak materialow. Dodaj pliki ponizej.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {materials.map((material) => (
        <MaterialItem key={material.id} material={material} />
      ))}
    </div>
  );
}
