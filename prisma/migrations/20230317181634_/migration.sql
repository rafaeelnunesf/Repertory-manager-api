/*
  Warnings:

  - Added the required column `name` to the `repertoires` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "repertoires" ADD COLUMN     "name" TEXT NOT NULL;
