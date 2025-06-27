-- CreateEnum
CREATE TYPE "ProductRelationType" AS ENUM ('UPSELL', 'BUNDLE', 'SIMILAR', 'CROSS_SELL');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastLogin" TIMESTAMP(3),
ADD COLUMN     "phone" TEXT;

-- CreateTable
CREATE TABLE "RelatedProducts" (
    "id" SERIAL NOT NULL,
    "type" "ProductRelationType" NOT NULL,
    "fromProductId" INTEGER NOT NULL,
    "toProductId" INTEGER NOT NULL,

    CONSTRAINT "RelatedProducts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RelatedProducts_fromProductId_toProductId_type_key" ON "RelatedProducts"("fromProductId", "toProductId", "type");

-- CreateIndex
CREATE INDEX "Product_alias_idx" ON "Product"("alias");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "RelatedProducts" ADD CONSTRAINT "RelatedProducts_fromProductId_fkey" FOREIGN KEY ("fromProductId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedProducts" ADD CONSTRAINT "RelatedProducts_toProductId_fkey" FOREIGN KEY ("toProductId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
