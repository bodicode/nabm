/*
  Warnings:

  - Added the required column `ownerId` to the `Court` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Court" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Court" ADD CONSTRAINT "Court_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
