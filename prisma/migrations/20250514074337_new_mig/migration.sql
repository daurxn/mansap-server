/*
  Warnings:

  - You are about to drop the column `mediaLink` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `mediaType` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "mediaLink",
DROP COLUMN "mediaType";
