import React from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const MealCard = ({ mealIndex, meal, onFoodClick }) => {
  const navigate = useNavigate();

  const editHandle = () => {
    navigate("/addfood");
  };

  return (
    <div className="bg-white p-6 rounded-lg w-full max-w-md border-2 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{meal.title}</h3>
        <Button text={"Edit"} variant="primary" onClick={editHandle} />
      </div>

      {/* Display food items properly */}
      {meal.items.length > 0 ? (
        meal.items.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-yellow-100 to-yellow-300 p-3 rounded mb-3 cursor-pointer hover:brightness-110 transition-all text-base shadow-2xs"
            onClick={() => onFoodClick(mealIndex, index)}
          >
            <div className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.calories} kcal</span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-500 italic p-3">No foods added</div>
      )}

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
