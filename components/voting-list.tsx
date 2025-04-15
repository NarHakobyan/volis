"use client";

import { format } from "date-fns";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface VotingListProps {
  type: "active" | "upcoming" | "past";
  lgId: string;
}

// Mock data - in a real app, this would come from an API
const mockVotings = [
  {
    id: "1",
    title: "City Center Park Renovation",
    type: "Normal voting",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-04-15"),
    description:
      "Vote on the proposed renovation plans for the city center park. Choose between three different design options.",
    totalVotes: 1234,
  },
  {
    id: "2",
    title: "Youth Council Election 2024",
    type: "Youth Council",
    startDate: new Date("2024-04-10"),
    endDate: new Date("2024-04-20"),
    description:
      "Cast your vote for the next Youth Council representatives. 15 candidates are running for 7 positions.",
    totalVotes: 567,
  },
  {
    id: "3",
    title: "Inclusive Budget 2024",
    type: "Referendum",
    startDate: new Date("2024-04-05"),
    endDate: new Date("2024-05-05"),
    description:
      "Participate in deciding how to allocate the city's participatory budget for community projects.",
    totalVotes: 890,
  },
];

export function VotingList({ type, lgId }: VotingListProps) {
  // In a real app, we would filter based on the actual dates and status
  const filteredVotings = mockVotings;

  return (
    <div className="space-y-4">
      {filteredVotings.map((voting) => (
        <Card key={voting.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle>{voting.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{voting.type}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {format(voting.startDate, "MMM d")} -{" "}
                    {format(voting.endDate, "MMM d, yyyy")}
                  </span>
                </div>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/lg/${lgId}/voting/${voting.id}`}>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{voting.description}</p>
            <div className="mt-4 text-sm">
              <span className="font-medium">{voting.totalVotes}</span>{" "}
              <span className="text-muted-foreground">votes cast</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
