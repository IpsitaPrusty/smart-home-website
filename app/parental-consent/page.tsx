"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Users, Mail, Phone, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ParentalConsentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<"info" | "verification">("info")
  const [childData, setChildData] = useState<any>(null)
  const [error, setError] = useState("")

  const [parentalData, setParentalData] = useState({
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    relationship: "parent",
    verificationCode: "",
    consents: {
      dataCollection: false,
      deviceControl: false,
      monitoring: false,
      thirdParty: false,
    },
  })

  useEffect(() => {
    // Check if there's a child account needing parental consent
    const authData = localStorage.getItem("guardianHome_auth")
    if (!authData) {
      router.push("/register")
      return
    }

    const user = JSON.parse(authData)
    if (user.age >= 13) {
      router.push("/consent")
      return
    }

    setChildData(user)
  }, [router])

  const handleParentalInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validation
    if (!parentalData.parentName || !parentalData.parentEmail || !parentalData.parentPhone) {
      setError("Please fill in all required fields")
      setLoading(false)
      return
    }

    if (!parentalData.parentEmail.includes("@")) {
      setError("Please enter a valid email address")
      setLoading(false)
      return
    }

    if (!Object.values(parentalData.consents).every((consent) => consent)) {
      setError("All parental consents are required for children under 13")
      setLoading(false)
      return
    }

    // Mock API call to send verification code
    setTimeout(() => {
      setLoading(false)
      setStep("verification")
    }, 1500)
  }

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!parentalData.verificationCode || parentalData.verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit verification code")
      setLoading(false)
      return
    }

    // Mock verification
    setTimeout(() => {
      // Update child's account with parental consent
      const updatedUserData = {
        ...childData,
        parentalConsent: {
          ...parentalData,
          timestamp: Date.now(),
          verified: true,
        },
        needsConsent: false,
      }

      localStorage.setItem("guardianHome_auth", JSON.stringify(updatedUserData))
      setLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const resendVerification = () => {
    setError("")
    const originalError = error
    setError("Verification code resent to parent email!")
    setTimeout(() => setError(originalError), 3000)
  }

  if (!childData) {
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Parental Consent Required</h1>
          <p className="text-muted-foreground">
            {step === "info"
              ? "COPPA compliance requires parental consent for users under 13"
              : "Verify parental consent with the code sent to parent email"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-accent" />
              <span>{step === "info" ? "Parent/Guardian Information" : "Verify Parental Consent"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Child Account Detected:</strong> {childData.name} (Age: {childData.age}) requires parental
                consent under COPPA regulations before accessing GuardianHome Control.
              </AlertDescription>
            </Alert>

            {error && (
              <Alert className="mb-4" variant={error.includes("resent") ? "default" : "destructive"}>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {step === "info" ? (
              <form onSubmit={handleParentalInfoSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Parent/Guardian Name</Label>
                    <Input
                      id="parentName"
                      type="text"
                      placeholder="Full name"
                      value={parentalData.parentName}
                      onChange={(e) => setParentalData((prev) => ({ ...prev, parentName: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <select
                      id="relationship"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={parentalData.relationship}
                      onChange={(e) => setParentalData((prev) => ({ ...prev, relationship: e.target.value }))}
                    >
                      <option value="parent">Parent</option>
                      <option value="guardian">Legal Guardian</option>
                      <option value="other">Other Authorized Adult</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentEmail">Parent/Guardian Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="parentEmail"
                      type="email"
                      placeholder="parent@email.com"
                      className="pl-10"
                      value={parentalData.parentEmail}
                      onChange={(e) => setParentalData((prev) => ({ ...prev, parentEmail: e.target.value }))}
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Verification code will be sent to this email</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="parentPhone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="pl-10"
                      value={parentalData.parentPhone}
                      onChange={(e) => setParentalData((prev) => ({ ...prev, parentPhone: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Required Parental Consents</h3>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="dataCollection"
                        checked={parentalData.consents.dataCollection}
                        onCheckedChange={(checked) =>
                          setParentalData((prev) => ({
                            ...prev,
                            consents: { ...prev.consents, dataCollection: checked as boolean },
                          }))
                        }
                      />
                      <div className="space-y-1">
                        <Label htmlFor="dataCollection" className="text-sm font-medium">
                          Data Collection & Processing
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          I consent to the collection and processing of my child's personal information as described in
                          the Privacy Policy, limited to what is necessary for service functionality.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="deviceControl"
                        checked={parentalData.consents.deviceControl}
                        onCheckedChange={(checked) =>
                          setParentalData((prev) => ({
                            ...prev,
                            consents: { ...prev.consents, deviceControl: checked as boolean },
                          }))
                        }
                      />
                      <div className="space-y-1">
                        <Label htmlFor="deviceControl" className="text-sm font-medium">
                          Smart Home Device Control
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          I allow my child to control smart home devices through GuardianHome Control with appropriate
                          parental oversight and restrictions.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="monitoring"
                        checked={parentalData.consents.monitoring}
                        onCheckedChange={(checked) =>
                          setParentalData((prev) => ({
                            ...prev,
                            consents: { ...prev.consents, monitoring: checked as boolean },
                          }))
                        }
                      />
                      <div className="space-y-1">
                        <Label htmlFor="monitoring" className="text-sm font-medium">
                          Activity Monitoring
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          I understand that my child's device usage and activity will be monitored for safety and
                          compliance purposes, with reports available to me.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="thirdParty"
                        checked={parentalData.consents.thirdParty}
                        onCheckedChange={(checked) =>
                          setParentalData((prev) => ({
                            ...prev,
                            consents: { ...prev.consents, thirdParty: checked as boolean },
                          }))
                        }
                      />
                      <div className="space-y-1">
                        <Label htmlFor="thirdParty" className="text-sm font-medium">
                          Third-Party Integrations
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          I consent to necessary third-party integrations for device functionality, with no personal
                          information shared beyond what is required for operation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Your Rights:</strong> You can review, modify, or delete your child's information at any
                    time. You will receive regular reports on your child's account activity.
                  </AlertDescription>
                </Alert>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Sending Verification..." : "Send Verification Code"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerificationSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-2">We've sent a 6-digit verification code to:</p>
                  <p className="font-medium text-foreground">{parentalData.parentEmail}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    This verifies that you are the parent/guardian of {childData.name}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="verificationCode">Verification Code</Label>
                  <Input
                    id="verificationCode"
                    type="text"
                    placeholder="000000"
                    maxLength={6}
                    value={parentalData.verificationCode}
                    onChange={(e) =>
                      setParentalData((prev) => ({
                        ...prev,
                        verificationCode: e.target.value.replace(/\D/g, ""),
                      }))
                    }
                    className="text-center text-lg tracking-widest"
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="button" onClick={resendVerification} className="text-sm text-accent hover:underline">
                    Didn't receive the code? Resend
                  </button>
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setStep("info")}
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? "Verifying..." : "Verify & Grant Access"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Questions about parental consent?{" "}
            <Link href="/help" className="text-accent hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
