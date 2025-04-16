"use client";

import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter } from "lucide-react";

export function ShareButtons() {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="h-8 px-3 text-xs font-normal border-[#D9D9D9] text-[#595959] hover:bg-gray-50"
      >
        <Share2 className="mr-2 h-4 w-4" />
        Jaga
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 border-[#D9D9D9] text-[#595959] hover:bg-gray-50"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 border-[#D9D9D9] text-[#595959] hover:bg-gray-50"
      >
        <Twitter className="h-4 w-4" />
      </Button>
    </div>
  );
}
