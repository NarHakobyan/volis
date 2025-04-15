import Link from "next/link";
import { Facebook, Twitter, Youtube } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="flex w-full border-t border-[#D8D9DF] bg-[#D8D9DF] p-4">
        <div className="flex gap-4">
          <Link
            href="https://facebook.com"
            className="flex h-16 w-16 items-center justify-center bg-white hover:bg-gray-50"
          >
            <Facebook className="h-6 w-6 text-[#30323B]" />
          </Link>
          <Link
            href="https://twitter.com"
            className="flex h-16 w-16 items-center justify-center bg-white hover:bg-gray-50"
          >
            <Twitter className="h-6 w-6 text-[#30323B]" />
          </Link>
          <Link
            href="https://youtube.com"
            className="flex h-16 w-16 items-center justify-center bg-white hover:bg-gray-50"
          >
            <Youtube className="h-6 w-6 text-[#30323B]" />
          </Link>
        </div>
      </div>
      <div className="container flex flex-wrap items-start gap-6 py-4">
        <div className="flex min-w-[142px] flex-col">
          <Link href="/" className="flex items-center gap-[10px]">
            <Image
              src="/images/shield-logo.svg"
              alt="VOLIS Logo"
              width={32}
              height={32}
              className="text-[#005AA3]"
            />
            <div className="flex flex-col font-['Roboto_Condensed']">
              <span className="text-[13px] font-light uppercase leading-[14px] text-[#005AA3]">
                VOLIS2
              </span>
              <span className="text-[13px] font-normal uppercase leading-[14px] text-[#005AA3]">
                Eesti Linnade ja Valdade Liit
              </span>
            </div>
          </Link>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="min-w-[312px] border-l border-[#C0C2C9] px-6">
            <h3 className="mb-2 text-base font-normal text-[#131317]">
              Eesti Linnade ja Valdade Liit
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about/introduction" className="flex items-center gap-1 text-base text-[#005AA3] hover:opacity-90">
                  <span className="text-xs">›</span>
                  Tutvustus ja ajalugu
                </Link>
              </li>
              <li>
                <Link href="/about/news" className="flex items-center gap-1 text-base text-[#005AA3] hover:opacity-90">
                  <span className="text-xs">›</span>
                  ELVL pressiteated
                </Link>
              </li>
              <li>
                <Link href="/about/all-news" className="flex items-center gap-1 text-base text-[#005AA3] hover:opacity-90">
                  <span className="text-xs">›</span>
                  Kõik uudised
                </Link>
              </li>
            </ul>
          </div>
          <div className="min-w-[312px] border-l border-[#C0C2C9] px-6">
            <h3 className="mb-2 text-base font-normal text-[#131317]">Tugi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/legal/contacts" className="flex items-center gap-1 text-base text-[#005AA3] hover:opacity-90">
                  <span className="text-xs">›</span>
                  Kontaktid
                </Link>
              </li>
              <li>
                <Link href="/legal/cookies" className="flex items-center gap-1 text-base text-[#005AA3] hover:opacity-90">
                  <span className="text-xs">›</span>
                  Küpsised
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="flex items-center gap-1 text-base text-[#005AA3] hover:opacity-90">
                  <span className="text-xs">›</span>
                  Priivaatsus ja kasutustingimused
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="flex items-center gap-1 text-base text-[#005AA3] hover:opacity-90">
                  <span className="text-xs">›</span>
                  Vaegnägijatele
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
