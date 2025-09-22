"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Clock, Shield, Eye, Settings, AlertTriangle } from "lucide-react"

interface ParentalControlsProps {
  userAge: number
  isParent?: boolean
}

export default function ParentalControls({ userAge, isParent = false }: ParentalControlsProps) {
  const [controls, setControls] = useState({
    timeRestrictions: true,
    deviceLimitations: true,
    activityMonitoring: true,
    energyAlerts: false,
    guestAccess: false,
    emergencyOverride: true,
  })

  const [timeSettings, setTimeSettings] = useState({
    weekdayStart: "07:00",
    weekdayEnd: "21:00",
    weekendStart: "08:00",
    weekendEnd: "22:00",
  })

  const isMinor = userAge < 18
  const needsParentalConsent = userAge < 13

  const handleControlChange = (control: keyof typeof controls, value: boolean) => {
    setControls((prev) => ({ ...prev, [control]: value }))
  }

  return (
    <div className="space-y-6">
      {/* Status Alert */}
      {isMinor && (
        <Alert>
          <Users className="h-4 w-4" />
          <AlertDescription>
            {needsParentalConsent ? (
              <>
                <strong>COPPA Protected Account:</strong> Enhanced parental controls are active for users under 13.
              </>
            ) : (
              <>
                <strong>Minor Account:</strong> Additional safety features are enabled for users under 18.
              </>
            )}
          </AlertDescription>
        </Alert>
      )}

      {/* Time Restrictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-accent" />
              <span>Time Restrictions</span>
            </div>
            <Badge variant={controls.timeRestrictions ? "default" : "secondary"}>
              {controls.timeRestrictions ? "Active" : "Disabled"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="timeRestrictions">Enable time-based access controls</Label>
            <Switch
              id="timeRestrictions"
              checked={controls.timeRestrictions}
              onCheckedChange={(checked) => handleControlChange("timeRestrictions", checked)}
              disabled={needsParentalConsent && !isParent}
            />
          </div>

          {controls.timeRestrictions && (
            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Weekday Hours</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    value={timeSettings.weekdayStart}
                    onChange={(e) => setTimeSettings((prev) => ({ ...prev, weekdayStart: e.target.value }))}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={needsParentalConsent && !isParent}
                  />
                  <span className="text-muted-foreground">to</span>
                  <input
                    type="time"
                    value={timeSettings.weekdayEnd}
                    onChange={(e) => setTimeSettings((prev) => ({ ...prev, weekdayEnd: e.target.value }))}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={needsParentalConsent && !isParent}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Weekend Hours</Label>
                <div className="flex items-center space-x-2">
                  <input
                    type="time"
                    value={timeSettings.weekendStart}
                    onChange={(e) => setTimeSettings((prev) => ({ ...prev, weekendStart: e.target.value }))}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={needsParentalConsent && !isParent}
                  />
                  <span className="text-muted-foreground">to</span>
                  <input
                    type="time"
                    value={timeSettings.weekendEnd}
                    onChange={(e) => setTimeSettings((prev) => ({ ...prev, weekendEnd: e.target.value }))}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={needsParentalConsent && !isParent}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Device Limitations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-accent" />
              <span>Device Limitations</span>
            </div>
            <Badge variant={controls.deviceLimitations ? "default" : "secondary"}>
              {controls.deviceLimitations ? "Active" : "Disabled"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="deviceLimitations">Restrict access to certain devices</Label>
              <p className="text-sm text-muted-foreground">
                Limit control of security systems, thermostats, and other critical devices
              </p>
            </div>
            <Switch
              id="deviceLimitations"
              checked={controls.deviceLimitations}
              onCheckedChange={(checked) => handleControlChange("deviceLimitations", checked)}
              disabled={needsParentalConsent && !isParent}
            />
          </div>

          {controls.deviceLimitations && (
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Restricted devices: Security cameras, door locks, thermostat, garage door, main electrical controls
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Activity Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-accent" />
              <span>Activity Monitoring</span>
            </div>
            <Badge variant={controls.activityMonitoring ? "default" : "secondary"}>
              {controls.activityMonitoring ? "Active" : "Disabled"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="activityMonitoring">Monitor device usage and activity</Label>
              <p className="text-sm text-muted-foreground">
                {needsParentalConsent
                  ? "Required for COPPA compliance - parents receive weekly reports"
                  : "Track usage patterns and generate safety reports"}
              </p>
            </div>
            <Switch
              id="activityMonitoring"
              checked={controls.activityMonitoring}
              onCheckedChange={(checked) => handleControlChange("activityMonitoring", checked)}
              disabled={needsParentalConsent} // Always required for under 13
            />
          </div>
        </CardContent>
      </Card>

      {/* Additional Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-accent" />
            <span>Additional Safety Features</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="energyAlerts">Energy usage alerts</Label>
              <p className="text-sm text-muted-foreground">Notify when energy usage exceeds normal patterns</p>
            </div>
            <Switch
              id="energyAlerts"
              checked={controls.energyAlerts}
              onCheckedChange={(checked) => handleControlChange("energyAlerts", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="guestAccess">Guest access permissions</Label>
              <p className="text-sm text-muted-foreground">Allow temporary access for visitors</p>
            </div>
            <Switch
              id="guestAccess"
              checked={controls.guestAccess}
              onCheckedChange={(checked) => handleControlChange("guestAccess", checked)}
              disabled={needsParentalConsent && !isParent}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emergencyOverride">Emergency override</Label>
              <p className="text-sm text-muted-foreground">Allow emergency access to all devices when needed</p>
            </div>
            <Switch
              id="emergencyOverride"
              checked={controls.emergencyOverride}
              onCheckedChange={(checked) => handleControlChange("emergencyOverride", checked)}
              disabled // Always enabled for safety
            />
          </div>
        </CardContent>
      </Card>

      {needsParentalConsent && !isParent && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Some settings can only be modified by your parent or guardian. Contact them to make changes to restricted
            controls.
          </AlertDescription>
        </Alert>
      )}

      {isParent && (
        <div className="flex justify-end">
          <Button>Save Parental Control Settings</Button>
        </div>
      )}
    </div>
  )
}
