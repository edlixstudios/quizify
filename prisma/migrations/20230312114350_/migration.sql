/*
  Warnings:

  - Added the required column `orderId` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TemplateType" AS ENUM ('singleCategory', 'multipleCategories');

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "orderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "type" "TemplateType" NOT NULL;
