import { $Enums } from "../generated/prisma/index.js";
import db from "../lib/db.ts";

const addFoodToLog = async (
  userId: string,
  date: string,
  type: $Enums.MealType,
  foodId: number,
) => {
  let mealLog = await db.mealLog.findFirst({
    where: {
      userId,
      date,
      type,
    },
  });

  if (!mealLog) {
    mealLog = await db.mealLog.create({
      data: {
        userId,
        date,
        type,
      },
    });
  }

  await db.foodEntry.create({
    data: {
      mealLogId: mealLog.id,
      foodId: foodId,
    },
  });

  return mealLog;
};

const getMealPlans = async (userId: string, date: string) => {
  const mealLogs = await db.mealLog.findMany({
    where: {
      userId: userId,
      date: date,
    },
    include: {
      entries: {
        include: {
          food: true,
        },
      },
    },
  });

  const mealPlan: any = {
    breakfast: [],
    lunch: [],
    dinner: [],
  };

  for (const log of mealLogs) {
    const mealType = log.type.toLowerCase();

    const foods = log.entries.map((entry) => entry.food);

    if (mealPlan[mealType]) {
      mealPlan[mealType].push(...foods);
    }
  }

  return mealPlan;
};

const removeFoodFromLog = async (
  userId: string,
  date: string,
  type: $Enums.MealType,
  foodId: number,
) => {
  // Find the meal log for the given user, date, and meal type
  const mealLog = await db.mealLog.findFirst({
    where: {
      userId,
      date,
      type,
    },
    include: {
      entries: true,
    },
  });

  if (!mealLog) {
    console.log("Meal log not found for:", { userId, date, type });
    return { success: false, error: "Meal log not found" };
  }

  // Find the food entry to delete
  const foodEntry = await db.foodEntry.findFirst({
    where: {
      mealLogId: mealLog.id,
      foodId,
    },
  });

  if (!foodEntry) {
    console.log("Food entry not found for:", { mealLogId: mealLog.id, foodId });
    return { success: false, error: "Food entry not found" };
  }

  // Delete the food entry
  await db.foodEntry.delete({
    where: {
      id: foodEntry.id,
    },
  });

  return { success: true };
};

export { addFoodToLog, getMealPlans, removeFoodFromLog };
