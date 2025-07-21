"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationModal from "./RegisForm";

type AuthMode = "login" | "register";

interface AuthButtonProps {
  variant?: 'navbar' | 'body';
  className?: string;
}

export default function AuthButton({ variant = 'navbar', className = '' }: AuthButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const handleOpen = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSwitch = () => {
    setAuthMode(authMode === "login" ? "register" : "login");
  };

  // Define different button styles based on variant
  const buttonStyles = {
    navbar: "hidden md:block bg-[#1d1d1b] text-[#F5F4ED] px-6 py-2 rounded-xl font-normal transition duration-200 hover:bg-[#292927] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F5F4ED]",
    body: "bg-[#1d1d1b] text-[#F5F4ED] px-8 py-3 rounded-xl font-medium text-lg transition duration-200 hover:bg-[#292927] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F5F4ED]"
  };

  return (
    <>
      <button
        onClick={() => handleOpen("login")}
        className={`${buttonStyles[variant]} ${className}`}
      >
        Get Started
      </button>

      {authMode === "login" && isModalOpen && (
        <LoginForm onClose={handleClose} onSwitch={handleSwitch} />
      )}

      {authMode === "register" && isModalOpen && (
        <RegistrationModal
          isOpen={isModalOpen}
          onClose={handleClose}
          onSwitch={handleSwitch}
        />
      )}
    </>
  );
}
