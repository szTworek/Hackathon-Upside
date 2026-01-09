"use client";

import { useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const ACCEPTED_TYPES = ".pdf,.png,.txt,.jpg,.jpeg";

export function MaterialUpload({ onUpload, disabled }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && onUpload) {
      onUpload(files);
    }
    // Reset input
    e.target.value = "";
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        multiple
        onChange={handleChange}
        className="hidden"
        disabled={disabled}
      />
      <Button
        variant="outline"
        onClick={handleClick}
        disabled={disabled}
        className="w-full"
      >
        <Upload className="h-4 w-4 mr-2" />
        Dodaj pliki
      </Button>
    </div>
  );
}
