import { useState } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { Button } from "./button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface ProjectFiltersProps {
  categories: FilterOption[]
  locations: FilterOption[]
  sortOptions: FilterOption[]
  selectedFilters: {
    categories: string[]
    locations: string[]
    sort: string
  }
  onFilterChange: (type: "categories" | "locations" | "sort", value: string[] | string) => void
}

export function ProjectFilters({
  categories,
  locations,
  sortOptions,
  selectedFilters,
  onFilterChange,
}: ProjectFiltersProps) {
  const [openCategory, setOpenCategory] = useState(false)
  const [openLocation, setOpenLocation] = useState(false)
  const [openSort, setOpenSort] = useState(false)

  const handleCategorySelect = (value: string) => {
    const current = selectedFilters.categories
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value]
    onFilterChange("categories", updated)
  }

  const handleLocationSelect = (value: string) => {
    const current = selectedFilters.locations
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value]
    onFilterChange("locations", updated)
  }

  const clearFilters = () => {
    onFilterChange("categories", [])
    onFilterChange("locations", [])
    onFilterChange("sort", "relevance")
  }

  const hasActiveFilters = selectedFilters.categories.length > 0 || selectedFilters.locations.length > 0

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Popover open={openCategory} onOpenChange={setOpenCategory}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCategory}
              className="justify-between min-w-[160px]"
            >
              Kategooriad
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Otsi kategooriat..." />
              <CommandEmpty>Kategooriat ei leitud</CommandEmpty>
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem
                    key={category.value}
                    onSelect={() => handleCategorySelect(category.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedFilters.categories.includes(category.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {category.label}
                    {category.count && (
                      <span className="ml-auto text-xs text-gray-600">
                        {category.count}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover open={openLocation} onOpenChange={setOpenLocation}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openLocation}
              className="justify-between min-w-[160px]"
            >
              Piirkonnad
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Otsi piirkonda..." />
              <CommandEmpty>Piirkonda ei leitud</CommandEmpty>
              <CommandGroup>
                {locations.map((location) => (
                  <CommandItem
                    key={location.value}
                    onSelect={() => handleLocationSelect(location.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedFilters.locations.includes(location.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {location.label}
                    {location.count && (
                      <span className="ml-auto text-xs text-gray-600">
                        {location.count}
                      </span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover open={openSort} onOpenChange={setOpenSort}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openSort}
              className="justify-between min-w-[160px]"
            >
              {sortOptions.find((option) => option.value === selectedFilters.sort)?.label || "Järjesta"}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandGroup>
                {sortOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => onFilterChange("sort", option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedFilters.sort === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            className="h-8 px-2 lg:px-3"
            onClick={clearFilters}
          >
            Lähtesta
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {selectedFilters.categories.map((category) => (
            <Badge
              key={category}
              variant="secondary"
              className="rounded-full"
            >
              {categories.find((c) => c.value === category)?.label}
              <button
                className="ml-1 rounded-full outline-none"
                onClick={() => handleCategorySelect(category)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {selectedFilters.locations.map((location) => (
            <Badge
              key={location}
              variant="secondary"
              className="rounded-full"
            >
              {locations.find((l) => l.value === location)?.label}
              <button
                className="ml-1 rounded-full outline-none"
                onClick={() => handleLocationSelect(location)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
