import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { recentOrders } from "@/lib/dummy-data";
import { ArrowRight } from "lucide-react";

export default function RecentOrders() {
  return (
   <section className="">
     <div className="container mx-auto px-4 py-12 ">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold">সাম্প্রতিক অর্ডার</h2>
        <Button variant="ghost" className="gap-2">
          View All
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>নাম</TableHead>
                <TableHead>সময়</TableHead>
                <TableHead>স্ট্যাটাস</TableHead>
                <TableHead className="text-right">পরিমাণ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">
                    {order.customer}
                  </TableCell>
                  <TableCell>{order.time}</TableCell>
                  <TableCell>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    {order.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
   </section>
  );
}
