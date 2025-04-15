import Link from "next/link";

const languages = [
  { label: "In English", href: "/en" },
  { label: "На русском", href: "/ru" },
] as const;

export function LanguageSwitcher() {
  return (
    <div className="flex items-center gap-4">
      {languages.map((lang) => (
        <Link
          key={lang.href}
          href={lang.href}
          className="text-sm font-normal leading-[24px] text-[#005AA3] hover:text-[#004882]"
        >
          {lang.label}
        </Link>
      ))}
    </div>
  );
}
