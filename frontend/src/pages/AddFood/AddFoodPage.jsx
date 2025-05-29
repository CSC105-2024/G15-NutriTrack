import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { FoodSelectorOverlay } from "./FoodGrid";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import CalendarPopup from "@/components/CalendarPopup";
import Button from "@/components/Button";
import { useMealPlans } from "@/components/MealPlanContext";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AddFoodPage = () => {
  useDocumentTitle("Add Food");
  const { mealPlans, setMealPlans, selectedDate, setSelectedDate } =
    useMealPlans();

  const [showFoodSelector, setShowFoodSelector] = useState(false);
  const [currentMealType, setCurrentMealType] = useState(null);
  const [loading, setLoading] = useState(false);

  const dateKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  // test user
  const userId = "0f5e454a-b4ce-4e24-a9a9-a10ca2354c62";

  useEffect(() => {
    if (dateKey) {
      fetchMealPlans();
    }
  }, [dateKey]);

  const fetchMealPlans = async () => {
    if (!dateKey) return;

    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE_URL}/meals/plans`, {
        params: {
          userId,
          date: new Date(dateKey),
        },
      });

      if (data.success) {
        setMealPlans((prev) => ({
          ...prev,
          [dateKey]: data.data,
        }));
      }
    } catch (error) {
      console.error("Error fetching meal plans:", error);
      toast.error("Failed to load meal plans");

      setMealPlans((prev) => ({
        ...prev,
        [dateKey]: {
          breakfast: [],
          lunch: [],
          dinner: [],
        },
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleAddFood = (mealType) => {
    setCurrentMealType(mealType);
    setShowFoodSelector(true);
  };

  const addFoodToMeal = async (food) => {
    if (!currentMealType || !dateKey) return;

    try {
      const res = await axios.post(`${API_BASE_URL}/meals/addfood`, {
        userId,
        date: new Date(dateKey),
        type: currentMealType.toUpperCase(),
        foodId: food.id,
      });

      if (res.data.success) {
        setMealPlans((prev) => ({
          ...prev,
          [dateKey]: {
            ...prev[dateKey],
            [currentMealType]: [
              ...(prev[dateKey]?.[currentMealType] || []),
              food,
            ],
          },
        }));

        toast.success("Added food!");
      }
    } catch (err) {
      console.error("Error adding food to meal:", err);
      toast.error("Failed to add food");
    }
    setShowFoodSelector(false);
  };

  const removeFood = async (mealType, foodIndex, foodId) => {
    if (!dateKey) return;

    try {
      // Optimistically update UI first for better user experience
      setMealPlans((prev) => {
        const newMealPlan = {
          ...prev,
          [dateKey]: {
            ...prev[dateKey],
            [mealType]: prev[dateKey][mealType].filter(
              (_, index) => index !== foodIndex,
            ),
          },
        };

        return newMealPlan;
      });

      const res = await axios.post(`${API_BASE_URL}/meals/removefood`, {
        userId,
        date: new Date(dateKey),
        type: mealType.toUpperCase(),
        foodId,
      });

      if (res.data.success) {
        toast.success("Removed food!");
      } else {
        // If the backend operation fails, revert the UI change by refetching
        toast.error(res.data.error || "Failed to remove food");
        fetchMealPlans();
      }
    } catch (err) {
      console.error("Error removing food from meal:", err);
      toast.error("Failed to remove food");
      // Revert UI by refetching data
      fetchMealPlans();
    }
  };

  const calculateTotalCalories = (foods) => {
    return foods.reduce((total, food) => total + (food.calories || 0), 0);
  };

  const currentMealPlan = mealPlans[dateKey] || {
    breakfast: [],
    lunch: [],
    dinner: [],
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Meal Planner</h1>

      {/* Date Selector */}
      <div className="mb-8">
        <CalendarPopup date={selectedDate} setDate={setSelectedDate} />
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-600">Loading meal plans...</p>
      )}

      {/* Meal Cards */}
      {dateKey && !loading && (
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

              {currentMealPlan[mealType]?.length > 0 && (
                <div className="mt-4 space-y-2">
                  {currentMealPlan[mealType].map((food, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-amber-50 p-3 rounded-lg"
                    >
                      <span>{food.name}</span>
                      <div className="flex items-center">
                        <span className="mr-3">{food.calories || 0} kcal</span>
                        <Button
                          onClick={() => removeFood(mealType, index, food.id)}
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
