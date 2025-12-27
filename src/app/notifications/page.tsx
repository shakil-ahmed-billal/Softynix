export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-8">নোটিফিকেশন</h1>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-medium mb-2">কোন নোটিফিকেশন নেই</p>
        <p className="text-sm text-muted-foreground">
          নতুন নোটিফিকেশন এখানে দেখানো হবে
        </p>
      </div>
    </div>
  );
}

