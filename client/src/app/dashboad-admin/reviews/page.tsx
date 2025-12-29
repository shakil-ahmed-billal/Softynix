"use client";

import { useState } from "react";
import { useAdminReviews } from "@/hooks/useAdminReviews";
import { useUpdateReviewStatus } from "@/hooks/useAdminReviewMutations";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, CheckCircle2, XCircle, Clock, Loader2, Search } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AdminReviewsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data, isLoading, refetch } = useAdminReviews({
    page,
    limit: 20,
    status: statusFilter !== "all" ? statusFilter : undefined,
    search: searchQuery || undefined,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const updateStatus = useUpdateReviewStatus();

  const reviews = data?.data || [];
  const pagination = data?.pagination || { total: 0, totalPages: 0, currentPage: 1 };

  const handleStatusUpdate = async (reviewId: string, newStatus: "approved" | "rejected" | "pending") => {
    try {
      await updateStatus.mutateAsync({ id: reviewId, status: newStatus });
      refetch();
    } catch (error) {
      // Error is handled by the mutation hook
    }
  };

  const openReviewDialog = (review: any) => {
    setSelectedReview(review);
    setIsDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Review Management</h1>
        <p className="text-muted-foreground">
          Manage and approve customer reviews
        </p>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by product name, user name, or comment..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                className="pl-10"
              />
            </div>
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Reviews Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                </TableCell>
              </TableRow>
            ) : reviews.length > 0 ? (
              reviews.map((review: any) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {review.product?.image && (
                        <Image
                          src={review.product.image}
                          alt={review.product.name || "Product"}
                          width={40}
                          height={40}
                          className="rounded object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium">
                          {review.product?.name || "Unknown Product"}
                        </p>
                        {review.product?.id && (
                          <p className="text-xs text-muted-foreground">
                            ID: {review.product.id.slice(0, 8)}...
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {review.user?.name
                            ? review.user.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {review.user?.name || "Anonymous"}
                        </p>
                        {review.user?.email && (
                          <p className="text-xs text-muted-foreground">
                            {review.user.email}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm text-muted-foreground">
                        ({review.rating})
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p
                      className="text-sm line-clamp-2 cursor-pointer hover:text-primary"
                      onClick={() => openReviewDialog(review)}
                    >
                      {review.comment || (
                        <span className="text-muted-foreground italic">No comment</span>
                      )}
                    </p>
                  </TableCell>
                  <TableCell>{getStatusBadge(review.status)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {review.status !== "approved" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(review.id, "approved")}
                          disabled={updateStatus.isPending}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      )}
                      {review.status !== "rejected" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(review.id, "rejected")}
                          disabled={updateStatus.isPending}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      )}
                      {review.status !== "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleStatusUpdate(review.id, "pending")}
                          disabled={updateStatus.isPending}
                        >
                          <Clock className="h-4 w-4 mr-1" />
                          Reset
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <p className="text-muted-foreground">
                    No reviews found. {searchQuery && "Try adjusting your search filters."}
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {((page - 1) * 20) + 1} to {Math.min(page * 20, pagination.total)} of{" "}
            {pagination.total} reviews
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
              disabled={page === pagination.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Review Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
            <DialogDescription>
              Full review information and actions
            </DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-6">
              {/* Product Info */}
              <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                {selectedReview.product?.image && (
                  <Image
                    src={selectedReview.product.image}
                    alt={selectedReview.product.name || "Product"}
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {selectedReview.product?.name || "Unknown Product"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Product ID: {selectedReview.productId}
                  </p>
                </div>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {selectedReview.user?.name
                      ? selectedReview.user.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">
                    {selectedReview.user?.name || "Anonymous"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedReview.user?.email || "No email"}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div>
                <p className="text-sm font-medium mb-2">Rating</p>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < selectedReview.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-lg font-semibold">
                    {selectedReview.rating} / 5
                  </span>
                </div>
              </div>

              {/* Comment */}
              <div>
                <p className="text-sm font-medium mb-2">Comment</p>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">
                    {selectedReview.comment || (
                      <span className="text-muted-foreground italic">No comment provided</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Status & Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium mb-2">Status</p>
                  {getStatusBadge(selectedReview.status)}
                </div>
                <div>
                  <p className="text-sm font-medium mb-2">Date</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(selectedReview.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                {selectedReview.status !== "approved" && (
                  <Button
                    onClick={() => {
                      handleStatusUpdate(selectedReview.id, "approved");
                      setIsDialogOpen(false);
                    }}
                    disabled={updateStatus.isPending}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Approve Review
                  </Button>
                )}
                {selectedReview.status !== "rejected" && (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleStatusUpdate(selectedReview.id, "rejected");
                      setIsDialogOpen(false);
                    }}
                    disabled={updateStatus.isPending}
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Review
                  </Button>
                )}
                {selectedReview.status !== "pending" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleStatusUpdate(selectedReview.id, "pending");
                      setIsDialogOpen(false);
                    }}
                    disabled={updateStatus.isPending}
                    className="flex-1"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Reset to Pending
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

