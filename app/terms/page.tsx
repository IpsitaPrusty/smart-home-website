import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsAndConditions() {
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
          <h1 className="text-4xl font-bold text-foreground mb-4">Terms & Conditions</h1>
          <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                By accessing and using GuardianHome Control, you accept and agree to be bound by these Terms and
                Conditions. If you do not agree to these terms, you may not use our service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                GuardianHome Control provides a smart home device control platform with:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Device control and automation capabilities</li>
                <li>Energy monitoring and optimization</li>
                <li>Parental controls and age verification</li>
                <li>Legal compliance features</li>
                <li>Security and privacy protection</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Obligations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Users agree to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of account credentials</li>
                <li>Use the service in compliance with applicable laws</li>
                <li>Not attempt to circumvent security measures</li>
                <li>Respect the rights of other users</li>
                <li>Obtain proper parental consent for minors</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Parental Consent and Child Safety</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">In compliance with COPPA and child safety regulations:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Users under 13 require verifiable parental consent</li>
                <li>Parents are responsible for monitoring their child's use</li>
                <li>We may restrict or terminate accounts that violate child safety policies</li>
                <li>Parents can request access to or deletion of their child's data</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">GuardianHome Control's liability is limited as follows:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Service is provided "as is" without warranties</li>
                <li>We are not liable for device malfunctions or failures</li>
                <li>Liability is limited to the amount paid for the service</li>
                <li>We are not responsible for third-party device compatibility</li>
                <li>Users assume responsibility for proper device installation and use</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Disputes will be resolved through:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Initial good faith negotiation</li>
                <li>Binding arbitration if negotiation fails</li>
                <li>Arbitration conducted under American Arbitration Association rules</li>
                <li>California law governs these terms</li>
                <li>Class action waiver applies</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Accessibility Commitment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We are committed to providing an accessible service that complies with the Americans with Disabilities
                Act (ADA) and Web Content Accessibility Guidelines (WCAG) 2.1. If you encounter accessibility barriers,
                please contact our support team.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">For questions about these terms:</p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: legal@guardianhome.com</p>
                <p>Phone: 1-800-GUARDIAN</p>
                <p>Mail: GuardianHome Control Legal Department, 123 Security Blvd, Safe City, CA 90210</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Link href="/register">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Accept Terms & Get Started</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
