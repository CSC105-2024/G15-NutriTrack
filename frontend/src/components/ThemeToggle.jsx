import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../providers/ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-16 h-9 flex items-center rounded-full p-1 transition-all cursor-pointer
        ${isDark ? "bg-gray-800" : "bg-green-100"}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div
        className={`absolute w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center transition-all
          ${isDark ? "translate-x-7" : "translate-x-0"}`}
      >
        <FontAwesomeIcon
          icon={isDark ? faMoon : faSun}
          className="text-yellow-500"
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
