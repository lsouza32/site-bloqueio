/*
  Warnings:

  - You are about to drop the column `status` on the `Sala` table. All the data in the column will be lost.
  - Added the required column `isBlocked` to the `Sala` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sala" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sala" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "vlan" INTEGER NOT NULL,
    "isBlocked" BOOLEAN NOT NULL
);
INSERT INTO "new_Sala" ("id", "sala", "title", "vlan") SELECT "id", "sala", "title", "vlan" FROM "Sala";
DROP TABLE "Sala";
ALTER TABLE "new_Sala" RENAME TO "Sala";
CREATE UNIQUE INDEX "Sala_sala_key" ON "Sala"("sala");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
