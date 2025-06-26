/*
  Warnings:

  - You are about to drop the column `email` on the `Callback` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `payment` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `IndividualOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderItem` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductRelationType" AS ENUM ('MODULE', 'UPSELL', 'BUNDLE', 'SIMILAR', 'CROSS_SELL');

-- DropForeignKey
ALTER TABLE "IndividualOrder" DROP CONSTRAINT "IndividualOrder_productId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_productId_fkey";

-- AlterTable
ALTER TABLE "Callback" DROP COLUMN "email",
ADD COLUMN     "mail" TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "email",
DROP COLUMN "payment",
ADD COLUMN     "mail" TEXT,
ADD COLUMN     "productId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "IndividualOrder";

-- DropTable
DROP TABLE "OrderItem";

-- DropEnum
DROP TYPE "PaymentType";

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
CREATE UNIQUE INDEX "Order_userId_key" ON "Order"("userId");

-- AddForeignKey
ALTER TABLE "RelatedProducts" ADD CONSTRAINT "RelatedProducts_fromProductId_fkey" FOREIGN KEY ("fromProductId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedProducts" ADD CONSTRAINT "RelatedProducts_toProductId_fkey" FOREIGN KEY ("toProductId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
