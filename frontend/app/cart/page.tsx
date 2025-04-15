"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"

export default function WishlistPage() {
  const { isAuthenticated } = useAuth()
  const { cart, removeFromCart, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()

  const handleContactSeller = (bookId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Please login",
        description: "You need to be logged in to contact sellers",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    toast({
      title: "Contact request sent",
      description: "The seller will be notified of your interest.",
    })
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your wishlist is empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added any books to your wishlist yet.</p>
        <Button asChild>
          <Link href="/">Browse Books</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

      <div className="grid gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Saved Books ({cart.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg?height=120&width=80"}
                      alt={item.title}
                      width={80}
                      height={120}
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">by {item.author}</p>
                    <p className="text-sm text-muted-foreground">Condition: {item.condition}</p>
                    <div className="mt-2">
                      <Button size="sm" onClick={() => handleContactSeller(item.id)}>
                        Contact Seller
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col justify-between items-end">
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="outline" onClick={() => clearCart()}>
          Clear Wishlist
        </Button>
      </div>
    </div>
  )
}
