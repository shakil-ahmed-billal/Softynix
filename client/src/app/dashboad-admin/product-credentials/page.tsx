"use client";

import { useState } from "react";
import { useProductCredentials } from "@/hooks/useProductCredentials";
import {
  useUpsertProductCredentials,
  useDeleteProductCredentials,
  useApplyCredentialsToUsers,
} from "@/hooks/useProductCredentialsMutations";
import { useAllProducts } from "@/hooks/useAllProducts";
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
import { Plus, Edit, Trash2, Search, Key, Copy, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import Image from "next/image";

export default function AdminProductCredentialsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCredentials, setEditingCredentials] = useState<any>(null);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [productType, setProductType] = useState<string>("");

  const { data, isLoading, refetch } = useProductCredentials({
    page,
    limit: 10,
    search: search || undefined,
  });

  const { data: productsData } = useAllProducts({ page: 1, limit: 100, status: "active" });
  const products = productsData?.data || [];

  const upsertCredentials = useUpsertProductCredentials();
  const deleteCredentials = useDeleteProductCredentials();
  const applyCredentials = useApplyCredentialsToUsers();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete these credentials?")) return;
    try {
      await deleteCredentials.mutateAsync(id);
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete credentials");
    }
  };

  const handleApplyToUsers = async (id: string) => {
    if (!confirm("This will update credentials for all users who purchased this product. Continue?")) return;
    try {
      await applyCredentials.mutateAsync(id);
    } catch (error: any) {
      toast.error(error.message || "Failed to apply credentials");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!selectedProductId) {
      toast.error("Please select a product");
      return;
    }

    if (!productType) {
      toast.error("Please select a product type");
      return;
    }

    const data = {
      productId: selectedProductId,
      productType: productType as any,
      email: (formData.get("email") as string)?.trim() || undefined,
      password: (formData.get("password") as string)?.trim() || undefined,
      licenseKey: (formData.get("licenseKey") as string)?.trim() || undefined,
      accessUrl: (formData.get("accessUrl") as string)?.trim() || undefined,
      downloadUrl: (formData.get("downloadUrl") as string)?.trim() || undefined,
      subscriptionStatus: (formData.get("subscriptionStatus") as string) || undefined,
      expiresAt: (formData.get("expiresAt") as string) || undefined,
      metadata: (formData.get("metadata") as string)?.trim() || undefined,
      notes: (formData.get("notes") as string)?.trim() || undefined,
    };

    try {
      await upsertCredentials.mutateAsync(data);
      setIsDialogOpen(false);
      setEditingCredentials(null);
      setSelectedProductId("");
      setProductType("");
      refetch();
    } catch (error: any) {
      // Error is handled by the mutation hook
    }
  };

  const openEditDialog = (credentials: any) => {
    setEditingCredentials(credentials);
    setSelectedProductId(credentials.productId);
    setProductType(credentials.productType);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingCredentials(null);
    setSelectedProductId("");
    setProductType("");
    setIsDialogOpen(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Product Credentials</h1>
          <p className="text-muted-foreground">
            Manage access credentials for products (AI subscriptions, licenses, apps, etc.)
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Credentials
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingCredentials ? "Edit Credentials" : "Create Product Credentials"}
              </DialogTitle>
              <DialogDescription>
                {editingCredentials
                  ? "Update product access credentials"
                  : "Set up credentials that will be assigned to users when they purchase this product"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="productId">Product *</Label>
                <Select
                  value={selectedProductId}
                  onValueChange={(value) => {
                    setSelectedProductId(value);
                    // Auto-detect product type from category
                    const product = products.find((p: any) => p.id === value);
                    if (product?.category) {
                      const catSlug = product.category.slug?.toLowerCase();
                      if (catSlug?.includes("ai") || catSlug === "ai-solutions") {
                        setProductType("ai_subscription");
                      } else if (catSlug?.includes("license") || catSlug === "software-licenses") {
                        setProductType("software_license");
                      } else if (catSlug?.includes("productivity") || catSlug === "productivity-apps") {
                        setProductType("productivity_app");
                      } else if (catSlug?.includes("course") || catSlug === "learning-courses") {
                        setProductType("course");
                      } else if (catSlug?.includes("utility") || catSlug === "utility-tools") {
                        setProductType("utility_tool");
                      } else if (catSlug?.includes("creative") || catSlug === "creative-tools") {
                        setProductType("creative_tool");
                      }
                    }
                  }}
                  required
                  disabled={!!editingCredentials}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product: any) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} ({product.category?.name || "No category"})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="productType">Product Type *</Label>
                <Select
                  value={productType}
                  onValueChange={setProductType}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai_subscription">AI Subscription</SelectItem>
                    <SelectItem value="software_license">Software License</SelectItem>
                    <SelectItem value="productivity_app">Productivity App</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                    <SelectItem value="utility_tool">Utility Tool</SelectItem>
                    <SelectItem value="creative_tool">Creative Tool</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Credentials based on product type */}
              {(productType === "ai_subscription" || productType === "productivity_app") && (
                <>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="user@example.com"
                      defaultValue={editingCredentials?.email}
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter password"
                      defaultValue={editingCredentials?.password}
                    />
                  </div>
                  <div>
                    <Label htmlFor="accessUrl">Access URL</Label>
                    <Input
                      id="accessUrl"
                      name="accessUrl"
                      type="url"
                      placeholder="https://..."
                      defaultValue={editingCredentials?.accessUrl}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subscriptionStatus">Subscription Status</Label>
                      <Select
                        name="subscriptionStatus"
                        defaultValue={editingCredentials?.subscriptionStatus || "active"}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="expiresAt">Expires At</Label>
                      <Input
                        id="expiresAt"
                        name="expiresAt"
                        type="datetime-local"
                        defaultValue={
                          editingCredentials?.expiresAt
                            ? new Date(editingCredentials.expiresAt).toISOString().slice(0, 16)
                            : ""
                        }
                      />
                    </div>
                  </div>
                </>
              )}

              {productType === "software_license" && (
                <>
                  <div>
                    <Label htmlFor="licenseKey">License Key</Label>
                    <div className="flex gap-2">
                      <Input
                        id="licenseKey"
                        name="licenseKey"
                        placeholder="Enter license key"
                        defaultValue={editingCredentials?.licenseKey}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const generated = `LIC-${Math.random().toString(36).substring(2, 12).toUpperCase()}-${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
                          (document.getElementById("licenseKey") as HTMLInputElement).value = generated;
                        }}
                      >
                        <Key className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="downloadUrl">Download URL</Label>
                    <Input
                      id="downloadUrl"
                      name="downloadUrl"
                      type="url"
                      placeholder="https://..."
                      defaultValue={editingCredentials?.downloadUrl}
                    />
                  </div>
                </>
              )}

              {(productType === "utility_tool" || productType === "creative_tool") && (
                <>
                  <div>
                    <Label htmlFor="accessUrl">Access URL</Label>
                    <Input
                      id="accessUrl"
                      name="accessUrl"
                      type="url"
                      placeholder="https://..."
                      defaultValue={editingCredentials?.accessUrl}
                    />
                  </div>
                  <div>
                    <Label htmlFor="downloadUrl">Download URL</Label>
                    <Input
                      id="downloadUrl"
                      name="downloadUrl"
                      type="url"
                      placeholder="https://..."
                      defaultValue={editingCredentials?.downloadUrl}
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  className="min-h-[80px]"
                  placeholder="Additional notes or instructions..."
                  defaultValue={editingCredentials?.notes}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingCredentials(null);
                    setSelectedProductId("");
                    setProductType("");
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCredentials ? "Update Credentials" : "Create Credentials"}
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
            placeholder="Search products or credentials..."
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
              <TableHead>Product</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Credentials</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data?.data && data.data.length > 0 ? (
              data.data.map((cred: any) => (
                <TableRow key={cred.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {cred.product?.image && (
                        <Image
                          src={cred.product.image}
                          alt={cred.product.name}
                          width={40}
                          height={40}
                          className="rounded"
                        />
                      )}
                      <div>
                        <p className="font-medium">{cred.product?.name || "Unknown"}</p>
                        <p className="text-xs text-muted-foreground">
                          {cred.product?.category?.name || "No category"}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {cred.productType.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-sm">
                      {cred.email && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Email:</span>
                          <span className="font-mono">{cred.email}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            onClick={() => copyToClipboard(cred.email)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      {cred.licenseKey && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">License:</span>
                          <span className="font-mono text-xs">{cred.licenseKey.substring(0, 20)}...</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5"
                            onClick={() => copyToClipboard(cred.licenseKey)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                      {cred.accessUrl && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">URL:</span>
                          <span className="text-xs truncate max-w-[200px]">{cred.accessUrl}</span>
                        </div>
                      )}
                      {!cred.email && !cred.licenseKey && !cred.accessUrl && (
                        <span className="text-muted-foreground text-xs">No credentials set</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        cred.subscriptionStatus === "active" ? "default" : "secondary"
                      }
                    >
                      {cred.subscriptionStatus || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleApplyToUsers(cred.id)}
                        title="Apply to all users"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(cred)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(cred.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  <p className="text-muted-foreground">
                    No product credentials found. Create credentials for products.
                  </p>
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

