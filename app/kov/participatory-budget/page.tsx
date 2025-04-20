import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Info, Search, Filter, ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

export default function ParticipantBudgetPage() {
  return (
    <div className="flex-1 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <Image
          src="/images/participatory-budget.jpg"
          alt="Participatory Budget"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold text-white mb-4">
                Tartu Kaasav Eelarve 2024
              </h1>
              <p className="text-xl text-white/90">
                Hääleta oma lemmikprojektide poolt ja aita kujundada Tartu tulevikku
              </p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Otsi projekti..."
                      className="pl-9"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtreeri" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Kõik projektid</SelectItem>
                      <SelectItem value="popular">Populaarsemad</SelectItem>
                      <SelectItem value="recent">Hiljuti lisatud</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Projects Table */}
            <Card>
              <CardHeader>
                <CardTitle>Projektid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "01",
                      title: "Anne kanali ja Emajõe vaheline vabaajapark",
                      description: "Uus vabaajapark peredele ja noortele",
                      cost: "100 000 €",
                      votes: 552,
                      progress: 65,
                    },
                    {
                      id: "02",
                      title: "Foorid nutikamaks ja inimsõbralikumaks",
                      description: "Liikluse optimeerimine ja ohutuse tõstmine",
                      cost: "170 000 €",
                      votes: 648,
                      progress: 78,
                    },
                    {
                      id: "03",
                      title: "ISTLA – tegevusala noortele",
                      description: "Noorte vaba aja veetmise võimaluste laiendamine",
                      cost: "900 000 €",
                      votes: 166,
                      progress: 25,
                    },
                    {
                      id: "04",
                      title: "Istumisplatvormid ja õpperajad Tähtvere dendroparki",
                      description: "Puhkealade ja õppevõimaluste arendamine",
                      cost: "50 000 €",
                      votes: 313,
                      progress: 45,
                    },
                    {
                      id: "05",
                      title: "Jalakäijate turvaala südalinnas",
                      description: "Kesklinna turvalisuse ja ligipääsetavuse parandamine",
                      cost: "200 000 €",
                      votes: 155,
                      progress: 35,
                    },
                  ].map((project) => (
                    <div
                      key={project.id}
                      className="p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900 truncate">
                              {project.title}
                            </h3>
                            <Badge variant="outline" className="shrink-0">
                              {project.id}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {project.description}
                          </p>
                          <div className="flex items-center gap-6 text-sm">
                            <span className="text-gray-600">
                              Maksumus: <span className="font-medium text-gray-900">{project.cost}</span>
                            </span>
                            <span className="text-gray-600">
                              Hääli: <span className="font-medium text-gray-900">{project.votes}</span>
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" className="shrink-0">
                          Hääleta
                        </Button>
                      </div>
                      <div className="mt-4">
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-6">
                  <span className="text-sm text-gray-600">Näitan 5 projekti 50-st</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0"
                      disabled
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0"
                    >
                      1
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0"
                    >
                      2
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0"
                    >
                      3
                    </Button>
                    <span className="text-gray-600">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0"
                    >
                      10
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-8 h-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Voting Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  Hääletamise Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-900 mb-1">Hääletamine on avatud</p>
                  <p className="text-blue-700 text-sm">10. - 30. aprill 2024</p>
                </div>

                <div className="space-y-3 text-sm">
                  <p className="font-medium">Kes saavad hääletada?</p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="rounded-full h-2 w-2 bg-blue-600 mt-2 shrink-0" />
                      Tartu linna registreeritud elanikud alates 14. eluaastast
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="rounded-full h-2 w-2 bg-blue-600 mt-2 shrink-0" />
                      Kõik 14–26-aastased noored, kes õpivad Tartu linnas
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 text-sm">
                  <p className="font-medium">Kuidas hääletada?</p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="rounded-full h-2 w-2 bg-blue-600 mt-2 shrink-0" />
                      Vali kuni 3 erinevat projekti
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="rounded-full h-2 w-2 bg-blue-600 mt-2 shrink-0" />
                      Hääleta elektrooniliselt ID-kaardi, mobiili-ID või Smart-ID-ga
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="rounded-full h-2 w-2 bg-blue-600 mt-2 shrink-0" />
                      Või hääleta Tartu raekoja infokeskuses (avatud 10-18)
                    </li>
                  </ul>
                </div>

                <Button className="w-full">
                  Alusta Hääletamist
                </Button>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Statistika</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-600">1,834</p>
                    <p className="text-sm text-gray-600">Hääletajat</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">50</p>
                    <p className="text-sm text-gray-600">Projekti</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-600">1.5M €</p>
                  <p className="text-sm text-gray-600">Kogumaksumus</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
