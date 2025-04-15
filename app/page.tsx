import { MapCircuit } from "@/components/map-circuit";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1 py-8 px-6">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Main card with map */}
          <div className="rounded-md bg-white p-6 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.2)]">
            <h1 className="mb-8 text-center text-[28px] font-normal leading-[32px] text-[#131317]">
              Käimasolevad küsitlused ja hääletused
            </h1>
            <MapCircuit />
          </div>

          {/* Additional content sections can be added here */}
        </div>
      </div>
    </main>
  );
}
