"use client";

import { Card } from "@/components/ui/card";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Users</h1>
        <p className="text-muted-foreground">Manage platform users</p>
      </div>
      <Card className="p-6">
        <p className="text-muted-foreground">User management coming soon...</p>
      </Card>
    </div>
  );
}

