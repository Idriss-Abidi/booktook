"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function HeroSection() {
  return (
    <div className="relative py-12 px-6 rounded-xl overflow-hidden bg-gradient-to-r from-primary/10 to-primary/5">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Buy, Sell, and Exchange Used Books</h1>
        <p className="text-lg text-muted-foreground">
          Join our community of book lovers. Find your next read, sell books you've enjoyed, or exchange with other
          readers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search by title, author, or ISBN..." className="pl-10" />
          </div>
          <Button>Search</Button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button asChild variant="outline">
            <Link href="/buy">Browse Books</Link>
          </Button>
          <Button asChild>
            <Link href="/add-book">Sell Your Books</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
