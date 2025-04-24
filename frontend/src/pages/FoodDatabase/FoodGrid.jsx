import React, { useState } from "react";
import { foods } from "../../data/SampleData";
import FoodDetailPopup from "../../components/FoodDetailPopup";
import FormInput from "@/components/FormInput";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const FoodGrid = () => {
  const [selectedFood, setSelectedFood] = useState(null);

  const handleCardClick = (food) => {
    setSelectedFood(food);
  };

  const closePopup = () => {
    setSelectedFood(null);
  };

  const [searchItems, setSearchItems] = useState(foods);
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchItems(
      foods.filter((food) => food.name.toLowerCase().includes(searchValue))
    );
  };

  return (
    <div className="py-6">
      <div className="mb-8 w-80 lg:w-120 mx-auto sticky top-0 bg-white z-10 rounded-2xl">
        <FormInput
          type={"text"}
          placeholder={"Search"}
          onChange={(e) => handleSearch(e)}
          iconFa={faMagnifyingGlass}
        />
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"> */}
      <div className="flex flex-wrap items-center justify-center gap-6">
        {searchItems.map((food, index) => (
          <div
            key={index}
            className="w-50 bg-white border border-black rounded-xl p-4 cursor-pointer"
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
