"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, ArrowLeft, Eye, EyeOff, Calendar, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState<"details" | "otp">("details")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    otp: "",
  })

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const validatePassword = (password: string) => {
    const minLength = password.length >= 8
    const hasNumber = /\d/.test(password)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)

    return {
      minLength,
      hasNumber,
      hasSpecial,
      hasUpper,
      hasLower,
      isValid: minLength && hasNumber && hasSpecial && hasUpper && hasLower,
    }
  }

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validation
    if (!formData.name || !formData.email || !formData.dateOfBirth || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address")
      setLoading(false)
      return
    }

    // Age verification
    const age = calculateAge(formData.dateOfBirth)
    if (age < 13) {
      // Store registration data for parental consent flow
      const userData = {
        name: formData.name,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        age: age,
        authenticated: false,
        needsParentalConsent: true,
        timestamp: Date.now(),
      }
      localStorage.setItem("guardianHome_auth", JSON.stringify(userData))
      setLoading(false)
      router.push("/parental-consent")
      return
    }

    // Password validation
    const passwordCheck = validatePassword(formData.password)
    if (!passwordCheck.isValid) {
      setError("Password must meet all security requirements")
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms & Conditions and Privacy Policy")
      setLoading(false)
      return
    }

    // Mock API call
    setTimeout(() => {
      setLoading(false)
      setStep("otp")
    }, 1500)
  }

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (!formData.otp || formData.otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP code")
      setLoading(false)
      return
    }

    // Mock OTP verification
    setTimeout(() => {
      setLoading(false)
      // Store registration data in localStorage (mock)
      const userData = {
        name: formData.name,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        age: calculateAge(formData.dateOfBirth),
        authenticated: true,
        timestamp: Date.now(),
        needsConsent: true,
      }
      localStorage.setItem("guardianHome_auth", JSON.stringify(userData))
      router.push("/consent")
    }, 1500)
  }

  const resendOTP = () => {
    setError("")
    const originalError = error
    setError("OTP code resent successfully!")
    setTimeout(() => setError(originalError), 3000)
  }

  const passwordValidation = validatePassword(formData.password)
  const userAge = formData.dateOfBirth ? calculateAge(formData.dateOfBirth) : null

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-accent" />
            <span className="text-2xl font-bold text-foreground">GuardianHome</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {step === "details" ? "Create Your Account" : "Verify Your Email"}
          </h1>
          <p className="text-muted-foreground">
            {step === "details"
              ? "Join thousands of families securing their smart homes"
              : "Enter the verification code sent to your email"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{step === "details" ? "Sign Up" : "Enter Verification Code"}</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4" variant={error.includes("success") ? "default" : "destructive"}>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {userAge !== null && userAge < 13 && step === "details" && (
              <Alert className="mb-4">
                <Users className="h-4 w-4" />
                <AlertDescription>
                  <strong>Parental Consent Required:</strong> Users under 13 need parental consent under COPPA
                  regulations. You'll be redirected to the parental consent process after registration.
                </AlertDescription>
              </Alert>
            )}

            {step === "details" ? (
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <div className="relative">
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                      max={new Date().toISOString().split("T")[0]}
                      required
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                  <p className="text-xs text-muted-foreground">Required for age verification and COPPA compliance</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>

                  {formData.password && (
                    <div className="text-xs space-y-1">
                      <div
                        className={`flex items-center space-x-2 ${passwordValidation.minLength ? "text-green-600" : "text-muted-foreground"}`}
                      >
                        <span>{passwordValidation.minLength ? "✓" : "○"}</span>
                        <span>At least 8 characters</span>
                      </div>
                      <div
                        className={`flex items-center space-x-2 ${passwordValidation.hasUpper && passwordValidation.hasLower ? "text-green-600" : "text-muted-foreground"}`}
                      >
                        <span>{passwordValidation.hasUpper && passwordValidation.hasLower ? "✓" : "○"}</span>
                        <span>Upper and lowercase letters</span>
                      </div>
                      <div
                        className={`flex items-center space-x-2 ${passwordValidation.hasNumber ? "text-green-600" : "text-muted-foreground"}`}
                      >
                        <span>{passwordValidation.hasNumber ? "✓" : "○"}</span>
                        <span>At least one number</span>
                      </div>
                      <div
                        className={`flex items-center space-x-2 ${passwordValidation.hasSpecial ? "text-green-600" : "text-muted-foreground"}`}
                      >
                        <span>{passwordValidation.hasSpecial ? "✓" : "○"}</span>
                        <span>Special character</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-accent hover:underline">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-accent hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleOTPSubmit} className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground">We've sent a 6-digit verification code to</p>
                  <p className="font-medium text-foreground">{formData.email}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="000000"
                    maxLength={6}
                    value={formData.otp}
                    onChange={(e) => setFormData((prev) => ({ ...prev, otp: e.target.value.replace(/\D/g, "") }))}
                    className="text-center text-lg tracking-widest"
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="button" onClick={resendOTP} className="text-sm text-accent hover:underline">
                    Didn't receive the code? Resend
                  </button>
                </div>

                <div className="flex space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setStep("details")}
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? "Verifying..." : "Verify & Continue"}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-accent hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
