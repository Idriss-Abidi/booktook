"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type WishlistItem = {
  id: string
  title: string
  author: string
  price: number
  image?: string
  condition: string
}

type WishlistContextType = {
  cart: WishlistItem[]
  addToCart: (item: WishlistItem) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<WishlistContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<WishlistItem[]>([])

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("wishlist")
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: WishlistItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        // If item already exists, don't add it again
        return prevCart
      } else {
        // Otherwise add new item
        return [...prevCart, item]
      }
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
  }

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
