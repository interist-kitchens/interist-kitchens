/*
  Warnings:

  - A unique constraint covering the columns `[alias]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alias` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "alias" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Page_alias_key" ON "Page"("alias");
