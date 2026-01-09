"use client";

import { Badge } from "@/components/ui/badge";

const statusConfig = {
  "not-processed": {
    label: "Oczekuje",
    variant: "outline",
    className: "border-yellow-500 text-yellow-600 bg-yellow-50",
  },
  processed: {
    label: "Przetworzony",
    variant: "outline",
    className: "border-green-500 text-green-600 bg-green-50",
  },
  failed: {
    label: "Blad",
    variant: "outline",
    className: "border-red-500 text-red-600 bg-red-50",
  },
};

export function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig["not-processed"];

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
}
