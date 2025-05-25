/*
  Warnings:

  - You are about to drop the column `defaultFoodId` on the `FoodEntry` table. All the data in the column will be lost.
  - Added the required column `foodId` to the `FoodEntry` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FoodEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mealLogId" TEXT NOT NULL,
    "foodId" INTEGER NOT NULL,
    CONSTRAINT "FoodEntry_mealLogId_fkey" FOREIGN KEY ("mealLogId") REFERENCES "MealLog" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FoodEntry_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FoodEntry" ("id", "mealLogId") SELECT "id", "mealLogId" FROM "FoodEntry";
DROP TABLE "FoodEntry";
ALTER TABLE "new_FoodEntry" RENAME TO "FoodEntry";
CREATE TABLE "new_MealLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    CONSTRAINT "MealLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MealLog" ("date", "id", "type", "userId") SELECT "date", "id", "type", "userId" FROM "MealLog";
DROP TABLE "MealLog";
ALTER TABLE "new_MealLog" RENAME TO "MealLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
