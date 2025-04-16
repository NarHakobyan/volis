import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KOV - VOLIS2",
  description: "Kohaliku omavalitsuse infosüsteem",
};

export default function KOVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1">
      {children}
    </main>
  );
}
