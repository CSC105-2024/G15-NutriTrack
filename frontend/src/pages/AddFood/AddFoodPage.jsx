import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { FoodSelectorOverlay } from "./FoodGrid";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import CalendarPopup from "@/components/CalendarPopup";
import Button from "@/components/Button";
import { useMealPlans } from "@/components/MealPlanContext";

const AddFoodPage = () => {
  useDocumentTitle("Add Food");
  const { mealPlans, setMealPlans, selectedDate, setSelectedDate } =
    useMealPlans();

  const [showFoodSelector, setShowFoodSelector] = useState(false);
  const [currentMealType, setCurrentMealType] = useState(null);

  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

  useEffect(() => {
    if (dateKey && !mealPlans[dateKey]) {
      setMealPlans((prev) => ({
        ...prev,
        [dateKey]: {
          breakfast: [],
          lunch: [],
          dinner: [],
        },
      }));
    }
  }, [dateKey, mealPlans]);

  const currentMealPlan = mealPlans[dateKey] || {
    breakfast: [],
    lunch: [],
    dinner: [],
  };

  const handleAddFood = (mealType) => {
    setCurrentMealType(mealType);
    setShowFoodSelector(true);
  };

  const addFoodToMeal = (food) => {
    if (!currentMealType || !dateKey) return;

    setMealPlans((prev) => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [currentMealType]: [...(prev[dateKey]?.[currentMealType] || []), food],
      },
    }));

    setShowFoodSelector(false);
  };

  const removeFood = (mealType, foodIndex) => {
    if (!dateKey) return;

    setMealPlans((prev) => {
      const newMealPlan = {
        ...prev,
        [dateKey]: {
          ...prev[dateKey],
          [mealType]: prev[dateKey][mealType].filter(
            (_, index) => index !== foodIndex
          ),
        },
      };
      return newMealPlan;
    });
  };

  const calculateTotalCalories = (foods) => {
    return foods.reduce((total, food) => total + food.calories, 0);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Meal Planner</h1>

      {/* Date Selector */}
      <div className="mb-8">
        <CalendarPopup date={selectedDate} setDate={setSelectedDate} />
      </div>

      {/* Meal Cards */}
      {dateKey && (
        <div className="space-y-6">
          {["breakfast", "lunch", "dinner"].map((mealType) => (
            <div
              key={mealType}
              className="border border-gray-300 rounded-xl p-6"
            >
              <h2 className="text-2xl font-semibold text-amber-800 capitalize">
                {mealType}
              </h2>
              <p className="text-gray-700">
                Total Calories:{" "}
                {calculateTotalCalories(currentMealPlan[mealType])}
              </p>

              {currentMealPlan[mealType].length > 0 && (
                <div className="mt-4 space-y-2">
                  {currentMealPlan[mealType].map((food, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-amber-50 p-3 rounded-lg"
                    >
                      <span>{food.name}</span>
                      <div className="flex items-center">
                        <span className="mr-3">{food.calories} kcal</span>
                        <Button
                          onClick={() => removeFood(mealType, index)}
                          text={"Remove"}
                          variant="secondary"
                          className="ml-2 bg-red-500 hover:bg-red-600 text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Button
                onClick={() => handleAddFood(mealType)}
                text={"add"}
                className="mt-5"
              />
            </div>
          ))}
        </div>
      )}

      {/* Food Selector Modal */}
      <FoodSelectorOverlay
        showFoodSelector={showFoodSelector}
        setShowFoodSelector={setShowFoodSelector}
        currentMealType={currentMealType}
        addFoodToMeal={addFoodToMeal}
      />
    </div>
  );
};

export default AddFoodPage;
