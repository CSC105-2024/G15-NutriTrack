import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogInPage from "./pages/LogInPage.jsx";
import SignUpPage from "./pages/SignUp/SignUpPage.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import DashboardPage from "./pages/Dashboard/DashboardPage.jsx";
import AddFoodPage from "./pages/AddFood/AddFoodPage.jsx";
import FoodDatabasePage from "./pages/FoodDatabase/FoodDatabasePage.jsx";
import UserAccountPage from "./pages/UserAccount/UserAccountPage.jsx";
import DashboardLayout from "./components/DashboardLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LogInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/addfood",
        element: <AddFoodPage />,
      },
      {
        path: "/database",
        element: <FoodDatabasePage />,
      },
      {
        path: "/profile",
        element: <UserAccountPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
