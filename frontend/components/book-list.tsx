"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { BookCard } from "@/components/book-card"
import { BookModal } from "@/components/book-modal"
import { Skeleton } from "@/components/ui/skeleton"
import { mockBooks } from "@/lib/mock-data"

export type Book = {
  id: string
  title: string
  author: string
  description: string
  price: number
  condition: string
  category: string
  image: string
  seller: {
    id: string
    name: string
  }
  listingType: "sell" | "exchange" | "both"
  createdAt: string
}

export function BookList() {
  const [books, setBooks] = useState<Book[]>([])
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchBooks = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // Remove ratings from mock books
        const booksWithoutRatings = mockBooks.map((book) => {
          const { seller, ...rest } = book
          const { rating, ...sellerWithoutRating } = seller
          return {
            ...rest,
            seller: sellerWithoutRating,
          }
        })
        setBooks(booksWithoutRatings)
      } catch (error) {
        console.error("Error fetching books:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [])

  useEffect(() => {
    if (books.length === 0) return

    // Apply filters based on URL parameters
    let filtered = [...books]

    const category = searchParams.get("category")
    const condition = searchParams.get("condition")
    const listingType = searchParams.get("listingType")
    const sort = searchParams.get("sort")

    // Filter by category
    if (category && category !== "All Categories") {
      filtered = filtered.filter((book) => book.category.toLowerCase() === category.toLowerCase())
    }

    // Filter by condition
    if (condition && condition !== "All Conditions") {
      filtered = filtered.filter((book) => {
        const bookCondition = book.condition.replace(/-/g, " ")
        return bookCondition.toLowerCase() === condition.toLowerCase()
      })
    }

    // Filter by listing type
    if (listingType && listingType !== "All Listings") {
      if (listingType === "For Sale") {
        filtered = filtered.filter((book) => book.listingType === "sell" || book.listingType === "both")
      } else if (listingType === "For Exchange") {
        filtered = filtered.filter((book) => book.listingType === "exchange" || book.listingType === "both")
      } else if (listingType === "Sale or Exchange") {
        filtered = filtered.filter((book) => book.listingType === "both")
      }
    }

    // Apply sorting
    if (sort) {
      switch (sort) {
        case "Price: Low to High":
          filtered.sort((a, b) => a.price - b.price)
          break
        case "Price: High to Low":
          filtered.sort((a, b) => b.price - a.price)
          break
        case "Alphabetical: A-Z":
          filtered.sort((a, b) => a.title.localeCompare(b.title))
          break
        case "Alphabetical: Z-A":
          filtered.sort((a, b) => b.title.localeCompare(a.title))
          break
        default: // "Newest First"
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      }
    } else {
      // Default sort by newest
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    setFilteredBooks(filtered)
  }, [books, searchParams.toString()])

  const handleBookClick = (book: Book) => {
    setSelectedBook(book)
    setIsModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-[250px] w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    )
  }

  if (filteredBooks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No books found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <BookCard key={book.id} book={book} onClick={() => handleBookClick(book)} />
        ))}
      </div>

      {selectedBook && <BookModal book={selectedBook} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  )
}
