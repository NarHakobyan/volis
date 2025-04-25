import Image from "next/image"
import Link from "next/link"
import { Badge } from "./badge"
import { Button } from "./button"
import { Card, CardContent } from "./card"
import { Progress } from "./progress"
import { MapPin, Euro, Users, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    image?: string
    category: string
    location: string
    cost: string
    votes: number
    progress: number
    deadline: string
  }
  variant?: "default" | "compact"
  className?: string
  showVoteButton?: boolean
  isVoted?: boolean
  onVote?: () => void
}

export function ProjectCard({
  project,
  variant = "default",
  className,
  showVoteButton = true,
  isVoted = false,
  onVote
}: ProjectCardProps) {
  const isCompact = variant === "compact"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        className={cn(
          "group overflow-hidden transition-all duration-300 hover:shadow-lg",
          className
        )}
      >
        <Link href={`/kov/participatory-budget/${project.id}`}>
          <div className="relative bg-blue-50/50 py-8">
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-white/90 text-gray-900"
              >
                {project.category}
              </Badge>
              {isVoted && (
                <Badge
                  variant="default"
                  className="bg-green-500"
                >
                  Hääletatud
                </Badge>
              )}
            </div>
            <h3 className="text-center font-medium text-gray-900 text-xl leading-tight px-6 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
          </div>
        </Link>

        <CardContent className={cn(
          "p-6",
          isCompact && "p-4"
        )}>
          <div className="space-y-4">
            {!isCompact && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {project.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-600">
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
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{project.votes} häält</span>
                </div>
                <span className="font-medium text-blue-600">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>

            {showVoteButton && (
              <Button
                className="w-full gap-2 mt-2 bg-blue-600 text-white hover:bg-blue-700"
                onClick={onVote}
                disabled={isVoted}
              >
                {isVoted ? "Hääletatud" : "Hääleta"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
