import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormInput = ({
  type,
  name,
  placeholder,
  iconFa,
  toggleIcon,
  onToggle,
  value,
  onChange,
}) => {
  return (
    <div className="border-2 border-gray-300 rounded-lg flex justify-between px-4 py-2 mb-6 items-center  hover:shadow-[0_0_4px_#22c55e] focus-within:shadow-[0_0_4px_#22c55e]  transition-shadow">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="flex-grow outline-none placeholder-gray-400 focus:placeholder-transparent"
      />
      {!toggleIcon && iconFa && (
        <FontAwesomeIcon icon={iconFa} className="text-gray-500" />
      )}
      {toggleIcon && (
        <FontAwesomeIcon
          icon={toggleIcon}
          className="cursor-pointer text-gray-500 hover:text-green-500"
          onClick={onToggle}
        />
      )}
    </div>
  );
};

export default FormInput;
