/*
  Warnings:

  - You are about to drop the column `asking_user_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `typesOfNotification` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `trainerId` on the `trainings` table. All the data in the column will be lost.
  - Added the required column `src_user_id` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trainer_id` to the `trainings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "asking_user_id",
DROP COLUMN "typesOfNotification",
ADD COLUMN     "src_user_id" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "trainings" DROP COLUMN "trainerId",
ADD COLUMN     "trainer_id" INTEGER NOT NULL;
