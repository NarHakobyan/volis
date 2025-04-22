import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Share2, Map, MessageSquare, Euro, Users, Calendar, ThumbsUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { CommentForm } from "./comment-form";
import { ImageCarousel } from "./image-carousel";
import { ShareButtons } from "./share-buttons";
import { cn } from "@/lib/utils";

export default function ProposalDetailPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "KOV avaleht", href: "/kov" },
            { label: "Tartu kaasav eelarve 2024", href: "/kov/participatory-budget" },
            { label: "Anne kanali ja Emajõe vaheline vabaajapark", href: "#", current: true },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <Card className="overflow-hidden">
              <div className="relative h-[400px]">
                <ImageCarousel />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        Vaba aeg ja sport
                      </Badge>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Aktiivne
                      </Badge>
                    </div>
                    <h1 className="text-3xl font-semibold text-gray-900">
                      Anne kanali ja Emajõe vaheline vabaajapark
                    </h1>
                  </div>
                  <ShareButtons />
                </div>
              </div>
            </Card>

            {/* Tabs Section */}
            <Card>
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0">
                  <TabsTrigger
                    value="description"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6 py-3"
                  >
                    Kirjeldus
                  </TabsTrigger>
                  <TabsTrigger
                    value="comments"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6 py-3"
                  >
                    Kommentaarid
                  </TabsTrigger>
                  <TabsTrigger
                    value="updates"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6 py-3"
                  >
                    Uuendused
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="p-6 space-y-8">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      Anne kanali läheduses kortermajades elab ligi 10 000 inimest. Neil puudub koht, kus käia puhkamas, grillimas, mõttemänge mängimas. Anne kanali ja Emajõe vaheline ala on suure potentsiaaliga puhkeala, kuhu saab arendada esindusliku vabaajapargi koos madalseiklusraja, väikese lava ja tantsuplatsiga, mängupargi, kiikede, pikniku- ja energiaalaga.
                    </p>

                    <h3 className="text-xl font-semibold mt-6 mb-4">Projekti komponendid</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          title: "Piknikualad",
                          description: "Neli eriilmelist ja erineva suurusega paika kogukonna kogunemiseks"
                        },
                        {
                          title: "Mõttemängude ala",
                          description: "Lauamängud, male, kabe ja doomino"
                        },
                        {
                          title: "Kiikede ala",
                          description: "Ringkiiged ja kõrged kiiged igas eas inimestele"
                        },
                        {
                          title: "Pontoonsild",
                          description: "Päikese nautimiseks ja jalgade vette pistmiseks"
                        }
                      ].map((item) => (
                        <div key={item.title} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 bg-blue-50 p-6 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-blue-900">Eksperdi arvamus</h4>
                          <p className="mt-2 text-blue-800">
                            Idee jätkab kaasava eelarve protsessis, kuid konkreetset asukohta ja sisu tuleb täpsustada.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="comments" className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-6">
                      {[
                        {
                          author: "Priit Visnapuu",
                          date: "12.10.23, 15:36",
                          content: "Väide, et koerad teeks kanali veekvaliteeti kehvemaks ei päde kuidagi..."
                        },
                        {
                          author: "Tenno Ott",
                          date: "11.10.23, 13:24",
                          content: "Arvan samuti, et praegu on see ala parajalt looduslähedane rohekoridor..."
                        }
                      ].map((comment, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-medium">
                                {comment.author[0]}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{comment.author}</p>
                              <p className="text-sm text-gray-500">{comment.date}</p>
                            </div>
                          </div>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                    <CommentForm />
                  </div>
                </TabsContent>

                <TabsContent value="updates" className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-green-600">
                      <Calendar className="h-5 w-5" />
                      <span className="font-medium">Projekti ajakava</span>
                    </div>
                    <div className="relative pl-8 space-y-6">
                      <div className="absolute left-3 top-2 bottom-0 w-px bg-gray-200" />
                      {[
                        {
                          date: "15.01.2024",
                          title: "Projekti algus",
                          description: "Esialgse plaani koostamine ja meeskonna moodustamine"
                        },
                        {
                          date: "01.03.2024",
                          title: "Ehitustööde algus",
                          description: "Maastikutööde ja rajatiste ehituse alustamine"
                        },
                        {
                          date: "01.06.2024",
                          title: "Projekti lõpp",
                          description: "Pargi avamine kogukonnale"
                        }
                      ].map((update, index) => (
                        <div key={index} className="relative">
                          <div className="absolute -left-10 mt-1.5 h-3 w-3 rounded-full border-2 border-green-600 bg-white" />
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-500">{update.date}</p>
                            <h4 className="font-medium text-gray-900 mt-1">{update.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{update.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Stats */}
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Projekti info</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-5 w-5" />
                        <span>Hääli kokku</span>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        552
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Edenemise %</span>
                        <span className="font-medium text-blue-600">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Euro className="h-5 w-5" />
                        <span>Eelarve</span>
                      </div>
                      <span className="font-medium">100,000€</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Map className="h-5 w-5" />
                        <span>Asukoht</span>
                      </div>
                      <span className="font-medium">Anne kanal</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full gap-2" size="lg">
                  <ThumbsUp className="h-5 w-5" />
                  Hääleta projekti poolt
                </Button>
              </div>
            </Card>

            {/* Author Info */}
            <Card className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Ettepaneku esitaja</h3>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-lg">MV</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Marti Viilu</p>
                  <p className="text-sm text-gray-500">Projekti autor</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
