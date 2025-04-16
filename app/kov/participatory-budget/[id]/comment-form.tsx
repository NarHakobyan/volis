"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

export function CommentForm() {
  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Lisa oma kommentaar..."
        className="min-h-[100px]"
      />
      <div className="flex justify-end">
        <Button className="gap-2">
          <MessageSquare className="h-5 w-5" />
          Lisa kommentaar
        </Button>
      </div>
    </div>
  );
}
