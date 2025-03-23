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

const DashboardSidebar = () => {
  const { expanded, setExpanded } = useSidebar();

  return (
    <aside
      className={`h-screen bg-white border-r shadow-sm transition-all duration-300 ${
        expanded ? "w-56" : "w-16"
      }`}
    >
      <nav className="h-full flex flex-col">
        {/* Logo and toggle section */}
        <div className="p-4 flex justify-between items-center">
          <img
            className={`rounded-full transition-all ${
              expanded ? "w-12 h-12 sm:w-16 sm:h-16" : "w-8 h-8"
            }`}
            alt="NutriTrack logo"
            src="/assets/logo/logo.png"
          />
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <FontAwesomeIcon icon={expanded ? faChevronLeft : faChevronRight} />
          </button>
        </div>

        <ul className="flex flex-col gap-4 p-2 w-full">
          <SideNavList text="Dashboard" icon={faHome} path="/dashboard" />
          <SideNavList text="Add Food" icon={faPlus} path="/addfood" />
          <SideNavList text="Database" icon={faDatabase} path="/database" />
          <SideNavList text="Profile" icon={faUser} path="/profile" />
        </ul>

        <div className="flex-grow"></div>

        <div className="flex justify-center p-4">
          <ThemeToggle />
        </div>

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
