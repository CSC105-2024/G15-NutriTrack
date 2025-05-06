/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "defaultFoodId" TEXT NOT NULL,
    CONSTRAINT "Ingredient_defaultFoodId_fkey" FOREIGN KEY ("defaultFoodId") REFERENCES "DefaultFood" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DefaultFood" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "protein" REAL NOT NULL,
    "fat" REAL NOT NULL,
    "carb" REAL NOT NULL,
    "mealType" TEXT,
    "description" TEXT,
    "imgUrl" TEXT,
    "preparation" TEXT,
    "showDetails" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_DefaultFood" ("calories", "carb", "fat", "id", "mealType", "name", "protein") SELECT "calories", "carb", "fat", "id", "mealType", "name", "protein" FROM "DefaultFood";
DROP TABLE "DefaultFood";
ALTER TABLE "new_DefaultFood" RENAME TO "DefaultFood";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("email", "id", "name", "password", "verified") SELECT "email", "id", "name", "password", "verified" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
