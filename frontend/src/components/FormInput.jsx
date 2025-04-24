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
  autoComplete,
  readOnly,
  ...rest
}) => {
  return (
    <div className="border-2 border-gray-300 hover:border-[#22c55e] rounded-lg flex justify-between px-3 sm:px-4 py-2 items-center hover:shadow-[0_0_4px_#22c55e] focus-within:shadow-[0_0_4px_#22c55e] focus-within:border-[#22c55e] transition-shadow">
      <input
        {...rest}
        id={name}
        type={type}
        name={name}
        readOnly={readOnly}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="flex-grow outline-none placeholder-gray-400 focus:placeholder-transparent text-sm sm:text-base"
      />
      {!toggleIcon && iconFa && (
        <FontAwesomeIcon icon={iconFa} className="text-gray-500 ml-2" />
      )}
      {toggleIcon && (
        <FontAwesomeIcon
          icon={toggleIcon}
          className="cursor-pointer text-gray-500 hover:text-green-500 ml-2"
          onClick={onToggle}
        />
      )}
    </div>
  );
};

export default FormInput;
