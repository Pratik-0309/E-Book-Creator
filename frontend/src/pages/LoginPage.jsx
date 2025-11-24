// pages/LoginPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, BookOpen } from "lucide-react"; // ✅ lowercase
import toast from "react-hot-toast";

import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, formData);
      const { user } = response.data; // token not used (cookies handle auth)
      login(user);
      toast.success(`Welcome back, ${user.name || user.email}!`);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div
            className="inline-flex h-16 w-16 items-center justify-center 
            bg-violet-500 rounded-xl mb-4 shadow-xl"
          >
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">
            Sign in to continue to your eBook dashboard.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8 pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Button type="submit" isLoading={isLoading} className="w-full mt-8">
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-violet-600 hover:text-violet-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
