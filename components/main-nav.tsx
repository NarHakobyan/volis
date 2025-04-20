"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { FileText, BarChart3, Users, FileQuestion } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    label: "VOLIS avaleht",
    href: "/",
  },
  {
    label: "KOV",
    href: "/kov",
    icon: FileText,
  },
  {
    label: "Statistika",
    href: "/statistics",
    icon: BarChart3,
  },
  {
    label: "Liikmesus",
    href: "/membership",
    icon: Users,
  },
];

export function MainNav({ className }: { className?: string }) {
  return (
    <nav className={cn("flex items-center", className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex h-full items-center gap-2 px-4 py-3 text-sm text-white hover:bg-[#004882] border-r border-[#004882]"
        >
          {item.icon && <item.icon className="h-4 w-4" />}
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
