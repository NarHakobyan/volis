import { Facebook, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    icon: Facebook,
    href: "https://facebook.com/volis",
    label: "Facebook",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/volis",
    label: "Twitter",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/volis",
    label: "Youtube",
  },
] as const;

export function SocialIcons() {
  return (
    <div className="flex h-full flex-col items-center justify-center border-l border-[#D8D9DF]">
      {socialLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex h-16 w-16 items-center justify-center hover:bg-[#004882]"
          aria-label={link.label}
        >
          <link.icon className="h-6 w-6 text-[#30323B]" />
        </Link>
      ))}
    </div>
  );
}
