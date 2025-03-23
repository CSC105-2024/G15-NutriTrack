import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import {
  faUser,
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useDocumentTitle from "../../hooks/useDocumentTitle";

const SignUpPage = () => {
  useDocumentTitle("Register");
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "The password must contain at least 6 characters"),
    confirmPassword: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match!");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">
          Create your account
        </h2>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <FormInput
              {...register("username")}
              type="text"
              name="username"
              placeholder="Username"
              iconFa={faUser}
              autoComplete="name"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div>
            <FormInput
              {...register("email")}
              name="email"
              placeholder="Email"
              iconFa={faEnvelope}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <FormInput
              {...register("password")}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              toggleIcon={showPassword ? faEye : faEyeSlash}
              onToggle={() => setShowPassword(!showPassword)}
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <FormInput
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              toggleIcon={showConfirmPassword ? faEye : faEyeSlash}
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              autoComplete="off"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <Button className="w-full" text="Sign Up" type="submit" />
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-emerald-500 cursor-pointer hover:underline">
                Log in
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
