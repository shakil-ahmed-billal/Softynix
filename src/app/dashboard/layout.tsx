import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 ">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block">
            <DashboardSidebar />
          </div>
          <div className="flex-1 py-4">{children}</div>
        </div>
      </div>
    </div>
    // <div className="container mx-auto px-4 flex shrink-0 border-r bg-background p-4 space-y-6 overflow-y-auto h-[calc(100vh-4rem)] sticky top-16">
    //   <DashboardSidebar />
    //   <main className="w-full">
    //     <div className="p-4 md:p-6 lg:p-8 w-full">{children}</div>
    //   </main>
    // </div>
  );
}
