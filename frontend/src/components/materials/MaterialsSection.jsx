"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { MaterialsList } from "./MaterialsList";
import { MaterialUpload } from "./MaterialUpload";
import { ProcessButton } from "./ProcessButton";

export function MaterialsSection({
  initialMaterials,
  initialProcessingStatus
}) {
  const [materials, setMaterials] = useState(initialMaterials);
  const [processingStatus, setProcessingStatus] = useState(initialProcessingStatus);

  const isProcessing = processingStatus === "processing";
  const hasUnprocessed = materials.some((m) => m.status === "not-processed");

  const handleUpload = (files) => {
    const newMaterials = files.map((file, index) => {
      const extension = file.name.split(".").pop().toLowerCase();
      return {
        id: `new-${Date.now()}-${index}`,
        name: file.name,
        type: extension,
        status: "not-processed",
      };
    });
    setMaterials((prev) => [...prev, ...newMaterials]);
  };

  const handleProcess = () => {
    setProcessingStatus("processing");
    // W przyszlosci tutaj bedzie wywolanie API
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Materialy</h2>
        <ProcessButton
          onClick={handleProcess}
          disabled={isProcessing}
          hasUnprocessed={hasUnprocessed}
        />
      </div>

      <div className="relative">
        {isProcessing && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Przetwarzanie...</span>
            </div>
          </div>
        )}

        <div className={isProcessing ? "opacity-50 pointer-events-none" : ""}>
          <MaterialsList materials={materials} />

          <div className="mt-4">
            <MaterialUpload onUpload={handleUpload} disabled={isProcessing} />
          </div>
        </div>
      </div>
    </div>
  );
}
