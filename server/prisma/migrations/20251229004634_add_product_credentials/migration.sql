-- CreateTable
CREATE TABLE "product_credentials" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productType" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "licenseKey" TEXT,
    "accessUrl" TEXT,
    "downloadUrl" TEXT,
    "subscriptionStatus" TEXT,
    "expiresAt" TIMESTAMP(3),
    "metadata" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_credentials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_credentials_productId_key" ON "product_credentials"("productId");

-- CreateIndex
CREATE INDEX "product_credentials_productId_idx" ON "product_credentials"("productId");

-- CreateIndex
CREATE INDEX "product_credentials_productType_idx" ON "product_credentials"("productType");

-- AddForeignKey
ALTER TABLE "product_credentials" ADD CONSTRAINT "product_credentials_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
