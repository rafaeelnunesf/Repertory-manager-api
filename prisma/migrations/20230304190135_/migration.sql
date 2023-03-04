/*
  Warnings:

  - Added the required column `main` to the `TeamUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeamUser" ADD COLUMN     "main" BOOLEAN NOT NULL;
