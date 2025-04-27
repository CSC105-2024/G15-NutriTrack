import React from "react";
import FormInput from "@/components/FormInput";

const FormInputWithLabel = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  readOnly,
  iconFa,
  isAsterik,
  options,
}) => {
  return (
    <div className="flex flex-col items-start mx-auto w-full">
      <div className="font-bold mb-1">
        <label htmlFor={name}>{label}</label>
        {isAsterik && <span className="text-red-500"> *</span>}
      </div>
      {options ? (
        <div className="relative w-full">
          <select
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className="w-full px-10 py-2 border border-gray-300 rounded-md appearance-none"
          >
            <option value="" disabled>
              Select {label}
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      ) : (
        <FormInput
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          iconFa={iconFa}
        />
      )}
    </div>
  );
};

export default FormInputWithLabel;
