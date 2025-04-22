import { Card, CardContent } from "./card"
import { cn } from "@/lib/utils"

interface StatisticsCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function StatisticsCard({
  icon,
  label,
  value,
  trend,
  className
}: StatisticsCardProps) {
  return (
    <Card className={cn("overflow-hidden bg-white/50 backdrop-blur-sm border border-gray-100/20 shadow-lg hover:shadow-xl transition-all duration-200", className)}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50/80 rounded-xl shadow-sm ring-1 ring-blue-100/50">
            {icon}
          </div>
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-gray-600/90">{label}</p>
            <p className="text-2xl font-semibold text-gray-900/90 tracking-tight">{value}</p>
            {trend && (
              <div className="flex items-center gap-1.5 text-sm">
                <span
                  className={cn(
                    "font-medium rounded-full px-2 py-0.5",
                    trend.isPositive
                      ? "text-green-700 bg-green-50/70"
                      : "text-red-700 bg-red-50/70"
                  )}
                >
                  {trend.isPositive ? "+" : "-"}{trend.value}%
                </span>
                <span className="text-gray-600/75">vs. last month</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
