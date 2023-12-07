/*
  Warnings:

  - The primary key for the `Salas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Salas` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Salas" (
    "vlan" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lab" TEXT NOT NULL DEFAULT '',
    "isBlocked" BOOLEAN NOT NULL
);
INSERT INTO "new_Salas" ("isBlocked", "lab", "vlan") SELECT "isBlocked", "lab", "vlan" FROM "Salas";
DROP TABLE "Salas";
ALTER TABLE "new_Salas" RENAME TO "Salas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
