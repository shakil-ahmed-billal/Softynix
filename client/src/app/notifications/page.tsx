export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
        <p className="text-muted-foreground">
          Manage your notification preferences
        </p>
      </div>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-medium mb-2">No notifications</p>
        <p className="text-sm text-muted-foreground">
          New notifications will appear here
        </p>
      </div>
    </div>
  );
}

