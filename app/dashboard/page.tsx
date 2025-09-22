"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Home, Settings, User, LogOut, Bell, Menu, Zap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import DeviceGrid from "@/components/device-grid"
import ParentalControls from "@/components/parental-controls"
import EnergyMonitoring from "@/components/energy-monitoring"

export default function DashboardPage() {
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"devices" | "energy" | "controls" | "settings">("devices")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Check authentication
    const authData = localStorage.getItem("guardianHome_auth")
    if (!authData) {
      router.push("/login")
      return
    }

    const user = JSON.parse(authData)
    if (!user.authenticated || user.needsConsent) {
      router.push("/consent")
      return
    }

    setUserData(user)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("guardianHome_auth")
    router.push("/")
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-accent" />
              <span className="text-lg font-semibold text-foreground">GuardianHome</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground hidden sm:block">Welcome, {userData.name}</span>
              {userData.age < 18 && (
                <Badge variant="secondary" className="text-xs">
                  {userData.age < 13 ? "COPPA Protected" : "Minor Account"}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transition-transform duration-200 ease-in-out`}
        >
          <div className="flex flex-col h-full pt-6">
            <nav className="flex-1 px-4 space-y-2">
              <Button
                variant={activeTab === "devices" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("devices")}
              >
                <Home className="h-4 w-4 mr-2" />
                Devices
              </Button>

              <Button
                variant={activeTab === "energy" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("energy")}
              >
                <Zap className="h-4 w-4 mr-2" />
                Energy
              </Button>

              {userData.age < 18 && (
                <Button
                  variant={activeTab === "controls" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab("controls")}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Parental Controls
                </Button>
              )}

              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </nav>

            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-2 mb-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{userData.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">{userData.email}</p>
              {userData.parentalConsent && (
                <Badge variant="outline" className="mt-2 text-xs">
                  Parental Consent Verified
                </Badge>
              )}
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          {userData.age < 13 && (
            <Alert className="mb-6">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>COPPA Protected Account:</strong> Your account has enhanced privacy protections. Some features
                may be restricted and your activity is monitored for safety.
              </AlertDescription>
            </Alert>
          )}

          {activeTab === "devices" && (
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">Smart Home Dashboard</h1>
                <p className="text-muted-foreground">Control your connected devices and monitor your home's status</p>
              </div>
              <DeviceGrid userAge={userData.age} />
            </div>
          )}

          {activeTab === "energy" && (
            <div>
              <EnergyMonitoring userAge={userData.age} />
            </div>
          )}

          {activeTab === "controls" && userData.age < 18 && (
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">Parental Controls</h1>
                <p className="text-muted-foreground">Safety settings and restrictions for your account</p>
              </div>
              <ParentalControls userAge={userData.age} />
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">Account Settings</h1>
                <p className="text-muted-foreground">Manage your account preferences and privacy settings</p>
              </div>

              <div className="grid gap-6">
                <div className="p-6 border border-border rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Account Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Name</label>
                      <p className="text-muted-foreground">{userData.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <p className="text-muted-foreground">{userData.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Age</label>
                      <p className="text-muted-foreground">{userData.age} years old</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Account Type</label>
                      <p className="text-muted-foreground">
                        {userData.age < 13
                          ? "COPPA Protected"
                          : userData.age < 18
                            ? "Minor Account"
                            : "Standard Account"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 border border-border rounded-lg">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Privacy & Legal</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Privacy Policy</p>
                        <p className="text-sm text-muted-foreground">Review our privacy practices</p>
                      </div>
                      <Link href="/privacy">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Terms & Conditions</p>
                        <p className="text-sm text-muted-foreground">Review our terms of service</p>
                      </div>
                      <Link href="/terms">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Data Rights</p>
                        <p className="text-sm text-muted-foreground">Manage your data and privacy rights</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
