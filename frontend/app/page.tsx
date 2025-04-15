import { BookList } from "@/components/book-list"
import { HeroSection } from "@/components/hero-section"
import { CategoryFilter } from "@/components/category-filter"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />
      <div className="my-8">
        <h2 className="text-3xl font-bold mb-6">Browse Books</h2>
        <CategoryFilter />
        <BookList />
      </div>
    </div>
  )
}
