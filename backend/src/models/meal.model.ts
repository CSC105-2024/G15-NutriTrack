import { $Enums } from "../generated/prisma/index.js";
import db from "../lib/db.ts";

const addFoodToLog = async (
  userId: string,
  date: string,
  type: $Enums.MealType,
  foodId: number,
) => {
  const mealLog = await db.mealLog.create({
    data: {
      userId: userId,
      date: date,
      type: type,
    },
  });
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

export { addFoodToLog, getMealPlans };
