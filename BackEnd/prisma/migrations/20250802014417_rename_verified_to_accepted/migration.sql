/*
  Warnings:

  - You are about to drop the column `verified` on the `Speedrun` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Speedrun" DROP COLUMN "verified",
ADD COLUMN     "accepted" BOOLEAN;
