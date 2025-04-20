import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Info, Search, Filter, ArrowUpDown, MapPin, Calendar, Users, Euro } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const projects = [
  {
    id: "01",
    title: "Anne kanali ja Emajõe vaheline vabaajapark",
    description: "Uus vabaajapark peredele ja noortele, mis loob mitmekülgsed võimalused vaba aja veetmiseks ja sportimiseks. Park sisaldab mänguväljakuid, treeningalasid ja puhketsoonide.",
    cost: "100 000",
    votes: 552,
    progress: 65,
    location: "Anne kanal",
    category: "Vaba aeg",
    image: "/images/projects/anne-kanal.jpg",
    deadline: "30. aprill 2024",
  },
  {
    id: "02",
    title: "Foorid nutikamaks ja inimsõbralikumaks",
    description: "Liikluse optimeerimine ja ohutuse tõstmine läbi nutikate foorisüsteemide. Projekt hõlmab liiklusandmete kogumist ja analüüsi ning fooride kohandamist vastavalt liiklusolukorrale.",
    cost: "170 000",
    votes: 648,
    progress: 78,
    location: "Kesklinn",
    category: "Transport",
    image: "/images/projects/traffic-lights.jpg",
    deadline: "30. aprill 2024",
  },
  {
    id: "03",
    title: "ISTLA – tegevusala noortele",
    description: "Noorte vaba aja veetmise võimaluste laiendamine läbi uue tegevusala loomise. Ala sisaldab skateparki, ronimisseina ja kogunemisruume.",
    cost: "900 000",
    votes: 166,
    progress: 25,
    location: "Annelinn",
    category: "Noored",
    image: "/images/projects/youth-area.jpg",
    deadline: "30. aprill 2024",
  },
  {
    id: "04",
    title: "Istumisplatvormid ja õpperajad Tähtvere dendroparki",
    description: "Puhkealade ja õppevõimaluste arendamine Tähtvere dendropargis. Projekt sisaldab uusi istumisplatvorme, infotahvleid ja õpperadasid.",
    cost: "50 000",
    votes: 313,
    progress: 45,
    location: "Tähtvere",
    category: "Haridus",
    image: "/images/projects/dendropark.jpg",
    deadline: "30. aprill 2024",
  },
  {
    id: "05",
    title: "Jalakäijate turvaala südalinnas",
    description: "Kesklinna turvalisuse ja ligipääsetavuse parandamine läbi jalakäijate ala loomise. Projekt hõlmab tänavate ümberkujundamist ja liiklusohutuse parandamist.",
    cost: "200 000",
    votes: 155,
    progress: 35,
    location: "Kesklinn",
    category: "Transport",
    image: "/images/projects/pedestrian-area.jpg",
    deadline: "30. aprill 2024",
  },
];

export default function ParticipantBudgetPage() {
  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          src="/images/participatory-budget-hero.jpg"
          alt="Participatory Budget"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent">
          <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-2xl text-white space-y-6">
              <Badge className="bg-green-500/20 text-green-100 border-green-400/20 backdrop-blur-sm">
                Hääletamine avatud
              </Badge>
              <h1 className="text-4xl font-bold leading-tight">
                Tartu Kaasav Eelarve 2024
              </h1>
              <p className="text-xl text-gray-200">
                Vali kuni kolm projekti, mis aitavad muuta Tartut paremaks kohaks elamiseks
              </p>
              <div className="flex items-center gap-6 text-gray-200 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Kuni 30. aprill</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>1,720 hääletajat</span>
                </div>
                <div className="flex items-center gap-2">
                  <Euro className="h-4 w-4" />
                  <span>200,000€ eelarve</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Breadcrumbs */}
        <Card className="mb-6">
          <CardContent className="py-3 flex items-center gap-2 text-sm">
            <Link href="/kov" className="text-blue-600 hover:underline">
              KOV avaleht
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-500" />
            <span className="text-gray-600">Tartu kaasav eelarve 2024</span>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <Card className="lg:col-span-1 h-fit">
            <CardHeader>
              <CardTitle className="text-lg font-medium">Filtrid</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Kategooria</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Vali kategooria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Kõik kategooriad</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="vaba-aeg">Vaba aeg</SelectItem>
                    <SelectItem value="noored">Noored</SelectItem>
                    <SelectItem value="haridus">Haridus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Piirkond</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Vali piirkond" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Kõik piirkonnad</SelectItem>
                    <SelectItem value="kesklinn">Kesklinn</SelectItem>
                    <SelectItem value="annelinn">Annelinn</SelectItem>
                    <SelectItem value="tahtvere">Tähtvere</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Järjestus</label>
                <Select defaultValue="votes">
                  <SelectTrigger>
                    <SelectValue placeholder="Vali järjestus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="votes">Enim hääli</SelectItem>
                    <SelectItem value="cost-asc">Maksumus: madalaim</SelectItem>
                    <SelectItem value="cost-desc">Maksumus: kõrgeim</SelectItem>
                    <SelectItem value="name">Tähestikuline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button className="w-full" variant="outline">
                  Lähtesta filtrid
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Otsi projekti nime või kirjelduse järgi..."
                  className="pl-9"
                />
              </div>
            </div>

            {/* View Toggle */}
            <Tabs defaultValue="grid" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">
                  Kuvatakse 5 projekti
                </div>
                <TabsList className="grid w-[200px] grid-cols-2">
                  <TabsTrigger value="grid">Kaardid</TabsTrigger>
                  <TabsTrigger value="list">Nimekiri</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="grid" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="relative h-48">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <Badge className="bg-white/90 text-gray-900">
                            {project.category}
                          </Badge>
                          <Badge variant="outline" className="text-white border-white/30">
                            {project.id}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 text-lg mb-2 line-clamp-2">
                              {project.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                              {project.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-1.5">
                                <MapPin className="h-4 w-4" />
                                <span>{project.location}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Euro className="h-4 w-4" />
                                <span>{project.cost}€</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">{project.votes} häält</span>
                                <span className="font-medium text-blue-600">{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="h-2" />
                            </div>
                          </div>
                        </div>
                        <div className="mt-6">
                          <Button className="w-full">
                            Hääleta
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="list" className="mt-0">
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {projects.map((project) => (
                        <div key={project.id} className="p-4 hover:bg-gray-50">
                          <div className="flex items-start gap-4">
                            <div className="relative h-24 w-32 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className="bg-gray-100 text-gray-900">
                                  {project.category}
                                </Badge>
                                <Badge variant="outline">
                                  {project.id}
                                </Badge>
                              </div>
                              <h3 className="font-medium text-gray-900 mb-1">
                                {project.title}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                {project.description}
                              </p>
                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1.5 text-gray-600">
                                  <MapPin className="h-4 w-4" />
                                  <span>{project.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-600">
                                  <Euro className="h-4 w-4" />
                                  <span>{project.cost}€</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-gray-600">
                                  <Users className="h-4 w-4" />
                                  <span>{project.votes} häält</span>
                                </div>
                              </div>
                            </div>
                            <Button className="flex-shrink-0">
                              Hääleta
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Info Card */}
            <Card className="bg-blue-50 border-blue-100">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Info className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-blue-900">Hääletamise info</h3>
                    <p className="text-sm text-blue-800">
                      Iga tartlane saab hääletada kuni kolme projekti poolt. Hääletada saavad kõik vähemalt 14-aastased
                      Tartu linna elanikud, kelle elukoht on rahvastikuregistri andmetel Tartu linn, ning Tartu linnas
                      õppivad 14–26-aastased noored.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
