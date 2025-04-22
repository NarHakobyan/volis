"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export function ShareButtons() {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const title = "Anne kanali ja Emajõe vaheline vabaajapark";

  const handleShare = async (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Vaata seda projekti: ${shareUrl}`)}`,
    };

    if (platform === "copy") {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setIsCopied(true);
        toast({
          title: "Link kopeeritud",
          description: "Projekti link on kopeeritud lõikelauale",
        });
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        toast({
          title: "Viga",
          description: "Lingi kopeerimine ebaõnnestus",
          variant: "destructive",
        });
      }
      return;
    }

    const url = urls[platform as keyof typeof urls];
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-3 text-sm font-normal border-gray-200 text-gray-700 hover:bg-gray-50"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Jaga
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => handleShare("facebook")} className="cursor-pointer">
          <Facebook className="mr-2 h-4 w-4 text-[#1877F2]" />
          <span>Facebook</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("twitter")} className="cursor-pointer">
          <Twitter className="mr-2 h-4 w-4 text-[#1DA1F2]" />
          <span>Twitter</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("linkedin")} className="cursor-pointer">
          <Linkedin className="mr-2 h-4 w-4 text-[#0A66C2]" />
          <span>LinkedIn</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("email")} className="cursor-pointer">
          <Mail className="mr-2 h-4 w-4 text-gray-600" />
          <span>E-post</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("copy")} className="cursor-pointer">
          {isCopied ? (
            <Check className="mr-2 h-4 w-4 text-green-600" />
          ) : (
            <LinkIcon className="mr-2 h-4 w-4 text-gray-600" />
          )}
          <span>{isCopied ? "Kopeeritud!" : "Kopeeri link"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
