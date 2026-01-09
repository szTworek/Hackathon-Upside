"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTopics } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

export function StudySettingsDialog({ open, onOpenChange, deck }) {
  const router = useRouter();
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && deck) {
      setLoading(true);
      setError(null);
      getTopics(deck.id)
        .then((data) => {
          setTopics(data);
          setSelectedTopics(data.map((t) => t.id));
        })
        .catch(setError)
        .finally(() => setLoading(false));
    }
  }, [open, deck]);

  const handleTopicToggle = (topicId) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTopics.length === topics.length) {
      setSelectedTopics([]);
    } else {
      setSelectedTopics(topics.map((t) => t.id));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{deck?.title} - Ustawienia nauki</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Wybierz tematy do nauki:
          </p>

          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          ) : error ? (
            <p className="text-sm text-destructive">
              Nie udalo sie zaladowac tematow.
            </p>
          ) : (
            <>
              {topics.length > 1 && (
                <div className="flex items-center gap-2 pb-2 border-b">
                  <Checkbox
                    id="select-all"
                    checked={selectedTopics.length === topics.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <Label htmlFor="select-all" className="cursor-pointer">
                    Zaznacz wszystkie
                  </Label>
                </div>
              )}

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {topics.map((topic) => (
                  <div key={topic.id} className="flex items-center gap-2">
                    <Checkbox
                      id={topic.id}
                      checked={selectedTopics.includes(topic.id)}
                      onCheckedChange={() => handleTopicToggle(topic.id)}
                    />
                    <Label htmlFor={topic.id} className="cursor-pointer">
                      {topic.title}
                    </Label>
                  </div>
                ))}
              </div>

              {topics.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Brak tematow w tej talii.
                </p>
              )}
            </>
          )}
        </div>

        <DialogFooter>
          <Button
            disabled={selectedTopics.length === 0 || loading}
            onClick={() => {
              const topicsParam = selectedTopics.join(",");
              router.push(`/nauka/sesja?topics=${topicsParam}`);
              onOpenChange(false);
            }}
          >
            Nauka
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
