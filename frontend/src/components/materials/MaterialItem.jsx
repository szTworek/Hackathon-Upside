"use client";

import { FileText, Image, File } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

const typeIcons = {
  pdf: FileText,
  txt: FileText,
  png: Image,
  jpg: Image,
};

export function MaterialItem({ material }) {
  const IconComponent = typeIcons[material.type] || File;

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg bg-card">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
          <IconComponent className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium text-sm">{material.name}</p>
          <p className="text-xs text-muted-foreground uppercase">{material.type}</p>
        </div>
      </div>
      <StatusBadge status={material.status} />
    </div>
  );
}
