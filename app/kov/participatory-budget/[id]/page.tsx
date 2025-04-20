import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Share2, Map, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CommentForm } from "./comment-form";
import { ImageCarousel } from "./image-carousel";
import { ShareButtons } from "./share-buttons";

export default function ProposalDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "KOV avaleht", href: "/kov" },
            { label: "Tartu kaasav eelarve 2024", href: "/kov/participatory-budget" },
            { label: "Anne kanali ja Emajõe vaheline vabaajapark", href: "#", current: true },
          ]}
        />

        {/* Main Content Card */}
        <Card className="p-8 space-y-8 shadow-[0px_1px_5px_0px_rgba(0,0,0,0.2)] rounded-[4px]">
          <div className="flex flex-col gap-4">
            <h1 className="text-[28px] leading-[32px] text-[#111111] font-normal">
              Anne kanali ja Emajõe vaheline vabaajapark
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-[#111111]">Hääli kokku:</span>
              <Badge
                variant="vote"
                className="text-sm px-2 py-0.5 h-8 min-w-[56px] flex items-center justify-center font-normal"
              >
                552
              </Badge>
            </div>
          </div>

          {/* Description */}
          <Alert className="bg-[#EAF6FF] border-[#337BB5] p-4 rounded-[4px]">
            <AlertTitle className="text-lg font-normal mb-4 text-[#005AA3]">
              Ettepaneku kirjeldus
            </AlertTitle>
            <AlertDescription className="text-[#005AA3] space-y-4 text-sm leading-6">
              <p>Anne kanali läheduses kortermajades elab ligi 10 000 inimest. Neil puudub koht, kus käia puhkamas, grillimas, mõttemänge mängimas. Anne kanali ja Emajõe vaheline ala on suure potentsiaaliga puhkeala, kuhu saab arendada esindusliku vabaajapargi koos madalseiklusraja, väikese lava ja tantsuplatsiga, mängupargi, kiikede, pikniku- ja energiaalaga.</p>

              <p>Kaasava eelarve raames rajatakse:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Piknikualad – neli eriilmelist ja erineva suurusega paika, kus kogukond saab meeldivalt koos pere ja sõpradega aega veeta, toitu ning loodust nautida.</li>
                <li>Mõttemängude ala – lauamängud, nt male, kabe, doomino.</li>
                <li>Kiikede ala – lisab mitmekesisust ja meelelahutuslikke võimalusi nii lastele kui ka täiskasvanutele. Seal on ringkiiged, mis sobivad igas eas inimestele ja millel saab kiikuda ka ratastoolis, ning kõrged kiiged, mis paistavad kaugele.</li>
                <li>Pontoonsild – saab päikest nautida ja jalad vette pista.</li>
                <li>Energiaala – 2x3 meetri suurune platvorm, mille peal tähti vaadates, joogat tehes või lihtsalt olles akusid laadida.</li>
                <li>Pargipingid ja prügikastid.</li>
              </ul>

              <p>Anne kanali vabaajapargi rajamine tõstab kogukonna ühtekuuluvust, parandab elukvaliteeti ja mõjub positiivselt ümbritsevale piirkonnale.</p>
            </AlertDescription>
          </Alert>

          {/* Photo/Video Materials */}
          <div className="space-y-4">
            <h2 className="text-2xl font-light text-[#111111]">Foto/video materjalid</h2>
            <ImageCarousel />
          </div>

          {/* Expert Opinion */}
          <div className="space-y-4">
            <h2 className="text-2xl font-light text-[#111111]">Eksperdi arvamus</h2>
            <p className="text-sm text-[#111111] leading-6">
              Idee jätkab kaasava eelarve protsessis, kuid konkreetset asukohta ja sisu tuleb täpsustada.
            </p>
          </div>

          {/* Author */}
          <div>
            <p className="text-sm text-[#111111] leading-6">Ettepaneku esitaja: Marti Viilu</p>
          </div>

          {/* Actions */}
          <ShareButtons />

          {/* Comments Section */}
          <div className="space-y-6 pt-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="text-sm text-[#111111]">
                  <p className="font-medium">Priit Visnapuu / 12.10.23, 15:36</p>
                  <p className="mt-2 leading-6">
                    Väide, et koerad teeks kanali veekvaliteeti kehvemaks ei päde kuidagi. Need on ikka inimesed kes seal lõviosa saastet tekitavad. Nii prügi, enda kehavedelike, õlide ja kõige muuga. Koer ei lähe vette pissima, aga see on lausa rõve kui palju inimesi seda supeldes teeb. Tartus isegi ei ole nii palju koeri, et anne kanali veekvaliteeti mõjutada. Neile asjadele võiks rohkem ikka teaduspõhiste uuringutega läheneda, mitte kellegi kõhutunde järgi.
                  </p>
                </div>
                <div className="text-sm text-[#111111]">
                  <p className="font-medium">Tenno Ott / 11.10.23, 13:24</p>
                  <p className="mt-2 leading-6">
                    Arvan samuti, et praegu on see ala parajalt looduslähedane rohekoridor, kus on meeldivalt rekreatiivne jalutada ja jooksmas käia. Edasine arendus rikuks selle loodusliku roheala ära. Linnas on niigi vähe looduslikke alasid, mida pole liialt arendatud.
                  </p>
                </div>
              </div>
            </div>

            <CommentForm />
          </div>
        </Card>
      </div>
    </div>
  );
}
