import React, { useState } from "react";
import { format } from "date-fns";
import MealCard from "@/pages/Dashboard/MealCard";
import CalendarPopup from "@/components/CalendarPopup";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useMealPlans } from "@/components/MealPlanContext";
import FoodDetailPopup from "./FoodDetailPopup";

const DashboardPage = () => {
  useDocumentTitle("Dashboard");

  const { mealPlans, selectedDate, setSelectedDate } = useMealPlans();
  // Add state for the selected food and popup visibility
  const [selectedFood, setSelectedFood] = useState(null);

  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

  // Ensure there's a meal plan for the selected date
  const currentMealPlan = mealPlans[dateKey] || {
    breakfast: [],
    lunch: [],
    dinner: [],
  };

  const handleFoodClick = (mealType, foodIndex) => {
    // Get the selected food item and display it in the popup
    const food = currentMealPlan[mealType][foodIndex];
    if (food) {
      setSelectedFood(food);
    }
  };

  // Handle closing the popup
  const handleClosePopup = () => {
    setSelectedFood(null);
  };

  // Calculate nutrition totals for each meal
  const getMealTotals = (foods) => {
    return {
      calories: foods.reduce((sum, food) => sum + (food.calories || 0), 0),
      protein: foods.reduce((sum, food) => sum + (food.protein || 0), 0),
      fat: foods.reduce((sum, food) => sum + (food.fat || 0), 0),
      carb: foods.reduce((sum, food) => sum + (food.carb || 0), 0),
    };
  };

  const calculateDailyTotals = () => {
    const mealTypes = ["breakfast", "lunch", "dinner"];
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    mealTypes.forEach((mealType) => {
      const foods = currentMealPlan[mealType] || [];
      const mealTotals = getMealTotals(foods);

      totalCalories += mealTotals.calories;
      totalProtein += mealTotals.protein;
      totalFat += mealTotals.fat;
      totalCarbs += mealTotals.carb;
    });

    return {
      calories: totalCalories,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
    };
  };

  const dailyTotals = calculateDailyTotals();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Date Selector */}
      <div className="mb-8">
        <CalendarPopup date={selectedDate} setDate={setSelectedDate} />
      </div>

      {/* Meal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {["breakfast", "lunch", "dinner"].map((mealType) => {
          const foods = currentMealPlan[mealType] || [];
          const totals = getMealTotals(foods);

          return (
            <MealCard
              key={mealType}
              mealIndex={mealType}
              meal={{
                title: mealType.charAt(0).toUpperCase() + mealType.slice(1),
                items: foods,
                calories: totals.calories,
                protein: totals.protein,
                fat: totals.fat,
                carb: totals.carb,
              }}
              onFoodClick={handleFoodClick}
            />
          );
        })}
      </div>

      {/* Daily Nutrition Totals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-gray-200 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total Calories:</h2>
            <p className="text-2xl font-bold">{dailyTotals.calories}</p>
          </div>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total Protein:</h2>
            <p className="text-2xl font-bold">{dailyTotals.protein}g</p>
          </div>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total Carbs:</h2>
            <p className="text-2xl font-bold">{dailyTotals.carbs}g</p>
          </div>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Total Fats:</h2>
            <p className="text-2xl font-bold">{dailyTotals.fat}g</p>
          </div>
        </div>
      </div>

      {/* Food Detail Popup */}
      {selectedFood && (
        <FoodDetailPopup food={selectedFood} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default DashboardPage;
