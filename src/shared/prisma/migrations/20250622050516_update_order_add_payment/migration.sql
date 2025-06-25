-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('CASH', 'CARD', 'ONLINE', 'BANK_TRANSFER');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "payment" "PaymentType" NOT NULL DEFAULT 'CASH';
