"use client"

import Image from "next/image"
import type { Book } from "@/components/book-list"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BookCardProps {
  book: Book
  onClick: () => void
}

export function BookCard({ book, onClick }: BookCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer" onClick={onClick}>
      <div className="aspect-[2/3] relative">
        <Image
          src={book.image || "/placeholder.svg?height=300&width=200"}
          alt={book.title}
          fill
          className="object-cover"
        />
        {book.listingType === "exchange" && <Badge className="absolute top-2 right-2">Exchange</Badge>}
        {book.listingType === "both" && <Badge className="absolute top-2 right-2">Sell/Exchange</Badge>}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold line-clamp-1">{book.title}</h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-medium">${book.price.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground capitalize">{book.condition}</span>
        </div>
      </CardContent>
    </Card>
  )
}
