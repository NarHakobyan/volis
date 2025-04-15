"use client";

import { Suspense } from "react";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProposalList } from "@/components/proposal-list";
import { ProposalForm } from "@/components/proposal-form";

// Mock data - in a real app, this would come from an API
const mockVoting = {
  id: "1",
  title: "City Center Park Renovation",
  type: "Normal voting",
  startDate: new Date("2024-04-01"),
  endDate: new Date("2024-04-15"),
  description:
    "Vote on the proposed renovation plans for the city center park. Choose between three different design options that focus on different aspects of urban development and community needs.",
  municipality: "Tallinn",
  status: "active",
  totalVotes: 1234,
  totalProposals: 3,
};

interface Props {
  params: {
    id: string;
    votingId: string;
  };
}

export default function VotingPage({ params }: Props) {
  // In a real app, we would fetch the voting data here
  if (params.votingId !== mockVoting.id) {
    notFound();
  }

  const isActive = mockVoting.status === "active";

  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">{mockVoting.title}</h1>
          <Badge variant={isActive ? "default" : "secondary"}>
            {mockVoting.status}
          </Badge>
        </div>
        <div className="mt-2 flex items-center gap-4 text-muted-foreground">
          <span>{mockVoting.municipality}</span>
          <span>•</span>
          <span>{mockVoting.type}</span>
          <span>•</span>
          <span>
            {format(mockVoting.startDate, "MMM d")} -{" "}
            {format(mockVoting.endDate, "MMM d, yyyy")}
          </span>
        </div>
        <p className="mt-4 text-lg">{mockVoting.description}</p>
        <div className="mt-6 flex items-center gap-8">
          <div>
            <div className="text-2xl font-bold">{mockVoting.totalVotes}</div>
            <div className="text-sm text-muted-foreground">Total votes</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{mockVoting.totalProposals}</div>
            <div className="text-sm text-muted-foreground">Proposals</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="proposals" className="space-y-6">
        <TabsList>
          <TabsTrigger value="proposals">Proposals</TabsTrigger>
          <TabsTrigger value="submit">Submit Proposal</TabsTrigger>
        </TabsList>
        <TabsContent value="proposals">
          <Suspense fallback={<div>Loading proposals...</div>}>
            <ProposalList votingId={params.votingId} />
          </Suspense>
        </TabsContent>
        <TabsContent value="submit">
          {isActive ? (
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Proposal</CardTitle>
              </CardHeader>
              <CardContent>
                <ProposalForm votingId={params.votingId} />
              </CardContent>
            </Card>
          ) : (
            <div className="rounded-lg border p-6 text-center">
              <h3 className="text-lg font-semibold">Voting is not active</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                You cannot submit proposals when the voting is not active.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
