"use client";

import { useState } from "react";
import { useAdminOrders, useAdminOrderStats } from "@/hooks/useAdminOrders";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Edit, Search, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { ORDER_STATUS, PAYMENT_STATUS } from "@/lib/constants";
import { Input } from "@/components/ui/input";

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [formStatus, setFormStatus] = useState<string>("pending");
  const [formPaymentStatus, setFormPaymentStatus] = useState<string>("pending");

  const { data, isLoading, refetch } = useAdminOrders({
    page,
    limit: 10,
    search: search || undefined,
    status: statusFilter && statusFilter !== "all" ? statusFilter : undefined,
  });

  const { data: stats } = useAdminOrderStats();
  const updateOrder = useUpdateOrder();

  const handleUpdateStatus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedOrder) return;

    const formData = new FormData(e.currentTarget);
    const data = {
      id: selectedOrder.id,
      status: formStatus,
      paymentStatus: formPaymentStatus,
      shippingAddress: formData.get("shippingAddress") as string,
      notes: formData.get("notes") as string,
    };

    try {
      await updateOrder.mutateAsync(data);
      toast.success("Order updated successfully");
      setIsDialogOpen(false);
      setSelectedOrder(null);
      setFormStatus("pending");
      setFormPaymentStatus("pending");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to update order");
    }
  };

  const openOrderDialog = (order: any) => {
    setSelectedOrder(order);
    setFormStatus(order.status);
    setFormPaymentStatus(order.paymentStatus);
    setIsDialogOpen(true);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "delivered":
        return "default";
      case "cancelled":
        return "destructive";
      case "processing":
      case "shipped":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getPaymentBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "failed":
      case "refunded":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Orders</h1>
        <p className="text-muted-foreground">Manage and track all orders</p>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Total Orders</div>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Pending</div>
            <div className="text-2xl font-bold">{stats.pendingOrders}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Processing</div>
            <div className="text-2xl font-bold">{stats.processingOrders}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Total Revenue</div>
            <div className="text-2xl font-bold">
              ৳{Number(stats.totalRevenue).toLocaleString()}
            </div>
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data?.data && data.data.length > 0 ? (
              data.data.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.customerEmail}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{order.items.length} items</TableCell>
                  <TableCell>
                    ৳{Number(order.totalAmount).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPaymentBadgeVariant(order.paymentStatus)}>
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openOrderDialog(order)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Update Order Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Update Order</DialogTitle>
            <DialogDescription>
              Update order status and payment information
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Order Number</p>
                <p className="text-muted-foreground">
                  {selectedOrder.orderNumber}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Customer</p>
                <p className="text-muted-foreground">
                  {selectedOrder.customerName} ({selectedOrder.customerEmail})
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">Total Amount</p>
                <p className="text-muted-foreground">
                  ৳{Number(selectedOrder.totalAmount).toLocaleString()}
                </p>
              </div>

              <form onSubmit={handleUpdateStatus} className="space-y-4">
                <div>
                  <Label htmlFor="status">Order Status</Label>
                  <Select value={formStatus} onValueChange={setFormStatus} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="status" value={formStatus} />
                </div>
                <div>
                  <Label htmlFor="paymentStatus">Payment Status</Label>
                  <Select value={formPaymentStatus} onValueChange={setFormPaymentStatus} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="paymentStatus" value={formPaymentStatus} />
                </div>
                <div>
                  <Label htmlFor="shippingAddress">Shipping Address</Label>
                  <textarea
                    id="shippingAddress"
                    name="shippingAddress"
                    className="w-full min-h-[80px] px-3 py-2 border rounded-md"
                    defaultValue={selectedOrder.shippingAddress}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <textarea
                    id="notes"
                    name="notes"
                    className="w-full min-h-[80px] px-3 py-2 border rounded-md"
                    defaultValue={selectedOrder.notes}
                  />
                </div>

                {/* Order Items */}
                <div>
                  <Label>Order Items</Label>
                  <div className="mt-2 space-y-2">
                    {selectedOrder.items.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex justify-between p-2 border rounded"
                      >
                        <div>
                          <p className="font-medium">
                            {item.product?.name || "Product"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity} × ৳
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

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      setSelectedOrder(null);
                      setFormStatus("pending");
                      setFormPaymentStatus("pending");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Update Order</Button>
                </div>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Pagination */}
      {data?.pagination && data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {data.pagination.page} of {data.pagination.totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() =>
              setPage((p) => Math.min(data.pagination.totalPages, p + 1))
            }
            disabled={page === data.pagination.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

