"use client"

import { useState } from "react"
import Image from "next/image"
import { Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock user books data
const mockUserBooks = [
  {
    id: "book-1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 12.99,
    condition: "Good",
    listingType: "sell",
    image: "/placeholder.svg?height=80&width=60",
    status: "active",
    createdAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "book-2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 9.99,
    condition: "Very Good",
    listingType: "both",
    image: "/placeholder.svg?height=80&width=60",
    status: "active",
    createdAt: "2023-06-20T14:45:00Z",
  },
  {
    id: "book-3",
    title: "1984",
    author: "George Orwell",
    price: 0,
    condition: "Acceptable",
    listingType: "exchange",
    image: "/placeholder.svg?height=80&width=60",
    status: "active",
    createdAt: "2023-07-05T09:15:00Z",
  },
]

export function UserBooksList() {
  const [books, setBooks] = useState(mockUserBooks)
  const [bookToDelete, setBookToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  const handleDeleteBook = () => {
    if (bookToDelete) {
      setBooks(books.filter((book) => book.id !== bookToDelete))

      toast({
        title: "Book deleted",
        description: "Your book has been removed from the listings.",
      })

      setBookToDelete(null)
    }
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">You haven't listed any books yet.</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {books.map((book) => (
          <div key={book.id} className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="flex-shrink-0">
              <Image
                src={book.image || "/placeholder.svg"}
                alt={book.title}
                width={60}
                height={80}
                className="object-cover rounded"
              />
            </div>
            <div className="flex-grow min-w-0">
              <h4 className="font-medium truncate">{book.title}</h4>
              <p className="text-sm text-muted-foreground">by {book.author}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {book.condition}
                </Badge>
                <Badge variant={book.listingType === "exchange" ? "secondary" : "default"} className="text-xs">
                  {book.listingType === "sell"
                    ? "For Sale"
                    : book.listingType === "exchange"
                      ? "For Exchange"
                      : "Sell/Exchange"}
                </Badge>
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              {book.listingType !== "exchange" && <p className="font-medium">${book.price.toFixed(2)}</p>}
              <p className="text-xs text-muted-foreground">Listed on {new Date(book.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex-shrink-0 flex gap-2">
              <Button variant="ghost" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setBookToDelete(book.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!bookToDelete} onOpenChange={() => setBookToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this book listing. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBook}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
