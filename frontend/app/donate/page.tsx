import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CharityList } from "@/components/charity-list"
import { DonationHero } from "@/components/donation-hero"
import Link from "next/link"

export default function DonatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <DonationHero />

      <Tabs defaultValue="charities" className="mt-8">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="charities">Find Charities</TabsTrigger>
          <TabsTrigger value="donate">Donate Books</TabsTrigger>
          <TabsTrigger value="request">Request Donations</TabsTrigger>
        </TabsList>

        <TabsContent value="charities">
          <CharityList />
        </TabsContent>

        <TabsContent value="donate">
          <Card>
            <CardHeader>
              <CardTitle>Donate Your Books</CardTitle>
              <CardDescription>
                Fill out this form to donate books to organizations in need. We'll connect you with the right charity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="your.email@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input id="phone" placeholder="Your phone number" />
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Address
                </label>
                <Textarea id="address" placeholder="Your address for pickup or delivery information" />
              </div>

              <div className="space-y-2">
                <label htmlFor="books" className="text-sm font-medium">
                  Books to Donate
                </label>
                <Textarea
                  id="books"
                  placeholder="Please describe the books you'd like to donate (titles, conditions, quantities, etc.)"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="preference" className="text-sm font-medium">
                  Donation Preference
                </label>
                <select
                  id="preference"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select an option</option>
                  <option value="pickup">Request pickup from my location</option>
                  <option value="dropoff">I'll drop off at a collection point</option>
                  <option value="ship">I'll ship to the organization</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  Additional Notes
                </label>
                <Textarea id="notes" placeholder="Any additional information you'd like to share" rows={3} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit Donation Request</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="request">
          <Card>
            <CardHeader>
              <CardTitle>Request Book Donations</CardTitle>
              <CardDescription>
                Are you a school, library, or organization in need of books? Fill out this form to request donations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="org-name" className="text-sm font-medium">
                    Organization Name
                  </label>
                  <Input id="org-name" placeholder="Name of your organization" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="org-type" className="text-sm font-medium">
                    Organization Type
                  </label>
                  <select
                    id="org-type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select organization type</option>
                    <option value="school">School</option>
                    <option value="library">Library</option>
                    <option value="nonprofit">Non-profit Organization</option>
                    <option value="community">Community Center</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium">
                    Contact Person
                  </label>
                  <Input id="contact-name" placeholder="Name of contact person" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="text-sm font-medium">
                    Contact Email
                  </label>
                  <Input id="contact-email" type="email" placeholder="contact.email@organization.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-phone" className="text-sm font-medium">
                  Contact Phone
                </label>
                <Input id="contact-phone" placeholder="Phone number" />
              </div>

              <div className="space-y-2">
                <label htmlFor="org-address" className="text-sm font-medium">
                  Organization Address
                </label>
                <Textarea id="org-address" placeholder="Full address of your organization" />
              </div>

              <div className="space-y-2">
                <label htmlFor="books-needed" className="text-sm font-medium">
                  Books Needed
                </label>
                <Textarea
                  id="books-needed"
                  placeholder="Please describe the types of books you need (genres, age groups, subjects, quantities, etc.)"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="purpose" className="text-sm font-medium">
                  Purpose of Donation
                </label>
                <Textarea
                  id="purpose"
                  placeholder="Please explain how these books will be used and who will benefit from them"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="verification" className="text-sm font-medium">
                  Organization Verification
                </label>
                <Input id="verification" type="file" accept=".pdf,.doc,.docx,.jpg,.png" />
                <p className="text-xs text-muted-foreground mt-1">
                  Please upload documentation verifying your organization's status (tax exemption letter, registration
                  certificate, etc.)
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Submit Donation Request</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Make a Difference Today</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Your book donations can transform lives by providing educational resources to those who need them most. Join
          our community of donors and help spread knowledge and literacy.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/donate?tab=donate">Donate Books</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/donate?tab=charities">Find Charities</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
