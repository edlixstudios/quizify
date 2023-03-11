/*
  Warnings:

  - Added the required column `billingTime` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nextBillingTime` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `planId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "billingTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "nextBillingTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "paymentId" TEXT NOT NULL,
ADD COLUMN     "planId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
