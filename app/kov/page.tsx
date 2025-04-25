import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Building2,
  Users2,
  BarChart3,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  FileText,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function KOVPage() {
  return (
    <div className="flex-1 bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/40">
          <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div
              className="max-w-2xl text-white space-y-6"
            >
              <Badge className="bg-blue-500/20 text-blue-100 border-blue-400/20 backdrop-blur-sm">
                Tartu 2024
              </Badge>
              <h1 className="text-5xl font-bold leading-tight">
                Osale Tartu linna tuleviku kujundamises
              </h1>
              <p className="text-xl text-blue-100">
                Sinu hääl loeb! Osale otsustusprotsessides ja aita muuta Tartu veelgi paremaks kohaks.
              </p>
              <div className="flex gap-4 pt-4">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                  Alusta hääletamist
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white/30 hover:bg-white/10">
                  Loe lähemalt
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users2 className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-900">15,420</p>
                    <p className="text-sm text-blue-600">Aktiivset osalejat</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-700" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-900">€200,000</p>
                    <p className="text-sm text-blue-600">Kaasava eelarve maht</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <FileText className="h-6 w-6 text-purple-700" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-900">32</p>
                    <p className="text-sm text-blue-600">Aktiivset projekti</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Youth Council Elections */}
          <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
            <Link href="/kov/youth-council" className="block">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/youth-council-meeting.jpg"
                  alt="Youth Council"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="bg-purple-500 mb-2">Aktiivne</Badge>
                  <h3 className="text-2xl font-bold text-white drop-shadow-md">Noortevolikogu Valimised</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span className="text-sm text-gray-600">10. - 30. aprill 2024</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-purple-600 group-hover:translate-x-2 transition-transform" />
                </div>
                <p className="text-gray-600">
                  Vali oma esindajad noortevolikokku ja aita kujundada noorte tulevikku Tartus.
                </p>
              </CardContent>
            </Link>
          </Card>

          {/* Participatory Budget */}
          <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
            <Link href="/kov/participatory-budget" className="block">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/participatory-budget.jpg"
                  alt="Participatory Budget"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="bg-green-500 mb-2">Hääletamine käib</Badge>
                  <h3 className="text-2xl font-bold text-white drop-shadow-md">Kaasav Eelarve 2024</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-gray-600">Vali kuni 3 projekti</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-green-600 group-hover:translate-x-2 transition-transform" />
                </div>
                <p className="text-gray-600">
                  Hääleta oma lemmikprojektide poolt ja aita kaasa Tartu linna arengule.
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Archive Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">Varasemad hääletused</CardTitle>
              <CardDescription>Tutvu eelmiste aastate projektide ja tulemustega</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="budget" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="budget" className="text-blue-950">Kaasav Eelarve</TabsTrigger>
                  <TabsTrigger value="youth" className="text-purple-950">Noortevolikogu</TabsTrigger>
                </TabsList>
                <TabsContent value="budget" className="mt-6">
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      {[2023, 2022, 2021, 2020].map((year) => (
                        <Link
                          key={year}
                          href={`/kov/participatory-budget/${year}`}
                          className="block p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-lg text-blue-950">Kaasav Eelarve {year}</h3>
                              <p className="text-sm text-blue-800 mt-1">
                                {year === 2023 ? "12 projekti, 3 võitjat" :
                                 year === 2022 ? "15 projekti, 4 võitjat" :
                                 year === 2021 ? "10 projekti, 3 võitjat" :
                                 "14 projekti, 4 võitjat"}
                              </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-blue-400" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="youth" className="mt-6">
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="space-y-4">
                      {[2023, 2022, 2021, 2020].map((year) => (
                        <Link
                          key={year}
                          href={`/kov/participatory-budget/${year}`}
                          className="block p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium text-lg text-purple-950">Noortevolikogu {year}</h3>
                              <p className="text-sm text-purple-800 mt-1">
                                {year === 2023 ? "25 kandidaati, 15 valitud" :
                                 year === 2022 ? "22 kandidaati, 15 valitud" :
                                 year === 2021 ? "20 kandidaati, 15 valitud" :
                                 "18 kandidaati, 15 valitud"}
                              </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-purple-400" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50">
            <CardHeader>
              <CardTitle className="text-2xl">Võta Ühendust</CardTitle>
              <CardDescription>Tartu Linnavolikogu ja linnavalitsuse infokeskus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="p-2 bg-white rounded-lg">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <p>Raekoda, 51003 Tartu</p>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="p-2 bg-white rounded-lg">
                    <Phone className="h-5 w-5 text-blue-600" />
                  </div>
                  <p>Tel 1789</p>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="p-2 bg-white rounded-lg">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  <p>infokeskus@tartu.ee</p>
                </div>
              </div>
              <div className="pt-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="mailto:infokeskus@tartu.ee" className="flex items-center justify-center gap-2">
                    <Mail className="h-4 w-4" />
                    Saada Email
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
