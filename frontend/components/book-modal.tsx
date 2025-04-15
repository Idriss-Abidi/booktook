"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Heart, RefreshCw } from "lucide-react"
import type { Book } from "@/components/book-list"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart-provider"

interface BookModalProps {
  book: Book
  isOpen: boolean
  onClose: () => void
}

export function BookModal({ book, isOpen, onClose }: BookModalProps) {
  const [activeTab, setActiveTab] = useState("details")
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToWishlist = () => {
    addToCart({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.image,
      condition: book.condition,
    })

    toast({
      title: "Added to wishlist",
      description: `${book.title} has been added to your wishlist.`,
    })

    onClose()
  }

  const handleExchange = () => {
    toast({
      title: "Exchange request sent",
      description: `Your exchange request for ${book.title} has been sent to the seller.`,
    })

    onClose()
  }

  const handleContactSeller = () => {
    toast({
      title: "Contact request sent",
      description: `The seller will be notified of your interest in ${book.title}.`,
    })

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{book.title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>by {book.author}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="aspect-[2/3] relative">
            <Image
              src={book.image || "/placeholder.svg?height=400&width=300"}
              alt={book.title}
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-2xl font-bold">${book.price.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground capitalize">Condition: {book.condition}</p>
              </div>
              <Badge variant={book.listingType === "exchange" ? "secondary" : "default"}>
                {book.listingType === "sell"
                  ? "For Sale"
                  : book.listingType === "exchange"
                    ? "For Exchange"
                    : "Sell/Exchange"}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={`/placeholder.svg?height=24&width=24`} alt={book.seller.name} />
                <AvatarFallback>{book.seller.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{book.seller.name}</span>
            </div>

            <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4">
                <p className="text-sm">{book.description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Category</p>
                    <p className="capitalize">{book.category}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Listed on</p>
                    <p>{new Date(book.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              {(book.listingType === "sell" || book.listingType === "both") && (
                <Button className="flex-1" onClick={handleContactSeller}>
                  Contact Seller
                </Button>
              )}
              <Button variant="outline" className="flex-1" onClick={handleAddToWishlist}>
                <Heart className="h-4 w-4 mr-2" />
                Add to Wishlist
              </Button>
              {(book.listingType === "exchange" || book.listingType === "both") && (
                <Button variant="outline" className="flex-1" onClick={handleExchange}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Request Exchange
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
