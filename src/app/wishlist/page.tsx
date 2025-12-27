export default function WishlistPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-8">আমার উইশলিস্ট</h1>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-lg font-medium mb-2">আপনার উইশলিস্ট খালি</p>
        <p className="text-sm text-muted-foreground">
          প্রোডাক্ট যোগ করতে হৃদয় আইকনে ক্লিক করুন
        </p>
      </div>
    </div>
  );
}

