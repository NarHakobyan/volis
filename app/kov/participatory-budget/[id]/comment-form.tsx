"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CommentForm() {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast({
        title: "Viga",
        description: "Kommentaar ei saa olla tühi",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Implement comment submission
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      toast({
        title: "Õnnestus",
        description: "Kommentaar on edukalt lisatud",
      });
      setComment("");
    } catch (error) {
      toast({
        title: "Viga",
        description: "Kommentaari lisamine ebaõnnestus. Palun proovige uuesti.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="comment" className="text-sm font-medium text-gray-700">
          Lisa oma kommentaar
        </label>
        <Textarea
          id="comment"
          placeholder="Jaga oma arvamust projekti kohta..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[120px] resize-y"
          disabled={isSubmitting}
        />
        <p className="text-xs text-gray-500">
          {comment.length}/500 tähemärki
        </p>
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="gap-2"
          disabled={isSubmitting || !comment.trim()}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MessageSquare className="h-4 w-4" />
          )}
          {isSubmitting ? "Saadan..." : "Lisa kommentaar"}
        </Button>
      </div>
    </form>
  );
}
