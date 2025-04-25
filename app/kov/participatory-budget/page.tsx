"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Euro, Users2, Calendar, ChevronRight, Search, MapPin, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { StatisticsCard } from "@/components/ui/statistics-card"
import { ProjectCard } from "@/components/ui/project-card"
import { ProjectFilters } from "@/components/ui/project-filters"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProposalModal } from "@/components/ui/proposal-modal"
import { CategoriesChart } from "@/components/ui/categories-chart"

// Sample data - replace with real data from your backend
const categories = [
  { value: "transport", label: "Transport", count: 5 },
  { value: "vaba-aeg", label: "Vaba aeg", count: 8 },
  { value: "noored", label: "Noored", count: 4 },
  { value: "haridus", label: "Haridus", count: 6 },
  { value: "keskkond", label: "Keskkond", count: 3 },
  { value: "kultuur", label: "Kultuur", count: 4 },
]

const locations = [
  { value: "kesklinn", label: "Kesklinn", count: 12 },
  { value: "annelinn", label: "Annelinn", count: 8 },
  { value: "tahtvere", label: "Tähtvere", count: 5 },
  { value: "karlova", label: "Karlova", count: 4 },
  { value: "supilinn", label: "Supilinn", count: 3 },
]

const sortOptions = [
  { value: "votes", label: "Enim hääli" },
  { value: "cost-asc", label: "Maksumus: madalaim" },
  { value: "cost-desc", label: "Maksumus: kõrgeim" },
  { value: "name", label: "Tähestikuline" },
]

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
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    locations: [],
    sort: "votes",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [votedProjects, setVotedProjects] = useState<string[]>([])

  const handleFilterChange = (type: "categories" | "locations" | "sort", value: string[] | string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [type]: value
    }))
  }

  const handleVote = (projectId: string) => {
    if (votedProjects.length >= 3 && !votedProjects.includes(projectId)) {
      // Show max votes reached notification
      return
    }
    setVotedProjects(prev =>
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    )
  }

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/70">
          <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl text-white space-y-6"
            >
              <Badge className="bg-blue-500/20 text-blue-100 border-blue-400/20 backdrop-blur-sm">
                Hääletamine avatud
              </Badge>
              <h1 className="text-5xl font-bold leading-tight">
                Tartu Kaasav Eelarve 2024
              </h1>
              <p className="text-xl text-blue-100">
                Vali kuni kolm projekti, mis aitavad muuta Tartut paremaks kohaks elamiseks
              </p>
              <div className="flex items-center gap-6 text-blue-200 text-sm pt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Kuni 30. aprill</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users2 className="h-4 w-4" />
                  <span>1,720 hääletajat</span>
                </div>
                <div className="flex items-center gap-2">
                  <Euro className="h-4 w-4" />
                  <span>200,000€ eelarve</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="relative -mt-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatisticsCard
              icon={<Users2 className="h-6 w-6 text-blue-600" />}
              label="Aktiivsed osalejad"
              value="1,720"
              trend={{ value: 12, isPositive: true }}
            />
            <StatisticsCard
              icon={<Euro className="h-6 w-6 text-green-600" />}
              label="Kaasava eelarve maht"
              value="200,000€"
            />
            <StatisticsCard
              icon={<MapPin className="h-6 w-6 text-purple-600" />}
              label="Projektide arv"
              value="32"
              trend={{ value: 8, isPositive: true }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card >
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900">Sinu hääled</h3>
                    <p className="text-sm text-gray-600">
                      {votedProjects.length}/3 häält antud
                    </p>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${(votedProjects.length / 3) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">Kategooriad</h4>
                    <CategoriesChart data={categories} />
                  </div>

                  {votedProjects.length > 0 ? (
                    <ScrollArea className="h-[200px]">
                      <div className="space-y-2">
                        {votedProjects.map(projectId => {
                          const project = projects.find(p => p.id === projectId)
                          if (!project) return null
                          return (
                            <ProjectCard
                              key={project.id}
                              project={project}
                              variant="compact"
                              showVoteButton={false}
                            />
                          )
                        })}
                      </div>
                      <ScrollBar orientation="vertical" />
                    </ScrollArea>
                  ) : (
                    <div className="text-sm text-gray-600 text-center py-8">
                      Sa pole veel ühtegi projekti valinud
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Alert className="bg-blue-50 border-blue-100">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-sm text-blue-800">
                Hääletada saavad kõik vähemalt 14-aastased Tartu linna elanikud.
              </AlertDescription>
            </Alert>
          </div>

          {/* Projects Grid */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  className="pl-9"
                  placeholder="Otsi projekte..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <ProposalModal trigger={<Button variant="default" className="bg-blue-600 text-white hover:bg-blue-700">Esita ettepanek</Button>} />
            </div>

            <ProjectFilters
              categories={categories}
              locations={locations}
              sortOptions={sortOptions}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />

            <Tabs defaultValue="grid" className="w-full">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Kuvatakse {projects.length} projekti
                </div>
                <TabsList className="grid w-[200px] grid-cols-2 bg-gray-100">
                  <TabsTrigger value="grid" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700">Kaardid</TabsTrigger>
                  <TabsTrigger value="list" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-700">Nimekiri</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="grid" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isVoted={votedProjects.includes(project.id)}
                      onVote={() => handleVote(project.id)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="list" className="mt-6">
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {projects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          variant="compact"
                          isVoted={votedProjects.includes(project.id)}
                          onVote={() => handleVote(project.id)}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
