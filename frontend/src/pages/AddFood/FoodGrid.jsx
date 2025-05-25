import React, { useState, useRef, useEffect } from "react";
import FormInput from "@/components/FormInput";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import FoodDetailPopup from "./FoodDetailPopup";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const FoodGrid = ({ onSelectFood = null, mealType = null }) => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState(null);

  const handleCardClick = (food) => {
    setSelectedFood(food);
  };

  const closePopup = () => {
    setSelectedFood(null);
  };

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/foods`);
        setFoods(res.data);
      } catch (err) {
        console.error("Failed to fetch foods:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  useEffect(() => {
    setSearchItems(foods);
  }, [foods]);

  const [searchItems, setSearchItems] = useState(foods);
  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchItems(
      foods.filter((food) => food.name.toLowerCase().includes(searchValue)),
    );
  };

  const handleAddToMeal = (food) => {
    if (onSelectFood) {
      onSelectFood(food);
    }
    setSelectedFood(null);
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

      {selectedFood && (
        <FoodDetailPopup
          food={selectedFood}
          onClose={closePopup}
          onAddToMeal={handleAddToMeal}
          currentMealType={mealType}
        />
      )}
    </div>
  );
};

// Enhanced Overlay component with click-outside-to-close functionality
const FoodSelectorOverlay = ({
  showFoodSelector,
  setShowFoodSelector,
  currentMealType,
  addFoodToMeal,
}) => {
  const modalRef = useRef(null);

  // Function to handle clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowFoodSelector(false);
      }
    };

    // Add event listener if the modal is shown
    if (showFoodSelector) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFoodSelector, setShowFoodSelector]);

  if (!showFoodSelector) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        ref={modalRef}
        // Need to decide on the color
        className="bg-gray-400 rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            Select Food for{" "}
            {currentMealType?.charAt(0).toUpperCase() +
              currentMealType?.slice(1)}
          </h2>
          <button
            onClick={() => setShowFoodSelector(false)}
            className="top-4 right-4 text-black hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <FoodGrid onSelectFood={addFoodToMeal} mealType={currentMealType} />
      </div>
    </div>
  );
};

export { FoodGrid, FoodSelectorOverlay };
