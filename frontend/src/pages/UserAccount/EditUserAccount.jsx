import React, { useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import {
  faEnvelope,
  faUser,
  faVenusMars,
} from "@fortawesome/free-solid-svg-icons";
import FormInputWithLabel from "@/components/FormInputWithLabel";
import ProfileCard from "@/components/ProfileCard";
import { z } from "zod";
import { format } from "date-fns";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";

const EditUserAccount = () => {
  useDocumentTitle("Edit Profile");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "Henry Cavil",
    email: "something@example.com",
    dob: format(new Date(), "yyyy-MM-dd"),
    gender: "",
  });

  const [errors, setErrors] = useState({});

  const userFormSchema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    dob: z.string().min(1, "Date of Birth is required"),
    gender: z.enum(["Male", "Female"], {
      errorMap: () => ({ message: "Please select your gender" }),
    }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      userFormSchema.parse(formData);
      console.log(formData);
      alert("Profile updated successfully!");
      setErrors({});
      navigate("/profile");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-x-10 gap-y-8 mx-2 lg:mx-24">
        <ProfileCard src="https://vandclover.wordpress.com/wp-content/uploads/2013/03/1.jpg" />

        <div className="w-full">
          <FormInputWithLabel
            label="Full Name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            isAsterik
            iconFa={faUser}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        <div className="w-full">
          <FormInputWithLabel
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            isAsterik
            iconFa={faEnvelope}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="w-full">
          <FormInputWithLabel
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            isAsterik
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        <div className="w-full">
          <FormInputWithLabel
            label="Sex (Assigned at Birth)"
            name="gender"
            type="text"
            value={formData.gender}
            onChange={handleChange}
            isAsterik
            iconFa={faVenusMars}
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
            ]}
          />
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender}</p>
          )}
        </div>

        <div className="col-span-1 lg:col-span-2 flex justify-center mt-8">
          <Button type="submit" text="Save Changes" />
        </div>
      </div>
    </form>
  );
};

export default EditUserAccount;
