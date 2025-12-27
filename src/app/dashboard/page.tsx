import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-8">ড্যাশবোর্ড</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">মোট অর্ডার</h3>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">মোট বিক্রয়</h3>
            <p className="text-3xl font-bold">৳0</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">কার্টে আইটেম</h3>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">উইশলিস্ট</h3>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
      </div>
      <div className="text-center py-16">
        <p className="text-muted-foreground">ড্যাশবোর্ড সামগ্রী শীঘ্রই আসছে...</p>
      </div>
    </div>
  );
}

