"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Shield, Smartphone, Monitor, LogOut } from "lucide-react";

const activeSessions = [
  {
    id: "1",
    device: "Chrome on Windows",
    location: "Dhaka, Bangladesh",
    lastActive: "2 hours ago",
    isCurrent: true,
  },
  {
    id: "2",
    device: "Safari on iPhone",
    location: "Dhaka, Bangladesh",
    lastActive: "1 day ago",
    isCurrent: false,
  },
];

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Security</h1>
        <p className="text-muted-foreground">
          Manage your account security settings
        </p>
      </div>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button>Update Password</Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch />
          </div>
        </CardHeader>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Manage devices that are currently signed in to your account
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  {session.device.includes("iPhone") ? (
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Monitor className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{session.device}</p>
                    {session.isCurrent && (
                      <Badge variant="secondary">Current</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {session.location} • {session.lastActive}
                  </p>
                </div>
              </div>
              {!session.isCurrent && (
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

