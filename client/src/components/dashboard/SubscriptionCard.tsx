"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Subscription } from "@/lib/dashboard-data";
import { Copy, Eye, EyeOff, RefreshCw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SubscriptionCardProps {
  subscription: Subscription;
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isExpired = subscription.status === "expired";
  const isExpiringSoon =
    subscription.status === "active" &&
    new Date(subscription.expiryDate) <
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  return (
    <Card className={cn(isExpired && "opacity-60")}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{subscription.appName}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {subscription.planType}
            </p>
          </div>
          <Badge
            variant={isExpired ? "destructive" : isExpiringSoon ? "secondary" : "default"}
          >
            {subscription.status === "active" ? "Active" : "Expired"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Account Email */}
        <div>
          <label className="text-xs font-medium text-muted-foreground">
            Account Email
          </label>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm font-medium flex-1">{subscription.accountEmail}</p>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleCopy(subscription.accountEmail)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-xs font-medium text-muted-foreground">
            Password
          </label>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm font-mono flex-1">
              {showPassword ? subscription.password : "••••••••"}
            </p>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => handleCopy(subscription.password)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Start Date
            </label>
            <p className="text-sm font-medium mt-1">
              {new Date(subscription.startDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Expiry Date
            </label>
            <p className="text-sm font-medium mt-1">
              {new Date(subscription.expiryDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Auto Renew */}
        {subscription.autoRenew && subscription.status === "active" && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4" />
            <span>Auto-renew enabled</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {subscription.status === "expired" && (
            <Button className="flex-1">
              <RefreshCw className="h-4 w-4 mr-2" />
              Renew
            </Button>
          )}
          {!subscription.autoRenew && subscription.status === "active" && (
            <Button variant="outline" className="flex-1">
              Enable Auto-renew
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

