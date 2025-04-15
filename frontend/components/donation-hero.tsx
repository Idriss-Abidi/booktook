"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function DonationHero() {
  return (
    <div className="relative rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60 z-10" />

      <div className="relative z-20 py-16 px-6 md:py-24 md:px-12 text-white max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          A Gesture, An Opportunity Together to Support Education
        </h1>

        <p className="text-lg opacity-90 mb-8 max-w-3xl">
          The donations page is a space where donors and beneficiaries meet through intermediary organizations. Donors
          can offer books, school supplies, and educational materials, while those in need can contact these
          organizations for help. This initiative promotes solidarity, simplifies donation logistics, and ensures
          equitable distribution of resources through responsible partnerships.
        </p>

        <div className="flex flex-wrap gap-4">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
            <Link href="#contact-form">For Interested Organizations - Contact Us</Link>
          </Button>
        </div>
      </div>

      <Image
        src="/placeholder.svg?height=500&width=1200"
        alt="Donation and education support"
        width={1200}
        height={500}
        className="absolute inset-0 object-cover w-full h-full -z-10"
      />
    </div>
  )
}
