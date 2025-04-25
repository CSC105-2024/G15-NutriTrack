import Button from "@/components/Button";
import React, { useRef, useEffect } from "react";

const FoodDetailPopup = ({ food, onClose, onAddToMeal, currentMealType }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    // Handler for outside clicks
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Add event listener when the popup is shown
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!food) return null;

  const handleAddToMeal = () => {
    if (onAddToMeal) {
      onAddToMeal(food);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center p-4 z-50">
      <div
        ref={popupRef}
        className="bg-yellow-50 rounded-2xl p-6 w-full max-w-md relative shadow-xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-gray-700"
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

        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          {/* Food image - using placeholder */}
          <div className="rounded-full overflow-hidden w-36 h-36 flex-shrink-0 bg-white">
            <img
              src={food.imgUrl}
              alt={food.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            {/* Title */}
            <h2 className="text-4xl font-bold text-black">{food.name}</h2>

            {/* Per Serving section */}
            <h3 className="text-xl font-bold mt-4 mb-2">Per Serving</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Calories: {food.calories} kcal</li>
              <li>Carbs: {food.carb}g</li>
              <li>Protein: {food.protein}g</li>
              <li>Fats: {food.fat}g</li>
            </ul>
          </div>
        </div>

        {/* Description */}
        <p className="text-center text-lg mt-6">
          {food.description ||
            "A simple and delicious dish, perfect for any time of day."}
        </p>

        {/* Ingredients (only shown if expanded view) */}
        {food.showDetails && (
          <div className="mt-4">
            <h3 className="font-semibold text-gray-900 mb-2">Ingredients:</h3>
            <ul className="list-disc pl-5 text-gray-700">
              {food.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>

            <h3 className="font-semibold text-gray-900 mt-4 mb-2">
              Preparation:
            </h3>
            <p className="text-gray-700">{food.preparation}</p>
          </div>
        )}

        {/* Add to meal button - new addition */}
        {onAddToMeal && (
          <Button
            onClick={handleAddToMeal}
            className="mt-6 w-full"
            variant="primary"
            text={`Add to ${
              currentMealType?.charAt(0).toUpperCase() +
              currentMealType?.slice(1)
            }`}
          />
        )}
      </div>
    </div>
  );
};

export default FoodDetailPopup;
