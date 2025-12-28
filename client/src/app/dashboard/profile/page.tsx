"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                JD
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline">
                <Camera className="h-4 w-4 mr-2" />
                Change Photo
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                JPG, GIF or PNG. Max size 2MB
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" defaultValue="+880 1234 567890" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="Dhaka, Bangladesh" />
            </div>
          </div>

          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}

