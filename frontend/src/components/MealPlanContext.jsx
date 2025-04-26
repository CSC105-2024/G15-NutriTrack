import { createContext, useContext, useState } from "react";

// Create context
const MealPlanContext = createContext();

// Provide context
export const MealPlanProvider = ({ children }) => {
  const [mealPlans, setMealPlans] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <MealPlanContext.Provider
      value={{ mealPlans, setMealPlans, selectedDate, setSelectedDate }}
    >
      {children}
    </MealPlanContext.Provider>
  );
};

// Custom hook to use context easily
export const useMealPlans = () => useContext(MealPlanContext);
