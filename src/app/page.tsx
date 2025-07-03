"use client"; // Add this line at the top

import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
    setIsRegisterOpen(false);
  };

  const toggleRegister = () => {
    setIsRegisterOpen(!isRegisterOpen);
    setIsLoginOpen(false);
  };

  return (
    <div className="bg-[#F5F4ED] min-h-screen">
      <button onClick={toggleLogin} className="m-4 p-2 bg-[#333333] text-white rounded">
        Open Login
      </button>
      <button onClick={toggleRegister} className="m-4 p-2 bg-[#333333] text-white rounded">
        Open Register
      </button>
      {isLoginOpen && <LoginForm onClose={toggleLogin} onSwitch={toggleRegister} />}
      {isRegisterOpen && <RegisterForm onClose={toggleRegister} onSwitch={toggleLogin} />}
    </div>
  );
}