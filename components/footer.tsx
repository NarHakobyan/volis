import Link from "next/link";
import { Facebook, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t ">
      <div className="container grid grid-cols-1 gap-8 py-8 md:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Link href="/" className="font-bold">
            VOLIS
          </Link>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} VOLIS. All rights reserved.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">About</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about/introduction" className="text-muted-foreground hover:text-foreground">
                Introduction and history
              </Link>
            </li>
            <li>
              <Link href="/about/news" className="text-muted-foreground hover:text-foreground">
                EVLV pressiteated
              </Link>
            </li>
            <li>
              <Link href="/about/all-news" className="text-muted-foreground hover:text-foreground">
                All news
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/legal/contacts" className="text-muted-foreground hover:text-foreground">
                Contacts
              </Link>
            </li>
            <li>
              <Link href="/legal/cookies" className="text-muted-foreground hover:text-foreground">
                Cookies
              </Link>
            </li>
            <li>
              <Link href="/legal/terms" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="text-muted-foreground hover:text-foreground">
                For the visually impaired
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">Social</h3>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" className="text-muted-foreground hover:text-foreground">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="https://youtube.com" className="text-muted-foreground hover:text-foreground">
              <Youtube className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
