"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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

// Mock user reviews data
const mockUserReviews = [
  {
    id: "review-1",
    bookId: "book-4",
    title: "Dune",
    author: "Frank Herbert",
    image: "/placeholder.svg?height=80&width=60",
    rating: 5,
    comment:
      "An absolute masterpiece of science fiction. The world-building is incredible and the characters are so well developed. Highly recommend to any sci-fi fan.",
    date: "2023-08-15T10:30:00Z",
  },
  {
    id: "review-2",
    bookId: "book-8",
    title: "The Alchemist",
    author: "Paulo Coelho",
    image: "/placeholder.svg?height=80&width=60",
    rating: 4,
    comment: "A beautiful and inspiring story about following your dreams. The prose is simple yet profound.",
    date: "2023-07-20T14:45:00Z",
  },
]

export function UserReviewsList() {
  const [reviews, setReviews] = useState(mockUserReviews)
  const [editingReview, setEditingReview] = useState<string | null>(null)
  const [reviewToDelete, setReviewToDelete] = useState<string | null>(null)
  const [editRating, setEditRating] = useState(5)
  const [editComment, setEditComment] = useState("")
  const { toast } = useToast()

  const handleEditReview = (reviewId: string) => {
    const review = reviews.find((r) => r.id === reviewId)
    if (review) {
      setEditRating(review.rating)
      setEditComment(review.comment)
      setEditingReview(reviewId)
    }
  }

  const handleSaveEdit = (reviewId: string) => {
    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          return {
            ...review,
            rating: editRating,
            comment: editComment,
            date: new Date().toISOString(),
          }
        }
        return review
      }),
    )

    setEditingReview(null)

    toast({
      title: "Review updated",
      description: "Your review has been updated successfully.",
    })
  }

  const handleDeleteReview = () => {
    if (reviewToDelete) {
      setReviews(reviews.filter((review) => review.id !== reviewToDelete))

      toast({
        title: "Review deleted",
        description: "Your review has been deleted.",
      })

      setReviewToDelete(null)
    }
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">You haven't written any reviews yet.</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border rounded-lg p-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Image
                  src={review.image || "/placeholder.svg"}
                  alt={review.title}
                  width={60}
                  height={80}
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">{review.title}</h4>
                    <p className="text-sm text-muted-foreground">by {review.author}</p>
                  </div>
                  {editingReview !== review.id && (
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditReview(review.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setReviewToDelete(review.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {editingReview === review.id ? (
                  <div className="mt-2 space-y-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 cursor-pointer ${
                            star <= editRating ? "fill-primary text-primary" : "text-muted-foreground"
                          }`}
                          onClick={() => setEditRating(star)}
                        />
                      ))}
                    </div>
                    <Textarea value={editComment} onChange={(e) => setEditComment(e.target.value)} rows={4} />
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditingReview(null)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={() => handleSaveEdit(review.id)} disabled={!editComment.trim()}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center mt-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-2">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!reviewToDelete} onOpenChange={() => setReviewToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your review. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteReview}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
