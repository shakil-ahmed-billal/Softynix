"use client";

import { useState } from "react";
import { useAllProducts } from "@/hooks/useAllProducts";
import {
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "@/hooks/useProductMutations";
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
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { useActiveCategories } from "@/hooks/useCategories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const { data, isLoading, refetch } = useAllProducts({
    page,
    limit: 10,
    search: search || undefined,
  });

  const { data: categories } = useActiveCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct.mutateAsync(id);
      toast.success("Product deleted successfully");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete product");
    }
  };

  const [formCategoryId, setFormCategoryId] = useState<string>("");
  const [formStatus, setFormStatus] = useState<string>("active");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Convert slug to lowercase and replace spaces with hyphens
    const rawSlug = (formData.get("slug") as string) || "";
    const slug = rawSlug.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    
    // Handle image file upload
    const imageFile = formData.get("image") as File;
    const imageUrl = formData.get("image-url") as string;
    
    // Handle multiple images
    const imagesFiles = formData.getAll("images") as File[];
    
    // Create new FormData for submission
    const submitData = new FormData();
    submitData.append("name", (formData.get("name") as string).trim());
    submitData.append("slug", slug);
    
    const descriptionValue = (formData.get("description") as string) || "";
    if (descriptionValue.trim()) {
      submitData.append("description", descriptionValue.trim());
    }
    
    submitData.append("price", formData.get("price") as string);
    submitData.append("categoryId", formCategoryId || (formData.get("categoryId") as string));
    submitData.append("stock", (formData.get("stock") as string) || "0");
    submitData.append("status", formStatus || (formData.get("status") as string));
    submitData.append("featured", formData.get("featured") === "on" ? "true" : "false");
    
    // Add image (file takes priority over URL)
    if (imageFile && imageFile.size > 0) {
      submitData.append("image", imageFile);
    } else if (imageUrl && imageUrl.trim()) {
      submitData.append("image", imageUrl.trim());
    }
    
    // Add multiple images
    imagesFiles.forEach((file) => {
      if (file && file.size > 0) {
        submitData.append("images", file);
      }
    });

    // Validation
    const categoryId = formCategoryId || (formData.get("categoryId") as string);
    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }

    if (!slug) {
      toast.error("Slug is required");
      return;
    }

    try {
      if (editingProduct) {
        submitData.append("id", editingProduct.id);
        await updateProduct.mutateAsync(submitData as any);
        toast.success("Product updated successfully");
      } else {
        await createProduct.mutateAsync(submitData as any);
        toast.success("Product created successfully");
      }
      setIsDialogOpen(false);
      setEditingProduct(null);
      setFormCategoryId("");
      setFormStatus("active");
      refetch();
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || "Failed to save product";
      const errorDetails = error?.response?.data?.errors;
      if (errorDetails && Array.isArray(errorDetails)) {
        toast.error(errorDetails.map((e: any) => e.message || e).join(", "));
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const openEditDialog = (product: any) => {
    setEditingProduct(product);
    setFormCategoryId(product.categoryId);
    setFormStatus(product.status || "active");
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingProduct(null);
    setFormCategoryId("");
    setFormStatus("active");
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Products</h1>
          <p className="text-muted-foreground">Manage all products</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Create Product"}
              </DialogTitle>
              <DialogDescription>
                {editingProduct
                  ? "Update product information"
                  : "Add a new product to the store"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue={editingProduct?.name}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    name="slug"
                    defaultValue={editingProduct?.slug}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full min-h-[100px] px-3 py-2 border rounded-md"
                  defaultValue={editingProduct?.description}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={editingProduct?.price}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    defaultValue={editingProduct?.stock || 0}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="categoryId">Category *</Label>
                <Select
                  value={formCategoryId}
                  onValueChange={setFormCategoryId}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" name="categoryId" value={formCategoryId} />
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
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
                    defaultValue={editingProduct?.image || ""}
                  />
                  {editingProduct?.image && (
                    <div className="relative w-full h-32 border rounded-md overflow-hidden bg-muted">
                      <img
                        src={editingProduct.image}
                        alt="Current image"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="images">Additional Images (Multiple)</Label>
                <Input
                  id="images"
                  name="images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  You can select multiple images
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formStatus} onValueChange={setFormStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                  <input type="hidden" name="status" value={formStatus} />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    defaultChecked={editingProduct?.featured}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingProduct(null);
                    setFormCategoryId("");
                    setFormStatus("active");
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingProduct ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data?.data && data.data.length > 0 ? (
              data.data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category?.name || "N/A"}</TableCell>
                  <TableCell>৳{Number(product.price).toLocaleString()}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.status === "active"
                          ? "default"
                          : product.status === "out_of_stock"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.featured ? (
                      <Badge variant="outline">Yes</Badge>
                    ) : (
                      <span className="text-muted-foreground">No</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

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

