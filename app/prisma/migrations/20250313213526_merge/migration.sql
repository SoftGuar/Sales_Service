/*
  Warnings:

  - You are about to drop the column `role` on the `Admin` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Commercial` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Decider` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Helper` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Maintainer` table. All the data in the column will be lost.
  - The primary key for the `ProductTransaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `disposition_id` on the `ProductTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `SuperAdmin` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - Added the required column `dispositive_id` to the `ProductTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductTransaction" DROP CONSTRAINT "ProductTransaction_disposition_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductTransaction" DROP CONSTRAINT "ProductTransaction_transaction_id_fkey";

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Commercial" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Decider" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Helper" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Maintainer" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "ProductTransaction" DROP CONSTRAINT "ProductTransaction_pkey",
DROP COLUMN "disposition_id",
ADD COLUMN     "dispositive_id" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
ADD CONSTRAINT "ProductTransaction_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SuperAdmin" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "processed" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- CreateTable
CREATE TABLE "_UserHelpers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserHelpers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserHelpers_B_index" ON "_UserHelpers"("B");

-- AddForeignKey
ALTER TABLE "ProductTransaction" ADD CONSTRAINT "ProductTransaction_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTransaction" ADD CONSTRAINT "ProductTransaction_dispositive_id_fkey" FOREIGN KEY ("dispositive_id") REFERENCES "Dispositive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserHelpers" ADD CONSTRAINT "_UserHelpers_A_fkey" FOREIGN KEY ("A") REFERENCES "Helper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserHelpers" ADD CONSTRAINT "_UserHelpers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
