import Image from "next/image";
import Link from "next/link";
import { Vote, Users2, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveMap } from "@/components/ui/interactive-map";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F0F0F2]">
      <div className="flex-1 flex justify-center items-start pt-[32px] pb-[80px] px-0">
        <div className="w-full max-w-[1120px] flex flex-col gap-[32px] px-6">
          {/* Main card with map */}
          <section className="rounded-[12px] bg-white px-[40px] pt-[40px] pb-[32px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.2)] flex flex-col items-center">
            <h1 className="mb-[32px] text-center text-[28px] font-normal leading-[32px] text-[#131317] font-condensed">
              Käimasolevad küsitlused ja hääletused
            </h1>
            <InteractiveMap />
          </section>

          {/* Võimalused block */}
          <section className="rounded-[12px] bg-white px-[40px] pt-[40px] pb-[32px] shadow-[0px_1px_5px_0px_rgba(0,0,0,0.2)]">
            <h2 className="text-center text-[28px] font-normal leading-[32px] text-[#131317] font-condensed mb-[40px]">
              Võimsaim osaluse töörist
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Kaasav eelarve */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Vote className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Kaasav eelarve</h3>
                <p className="text-gray-600 mb-4">
                  Osale linna eelarve planeerimisel ja hääleta projektide poolt, mis muudavad sinu linna paremaks.
                </p>
                <Button asChild variant="outline" className="mt-auto">
                  <Link href="/kov/participatory-budget">Loe lähemalt</Link>
                </Button>
              </div>

              {/* Noortekogu valimised */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Users2 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Noortekogu valimised</h3>
                <p className="text-gray-600 mb-4">
                  Vali oma esindajad noortevolikokku ja aita kujundada noorte tulevikku oma linnas.
                </p>
                <Button asChild variant="outline" className="mt-auto">
                  <Link href="/kov/youth-council">Loe lähemalt</Link>
                </Button>
              </div>

              {/* Lihtne hääletus */}
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <ListChecks className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Lihtne hääletus osalejate nimekirjaga</h3>
                <p className="text-gray-600 mb-4">
                  Loo ja halda hääletusi kindlaksmääratud osalejate nimekirjaga kiirelt ja lihtsalt.
                </p>
                <Button asChild variant="outline" className="mt-auto">
                  <Link href="/kov/simple-voting">Loe lähemalt</Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
