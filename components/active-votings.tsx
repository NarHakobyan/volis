"use client";

import { format } from "date-fns";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

// This is mock data. In a real app, this would come from an API
const mockVotings = [
  {
    id: "1",
    title: "Tallinna linna 2024. aasta kaasava eelarve hääletus",
    type: "Kaasav eelarve",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-04-15"),
    municipality: "Tallinn",
    status: "active",
  },
  {
    id: "2",
    title: "Tartu linna noortevolikogu valimised 2024",
    type: "Noortevolikogu",
    startDate: new Date("2024-04-10"),
    endDate: new Date("2024-04-20"),
    municipality: "Tartu",
    status: "upcoming",
  },
  {
    id: "3",
    title: "Pärnu linna 2024. aasta kaasava eelarve hääletus",
    type: "Kaasav eelarve",
    startDate: new Date("2024-04-05"),
    endDate: new Date("2024-05-05"),
    municipality: "Pärnu",
    status: "active",
  },
];

export function ActiveVotings() {
  return (
    <div className="absolute left-6 top-[120px] w-[360px] space-y-4">
      {mockVotings.map((voting) => (
        <Card key={voting.id} className="overflow-hidden">
          <CardHeader className="border-b border-[#D8D9DF] bg-white pb-3 pt-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#005AA3]" />
              <span className="text-sm font-normal text-[#131317]">
                {voting.municipality}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-2">
              <Link
                href={`/lg/${voting.municipality.toLowerCase()}/voting/${voting.id}`}
                className="block text-base font-normal text-[#005AA3] hover:opacity-90"
              >
                {voting.title}
              </Link>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#686B78]">{voting.type}</span>
                <div
                  className={cn(
                    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                    voting.status === "active"
                      ? "border-transparent bg-[#005AA3] text-white"
                      : "border-transparent bg-secondary text-secondary-foreground"
                  )}
                >
                  {voting.status === "active" ? "Aktiivne" : "Tulemas"}
                </div>
              </div>
              <div className="text-sm text-[#686B78]">
                {format(voting.startDate, "dd.MM.yyyy")} -{" "}
                {format(voting.endDate, "dd.MM.yyyy")}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
