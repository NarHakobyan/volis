import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Building2, Users2, BarChart3, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function KOVPage() {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-4 max-w-3xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-500">Tartu Linna E-teenused</h1>
            <p className="text-lg md:text-xl opacity-90 text-blue-500">
              Osale linna arengus ja otsustusprotsessides läbi meie digitaalsete platvormide
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Featured Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Youth Council Elections */}
          <Card className="group hover:shadow-lg transition-all duration-300">
            <Link href="/kov/youth-council" className="block">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <Users2 className="h-8 w-8 text-blue-600" />
                  <ChevronRight className="h-6 w-6 text-blue-600 group-hover:translate-x-2 transition-transform" />
                </div>
                <CardTitle className="text-2xl text-blue-700">
                  Noortevolikogu Valimised
                </CardTitle>
                <CardDescription className="text-base">
                  Osale Tartu linna noortevolikogu valimistel ja aita kujundada noorte tulevikku
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium text-blue-900">Valimised on avatud</p>
                  <p className="text-blue-700">10. aprill - 30. aprill 2024</p>
                </div>
              </CardContent>
            </Link>
          </Card>

          {/* Participatory Budget */}
          <Card className="group hover:shadow-lg transition-all duration-300">
            <Link href="/kov/participatory-budget" className="block">
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                  <ChevronRight className="h-6 w-6 text-green-600 group-hover:translate-x-2 transition-transform" />
                </div>
                <CardTitle className="text-2xl text-green-700">
                  Kaasav Eelarve 2024
                </CardTitle>
                <CardDescription className="text-base">
                  Hääleta oma lemmikprojektide poolt ja aita kaasa Tartu linna arengule
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="font-medium text-green-900">Hääletamine käib</p>
                  <p className="text-green-700">Vali kuni 3 projekti</p>
                </div>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Quick Links and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Archive Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Varasemad Projektid</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="budget" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="budget" className="flex-1">Kaasav Eelarve</TabsTrigger>
                  <TabsTrigger value="youth" className="flex-1">Noortevolikogu</TabsTrigger>
                </TabsList>
                <TabsContent value="budget" className="mt-4">
                  <div className="space-y-4">
                    <Link href="/kov/archive/budget-2023" className="block p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                      <h3 className="font-medium">Kaasav Eelarve 2023</h3>
                      <p className="text-sm text-gray-600">12 projekti, 3 võitjat</p>
                    </Link>
                    <Link href="/kov/archive/budget-2022" className="block p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                      <h3 className="font-medium">Kaasav Eelarve 2022</h3>
                      <p className="text-sm text-gray-600">15 projekti, 4 võitjat</p>
                    </Link>
                  </div>
                </TabsContent>
                <TabsContent value="youth" className="mt-4">
                  <div className="space-y-4">
                    <Link href="/kov/archive/youth-2023" className="block p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                      <h3 className="font-medium">Noortevolikogu 2023</h3>
                      <p className="text-sm text-gray-600">25 kandidaati, 15 valitud</p>
                    </Link>
                    <Link href="/kov/archive/youth-2022" className="block p-4 rounded-lg bg-gray-50 hover:bg-gray-100">
                      <h3 className="font-medium">Noortevolikogu 2022</h3>
                      <p className="text-sm text-gray-600">22 kandidaati, 15 valitud</p>
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle>Võta Ühendust</CardTitle>
              <CardDescription>Tartu Linnavolikogu ja linnavalitsuse infokeskus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <p>Raekoda, 51003 Tartu</p>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <p>Tel 1789</p>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <p>infokeskus@tartu.ee</p>
              </div>
              <div className="pt-4">
                <Button className="w-full" asChild>
                  <Link href="mailto:infokeskus@tartu.ee">
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
