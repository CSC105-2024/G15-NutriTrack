import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSidebar } from "../providers/SidebarContext";

const NavItem = ({
  text,
  icon,
  path,
  variant = "default", // "default" | "sidebar" | "mobile"
  onClick,
  className = "",
}) => {
  let expanded = false;
  try {
    const { expanded: sidebarExpanded } = useSidebar();
    expanded = sidebarExpanded;
  } catch (error) {
    expanded = false;
  }

  const getVariantClasses = (isActive) => ({
    default: "text-gray-800 transition-all duration-300 hover:text-[#0FA87D] focus:outline-none cursor-pointer",
    sidebar: `flex items-center w-full border border-black ${
      expanded ? "px-4" : "justify-center"
    } h-12 text-base border rounded-xl transition-all duration-200 cursor-pointer ${
      isActive 
        ? "bg-[#DAFFDD] text-[#0FA87D] font-medium border-[#0FA87D]" 
        : "hover:bg-[#F8FFE6] text-gray-700 hover:border-[#0FA87D]"
    }`,
    // mobile: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
  });

  const iconSize = {
    default: "text-base",
    sidebar: expanded ? "text-xl" : "text-2xl",
    // mobile: "text-base",
  };

  const content = (isActive) => (
    <>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className={`${iconSize[variant]} ${
            variant === "sidebar" && expanded ? "mr-3" : variant === "default" ? "mr-2" : ""
          } ${isActive && variant === "sidebar" ? "text-[#0FA87D]" : ""}`}
        />
      )}
      {text && (variant === "default" || expanded || variant === "mobile") && (
        <span className={variant === "sidebar" ? "font-medium" : ""}>
          {text}
        </span>
      )}
    </>
  );

  if (path) {
    return (
      <NavLink
        to={path}
        className={({ isActive }) =>
          `${getVariantClasses(isActive)[variant]} ${className}`
        }
      >
        {({ isActive }) => content(isActive)}
      </NavLink>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${getVariantClasses(false)[variant]} ${className}`}
    >
      {content(false)}
    </button>
  );
};

export default NavItem; 