"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Zap,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Leaf,
  Clock,
  Home,
  Lightbulb,
  Fan,
  Thermometer,
  AlertTriangle,
} from "lucide-react"

interface EnergyMonitoringProps {
  userAge: number
}

export default function EnergyMonitoring({ userAge }: EnergyMonitoringProps) {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h")
  const [viewType, setViewType] = useState<"overview" | "devices" | "costs">("overview")

  // Mock data for energy consumption
  const hourlyData = [
    { time: "00:00", usage: 2.1, cost: 0.25 },
    { time: "01:00", usage: 1.8, cost: 0.22 },
    { time: "02:00", usage: 1.6, cost: 0.19 },
    { time: "03:00", usage: 1.5, cost: 0.18 },
    { time: "04:00", usage: 1.4, cost: 0.17 },
    { time: "05:00", usage: 1.6, cost: 0.19 },
    { time: "06:00", usage: 2.8, cost: 0.34 },
    { time: "07:00", usage: 4.2, cost: 0.5 },
    { time: "08:00", usage: 3.9, cost: 0.47 },
    { time: "09:00", usage: 3.1, cost: 0.37 },
    { time: "10:00", usage: 2.8, cost: 0.34 },
    { time: "11:00", usage: 3.2, cost: 0.38 },
    { time: "12:00", usage: 3.8, cost: 0.46 },
    { time: "13:00", usage: 4.1, cost: 0.49 },
    { time: "14:00", usage: 4.5, cost: 0.54 },
    { time: "15:00", usage: 4.2, cost: 0.5 },
    { time: "16:00", usage: 3.9, cost: 0.47 },
    { time: "17:00", usage: 4.8, cost: 0.58 },
    { time: "18:00", usage: 5.2, cost: 0.62 },
    { time: "19:00", usage: 5.8, cost: 0.7 },
    { time: "20:00", usage: 6.1, cost: 0.73 },
    { time: "21:00", usage: 5.4, cost: 0.65 },
    { time: "22:00", usage: 4.2, cost: 0.5 },
    { time: "23:00", usage: 3.1, cost: 0.37 },
  ]

  const weeklyData = [
    { day: "Mon", usage: 78.5, cost: 9.42 },
    { day: "Tue", usage: 82.1, cost: 9.85 },
    { day: "Wed", usage: 75.3, cost: 9.04 },
    { day: "Thu", usage: 79.8, cost: 9.58 },
    { day: "Fri", usage: 85.2, cost: 10.22 },
    { day: "Sat", usage: 92.4, cost: 11.09 },
    { day: "Sun", usage: 88.7, cost: 10.64 },
  ]

  const deviceUsageData = [
    { name: "AC Unit", usage: 35.2, percentage: 42, color: "#3b82f6" },
    { name: "Lighting", usage: 18.4, percentage: 22, color: "#10b981" },
    { name: "Kitchen Appliances", usage: 12.8, percentage: 15, color: "#f59e0b" },
    { name: "Electronics", usage: 10.1, percentage: 12, color: "#8b5cf6" },
    { name: "Other", usage: 7.5, percentage: 9, color: "#6b7280" },
  ]

  const getCurrentData = () => {
    switch (timeRange) {
      case "24h":
        return hourlyData
      case "7d":
        return weeklyData
      case "30d":
        return weeklyData // In real app, would be monthly data
      default:
        return hourlyData
    }
  }

  const getTotalUsage = () => {
    const data = getCurrentData()
    return data.reduce((sum, item) => sum + item.usage, 0)
  }

  const getTotalCost = () => {
    const data = getCurrentData()
    return data.reduce((sum, item) => sum + item.cost, 0)
  }

  const getUsageTrend = () => {
    const data = getCurrentData()
    if (data.length < 2) return 0
    const recent = data.slice(-3).reduce((sum, item) => sum + item.usage, 0) / 3
    const previous = data.slice(-6, -3).reduce((sum, item) => sum + item.usage, 0) / 3
    return ((recent - previous) / previous) * 100
  }

  const usageTrend = getUsageTrend()

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Energy Monitoring</h2>
          <p className="text-muted-foreground">Track your home's energy consumption and costs</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex rounded-lg border border-border">
            {(["24h", "7d", "30d"] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="rounded-none first:rounded-l-lg last:rounded-r-lg"
              >
                {range === "24h" ? "24 Hours" : range === "7d" ? "7 Days" : "30 Days"}
              </Button>
            ))}
          </div>

          <div className="flex rounded-lg border border-border">
            {(["overview", "devices", "costs"] as const).map((view) => (
              <Button
                key={view}
                variant={viewType === view ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewType(view)}
                className="rounded-none first:rounded-l-lg last:rounded-r-lg capitalize"
              >
                {view}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Usage</p>
                <p className="text-2xl font-bold text-foreground">{getTotalUsage().toFixed(1)} kWh</p>
              </div>
              <Zap className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Cost</p>
                <p className="text-2xl font-bold text-foreground">${getTotalCost().toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Trend</p>
                <div className="flex items-center space-x-1">
                  <p className="text-2xl font-bold text-foreground">{Math.abs(usageTrend).toFixed(1)}%</p>
                  {usageTrend > 0 ? (
                    <TrendingUp className="h-4 w-4 text-red-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  usageTrend > 0 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                }`}
              >
                {usageTrend > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Efficiency</p>
                <p className="text-2xl font-bold text-foreground">Good</p>
                <Badge variant="outline" className="mt-1 text-xs">
                  <Leaf className="h-3 w-3 mr-1" />
                  Eco-Friendly
                </Badge>
              </div>
              <Leaf className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Chart */}
      {viewType === "overview" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-accent" />
              <span>Energy Usage Over Time</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getCurrentData()}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey={timeRange === "24h" ? "time" : "day"} className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="usage"
                    stroke="hsl(var(--accent))"
                    fill="hsl(var(--accent))"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Device Usage Breakdown */}
      {viewType === "devices" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Home className="h-5 w-5 text-accent" />
                <span>Usage by Device</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={deviceUsageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="usage"
                    >
                      {deviceUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Device Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceUsageData.map((device, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: device.color }} />
                      <div>
                        <p className="font-medium text-foreground">{device.name}</p>
                        <p className="text-sm text-muted-foreground">{device.percentage}% of total</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{device.usage} kWh</p>
                      <p className="text-sm text-muted-foreground">${(device.usage * 0.12).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cost Analysis */}
      {viewType === "costs" && (
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-accent" />
                <span>Cost Over Time</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getCurrentData()}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey={timeRange === "24h" ? "time" : "day"} className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="cost"
                      stroke="hsl(var(--accent))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--accent))", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Current Rate</span>
                    <span className="font-medium">$0.12/kWh</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Peak Hours (6PM-10PM)</span>
                    <span className="font-medium">$0.15/kWh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Off-Peak (11PM-6AM)</span>
                    <span className="font-medium">$0.08/kWh</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Energy Cost</span>
                    <span className="font-medium">${getTotalCost().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Delivery Charges</span>
                    <span className="font-medium">${(getTotalCost() * 0.15).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Taxes & Fees</span>
                    <span className="font-medium">${(getTotalCost() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total Estimated Bill</span>
                      <span>${(getTotalCost() * 1.23).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Energy Saving Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-green-500" />
            <span>Energy Saving Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20">
                <Thermometer className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Optimize AC Usage</p>
                  <p className="text-sm text-muted-foreground">
                    Set temperature to 78°F when home, 85°F when away. Could save $15/month.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20">
                <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">LED Lighting</p>
                  <p className="text-sm text-muted-foreground">
                    Replace remaining incandescent bulbs with LEDs. Potential savings: $8/month.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20">
                <Clock className="h-5 w-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Off-Peak Usage</p>
                  <p className="text-sm text-muted-foreground">
                    Run dishwasher and laundry during off-peak hours (11PM-6AM).
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-950/20">
                <Fan className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Smart Scheduling</p>
                  <p className="text-sm text-muted-foreground">
                    Use ceiling fans to feel 3°F cooler, allowing higher AC temperatures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts for minors */}
      {userAge < 18 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {userAge < 13
              ? "Energy usage data is monitored and reported to your parent/guardian for safety and educational purposes."
              : "Energy monitoring helps you learn about responsible resource usage and environmental impact."}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
