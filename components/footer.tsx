import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Youtube } from "lucide-react";
import { ChevronRight } from "lucide-react";

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

const footerLinks = [
  {
    title: "Eesti Linnade ja Valdade Liit",
    links: [
      { label: "Tutvustus ja ajalugu", href: "/about" },
      { label: "ELVL pressiteated", href: "/press" },
      { label: "Kõik uudised", href: "/news" },
    ],
  },
  {
    title: "Tugi",
    links: [
      { label: "Kontaktid", href: "/contacts" },
      { label: "Küpsised", href: "/cookies" },
      { label: "Priivaatsus ja kasutustingimused", href: "/privacy" },
      { label: "Vaegnägijatele", href: "/accessibility" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-white">
      {/* Social media links */}
      <div className="bg-[#D8D9DF]">
        <div className="mx-6 flex justify-start">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              className="flex h-16 w-16 items-center justify-center border-r border-white hover:bg-[#C0C2C9]"
            >
              <social.icon className="h-6 w-6 text-[#30323B]" />
            </Link>
          ))}
        </div>
      </div>

      {/* Main footer content */}
      <div className="mx-6 flex flex-wrap gap-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-[10px]">
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
        </div>

        {/* Footer links */}
        <div className="flex flex-wrap gap-6">
          {footerLinks.map((section) => (
            <div
              key={section.title}
              className="min-w-[312px] border-l border-[#C0C2C9] px-6"
            >
              <h3 className="mb-2 text-base font-normal text-[#131317]">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 text-base text-[#005AA3] hover:text-[#004882]"
                    >
                      <ChevronRight className="h-4 w-4" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
