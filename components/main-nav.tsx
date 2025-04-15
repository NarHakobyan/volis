"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const items = [
  {
    title: "Homepage",
    href: "/",
  },
  {
    title: "Opportunities",
    href: "/opportunities",
  },
  {
    title: "Statistics",
    href: "/statistics",
  },
  {
    title: "API Description",
    href: "/api-description",
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden gap-6 md:flex">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-foreground/80",
            pathname === item.href ? "text-foreground" : "text-foreground/60"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
