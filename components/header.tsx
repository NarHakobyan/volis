import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";
import { MainNav } from "./main-nav";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b /95 backdrop-blur supports-[backdrop-filter]:/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">VOLIS</span>
          </Link>
          <MainNav />
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button asChild variant="default">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
