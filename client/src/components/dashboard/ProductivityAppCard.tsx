"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductivityApp } from "@/lib/dashboard-data";
import { Copy, Eye, EyeOff, ExternalLink, Calendar } from "lucide-react";
import { useState } from "react";

interface ProductivityAppCardProps {
  app: ProductivityApp;
}

export function ProductivityAppCard({ app }: ProductivityAppCardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{app.appName}</CardTitle>
            {app.isLifetime && (
              <Badge variant="secondary" className="mt-2">Lifetime Access</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Login Info */}
        {app.loginInfo && (
          <>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Email
              </label>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm font-medium flex-1">{app.loginInfo.email}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleCopy(app.loginInfo!.email)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Password
              </label>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm font-mono flex-1">
                  {showPassword ? app.loginInfo.password : "••••••••"}
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
                  onClick={() => handleCopy(app.loginInfo!.password)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}

        {/* Expiry Date */}
        {app.expiryDate && (
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Expires:</span>
            <span className="font-medium">
              {new Date(app.expiryDate).toLocaleDateString()}
            </span>
          </div>
        )}

        {/* Access Links */}
        <div className="flex gap-2 pt-2 border-t">
          {app.workspaceLink && (
            <Button className="flex-1" asChild>
              <a href={app.workspaceLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Workspace
              </a>
            </Button>
          )}
          {app.accessLink && (
            <Button className="flex-1" asChild>
              <a href={app.accessLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Access
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

