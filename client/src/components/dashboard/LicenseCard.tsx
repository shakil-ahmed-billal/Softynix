"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SoftwareLicense } from "@/lib/dashboard-data";
import { Copy, Download, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";

interface LicenseCardProps {
  license: SoftwareLicense;
}

export function LicenseCard({ license }: LicenseCardProps) {
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
            <CardTitle className="text-xl">{license.softwareName}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Version {license.version}
            </p>
          </div>
          <Badge
            variant={license.activationStatus === "activated" ? "default" : "secondary"}
          >
            {license.activationStatus === "activated" ? (
              <CheckCircle2 className="h-3 w-3 mr-1" />
            ) : (
              <XCircle className="h-3 w-3 mr-1" />
            )}
            {license.activationStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* License Key */}
        <div>
          <label className="text-xs font-medium text-muted-foreground">
            License Key
          </label>
          {license.licenseKey ? (
            <div className="flex items-center gap-2 mt-1">
              <p className="text-sm font-mono flex-1">{license.licenseKey}</p>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleCopy(license.licenseKey)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic mt-1">
              License key pending - Admin will provide it soon
            </p>
          )}
        </div>

        {/* Device Limit */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div>
            <label className="text-xs font-medium text-muted-foreground">
              Device Limit
            </label>
            <p className="text-sm font-medium mt-1">{license.deviceLimit} device(s)</p>
          </div>
          {license.expiryDate && (
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Expiry Date
              </label>
              <p className="text-sm font-medium mt-1">
                {new Date(license.expiryDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {/* Download Button */}
        {license.downloadUrl && (
          <Button className="w-full" asChild>
            <a href={license.downloadUrl}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

