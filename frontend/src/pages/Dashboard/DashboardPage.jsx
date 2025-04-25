import React, { useState } from "react";
import CalendarPopup from "@/components/CalendarPopup";
import MealCard from "@/components/MealCard";
import FoodDetailPopup from "@/components/FoodDetailPopup";
import { meals } from "@/data/MealData";
import useDocumentTitle from "@/hooks/useDocumentTitle";

const DashboardPage = () => {
  useDocumentTitle("Dashboard");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showFoodDetail, setShowFoodDetail] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const handleEditMeal = (mealTitle) => {
    console.log(`Editing ${mealTitle}`);
    // Implement edit functionality here
  };

  const handleFoodClick = (mealIndex, foodIndex) => {
    setSelectedFood(meals[mealIndex].itemDetails[foodIndex]);
    setShowFoodDetail(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="mb-8">
        <CalendarPopup date={selectedDate} setDate={setSelectedDate} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal, mealIndex) => (
          <MealCard
            key={mealIndex}
            mealIndex={mealIndex}
            meal={meal}
            onEdit={() => handleEditMeal(meal.title)}
            onFoodClick={handleFoodClick}
          />
        ))}
      </div>

      {showFoodDetail && (
        <FoodDetailPopup
          food={selectedFood}
          onClose={() => setShowFoodDetail(false)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
