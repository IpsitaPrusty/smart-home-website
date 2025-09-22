import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, Eye, Keyboard, Volume2 } from "lucide-react"
import Link from "next/link"

export default function AccessibilityStatement() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-accent" />
              <span className="text-lg font-semibold text-foreground">GuardianHome</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Accessibility Statement</h1>
          <p className="text-lg text-muted-foreground">Our commitment to digital accessibility for all users</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Commitment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                GuardianHome Control is committed to ensuring digital accessibility for people with disabilities. We
                continually improve the user experience for everyone and apply relevant accessibility standards to
                achieve compliance with WCAG 2.1 Level AA and ADA requirements.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <Eye className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Visual Accessibility</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>High contrast color schemes</li>
                    <li>Scalable text and interface elements</li>
                    <li>Alternative text for all images</li>
                    <li>Clear visual focus indicators</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Keyboard className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Keyboard Navigation</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Full keyboard navigation support</li>
                    <li>Logical tab order throughout the interface</li>
                    <li>Skip links for main content areas</li>
                    <li>Keyboard shortcuts for common actions</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Volume2 className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Screen Reader Support</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Semantic HTML structure</li>
                    <li>ARIA labels and descriptions</li>
                    <li>Screen reader announcements for dynamic content</li>
                    <li>Compatible with major screen readers</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Standards Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our platform conforms to the following accessibility standards:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</li>
                <li>Americans with Disabilities Act (ADA) compliance</li>
                <li>Section 508 of the Rehabilitation Act</li>
                <li>EN 301 549 European accessibility standard</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assistive Technology Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">GuardianHome Control is designed to work with:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
                <li>Voice recognition software</li>
                <li>Switch navigation devices</li>
                <li>Magnification software</li>
                <li>Alternative keyboards and pointing devices</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feedback and Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We welcome feedback on the accessibility of GuardianHome Control. If you encounter accessibility
                barriers or need assistance, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: accessibility@guardianhome.com</p>
                <p>Phone: 1-800-GUARDIAN (TTY available)</p>
                <p>Response time: Within 2 business days</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ongoing Improvements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We continuously work to improve accessibility through regular audits, user testing with people with
                disabilities, and staying current with accessibility best practices. Our development team receives
                ongoing accessibility training to ensure new features meet our high accessibility standards.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Link href="/register">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Get Started with GuardianHome
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
