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
import { useSidebar } from "../../../providers/SidebarContext";
import SideNavList from "./../../../components/SideNavList";
import ThemeToggle from "../../../components/ThemeToggle";
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
          <SideNavList text="Home" icon={faHome} path="/dashboard" />
          <SideNavList text="Add Food" icon={faPlus} path="/addfood" />
          <SideNavList text="Database" icon={faDatabase} path="/database" />
          <SideNavList text="Profile" icon={faUser} path="/profile" />
        </ul>

        <div className="flex justify-center py-2">
          <ThemeToggle />
        </div>

        <div className="flex-grow"></div>

        <SideNavList
          text="Sign Out"
          icon={faSignOut}
          path="/"
          className="mb-16"
        />
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
