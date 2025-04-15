"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

export function CategoryFilter({ onFilterChange }: { onFilterChange?: (filters: any) => void }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All Categories")
  const [selectedCondition, setSelectedCondition] = useState(searchParams.get("condition") || "All Conditions")
  const [selectedListingType, setSelectedListingType] = useState(searchParams.get("listingType") || "All Listings")
  const [selectedSort, setSelectedSort] = useState(searchParams.get("sort") || "Newest First")

  const categories = [
    "All Categories",
    "Fiction",
    "Non-Fiction",
    "Science",
    "History",
    "Biography",
    "Children's Books",
    "Textbooks",
    "Other",
  ]

  const conditions = ["All Conditions", "New", "Like New", "Very Good", "Good", "Acceptable"]

  const listingTypes = ["All Listings", "For Sale", "For Exchange", "Sale or Exchange"]

  const sortOptions = [
    "Newest First",
    "Price: Low to High",
    "Price: High to Low",
    "Alphabetical: A-Z",
    "Alphabetical: Z-A",
  ]

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())

    // Only update URL if values have changed from current URL params
    const currentCategory = searchParams.get("category") || "All Categories"
    const currentCondition = searchParams.get("condition") || "All Conditions"
    const currentListingType = searchParams.get("listingType") || "All Listings"
    const currentSort = searchParams.get("sort") || "Newest First"

    let hasChanges = false

    if (selectedCategory !== currentCategory) {
      if (selectedCategory !== "All Categories") {
        params.set("category", selectedCategory)
      } else {
        params.delete("category")
      }
      hasChanges = true
    }

    if (selectedCondition !== currentCondition) {
      if (selectedCondition !== "All Conditions") {
        params.set("condition", selectedCondition)
      } else {
        params.delete("condition")
      }
      hasChanges = true
    }

    if (selectedListingType !== currentListingType) {
      if (selectedListingType !== "All Listings") {
        params.set("listingType", selectedListingType)
      } else {
        params.delete("listingType")
      }
      hasChanges = true
    }

    if (selectedSort !== currentSort) {
      if (selectedSort !== "Newest First") {
        params.set("sort", selectedSort)
      } else {
        params.delete("sort")
      }
      hasChanges = true
    }

    // Only update URL if there are actual changes
    if (hasChanges) {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }

    // Call the callback if provided
    if (onFilterChange) {
      onFilterChange({
        category: selectedCategory,
        condition: selectedCondition,
        listingType: selectedListingType,
        sort: selectedSort,
      })
    }
  }, [
    selectedCategory,
    selectedCondition,
    selectedListingType,
    selectedSort,
    router,
    pathname,
    onFilterChange,
    searchParams,
  ])

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between">
            {selectedCategory}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {categories.map((category) => (
            <DropdownMenuCheckboxItem
              key={category}
              checked={selectedCategory === category}
              onCheckedChange={() => setSelectedCategory(category)}
            >
              {category}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between">
            {selectedCondition}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Condition</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {conditions.map((condition) => (
            <DropdownMenuCheckboxItem
              key={condition}
              checked={selectedCondition === condition}
              onCheckedChange={() => setSelectedCondition(condition)}
            >
              {condition}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between">
            {selectedListingType}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Listing Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {listingTypes.map((type) => (
            <DropdownMenuCheckboxItem
              key={type}
              checked={selectedListingType === type}
              onCheckedChange={() => setSelectedListingType(type)}
            >
              {type}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="justify-between ml-auto">
            Sort By: {selectedSort}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {sortOptions.map((option) => (
            <DropdownMenuCheckboxItem
              key={option}
              checked={selectedSort === option}
              onCheckedChange={() => setSelectedSort(option)}
            >
              {option}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
