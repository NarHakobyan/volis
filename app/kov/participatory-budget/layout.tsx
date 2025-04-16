import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tartu kaasav eelarve 2024 - VOLIS2",
  description: "Tartu linna kaasava eelarve hääletusplatvorm",
};

export default function ParticipantBudgetLayout({
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
