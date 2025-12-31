import { ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const orders = [
  { name: "Shakil ahmed", time: "2 days ago", status: "pending", amount: 13.99 },
  { name: "Shakil ahmed", time: "2 days ago", status: "pending", amount: 9.99 },
  { name: "Shakil ahmed", time: "2 days ago", status: "pending", amount: 15 },
  { name: "Shakil Ahmed Billal", time: "2 days ago", status: "pending", amount: 1402.99 },
  { name: "Shakil Ahmed Billal", time: "2 days ago", status: "pending", amount: 99.99 },
];

const MobileViewRecentOrders = () => {
  return (
    <section className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">সাম্প্রতিক অর্ডার</h2>
        <Button variant="ghost" size="sm" className="text-primary gap-1">
          View All <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="bg-gradient-card border border-border/50 rounded-xl overflow-hidden">
        {orders.map((order, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 ${
              index !== orders.length - 1 ? "border-b border-border/50" : ""
            }`}
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">{order.name}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                {order.time}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded-md text-xs font-medium capitalize">
                {order.status}
              </span>
              <span className="text-sm font-bold text-primary">৳{order.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MobileViewRecentOrders;
