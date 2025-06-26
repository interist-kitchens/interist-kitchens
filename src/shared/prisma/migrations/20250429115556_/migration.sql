/*
  Warnings:

  - Made the column `imageSrc` on table `Slide` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Slide" ALTER COLUMN "imageSrc" SET NOT NULL;

-- CreateTable
CREATE TABLE "Page" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);
