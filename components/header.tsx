import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";
import { MainNav } from "./main-nav";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-[0px_1px_5px_0px_rgba(0,0,0,0.2)]">
      {/* Top section */}
      <div className="border-b border-[#D8D9DF]">
        <div className="mx-6 flex h-10 items-center justify-between">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Bottom section */}
      <div className="mx-6 flex h-[88px] items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-[11px]">
          <Image
            src="/images/shield-logo.svg"
            alt="VOLIS Logo"
            width={32}
            height={32}
            className="text-[#005AA3]"
          />
          <div className="flex flex-col gap-[1px] font-['Roboto_Condensed']">
            <span className="text-[13px] font-light uppercase leading-[14px] text-[#005AA3]">
              VOLIS2
            </span>
            <span className="text-[13px] font-normal uppercase leading-[14px] text-[#005AA3]">
              Eesti Linnade ja Valdade Liit
            </span>
          </div>
        </Link>

        {/* Search */}
        <div className="relative w-[360px]">
          <Input
            type="text"
            placeholder="Kohaliku omavalitsuse otsing..."
            className="h-[38px] border-[#878A97] text-base font-normal placeholder:text-[#686B78]"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent"
          >
            <Search className="h-5 w-5 text-[#005AA3]" />
          </Button>
        </div>

        {/* Login button */}
        <Button
          asChild
          variant="outline"
          className="h-[44px] w-[152px] rounded-full border-2 border-[#005AA3] bg-[#005AA3] px-[22px] py-[6px] font-bold text-white hover:bg-[#005AA3] hover:text-white"
        >
          <Link href="/login">Login sisse</Link>
        </Button>
      </div>

      {/* Navigation bar */}
      <div className="bg-[#005AA3] px-6 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.2)]">
        <MainNav />
      </div>
    </header>
  );
}
