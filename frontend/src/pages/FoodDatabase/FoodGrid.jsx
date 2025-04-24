import React, { useState } from "react";
import { foods } from "../../data/SampleData";
import FoodDetailPopup from "../../components/FoodDetailPopup";

const FoodGrid = () => {
  const [selectedFood, setSelectedFood] = useState(null);

  const handleCardClick = (food) => {
    setSelectedFood(food);
  };

  const closePopup = () => {
    setSelectedFood(null);
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {foods.map((food, index) => (
          <div
            key={index}
            className="bg-white border border-black rounded-xl p-4 cursor-pointer"
            onClick={() => handleCardClick(food)}
          >
            <div className="bg-[#e9f5e8] min-h-56 rounded-lg p-4 flex flex-col items-center hover:bg-[#e8fcd4] transition-colors justify-between">
              <img
                src={food.imgUrl}
                alt={food.name}
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              <h2 className="text-center text-md font-medium">{food.name}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Popup for details */}
      {selectedFood && (
        <FoodDetailPopup food={selectedFood} onClose={closePopup} />
      )}
    </div>
  );
};

export default FoodGrid;
