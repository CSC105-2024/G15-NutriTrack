import React from "react";
import Button from "./Button";

const AddMealCard = ({ title, foods, onAddFood, onRemoveFood }) => {
  // Calculate total calories
  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);

  return (
    <div className="border border-gray-300 rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-amber-800">{title}</h2>
      <p className="text-gray-700">Total Calories: {totalCalories}</p>

      {foods.length > 0 && (
        <div className="mt-4 space-y-2">
          {foods.map((food, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-amber-50 p-3 rounded-lg"
            >
              <span>{food.name}</span>
              <div className="flex items-center">
                <span className="mr-3">{food.calories} kcal</span>
                <Button
                  onClick={onRemoveFood(index)}
                  text={"Remove"}
                  variant="secondary"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <Button text={"add"} onClick={onAddFood} />
    </div>
  );
};

export default AddMealCard;
