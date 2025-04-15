"use client";

import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VotingList } from "@/components/voting-list";

// Mock data - in a real app, this would come from an API
const mockLG = {
  id: "tallinn",
  name: "Tallinn",
  description:
    "Welcome to Tallinn's public opinion poll environment. Here you can participate in various votings and surveys that help shape our city's future.",
  bannerUrl: "/images/tallinn-banner.jpg",
};

interface Props {
  params: {
    id: string;
  };
}

export default function LGPage({ params }: Props) {
  // In a real app, we would fetch the LG data here
  if (params.id !== mockLG.id) {
    notFound();
  }

  return (
    <div className="container py-8">
      <div className="relative mb-8 h-[300px] w-full overflow-hidden rounded-lg">
        <Image
          src={mockLG.bannerUrl}
          alt={mockLG.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      <h1 className="mb-4 text-3xl font-bold">{mockLG.name}</h1>
      <p className="mb-8 text-lg text-muted-foreground">{mockLG.description}</p>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Votings</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <Suspense fallback={<div>Loading active votings...</div>}>
            <VotingList type="active" lgId={params.id} />
          </Suspense>
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <Suspense fallback={<div>Loading upcoming votings...</div>}>
            <VotingList type="upcoming" lgId={params.id} />
          </Suspense>
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <Suspense fallback={<div>Loading past votings...</div>}>
            <VotingList type="past" lgId={params.id} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
