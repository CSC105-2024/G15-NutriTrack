import React from "react";
import Button from "./Button";

const MealCard = ({ mealIndex, meal, onEdit, onFoodClick }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md border-2 border-black">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{meal.title}</h3>
        <Button text={"Edit"} variant="primary" />
      </div>
      {meal.items.map((item, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-yellow-100 to-yellow-300 p-3 rounded mb-3 cursor-pointer hover:brightness-110 transition-all text-base"
          onClick={() => onFoodClick(mealIndex, index)}
        >
          {item}
        </div>
      ))}
      <div className="grid grid-cols-2 gap-3 mt-4 text-base">
        <div className="bg-yellow-100 p-3 rounded">
          {meal.calories} Calories
        </div>
        <div className="bg-yellow-100 p-3 rounded">
          {meal.protein} g of Protein
        </div>
        <div className="bg-yellow-100 p-3 rounded">{meal.fat} g of Fat</div>
        <div className="bg-yellow-100 p-3 rounded">{meal.carb} g of Carb</div>
      </div>
    </div>
  );
};

export default MealCard;
