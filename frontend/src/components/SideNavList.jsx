import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSidebar } from "../providers/SidebarContext";

const SideNavList = ({ text, onClick, icon, isActive, className = "" }) => {
  const { expanded } = useSidebar();

  return (
    <li className={`w-full flex justify-center ${className}`}>
      <button
        className={`flex border border-black items-center ${expanded ? "justify-start w-35" : "justify-center w-10"} h-10 text-sm px-2 py-2 border rounded-md transition-all duration-200 cursor-pointer
          ${isActive ? "bg-[#DAFFDD] font-bold" : "hover:bg-[#F8FFE6]"}`}
        onClick={onClick}
      >
        <div className="flex items-center justify-center">
          {icon && (
            <FontAwesomeIcon
              icon={icon}
              className={expanded ? "text-base" : "text-lg"}
            />
          )}
        </div>

        {expanded && <span className="ml-2 truncate">{text}</span>}
      </button>
    </li>
  );
};

export default SideNavList;
