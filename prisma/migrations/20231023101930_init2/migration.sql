/*
  Warnings:

  - The `birth_date` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "birth_date",
ADD COLUMN     "birth_date" TIMESTAMP(3);
