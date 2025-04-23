import React from "react";
import FormInput from "@/components/FormInput";

const FormInputWithLabel = ({ label, name, type, value, readOnly, iconFa }) => {
  return (
    <div className="flex flex-col items-start mx-auto">
      <label htmlFor={name} className="font-bold mb-1">
        {label}
      </label>
      <FormInput
        name={name}
        type={type}
        value={value}
        readOnly={readOnly}
        iconFa={iconFa}
      />
    </div>
  );
};

export default FormInputWithLabel;
