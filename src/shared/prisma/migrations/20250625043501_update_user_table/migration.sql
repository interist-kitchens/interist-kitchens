/*
  Warnings:

  - You are about to drop the `RelatedProducts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RelatedProducts" DROP CONSTRAINT "RelatedProducts_fromProductId_fkey";

-- DropForeignKey
ALTER TABLE "RelatedProducts" DROP CONSTRAINT "RelatedProducts_toProductId_fkey";

-- DropIndex
DROP INDEX "Product_alias_idx";

-- DropIndex
DROP INDEX "Product_categoryId_idx";

-- DropIndex
DROP INDEX "User_email_idx";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastLogin" TIMESTAMP(3),
ADD COLUMN     "phone" TEXT NOT NULL;

-- DropTable
DROP TABLE "RelatedProducts";

-- DropEnum
DROP TYPE "ProductRelationType";

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
