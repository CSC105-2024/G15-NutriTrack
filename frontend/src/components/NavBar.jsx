import React, { useState } from "react";
import Button from "./Button";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";

const Navbar = ({ sectionRefs }) => {
  // Function to handle smooth scrolling
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { text: "Home", onClick: () => scrollToSection(sectionRefs.hero) },
    { text: "Features", onClick: () => scrollToSection(sectionRefs.features) },
    { text: "Testimonials", onClick: () => scrollToSection(sectionRefs.testimonials) },
  ];

  return (
    <header className="flex justify-between items-center bg-[#E8F5E9] h-24 px-4 sm:px-8 lg:px-12 w-full shadow-md z-50 sticky top-0">
      {/* Logo */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection(sectionRefs.hero);
        }}
        aria-label="Go to Home"
      >
        <img
          className="rounded-full w-16 h-16 sm:w-20 sm:h-20"
          alt="NutriTrack logo"
          src="/assets/logo/logo.png"
        />
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block">
        <ul className="flex items-center gap-8 text-lg font-medium">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavItem
                text={item.text}
                onClick={item.onClick}
                variant="default"
              />
            </li>
          ))}
          <li>
            <Link to="/signup">
              <Button className="w-full" text="Sign Up" />
            </Link>
          </li>
          <li>
            <Link to="/login">
              <Button className="w-full" variant="secondary" text="Log In" />
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <div className="flex lg:hidden items-center gap-2">
        <Link to="/signup">
          <Button className="text-sm py-2 px-3" text="Sign Up" />
        </Link>
        <Link to="/login">
          <Button
            className="text-sm py-2 px-3"
            variant="secondary"
            text="Log In"
          />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;