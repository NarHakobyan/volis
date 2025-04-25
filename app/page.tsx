import Image from "next/image";
import Link from "next/link";
import { Vote, Users2, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InteractiveMap } from "@/components/ui/interactive-map";
import { motion } from "framer-motion";

const backgroundShapes = [
  { size: 300, x: -50, y: 100, delay: 0 },
  { size: 200, x: 150, y: -50, delay: 0.2 },
  { size: 250, x: 350, y: 200, delay: 0.4 },
  { size: 180, x: 500, y: 50, delay: 0.6 },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F0F0F2] relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {backgroundShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/5"
            style={{
              width: shape.size,
              height: shape.size,
              left: shape.x,
              top: shape.y,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.8, 1, 0.8],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              delay: shape.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="flex-1 flex justify-center items-start pt-[32px] pb-[80px] px-0 relative z-10">
        <div className="w-full max-w-[1120px] flex flex-col gap-[32px] px-6">
          {/* Main card with map */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-[12px] bg-white/95 backdrop-blur-sm px-[40px] pt-[40px] pb-[32px] shadow-lg flex flex-col items-center"
          >
            <h1 className="mb-[32px] text-center text-[28px] font-normal leading-[32px] text-[#131317] font-condensed">
              Käimasolevad küsitlused ja hääletused
            </h1>
            <InteractiveMap />
          </motion.section>

          {/* Võimalused block */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-[12px] bg-white/95 backdrop-blur-sm px-[40px] pt-[40px] pb-[32px] shadow-lg"
          >
            <h2 className="text-center text-[28px] font-normal leading-[32px] text-[#131317] font-condensed mb-[40px]">
              Võimsaim osaluse töörist
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Kaasav eelarve */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Vote className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-blue-950 mb-2">Kaasav eelarve</h3>
                <p className="text-blue-800 mb-4">
                  Osale linna eelarve planeerimisel ja hääleta projektide poolt, mis muudavad sinu linna paremaks.
                </p>
                <Button asChild variant="outline" className="mt-auto">
                  <Link href="/kov/participatory-budget">Loe lähemalt</Link>
                </Button>
              </motion.div>

              {/* Noortekogu valimised */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <Users2 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium text-purple-950 mb-2">Noortekogu valimised</h3>
                <p className="text-purple-800 mb-4">
                  Vali oma esindajad noortevolikokku ja aita kujundada noorte tulevikku oma linnas.
                </p>
                <Button asChild variant="outline" className="mt-auto">
                  <Link href="/kov/youth-council">Loe lähemalt</Link>
                </Button>
              </motion.div>

              {/* Lihtne hääletus */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-col items-center text-center"
              >
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
              </motion.div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
