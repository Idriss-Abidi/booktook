"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, ExternalLink } from "lucide-react"
import { mockCharities } from "@/lib/mock-data"

export function CharityList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(mockCharities.map((charity) => charity.category)))

  const filteredCharities = mockCharities.filter((charity) => {
    const matchesSearch =
      searchTerm === "" ||
      charity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      charity.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === null || charity.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for charities or organizations..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>

          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {filteredCharities.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No organizations found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCharities.map((charity) => (
            <Card key={charity.id} className="overflow-hidden flex flex-col h-full">
              <div className="relative h-48">
                <Image
                  src={charity.image || "/placeholder.svg?height=200&width=400"}
                  alt={charity.name}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-2 right-2">{charity.category}</Badge>
              </div>

              <CardHeader>
                <CardTitle>{charity.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {charity.location}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4">{charity.description}</p>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Needs:</h4>
                  <div className="flex flex-wrap gap-2">
                    {charity.needs.map((need, index) => (
                      <Badge key={index} variant="outline">
                        {need}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3 border-t pt-4">
                <div className="flex items-center justify-between w-full text-sm">
                  <span>Contact:</span>
                  <a href={`mailto:${charity.email}`} className="text-primary hover:underline">
                    {charity.email}
                  </a>
                </div>

                <Button className="w-full" asChild>
                  <a href={charity.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
