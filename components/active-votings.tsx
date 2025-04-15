"use client";

import { format } from "date-fns";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// This is mock data. In a real app, this would come from an API
const mockVotings = [
  {
    id: "1",
    title: "Tallinn City Center Park Renovation",
    type: "Normal voting",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-04-15"),
    municipality: "Tallinn",
    status: "active",
  },
  {
    id: "2",
    title: "Youth Council Election 2024",
    type: "Youth Council",
    startDate: new Date("2024-04-10"),
    endDate: new Date("2024-04-20"),
    municipality: "Tartu",
    status: "upcoming",
  },
  {
    id: "3",
    title: "Inclusive Budget 2024",
    type: "Referendum",
    startDate: new Date("2024-04-05"),
    endDate: new Date("2024-05-05"),
    municipality: "Pärnu",
    status: "active",
  },
];

export function ActiveVotings() {
  return (
    <div className="space-y-4">
      {mockVotings.map((voting) => (
        <Card key={voting.id}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                {voting.title}
              </CardTitle>
              <Badge
                variant={voting.status === "active" ? "default" : "secondary"}
              >
                {voting.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1">
              <div className="text-sm text-muted-foreground">
                {voting.municipality} • {voting.type}
              </div>
              <div className="text-sm">
                {format(voting.startDate, "MMM d, yyyy")} -{" "}
                {format(voting.endDate, "MMM d, yyyy")}
              </div>
              <Link
                href={`/lg/${voting.municipality.toLowerCase()}/voting/${voting.id}`}
                className="mt-2 text-sm font-medium text-primary hover:underline"
              >
                View details →
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
