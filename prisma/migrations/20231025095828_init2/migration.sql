/*
  Warnings:

  - You are about to drop the column `training_gender` on the `trainings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "trainings" DROP COLUMN "training_gender",
ADD COLUMN     "gender" TEXT NOT NULL DEFAULT '';
