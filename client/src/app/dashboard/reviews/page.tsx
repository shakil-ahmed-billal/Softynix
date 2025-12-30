"use client";

import { useState } from "react";
import { useMyReviews } from "@/hooks/useReviews";
import {
  useCreateReview,
  useUpdateReview,
  useDeleteReview,
} from "@/hooks/useReviewMutations";
import { useUserPurchases } from "@/hooks/useUserProductAccess";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import Image from "next/image";

export default function ReviewsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<any>(null);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  const { data: reviews, isLoading, refetch } = useMyReviews();
  const { data: productAccess } = useUserPurchases({ limit: 100 });
  const purchasedProducts = productAccess || [];

  const createReview = useCreateReview();
  const updateReview = useUpdateReview();
  const deleteReview = useDeleteReview();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteReview.mutateAsync(id);
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete review");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedProductId) {
      toast.error("Please select a product");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const imageFile = formData.get("image") as File;
    const imageUrl = formData.get("image-url") as string;

    // Create FormData for submission
    const submitData = new FormData();
    submitData.append("rating", rating.toString());
    if (comment.trim()) {
      submitData.append("comment", comment.trim());
    }
    
    // Add image (file takes priority over URL)
    if (imageFile && imageFile.size > 0) {
      submitData.append("image", imageFile);
    } else if (imageUrl && imageUrl.trim()) {
      submitData.append("image", imageUrl.trim());
    }

    try {
      if (editingReview) {
        submitData.append("id", editingReview.id);
        await updateReview.mutateAsync(submitData as any);
      } else {
        submitData.append("productId", selectedProductId);
        await createReview.mutateAsync(submitData as any);
      }
      setIsDialogOpen(false);
      setEditingReview(null);
      setSelectedProductId("");
      setRating(5);
      setComment("");
      refetch();
    } catch (error: any) {
      // Error is handled by the mutation hook
    }
  };

  const openEditDialog = (review: any) => {
    setEditingReview(review);
    setSelectedProductId(review.productId);
    setRating(review.rating);
    setComment(review.comment || "");
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingReview(null);
    setSelectedProductId("");
    setRating(5);
    setComment("");
    setIsDialogOpen(true);
  };

  // Get products that haven't been reviewed yet
  const unreviewedProducts = purchasedProducts.filter((access: any) => {
    if (!reviews) return true;
    return !reviews.some((review: any) => review.productId === access.productId);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Reviews</h1>
          <p className="text-muted-foreground">
            Review products you've purchased
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Write Review
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingReview ? "Edit Review" : "Write Review"}
              </DialogTitle>
              <DialogDescription>
                {editingReview
                  ? "Update your review"
                  : "Share your experience with this product"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="productId">Product *</Label>
                <Select
                  value={selectedProductId}
                  onValueChange={setSelectedProductId}
                  required
                  disabled={!!editingReview}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {editingReview ? (
                      <SelectItem value={editingReview.productId}>
                        {editingReview.product?.name || "Selected Product"}
                      </SelectItem>
                    ) : unreviewedProducts.length > 0 ? (
                      unreviewedProducts.map((access: any) => (
                        <SelectItem key={access.productId} value={access.productId}>
                          {access.product?.name || "Product"}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-products" disabled>
                        No products available to review
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Rating *</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {rating} out of 5 stars
                </p>
              </div>

              <div>
                <Label htmlFor="comment">Comment</Label>
                <Textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px]"
                  placeholder="Share your thoughts about this product..."
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {comment.length}/1000 characters
                </p>
              </div>

              <div>
                <Label htmlFor="image">Review Image (Optional)</Label>
                <div className="space-y-2">
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="cursor-pointer"
                  />
                  <div className="text-sm text-muted-foreground">Or enter image URL:</div>
                  <Input
                    id="image-url"
                    name="image-url"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    defaultValue={editingReview?.image || ""}
                  />
                  {editingReview?.image && (
                    <div className="relative w-full h-32 border rounded-md overflow-hidden bg-muted">
                      <img
                        src={editingReview.image}
                        alt="Current review image"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingReview(null);
                    setSelectedProductId("");
                    setRating(5);
                    setComment("");
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingReview ? "Update Review" : "Submit Review"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Reviews List */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
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
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : reviews && reviews.length > 0 ? (
              reviews.map((review: any) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {review.product?.image && (
                        <Image
                          src={review.product.image}
                          alt={review.product.name}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      )}
                      <span className="font-medium">
                        {review.product?.name || "Unknown Product"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <p className="text-sm line-clamp-2">
                      {review.comment || "No comment"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        review.status === "approved"
                          ? "default"
                          : review.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {review.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(review)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(review.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  <p className="text-muted-foreground">
                    No reviews yet. Write your first review!
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

