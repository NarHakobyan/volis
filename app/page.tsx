import { Suspense } from "react";
import { EstoniaMap } from "@/components/estonia-map";
import { ActiveVotings } from "@/components/active-votings";

export default function HomePage() {
  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h1 className="mb-4 text-2xl font-bold">Local Government Votings</h1>
          <p className="mb-8 text-muted-foreground">
            Explore active and upcoming votings in Estonian municipalities. Click on a region to see
            detailed information about local initiatives and polls.
          </p>
          <Suspense fallback={<div>Loading map...</div>}>
            <EstoniaMap />
          </Suspense>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Active Votings</h2>
          <Suspense fallback={<div>Loading votings...</div>}>
            <ActiveVotings />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
