/*
  Warnings:

  - The `certificate` column on the `trainers` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "trainers" DROP COLUMN "certificate",
ADD COLUMN     "certificate" TEXT[];
