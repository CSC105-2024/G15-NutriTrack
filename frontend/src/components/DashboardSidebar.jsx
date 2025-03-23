import React from "react";
import {
  faChevronLeft,
  faChevronRight,
  faDatabase,
  faHome,
  faPlus,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSidebar } from "../providers/SidebarContext";
import NavItem from "./NavItem";
import ThemeToggle from "./ThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const { expanded, setExpanded } = useSidebar();

  return (
    <aside
      className={`h-screen bg-white border-r shadow-sm transition-all duration-300 ${
        expanded ? "w-56" : "w-16"
      }`}
    >
      <nav className="h-full flex flex-col">
        {/* Logo and toggle section */}
        <div className="p-2 flex justify-between items-center mb-6 w-full">
          <div className="flex items-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/dashboard");
              }}
              aria-label="Go to Dashboard"
            >
              <img
                className={`rounded-full ${expanded ? "w-12 h-12" : "w-0 h-0"}`}
                alt="NutriTrack logo"
                src="/assets/logo/logo.png"
              />
            </a>
            {expanded && (
              <span className="ml-4 text-lg text-green-700 font-medium">
                NutriTrack
              </span>
            )}
          </div>
          <div className={`flex ${expanded ? "" : "w-full justify-center"}`}>
            <button
              onClick={() => setExpanded((prev) => !prev)}
              className={`p-1 rounded-full hover:bg-gray-100 cursor-pointer ${expanded ? "" : "my-2"}`}
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              <FontAwesomeIcon
                icon={expanded ? faChevronLeft : faChevronRight}
                size="sm"
              />
            </button>
          </div>
        </div>

        <ul className={`flex flex-col gap-4 p-2 w-full`}>
          <NavItem text="Home" icon={faHome} path="/dashboard" variant="sidebar" />
          <NavItem text="Add Food" icon={faPlus} path="/addfood" variant="sidebar" />
          <NavItem text="Database" icon={faDatabase} path="/database" variant="sidebar" />
          <NavItem text="Profile" icon={faUser} path="/profile" variant="sidebar" />
        </ul>

        <div className="flex justify-center py-2">
          <ThemeToggle />
        </div>

        <div className="flex-grow"></div>

        <div className="p-2">

        <NavItem
          text="Sign Out"
          icon={faSignOut}
          path="/"
          variant="sidebar"
          className="mb-16"
        />
        </div>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
