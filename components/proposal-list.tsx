"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ThumbsUp } from "lucide-react";

interface ProposalListProps {
  votingId: string;
}

// Mock data - in a real app, this would come from an API
const mockProposals = [
  {
    id: "1",
    title: "Modern Playground Equipment",
    description:
      "Install new, safe, and inclusive playground equipment suitable for children of all ages and abilities.",
    performer: "Community Parents Association",
    location: "Central Park Area",
    estimatedCost: 25000,
    votes: 456,
    status: "approved",
    createdAt: new Date("2024-03-15"),
  },
  {
    id: "2",
    title: "Sustainable Lighting System",
    description:
      "Replace current park lighting with solar-powered LED lights to improve safety and reduce energy consumption.",
    performer: "Green Energy Initiative",
    location: "Throughout the park",
    estimatedCost: 35000,
    votes: 289,
    status: "pending",
    createdAt: new Date("2024-03-16"),
  },
  {
    id: "3",
    title: "Community Garden Space",
    description:
      "Create a dedicated area for community gardening with raised beds and water access.",
    performer: "Local Gardening Club",
    location: "South section",
    estimatedCost: 15000,
    votes: 567,
    status: "pending",
    createdAt: new Date("2024-03-17"),
  },
];

export function ProposalList({ votingId }: ProposalListProps) {
  const [votedProposals, setVotedProposals] = useState<string[]>([]);

  const handleVote = (proposalId: string) => {
    if (votedProposals.includes(proposalId)) {
      toast.error("You have already voted for this proposal");
      return;
    }

    // In a real app, we would submit to an API here
    setVotedProposals([...votedProposals, proposalId]);
    toast.success("Vote recorded successfully!");
  };

  return (
    <div className="space-y-4">
      {mockProposals.map((proposal) => (
        <Card key={proposal.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl">{proposal.title}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{proposal.performer}</span>
                  <span>•</span>
                  <span>{format(proposal.createdAt, "MMM d, yyyy")}</span>
                </div>
              </div>
              <Badge
                variant={
                  proposal.status === "approved" ? "default" : "secondary"
                }
              >
                {proposal.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{proposal.description}</p>
            <div className="mb-4 grid gap-4 text-sm md:grid-cols-3">
              <div>
                <div className="font-medium">Location</div>
                <div className="text-muted-foreground">{proposal.location}</div>
              </div>
              <div>
                <div className="font-medium">Estimated Cost</div>
                <div className="text-muted-foreground">
                  €{proposal.estimatedCost.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="font-medium">Total Votes</div>
                <div className="text-muted-foreground">
                  {proposal.votes.toLocaleString()}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleVote(proposal.id)}
              disabled={votedProposals.includes(proposal.id)}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              {votedProposals.includes(proposal.id) ? "Voted" : "Vote"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
