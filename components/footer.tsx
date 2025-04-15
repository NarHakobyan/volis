import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { SocialIcons } from "./social-icons";

const footerLinks = {
  about: {
    title: "Eesti Linnade ja Valdade Liit",
    links: [
      { label: "Tutvustus ja ajalugu", href: "/tutvustus" },
      { label: "ELVL pressiteated", href: "/pressiteated" },
      { label: "Kõik uudised", href: "/uudised" },
    ],
  },
  support: {
    title: "Tugi",
    links: [
      { label: "Kontaktid", href: "/kontaktid" },
      { label: "Küpsised", href: "/kupsised" },
      { label: "Priivaatsus ja kasutustingimused", href: "/tingimused" },
      { label: "Vaegnägijatele", href: "/ligipaasetavus" },
    ],
  },
} as const;

export function Footer() {
  return (
    <footer className="flex w-full bg-white">
      <div className="flex flex-1 flex-wrap items-start gap-6 p-6">
        {/* Logo section */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-[10px]">
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
        </div>

        {/* Links sections */}
        <div className="flex flex-wrap justify-end gap-6">
          {/* About section */}
          <div className="min-w-[312px] border-l border-[#C0C2C9] pl-6">
            <h2 className="mb-2 text-base font-normal leading-6 text-[#131317]">
              {footerLinks.about.title}
            </h2>
            <ul className="flex flex-col gap-2">
              {footerLinks.about.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-base font-normal leading-6 text-[#005AA3] hover:text-[#004882]"
                  >
                    <ChevronRight className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support section */}
          <div className="min-w-[312px] border-l border-[#C0C2C9] pl-6">
            <h2 className="mb-2 text-base font-normal leading-6 text-[#131317]">
              {footerLinks.support.title}
            </h2>
            <ul className="flex flex-col gap-2">
              {footerLinks.support.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 text-base font-normal leading-6 text-[#005AA3] hover:text-[#004882]"
                  >
                    <ChevronRight className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Social icons */}
      <SocialIcons />
    </footer>
  );
}
