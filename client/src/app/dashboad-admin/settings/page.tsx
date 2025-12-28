"use client";

import { Card } from "@/components/ui/card";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Platform settings and configuration</p>
      </div>
      <Card className="p-6">
        <p className="text-muted-foreground">Settings coming soon...</p>
      </Card>
    </div>
  );
}

