import Image from "next/image";

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
            {/* Use PNG if Figma uses an image, otherwise keep MapCircuit component */}
            <div className="w-full flex justify-center">
              <Image
                src="/images/map-circuit.png"
                alt="Eesti kaart küsitlustega"
                width={820}
                height={400}
                className="object-contain max-w-full h-auto"
                priority
              />
            </div>
          </section>

          {/* Additional content sections can be added here */}
        </div>
      </div>
    </main>
  );
}
