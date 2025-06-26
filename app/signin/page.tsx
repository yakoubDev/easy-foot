"use client";
import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaFutbol,
  FaPhone,
} from "react-icons/fa";
import * as motion from "framer-motion/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Spinner from "../components/Spinner";

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const { setUser } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.email.trim() ||
      !formData.password.trim() ||
      (!isLogin && !formData.confirmPassword.trim()) ||
      (!isLogin && !formData.name.trim()) ||
      (!isLogin && !formData.phone.trim())
    ) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`/api/${isLogin ? "signin" : "signup"}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Something went wrong ...");
        return;
      }

      toast.success(`${isLogin ? "Welcome Back" : "Account Created"} !`);
      if (isLogin) {
        const userRes = await fetch("/api/get-user", {
          credentials: "include",
        });
        const userData = await userRes.json();

        setUser(userData.user);
        router.push("/");
      } else {
        toggleMode();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong ...");
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-6 py-8 border-[1px] border-white/10 rounded-md w-full lg:w-[60%] "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      key={isLogin ? "login" : "signup"}
    >
      <div className="w-full max-w-md ">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaFutbol className="text-4xl text-green-400" />
            <h1 className="text-4xl font-black tracking-[-0.02em] bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Fast Foot
            </h1>
            <FaFutbol className="text-4xl text-green-400" />
          </div>
          <p className="text-white/70 text-sm">
            {isLogin
              ? "Welcome back to the game!"
              : "Join the football community"}
          </p>
        </div>

        {/* Auth Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              {isLogin ? "Sign In" : "Create Account"}
            </h2>
            <p className="text-white/60 text-sm">
              {isLogin
                ? "Enter your credentials to access your account"
                : "Fill in your details to get started"}
            </p>
          </div>

          <div className="space-y-5">
            {/* Name Field - Only for Signup */}
            {!isLogin && (
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 text-sm" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-200"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Email Field */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 text-sm" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-200"
                required
              />
            </div>

            {/* Phone Field */}
            {!isLogin && (
              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 text-sm" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-200"
                  required
                />
              </div>
            )}
            {/* Password Field */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 text-sm" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/20 rounded-lg pl-12 pr-12 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-green-400 transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password - Only for Signup */}
            {!isLogin && (
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-400 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/20 rounded-lg pl-12 pr-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-green-400 focus:bg-white/10 transition-all duration-200"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Forgot Password - Only for Login */}
            {isLogin && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-green-400 hover:text-green-300 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-700 py-3 rounded-lg font-semibold text-lg tracking-[0.5px] transition-all duration-200 hover:scale-[1.02] transform hover:shadow-lg hover:shadow-green-500/25"
            >
              {isLoading
                ? <Spinner />
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </button>
          </div>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={toggleMode}
                className="ml-2 text-green-400 hover:text-green-300 font-semibold transition-colors"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white/40 text-xs">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SignIn;
