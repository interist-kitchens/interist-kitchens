/*
  Warnings:

  - The values [MODULE] on the enum `ProductRelationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `mail` on the `Callback` table. All the data in the column will be lost.
  - You are about to drop the column `mail` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `email` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CASH', 'CARD', 'ONLINE', 'BANK_TRANSFER');

-- AlterEnum
BEGIN;
CREATE TYPE "ProductRelationType_new" AS ENUM ('UPSELL', 'BUNDLE', 'SIMILAR', 'CROSS_SELL');
ALTER TABLE "RelatedProducts" ALTER COLUMN "type" TYPE "ProductRelationType_new" USING ("type"::text::"ProductRelationType_new");
ALTER TYPE "ProductRelationType" RENAME TO "ProductRelationType_old";
ALTER TYPE "ProductRelationType_new" RENAME TO "ProductRelationType";
DROP TYPE "ProductRelationType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_productId_fkey";

-- DropIndex
DROP INDEX "Order_userId_key";

-- AlterTable
ALTER TABLE "Callback" DROP COLUMN "mail",
ADD COLUMN     "email" TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "mail",
DROP COLUMN "productId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "payment" "PaymentType" NOT NULL DEFAULT 'CASH';

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "priceAtOrder" TEXT NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndividualOrder" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IndividualOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Product_alias_idx" ON "Product"("alias");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualOrder" ADD CONSTRAINT "IndividualOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
