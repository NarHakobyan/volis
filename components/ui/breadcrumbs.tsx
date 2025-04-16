import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-base">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 text-[#003662]" />
          )}
          {item.current ? (
            <span className="text-[#003662]">{item.label}</span>
          ) : (
            <Link href={item.href} className="text-[#003662] hover:underline">
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
