"use client";

import { useState } from "react";
import { FileText, Image, File, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MaterialUpload } from "@/components/materials/MaterialUpload";

const typeIcons = {
  pdf: FileText,
  txt: FileText,
  png: Image,
  jpg: Image,
  jpeg: Image,
};

export function CreateDeckDialog({ open, onOpenChange, onCreate }) {
  const [name, setName] = useState("");
  const [files, setFiles] = useState([]);

  const handleUpload = (newFiles) => {
    const fileItems = newFiles.map((file, index) => {
      const extension = file.name.split(".").pop().toLowerCase();
      return {
        id: `file-${Date.now()}-${index}`,
        name: file.name,
        type: extension,
        file: file,
      };
    });
    setFiles((prev) => [...prev, ...fileItems]);
  };

  const handleRemoveFile = (fileId) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const handleSubmit = () => {
    if (!name.trim()) return;

    onCreate?.({
      name: name.trim(),
      files: files,
    });

    // Reset form
    setName("");
    setFiles([]);
    onOpenChange(false);
  };

  const handleClose = () => {
    setName("");
    setFiles([]);
    onOpenChange(false);
  };

  const isValid = name.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nowa talia</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="deck-name">Nazwa talii</Label>
            <Input
              id="deck-name"
              placeholder="np. Angielski B2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Pliki</Label>

            {files.length > 0 && (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {files.map((file) => {
                  const IconComponent = typeIcons[file.type] || File;
                  return (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-2 border rounded bg-muted/50"
                    >
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm truncate max-w-[200px]">
                          {file.name}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleRemoveFile(file.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}

            <MaterialUpload onUpload={handleUpload} disabled={false} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Anuluj
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            Utworz fiszki
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
