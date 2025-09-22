import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Home, Users, Lock, Eye, Zap } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-accent" />
              <span className="text-xl font-semibold text-foreground">GuardianHome</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#security" className="text-muted-foreground hover:text-foreground transition-colors">
                Security
              </Link>
              <Link href="#compliance" className="text-muted-foreground hover:text-foreground transition-colors">
                Compliance
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-foreground">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Smart Home Control
              <span className="block text-accent">Built for Families</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              The first U.S.-compliant smart home platform designed with advanced parental controls, legal compliance,
              and family safety at its core.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline" className="px-8 bg-transparent">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Everything You Need</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive smart home control with industry-leading compliance and security features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Home className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Device Control</h3>
                <p className="text-muted-foreground">
                  Control lights, fans, doors, curtains, and AC systems from a unified dashboard.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Parental Controls</h3>
                <p className="text-muted-foreground">
                  COPPA-compliant age verification and comprehensive parental consent management.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Lock className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Secure Authentication</h3>
                <p className="text-muted-foreground">
                  Multi-factor authentication with OTP verification for enhanced security.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Eye className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Energy Monitoring</h3>
                <p className="text-muted-foreground">
                  Real-time energy consumption tracking and optimization recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Legal Compliance</h3>
                <p className="text-muted-foreground">
                  Full CCPA/CPRA, FTC, ADA, and state law compliance built into every feature.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Zap className="h-12 w-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Room Management</h3>
                <p className="text-muted-foreground">
                  Organize devices by room with intelligent automation and scheduling.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Security & Privacy First</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Built from the ground up with enterprise-grade security and comprehensive privacy protection for your
                family.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">End-to-end encryption for all device communications</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">COPPA-compliant child protection and age verification</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">CCPA/CPRA data rights and transparency controls</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">ADA-compliant accessibility features</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-2xl p-8 text-center">
              <Shield className="h-24 w-24 text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-foreground mb-4">Trusted by Families</h3>
              <p className="text-muted-foreground">
                Join thousands of families who trust GuardianHome Control to keep their smart homes secure and
                compliant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-balance">Ready to Secure Your Smart Home?</h2>
          <p className="text-xl mb-8 text-primary-foreground/90 text-pretty">
            Start your free trial today and experience the peace of mind that comes with truly compliant smart home
            control.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="px-8">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-accent" />
                <span className="text-lg font-semibold text-foreground">GuardianHome</span>
              </div>
              <p className="text-muted-foreground text-sm">
                U.S.-compliant smart home control platform designed for families.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#security" className="text-muted-foreground hover:text-foreground">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/accessibility" className="text-muted-foreground hover:text-foreground">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground text-sm">© 2024 GuardianHome Control. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
