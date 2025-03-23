import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSidebar } from "../providers/SidebarContext";

const SideNavList = ({ text, icon, path, className = "" }) => {
  const { expanded } = useSidebar();

  return (
    <li className={`w-full flex justify-center ${className}`}>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `flex items-center ${
            expanded ? "justify-start w-35" : "justify-center w-10"
          } h-10 text-sm px-2 py-2 border rounded-md transition-all duration-200 cursor-pointer ${
            isActive ? "bg-[#DAFFDD] font-bold" : "hover:bg-[#F8FFE6]"
          }`
        }
      >
        <FontAwesomeIcon
          icon={icon}
          className={expanded ? "text-base" : "text-lg"}
        />
        {expanded && <span className="ml-2 truncate">{text}</span>}
      </NavLink>
    </li>
  );
};

export default SideNavList;
