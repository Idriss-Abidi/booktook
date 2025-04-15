"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

// Mock orders data
const mockOrders = [
  {
    id: "order-1",
    date: "2023-08-10T15:20:00Z",
    status: "delivered",
    total: 32.97,
    items: [
      {
        id: "item-1",
        bookId: "book-4",
        title: "Dune",
        author: "Frank Herbert",
        price: 14.99,
        image: "/placeholder.svg?height=80&width=60",
        condition: "Like New",
        reviewed: true,
      },
      {
        id: "item-2",
        bookId: "book-5",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        price: 12.99,
        image: "/placeholder.svg?height=80&width=60",
        condition: "Good",
        reviewed: false,
      },
    ],
  },
  {
    id: "order-2",
    date: "2023-09-05T11:45:00Z",
    status: "shipped",
    total: 24.98,
    items: [
      {
        id: "item-3",
        bookId: "book-6",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 8.99,
        image: "/placeholder.svg?height=80&width=60",
        condition: "Very Good",
        reviewed: false,
      },
      {
        id: "item-4",
        bookId: "book-7",
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        price: 10.99,
        image: "/placeholder.svg?height=80&width=60",
        condition: "Good",
        reviewed: false,
      },
    ],
  },
]

export function UserOrdersList() {
  const [orders, setOrders] = useState(mockOrders)
  const [expandedOrder, setExpandedOrder] = useState<string | null>("order-1")
  const [reviewText, setReviewText] = useState("")
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewingItem, setReviewingItem] = useState<string | null>(null)
  const { toast } = useToast()

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const handleSubmitReview = (orderId: string, itemId: string) => {
    // Update the order item to mark as reviewed
    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            items: order.items.map((item) => {
              if (item.id === itemId) {
                return { ...item, reviewed: true }
              }
              return item
            }),
          }
        }
        return order
      }),
    )

    // Reset review state
    setReviewText("")
    setReviewRating(5)
    setReviewingItem(null)

    toast({
      title: "Review submitted",
      description: "Thank you for your feedback!",
    })
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">You haven't placed any orders yet.</p>
        <Button asChild className="mt-4">
          <Link href="/">Browse Books</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg overflow-hidden">
          <div
            className="flex items-center justify-between p-4 cursor-pointer bg-muted/30"
            onClick={() => toggleOrderExpand(order.id)}
          >
            <div>
              <p className="font-medium">Order #{order.id.split("-")[1]}</p>
              <p className="text-sm text-muted-foreground">Placed on {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">${order.total.toFixed(2)}</p>
                <Badge
                  variant={
                    order.status === "delivered" ? "default" : order.status === "shipped" ? "secondary" : "outline"
                  }
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
              {expandedOrder === order.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </div>

          {expandedOrder === order.id && (
            <div className="p-4 space-y-4">
              {order.items.map((item) => (
                <div key={item.id}>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={60}
                        height={80}
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">by {item.author}</p>
                      <p className="text-sm text-muted-foreground">Condition: {item.condition}</p>
                      <p className="font-medium mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {order.status === "delivered" && !item.reviewed && (
                        <Button variant="outline" size="sm" onClick={() => setReviewingItem(item.id)}>
                          Leave Review
                        </Button>
                      )}
                      {item.reviewed && <Badge variant="outline">Reviewed</Badge>}
                    </div>
                  </div>

                  {reviewingItem === item.id && (
                    <div className="mt-4 p-4 border rounded-lg">
                      <h5 className="font-medium mb-2">Write a Review</h5>
                      <div className="flex items-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-6 w-6 cursor-pointer ${
                              star <= reviewRating ? "fill-primary text-primary" : "text-muted-foreground"
                            }`}
                            onClick={() => setReviewRating(star)}
                          />
                        ))}
                      </div>
                      <Textarea
                        placeholder="Share your thoughts about this book..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        rows={4}
                        className="mb-4"
                      />
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => setReviewingItem(null)}>
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSubmitReview(order.id, item.id)}
                          disabled={!reviewText.trim()}
                        >
                          Submit Review
                        </Button>
                      </div>
                    </div>
                  )}

                  <Separator className="my-4" />
                </div>
              ))}

              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${(order.total - 4.99).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>$4.99</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
