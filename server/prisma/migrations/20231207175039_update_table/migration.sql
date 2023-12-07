-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Salas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lab" TEXT NOT NULL DEFAULT '',
    "vlan" INTEGER NOT NULL,
    "isBlocked" BOOLEAN NOT NULL
);
INSERT INTO "new_Salas" ("id", "isBlocked", "vlan") SELECT "id", "isBlocked", "vlan" FROM "Salas";
DROP TABLE "Salas";
ALTER TABLE "new_Salas" RENAME TO "Salas";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
