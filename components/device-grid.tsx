"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Lightbulb,
  Fan,
  DoorOpen,
  Blinds,
  Thermometer,
  Camera,
  Lock,
  Zap,
  Home,
  AlertTriangle,
  Settings,
} from "lucide-react"

interface DeviceGridProps {
  userAge: number
}

interface Device {
  id: string
  name: string
  type: "light" | "fan" | "door" | "curtains" | "ac" | "camera" | "lock" | "outlet"
  room: string
  status: boolean
  value?: number
  restricted?: boolean
  icon: React.ComponentType<{ className?: string }>
}

export default function DeviceGrid({ userAge }: DeviceGridProps) {
  const [selectedRoom, setSelectedRoom] = useState<string>("all")
  const [devices, setDevices] = useState<Device[]>([
    // Living Room
    { id: "1", name: "Main Lights", type: "light", room: "Living Room", status: true, value: 75, icon: Lightbulb },
    { id: "2", name: "Ceiling Fan", type: "fan", room: "Living Room", status: false, value: 0, icon: Fan },
    { id: "3", name: "Window Curtains", type: "curtains", room: "Living Room", status: false, value: 30, icon: Blinds },
    { id: "4", name: "Smart Outlet", type: "outlet", room: "Living Room", status: true, icon: Zap },

    // Kitchen
    { id: "5", name: "Kitchen Lights", type: "light", room: "Kitchen", status: true, value: 90, icon: Lightbulb },
    { id: "6", name: "Exhaust Fan", type: "fan", room: "Kitchen", status: false, value: 0, icon: Fan },

    // Bedroom
    { id: "7", name: "Bedroom Lights", type: "light", room: "Bedroom", status: false, value: 0, icon: Lightbulb },
    { id: "8", name: "AC Unit", type: "ac", room: "Bedroom", status: true, value: 72, icon: Thermometer },
    { id: "9", name: "Blackout Curtains", type: "curtains", room: "Bedroom", status: true, value: 100, icon: Blinds },

    // Security (Restricted for minors)
    {
      id: "10",
      name: "Front Door",
      type: "door",
      room: "Security",
      status: false,
      restricted: userAge < 16,
      icon: DoorOpen,
    },
    { id: "11", name: "Door Lock", type: "lock", room: "Security", status: true, restricted: userAge < 16, icon: Lock },
    {
      id: "12",
      name: "Security Camera",
      type: "camera",
      room: "Security",
      status: true,
      restricted: userAge < 18,
      icon: Camera,
    },
  ])

  const rooms = ["all", ...Array.from(new Set(devices.map((device) => device.room)))]

  const filteredDevices = selectedRoom === "all" ? devices : devices.filter((device) => device.room === selectedRoom)

  const toggleDevice = (deviceId: string) => {
    setDevices((prev) =>
      prev.map((device) => (device.id === deviceId ? { ...device, status: !device.status } : device)),
    )
  }

  const updateDeviceValue = (deviceId: string, value: number) => {
    setDevices((prev) => prev.map((device) => (device.id === deviceId ? { ...device, value: value } : device)))
  }

  const getDeviceStatusColor = (device: Device) => {
    if (device.restricted) return "text-muted-foreground"
    return device.status ? "text-accent" : "text-muted-foreground"
  }

  const getDeviceIcon = (device: Device) => {
    const IconComponent = device.icon
    return <IconComponent className={`h-6 w-6 ${getDeviceStatusColor(device)}`} />
  }

  return (
    <div className="space-y-6">
      {/* Room Filter */}
      <div className="flex flex-wrap gap-2">
        {rooms.map((room) => (
          <Button
            key={room}
            variant={selectedRoom === room ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedRoom(room)}
            className="capitalize"
          >
            {room === "all" ? "All Rooms" : room}
          </Button>
        ))}
      </div>

      {/* Restricted Access Alert */}
      {userAge < 18 && filteredDevices.some((device) => device.restricted) && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Some devices are restricted based on your age for safety reasons.
            {userAge < 13 && " Contact your parent or guardian to modify these restrictions."}
          </AlertDescription>
        </Alert>
      )}

      {/* Device Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDevices.map((device) => (
          <Card key={device.id} className={`${device.restricted ? "opacity-60" : ""}`}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center space-x-2">
                  {getDeviceIcon(device)}
                  <span className="truncate">{device.name}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {device.room}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs ${device.status ? "text-accent" : "text-muted-foreground"}`}>
                    {device.status ? "ON" : "OFF"}
                  </span>
                  <Switch
                    checked={device.status}
                    onCheckedChange={() => !device.restricted && toggleDevice(device.id)}
                    disabled={device.restricted}
                  />
                </div>
              </div>

              {/* Value Control */}
              {device.value !== undefined && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {device.type === "light"
                        ? "Brightness"
                        : device.type === "fan"
                          ? "Speed"
                          : device.type === "ac"
                            ? "Temperature"
                            : device.type === "curtains"
                              ? "Position"
                              : "Level"}
                    </span>
                    <span className="text-sm font-medium">
                      {device.value}
                      {device.type === "ac"
                        ? "°F"
                        : device.type === "curtains"
                          ? "%"
                          : device.type === "light"
                            ? "%"
                            : ""}
                    </span>
                  </div>
                  <Slider
                    value={[device.value]}
                    onValueChange={(value) => !device.restricted && updateDeviceValue(device.id, value[0])}
                    max={device.type === "ac" ? 85 : 100}
                    min={device.type === "ac" ? 60 : 0}
                    step={device.type === "ac" ? 1 : 5}
                    disabled={device.restricted || !device.status}
                    className="w-full"
                  />
                </div>
              )}

              {/* Restriction Notice */}
              {device.restricted && (
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3" />
                  <span>Age restricted</span>
                </div>
              )}

              {/* Quick Actions */}
              {!device.restricted && (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs bg-transparent"
                    onClick={() => toggleDevice(device.id)}
                  >
                    {device.status ? "Turn Off" : "Turn On"}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Room Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {rooms.slice(1).map((room) => {
          const roomDevices = devices.filter((device) => device.room === room)
          const activeDevices = roomDevices.filter((device) => device.status).length
          const totalDevices = roomDevices.length

          return (
            <Card key={room}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Home className="h-4 w-4 text-accent" />
                    <span className="font-medium text-foreground">{room}</span>
                  </div>
                  <Badge variant="outline">
                    {activeDevices}/{totalDevices} active
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
