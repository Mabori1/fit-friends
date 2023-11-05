/*
  Warnings:

  - You are about to drop the column `src_user_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `notifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "src_user_id",
DROP COLUMN "type",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "text" TEXT NOT NULL DEFAULT '';
