import { Suspense } from "react";
import { EstoniaMap } from "@/components/estonia-map";
import { ActiveVotings } from "@/components/active-votings";

export default function HomePage() {
  return (
    <main className="flex-1">
      <div className="container py-8">
        <div className="w-full rounded-sm bg-white shadow-sm">
          <h1 className="px-6 py-4 text-[28px] font-normal leading-[1.14] text-[#131317]">
            Käimasolevad küsitlused ja hääletused
          </h1>
          <div className="relative min-h-[600px] w-full">
            <Suspense fallback={<div className="p-4">Loading map...</div>}>
              <EstoniaMap />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
