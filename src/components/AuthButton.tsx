"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationModal from "./RegisForm";

type AuthMode = "login" | "register";

export default function AuthButton() {
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

  return (
    <>
      <button
        onClick={() => handleOpen("login")}
        className="bg-[#1d1d1b] text-[#F5F4ED] px-6 py-2 rounded-xl font-normal transition duration-200 hover:bg-[#292927] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#F5F4ED]"
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


//try for new pr (checking if this works)