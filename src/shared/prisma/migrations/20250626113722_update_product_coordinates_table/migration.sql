/*
  Warnings:

  - You are about to drop the column `link` on the `ProductCoordinates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductCoordinates" DROP COLUMN "link",
ADD COLUMN     "relatedProductId" INTEGER;

-- AddForeignKey
ALTER TABLE "ProductCoordinates" ADD CONSTRAINT "ProductCoordinates_relatedProductId_fkey" FOREIGN KEY ("relatedProductId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
