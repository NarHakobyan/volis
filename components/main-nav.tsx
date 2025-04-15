"use client";

import Link from "next/link";
import { Laptop, CreditCard, BarChart3, FileJson } from "lucide-react";

const navItems = [
  {
    label: "Võimalused",
    href: "/voimalused",
    icon: Laptop,
  },
  {
    label: "Hinnakiri",
    href: "/hinnakiri",
    icon: CreditCard,
  },
  {
    label: "Statistika",
    href: "/statistika",
    icon: BarChart3,
  },
  {
    label: "VOLIS API kirjeldus",
    href: "/api-kirjeldus",
    icon: FileJson,
  },
] as const;

export function MainNav() {
  return (
    <nav className="flex items-center">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex h-10 items-center gap-2 px-4 py-3 text-white hover:bg-[#004882] hover:text-white"
        >
          <item.icon className="h-4 w-4" />
          <span className="text-sm font-normal leading-[24px]">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
