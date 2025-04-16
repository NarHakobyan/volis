import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function KOVPage() {
  return (
    <div className="flex-1 bg-[#F0F0F2]">
      <div className="mx-6 py-8 flex flex-col gap-8">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Youth Council Elections Card */}
          <Card className="relative overflow-hidden h-[300px] flex items-center justify-center">
            <div className="absolute inset-0 bg-[#C0C2C9] opacity-25 rounded-[10px] shadow-lg" />
            <Button
              size="icon"
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#005AA3] hover:bg-[#004882]"
              asChild
            >
              <Link href="/kov/youth-council">
                <ChevronRight className="h-6 w-6 text-white" />
              </Link>
            </Button>
            <h2 className="text-[28px] text-[#005AA3] text-center z-10">
              Tartu linna noortevolikogu valimised
            </h2>
          </Card>

          {/* Participatory Budget Card */}
          <Card className="relative overflow-hidden h-[300px] flex items-center justify-center">
            <div className="absolute inset-0 bg-[#C0C2C9] opacity-25 rounded-[10px] shadow-lg" />
            <Button
              size="icon"
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#005AA3] hover:bg-[#004882]"
              asChild
            >
              <Link href="/kov/participatory-budget">
                <ChevronRight className="h-6 w-6 text-white" />
              </Link>
            </Button>
            <h2 className="text-[28px] text-[#005AA3] text-center z-10">
              Tartu kaasav eelarve 2024
            </h2>
          </Card>
        </div>

        {/* Archive Link */}
        <div className="flex justify-end">
          <Button variant="link" asChild className="text-[#005AA3]">
            <Link href="/kov/archive" className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4" />
              <span>Arhiiv</span>
            </Link>
          </Button>
        </div>

        {/* Contact Information */}
        <div className="text-right text-base leading-[1.71] text-black">
          <p>Tartu Linnavolikogu ja linnavalitsuse infokeskus</p>
          <p>Raekoda, 51003 Tartu</p>
          <p>Tel 1789</p>
          <p>infokeskus@tartu.ee</p>
        </div>
      </div>
    </div>
  );
}
