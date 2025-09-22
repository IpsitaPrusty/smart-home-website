"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Users, Lock, Eye, FileText } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ConsentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [consents, setConsents] = useState({
    privacy: false,
    terms: false,
    dataProcessing: false,
    marketing: false,
  })

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem("guardianHome_auth")
    if (!authData) {
      router.push("/login")
      return
    }

    const user = JSON.parse(authData)
    setUserData(user)
  }, [router])

  const handleConsentSubmit = async () => {
    setLoading(true)

    // Check required consents
    if (!consents.privacy || !consents.terms || !consents.dataProcessing) {
      alert("Please accept all required terms to continue")
      setLoading(false)
      return
    }

    // Mock consent processing
    setTimeout(() => {
      // Update user data with consent
      const updatedUserData = {
        ...userData,
        consents: {
          ...consents,
          timestamp: Date.now(),
        },
        needsConsent: false,
      }

      localStorage.setItem("guardianHome_auth", JSON.stringify(updatedUserData))
      setLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const handleDenyConsent = () => {
    // Clear auth data and redirect to home
    localStorage.removeItem("guardianHome_auth")
    router.push("/")
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-foreground">GuardianHome</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Legal Consent Required</h1>
          <p className="text-muted-foreground">
            Welcome, {userData.name}! Before accessing your dashboard, please review and accept our legal terms.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-accent" />
              <span>Terms & Privacy Consent</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your privacy and security are our top priorities. Please review each section carefully.
              </AlertDescription>
            </Alert>

            {/* Privacy Policy Consent */}
            <div className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start space-x-3">
                <Eye className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">Privacy Policy</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our Privacy Policy explains how we collect, use, and protect your personal information in compliance
                    with CCPA, CPRA, COPPA, and other applicable laws.
                  </p>
                  <Link href="/privacy" target="_blank" className="text-accent hover:underline text-sm">
                    Read Full Privacy Policy →
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-8">
                <Checkbox
                  id="privacy"
                  checked={consents.privacy}
                  onCheckedChange={(checked) => setConsents((prev) => ({ ...prev, privacy: checked as boolean }))}
                />
                <Label htmlFor="privacy" className="text-sm">
                  I have read and accept the Privacy Policy <span className="text-destructive">*</span>
                </Label>
              </div>
            </div>

            {/* Terms & Conditions Consent */}
            <div className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">Terms & Conditions</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Our Terms & Conditions outline your rights and responsibilities when using GuardianHome Control,
                    including liability limitations and dispute resolution.
                  </p>
                  <Link href="/terms" target="_blank" className="text-accent hover:underline text-sm">
                    Read Full Terms & Conditions →
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-8">
                <Checkbox
                  id="terms"
                  checked={consents.terms}
                  onCheckedChange={(checked) => setConsents((prev) => ({ ...prev, terms: checked as boolean }))}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the Terms & Conditions <span className="text-destructive">*</span>
                </Label>
              </div>
            </div>

            {/* Data Processing Consent */}
            <div className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start space-x-3">
                <Lock className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">Data Processing</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    We need your consent to process your personal data for providing smart home control services,
                    including device management and energy monitoring.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-8">
                <Checkbox
                  id="dataProcessing"
                  checked={consents.dataProcessing}
                  onCheckedChange={(checked) =>
                    setConsents((prev) => ({ ...prev, dataProcessing: checked as boolean }))
                  }
                />
                <Label htmlFor="dataProcessing" className="text-sm">
                  I consent to data processing for service functionality <span className="text-destructive">*</span>
                </Label>
              </div>
            </div>

            {/* Marketing Consent (Optional) */}
            <div className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">Marketing Communications</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Receive updates about new features, security alerts, and smart home tips. You can unsubscribe at any
                    time.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-8">
                <Checkbox
                  id="marketing"
                  checked={consents.marketing}
                  onCheckedChange={(checked) => setConsents((prev) => ({ ...prev, marketing: checked as boolean }))}
                />
                <Label htmlFor="marketing" className="text-sm">
                  I would like to receive marketing communications (optional)
                </Label>
              </div>
            </div>

            {userData.age && userData.age < 18 && (
              <Alert>
                <Users className="h-4 w-4" />
                <AlertDescription>
                  <strong>Parental Notice:</strong> As you are under 18, your parent or guardian should review these
                  terms with you. Additional parental controls will be available in your dashboard.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex space-x-4 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={handleDenyConsent}>
                Decline & Exit
              </Button>
              <Button
                className="flex-1"
                onClick={handleConsentSubmit}
                disabled={loading || !consents.privacy || !consents.terms || !consents.dataProcessing}
              >
                {loading ? "Processing..." : "Accept & Continue to Dashboard"}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              <span className="text-destructive">*</span> Required for service access. You can modify these preferences
              later in your account settings.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
