/*
  Warnings:

  - You are about to drop the column `sortingOrder` on the `Trigger` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Action" ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "AvailableAction" ALTER COLUMN "image" DROP DEFAULT;

-- AlterTable
ALTER TABLE "AvailableTrigger" ALTER COLUMN "image" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Trigger" DROP COLUMN "sortingOrder",
ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';
