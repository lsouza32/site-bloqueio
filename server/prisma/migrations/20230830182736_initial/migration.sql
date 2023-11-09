-- CreateTable
CREATE TABLE "Sala" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "sala" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "vlan" INTEGER NOT NULL,
    "status" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Sala_sala_key" ON "Sala"("sala");
