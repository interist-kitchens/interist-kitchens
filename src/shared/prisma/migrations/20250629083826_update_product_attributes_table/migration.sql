/*
  Warnings:

  - You are about to drop the column `isPublic` on the `ProductAttribute` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `ProductAttribute` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `ProductAttribute` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `ProductAttribute` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `ProductAttribute` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `ProductAttribute` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `ProductAttribute` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `ProductAttribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `ProductAttribute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ProductAttribute` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductAttribute" DROP CONSTRAINT "ProductAttribute_productId_fkey";

-- DropIndex
DROP INDEX "ProductAttribute_productId_idx";

-- DropIndex
DROP INDEX "ProductAttribute_productId_key_key";

-- AlterTable
ALTER TABLE "ProductAttribute" DROP COLUMN "isPublic",
DROP COLUMN "key",
DROP COLUMN "order",
DROP COLUMN "productId",
DROP COLUMN "value",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ProductAttributeValue" (
    "id" SERIAL NOT NULL,
    "attributeId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductAttributeValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductAttributeValue_attributeId_productId_key" ON "ProductAttributeValue"("attributeId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductAttribute_name_key" ON "ProductAttribute"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductAttribute_slug_key" ON "ProductAttribute"("slug");

-- AddForeignKey
ALTER TABLE "ProductAttributeValue" ADD CONSTRAINT "ProductAttributeValue_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "ProductAttribute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAttributeValue" ADD CONSTRAINT "ProductAttributeValue_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
