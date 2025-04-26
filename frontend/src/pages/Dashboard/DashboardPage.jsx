import React, { useState } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addDays,
  subDays,
  subWeeks,
  addWeeks,
  parseISO,
} from "date-fns";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from "recharts";
import MealCard from "@/pages/Dashboard/MealCard";
import CalendarPopup from "@/components/CalendarPopup";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useMealPlans } from "@/components/MealPlanContext";
import FoodDetailPopup from "./FoodDetailPopup";

const DashboardPage = () => {
  useDocumentTitle("Dashboard");

  const { mealPlans, selectedDate, setSelectedDate } = useMealPlans();
  const [selectedFood, setSelectedFood] = useState(null);

  // State for date range selectors
  const [startDate, setStartDate] = useState(() => {
    const start = startOfWeek(selectedDate || new Date());
    return start;
  });
  const [endDate, setEndDate] = useState(() => {
    const end = endOfWeek(selectedDate || new Date());
    return end;
  });

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

  // Calculate daily totals across all meals
  const calculateDailyTotals = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const dailyMealPlan = mealPlans[dateStr] || {
      breakfast: [],
      lunch: [],
      dinner: [],
    };

    const mealTypes = ["breakfast", "lunch", "dinner"];
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    mealTypes.forEach((mealType) => {
      const foods = dailyMealPlan[mealType] || [];
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

  const dailyTotals = calculateDailyTotals(selectedDate || new Date());

  // Prepare data for nutrient breakdown pie chart
  const prepareNutrientChartData = () => {
    const { protein, carbs, fat } = dailyTotals;

    // Only include non-zero values
    const data = [];

    if (protein > 0) data.push({ name: "Protein", value: protein });
    if (fat > 0) data.push({ name: "Fat", value: fat });
    if (carbs > 0) data.push({ name: "Carbs", value: carbs });

    // If all values are zero, show a placeholder
    if (data.length === 0) {
      data.push({ name: "No data", value: 1 });
    }

    return data;
  };

  // Prepare data for weekly calorie chart
  const prepareWeeklyCalorieData = () => {
    if (!startDate || !endDate) return [];

    // Generate an array of dates between start and end
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    // Map each date to its calorie total
    const dataWithCalories = dateRange.map((date) => {
      const dayName = format(date, "EEE");
      const { calories } = calculateDailyTotals(date);
      const isToday =
        format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

      return {
        name: dayName,
        calories: calories,
        isToday: isToday,
      };
    });

    // Find the highest calorie value
    const maxCalorieEntry = dataWithCalories.reduce(
      (max, entry) => (entry.calories > max.calories ? entry : max),
      { calories: 0 }
    );

    // Set the fill color based on whether it's today or the highest calorie day
    return dataWithCalories.map((entry) => ({
      name: entry.name,
      calories: entry.calories,
      fill: entry.isToday
        ? "#4ECDC4"
        : entry.calories === maxCalorieEntry.calories
        ? "#FF6B6B" // Highlight the highest calorie bar
        : "#F4D35E", // Default color
    }));
  };

  const nutrientChartData = prepareNutrientChartData();
  const weeklyCalorieData = prepareWeeklyCalorieData();

  // Set date range to previous week
  const handlePreviousWeek = () => {
    setStartDate((prev) => subWeeks(prev, 1));
    setEndDate((prev) => subWeeks(prev, 1));
  };

  // Set date range to next week
  const handleNextWeek = () => {
    setStartDate((prev) => addWeeks(prev, 1));
    setEndDate((prev) => addWeeks(prev, 1));
  };

  // Colors for the pie chart
  const COLORS = ["#4285F4", "#F4D35E", "#D64933"];

  // Custom tooltip for the pie chart
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="font-semibold">{`${payload[0].name}: ${payload[0].value}g`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Date Selector */}
      <div className="mb-8">
        <CalendarPopup date={selectedDate} setDate={setSelectedDate} />
      </div>

      {/* Meal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-6">
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

      {/* Container for Both Charts */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Nutrient Breakdown Chart */}
        <div className="bg-gray-200 p-6 rounded-lg flex-1">
          <h2 className="text-2xl font-bold text-center mb-4">
            Nutrient Breakdown
          </h2>
          <div className="flex justify-center mb-6">
            <div className="flex space-x-6">
              <div className="flex items-center">
                <div className="w-6 h-6 rounded bg-blue-500 mr-2"></div>
                <span className="text-base md:text-lg">Protein</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded bg-yellow-400 mr-2"></div>
                <span className="text-base md:text-lg">Fat</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 rounded bg-red-600 mr-2"></div>
                <span className="text-base md:text-lg">Carb</span>
              </div>
            </div>
          </div>
          <div className="h-80 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={nutrientChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {nutrientChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Calorie Breakdown Chart */}
        <div className="bg-gray-200 p-6 rounded-lg flex-1">
          <h2 className="text-2xl font-bold text-center mb-4">
            Calorie Breakdown
          </h2>

          {/* Date Range Selector */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center">
              <span className="mr-2 text-base md:text-lg font-medium">
                From:
              </span>
              <CalendarPopup date={startDate} setDate={setStartDate} />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={handlePreviousWeek}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                &lt;
              </button>
              <button
                onClick={handleNextWeek}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                &gt;
              </button>
            </div>

            <div className="flex items-center">
              <span className="mr-2 text-base md:text-lg font-medium">To:</span>
              <CalendarPopup date={endDate} setDate={setEndDate} />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="h-80 md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={weeklyCalorieData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis
                  domain={[0, "dataMax + 500"]}
                  ticks={[0, 100, 500, 1000, 1500, 2000, 2500]}
                  allowDataOverflow
                />
                <Tooltip
                  formatter={(value) => [`${value} calories`, "Calories"]}
                  labelFormatter={(label) => `${label}`}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                  }}
                />
                <ReferenceLine y={2000} stroke="#ddd" strokeDasharray="3 3" />
                <Bar dataKey="calories" radius={[20, 20, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
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
