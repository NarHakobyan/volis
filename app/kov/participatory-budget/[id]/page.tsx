import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Share2, Map, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CommentForm } from "./comment-form";
import { ImageCarousel } from "./image-carousel";
import { ShareButtons } from "./share-buttons";
import { Separator } from "@/components/ui/separator";

export default function ProposalDetailPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        {/* Breadcrumbs */}
        <nav className="mb-6" aria-label="Breadcrumb navigation">
          <Breadcrumbs
            items={[
              { label: "KOV avaleht", href: "/kov" },
              { label: "Tartu kaasav eelarve 2024", href: "/kov/participatory-budget" },
              { label: "Anne kanali ja Emajõe vaheline vabaajapark", href: "#", current: true },
            ]}
          />
        </nav>

        {/* Main Content Card */}
        <Card className="shadow-lg rounded-lg overflow-hidden">
          <CardHeader className="space-y-4 p-6 sm:p-8">
            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                Anne kanali ja Emajõe vaheline vabaajapark
              </h1>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Hääli kokku:</span>
                <Badge
                  variant="secondary"
                  className="text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1 text-sm"
                >
                  552
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-8">
            {/* Description */}
            <Alert className="bg-blue-50 border-blue-200">
              <AlertTitle className="text-xl font-semibold mb-4 text-blue-900">
                Ettepaneku kirjeldus
              </AlertTitle>
              <AlertDescription className="text-blue-800 space-y-4 text-base leading-relaxed">
                <p>Anne kanali läheduses kortermajades elab ligi 10 000 inimest. Neil puudub koht, kus käia puhkamas, grillimas, mõttemänge mängimas. Anne kanali ja Emajõe vaheline ala on suure potentsiaaliga puhkeala, kuhu saab arendada esindusliku vabaajapargi koos madalseiklusraja, väikese lava ja tantsuplatsiga, mängupargi, kiikede, pikniku- ja energiaalaga.</p>

                <p className="font-medium">Kaasava eelarve raames rajatakse:</p>
                <ul className="list-disc pl-6 space-y-3">
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
            <section aria-labelledby="media-heading">
              <h2 id="media-heading" className="text-2xl font-semibold text-gray-900 mb-6">
                Foto/video materjalid
              </h2>
              <div className="rounded-lg overflow-hidden">
                <ImageCarousel />
              </div>
            </section>

            {/* Expert Opinion */}
            <section aria-labelledby="expert-heading" className="bg-gray-50 rounded-lg p-6">
              <h2 id="expert-heading" className="text-2xl font-semibold text-gray-900 mb-4">
                Eksperdi arvamus
              </h2>
              <p className="text-base text-gray-700 leading-relaxed">
                Idee jätkab kaasava eelarve protsessis, kuid konkreetset asukohta ja sisu tuleb täpsustada.
              </p>
            </section>

            {/* Author */}
            <section className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-base text-gray-700">
                  <span className="font-medium">Ettepaneku esitaja:</span> Marti Viilu
                </p>
              </div>
              <ShareButtons />
            </section>

            <Separator className="my-8" />

            {/* Comments Section */}
            <section aria-labelledby="comments-heading" className="space-y-8">
              <h2 id="comments-heading" className="text-2xl font-semibold text-gray-900">
                Kommentaarid
              </h2>

              <div className="space-y-6">
                {/* Comment */}
                <article className="bg-white rounded-lg p-6 shadow-sm">
                  <header className="mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">Priit Visnapuu</h3>
                      <time className="text-sm text-gray-500">12.10.23, 15:36</time>
                    </div>
                  </header>
                  <p className="text-gray-700 leading-relaxed">
                    Väide, et koerad teeks kanali veekvaliteeti kehvemaks ei päde kuidagi. Need on ikka inimesed kes seal lõviosa saastet tekitavad. Nii prügi, enda kehavedelike, õlide ja kõige muuga. Koer ei lähe vette pissima, aga see on lausa rõve kui palju inimesi seda supeldes teeb. Tartus isegi ei ole nii palju koeri, et anne kanali veekvaliteeti mõjutada. Neile asjadele võiks rohkem ikka teaduspõhiste uuringutega läheneda, mitte kellegi kõhutunde järgi.
                  </p>
                </article>

                <article className="bg-white rounded-lg p-6 shadow-sm">
                  <header className="mb-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">Tenno Ott</h3>
                      <time className="text-sm text-gray-500">11.10.23, 13:24</time>
                    </div>
                  </header>
                  <p className="text-gray-700 leading-relaxed">
                    Arvan samuti, et praegu on see ala parajalt looduslähedane rohekoridor, kus on meeldivalt rekreatiivne jalutada ja jooksmas käia. Edasine arendus rikuks selle loodusliku roheala ära. Linnas on niigi vähe looduslikke alasid, mida pole liialt arendatud.
                  </p>
                </article>
              </div>

              <CommentForm />
            </section>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
