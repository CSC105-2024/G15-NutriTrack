import React, { useState } from "react";
import FormInput from "../../components/FormInput";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import axios from "axios";
import toast from "react-hot-toast";

const LogInPage = () => {
  useDocumentTitle("Log In");
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "The password must contain at least 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const [error, setError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setError(null);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: data.email,
        password: data.password,
      });
      if (res.data.success) {
        toast.success("Login Successful");
        navigate("/dashboard");
      } else {
        setError(res.data.msg || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Server error");
    }
  };

  return (
    <div className="flex justify-around items-center min-h-screen bg-green-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">
          Log in to your account
        </h2>
        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="font-bold">
              Email Address
            </label>
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
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <FormInput
              {...register("password")}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              toggleIcon={showPassword ? faEye : faEyeSlash}
              onToggle={() => setShowPassword(!showPassword)}
              autoComplete="current-password"
            />
            {errors.password ? (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            ) : error ? (
              <p className="text-red-500 text-sm">{error}</p>
            ) : null}
          </div>
          <Button className="w-full mt-2" text="Log In" type="submit" />
          <p className="text-center text-gray-600">
            Create new account?{" "}
            <Link to="/signup">
              <span className="text-emerald-500 cursor-pointer hover:underline">
                Register
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
