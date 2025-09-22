import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicy() {
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
          <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Commitment to Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                GuardianHome Control is committed to protecting your privacy and ensuring compliance with all applicable
                U.S. privacy laws, including the California Consumer Privacy Act (CCPA), California Privacy Rights Act
                (CPRA), Children's Online Privacy Protection Act (COPPA), and Federal Trade Commission (FTC) guidelines.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Personal Information</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Name and email address for account creation</li>
                  <li>Date of birth for age verification and COPPA compliance</li>
                  <li>Authentication credentials and security information</li>
                  <li>Device usage and interaction data</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Device Information</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Smart home device status and control commands</li>
                  <li>Energy consumption and usage patterns</li>
                  <li>Device configuration and preferences</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>COPPA Compliance - Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We take special care to protect children's privacy in accordance with COPPA:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>We do not knowingly collect personal information from children under 13</li>
                <li>Age verification is required during registration</li>
                <li>Parental consent is obtained before allowing access to children</li>
                <li>Parents can review, modify, or delete their child's information</li>
                <li>We limit data collection from children to what is necessary for the service</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your California Privacy Rights (CCPA/CPRA)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                California residents have the following rights under CCPA/CPRA:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>
                  <strong>Right to Know:</strong> Request information about personal data collection and use
                </li>
                <li>
                  <strong>Right to Delete:</strong> Request deletion of personal information
                </li>
                <li>
                  <strong>Right to Correct:</strong> Request correction of inaccurate personal information
                </li>
                <li>
                  <strong>Right to Opt-Out:</strong> Opt-out of the sale or sharing of personal information
                </li>
                <li>
                  <strong>Right to Limit:</strong> Limit use of sensitive personal information
                </li>
                <li>
                  <strong>Right to Non-Discrimination:</strong> Equal service regardless of privacy choices
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">We implement industry-standard security measures:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>End-to-end encryption for all data transmission</li>
                <li>Secure authentication with multi-factor verification</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Limited access controls and employee training</li>
                <li>Incident response and breach notification procedures</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">For privacy-related questions or to exercise your rights:</p>
              <div className="space-y-2 text-muted-foreground">
                <p>Email: privacy@guardianhome.com</p>
                <p>Phone: 1-800-GUARDIAN</p>
                <p>Mail: GuardianHome Control Privacy Office, 123 Security Blvd, Safe City, CA 90210</p>
              </div>
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
