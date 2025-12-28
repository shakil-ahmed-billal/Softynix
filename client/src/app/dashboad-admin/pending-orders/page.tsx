"use client";

import { useState } from "react";
import { useAdminOrders } from "@/hooks/useAdminOrders";
import { useUpdateOrder } from "@/hooks/useOrderMutations";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Eye, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export default function AdminPendingOrdersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Get only pending orders
  const { data, isLoading, refetch } = useAdminOrders({
    page,
    limit: 20,
    search: search || undefined,
    status: "pending", // Only pending orders
  });

  const updateOrder = useUpdateOrder();

  const handleApproveOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to approve this order?")) return;

    try {
      await updateOrder.mutateAsync({
        id: orderId,
        status: "completed",
        paymentStatus: "paid",
      });
      toast.success("Order approved successfully!");
      refetch();
      setIsDialogOpen(false);
      setSelectedOrder(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to approve order");
    }
  };

  const handleRejectOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to reject this order?")) return;

    try {
      await updateOrder.mutateAsync({
        id: orderId,
        status: "cancelled",
        paymentStatus: "failed",
      });
      toast.success("Order rejected");
      refetch();
      setIsDialogOpen(false);
      setSelectedOrder(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to reject order");
    }
  };

  const openOrderDialog = (order: any) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };

  const orders = data?.data || [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pending Orders</h1>
        <p className="text-muted-foreground mt-2">
          Review and approve pending orders
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order number, customer name, or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10"
          />
        </div>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Orders ({pagination?.total || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No pending orders found
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Number</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order: any) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono font-medium">
                        {order.orderNumber}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{order.customerName}</p>
                          <p className="text-sm text-muted-foreground">
                            {order.customerEmail}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{order.customerPhone}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{order.paymentMethod || "N/A"}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        ৳{Number(order.totalAmount).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openOrderDialog(order)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleApproveOrder(order.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRejectOrder(order.id)}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    Page {pagination.page} of {pagination.totalPages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={pagination.page === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPage((p) => Math.min(pagination.totalPages, p + 1))
                      }
                      disabled={pagination.page === pagination.totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle>Order Details - {selectedOrder.orderNumber}</DialogTitle>
                <DialogDescription>
                  Review order and payment information
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Customer Information */}
                <div>
                  <h3 className="font-semibold mb-3">Customer Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{selectedOrder.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{selectedOrder.customerEmail}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{selectedOrder.customerPhone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Order Date</p>
                      <p className="font-medium">
                        {new Date(selectedOrder.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h3 className="font-semibold mb-3">Payment Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Method</p>
                      <Badge variant="outline" className="mt-1">
                        {selectedOrder.paymentMethod || "N/A"}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sender Phone</p>
                      <p className="font-medium font-mono">
                        {selectedOrder.senderPhone || "N/A"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">Transaction ID</p>
                      <p className="font-medium font-mono">
                        {selectedOrder.transactionId || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="font-bold text-lg">
                        ৳{Number(selectedOrder.totalAmount).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge variant="outline">{selectedOrder.status}</Badge>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold mb-3">Order Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items?.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-2 bg-muted rounded"
                      >
                        <div>
                          <p className="font-medium">{item.product?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity} × ৳
                            {Number(item.price).toLocaleString()}
                          </p>
                        </div>
                        <p className="font-medium">
                          ৳{Number(item.subtotal).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="default"
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleApproveOrder(selectedOrder.id)}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Approve Order
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleRejectOrder(selectedOrder.id)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Order
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

