"use client";

import { useState } from "react";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: () => void;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  onSwitch,
}: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    yourName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.yourName.trim()) {
      newErrors.yourName = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle successful registration
      console.log("Registration data:", formData);

      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="bg-white w-[610.99px] h-[427.48px] rounded-[40px] shadow-xl flex overflow-hidden relative">
        {/* Close "X" button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-2xl text-gray-500 hover:text-black focus:outline-none"
          style={{ zIndex: 10 }}
          type="button"
        >
          ×
        </button>

        {/*left*/}
        <div className="w-3/5 bg-[#E8F4F4] p-6 flex flex-col justify-start items-start">
          <h2 className="text-2xl font-bold text-black mb-4 self-start ml-4">
            Quickfolio
          </h2>
          <div className="flex justify-center items-center h-[340px] w-full ml-[-30px] mt-16 overflow-visible relative">
            <img
              src="https://blush.design/api/download?shareUri=Obam7yDIr&w=800&h=800&fm=png"
              alt="register doodle"
              className="w-[320px] h-[320px] object-contain transform scale-[1.3]"
            />
          </div>
        </div>

        {/*right*/}
        <form
          onSubmit={handleSubmit}
          className="w-3/6 p-8 flex flex-col justify-start items-center pt-17"
        >
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            Register
          </h2>

          <input
            type="text"
            id="yourName"
            name="yourName"
            value={formData.yourName}
            onChange={handleInputChange}
            placeholder="Username"
            className={`text-[13px] mb-2 px-4 py-2 rounded-md bg-[#b9b9b9] focus:outline-none focus:ring-2 focus:ring-[#8dd9c4] ${
              errors.yourName ? "ring-2 ring-[#ff5678]" : ""
            }`}
            style={{ width: "180.19px", height: "30.71px" }}
          />
          {errors.yourName && (
            <p className="text-[#ff5678] text-[8px] -mt-1 mb-1">
              {errors.yourName}
            </p>
          )}

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className={`text-[13px] mb-2 px-4 py-2 rounded-md bg-[#b9b9b9] focus:outline-none focus:ring-2 focus:ring-[#8dd9c4] ${
              errors.email ? "ring-2 ring-[#ff5678]" : ""
            }`}
            style={{ width: "180.19px", height: "30.71px" }}
          />
          {errors.email && (
            <p className="text-[#ff5678] text-[8px] -mt-1 mb-1">
              {errors.email}
            </p>
          )}

          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            className={`text-[13px] mb-2 px-4 py-2 rounded-md bg-[#b9b9b9] focus:outline-none focus:ring-2 focus:ring-[#8dd9c4] ${
              errors.password ? "ring-2 ring-[#ff5678]" : ""
            }`}
            style={{ width: "180.19px", height: "30.71px" }}
          />
          {errors.password && (
            <p className="text-[#ff5678] text-[8px] -mt-1 mb-1">
              {errors.password}
            </p>
          )}

          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            className={`text-[13px] mb-2 px-4 py-2 rounded-md bg-[#b9b9b9] focus:outline-none focus:ring-2 focus:ring-[#8dd9c4] ${
              errors.confirmPassword ? "ring-2 ring-[#ff5678]" : ""
            }`}
            style={{ width: "180.19px", height: "30.71px" }}
          />
          {errors.confirmPassword && (
            <p className="text-[#ff5678] text-[8px] -mt-1 mb-1">
              {errors.confirmPassword}
            </p>
          )}

          <p
            className="text-[10px] mb-3 text-center text-black"
            style={{ fontFamily: "arial" }}
          >
            Already have an account?{" "}
            <button type="button" onClick={onSwitch} className="text-[#0051F3]">
              Login now
            </button>
          </p>

          <button
            type="submit"
            className="bg-black text-white text-[14px] flex items-center justify-center py-2 rounded-full hover:bg-[#dedede] hover:text-[#333333] transition-colors"
            style={{ width: "90px", height: "33px" }}
          >
            Register
          </button>

          <div className="w-full flex items-center mt-2 mb-2">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            type="button"
            className="w-[175px] h-[30px] flex items-center justify-center border border-[#1e1e1e] text-[#1e1e1e] text-[12px] font-medium py-2 rounded-md hover:bg-gray-100 transition"
          >
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
}
