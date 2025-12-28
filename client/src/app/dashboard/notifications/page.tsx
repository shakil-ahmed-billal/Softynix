import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail, MessageSquare } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
        <p className="text-muted-foreground">
          Manage your notification preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Email Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="email-purchases">Purchase Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about your purchases
                </p>
              </div>
            </div>
            <Switch id="email-purchases" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="email-expiry">Expiry Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified before subscriptions expire
                </p>
              </div>
            </div>
            <Switch id="email-expiry" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <div>
                <Label htmlFor="email-promotions">Promotions</Label>
                <p className="text-sm text-muted-foreground">
                  Receive promotional emails and offers
                </p>
              </div>
            </div>
            <Switch id="email-promotions" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

