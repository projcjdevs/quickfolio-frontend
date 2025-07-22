import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Add router import

interface LoginFormProps {
  onClose: () => void;
  onSwitch: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSwitch }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize router for redirection

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // For testing: Skip actual API call and redirect to dashboard
    router.push('/dashboard');
    
    // Uncomment this section when you want to restore the original functionality
    /*
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        onClose();
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
    */
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal container - Thinner on mobile, original exact size on desktop */}
      <div className="bg-white w-[70%] sm:w-[80%] md:w-[610.99px] h-auto md:h-[427.48px] rounded-[25px] md:rounded-[40px] shadow-xl flex overflow-hidden relative">
        {/* Close "X" button */}
        <button
          onClick={onClose}
          className="absolute top-3 md:top-4 right-4 md:right-6 text-xl md:text-2xl text-gray-500 hover:text-black focus:outline-none"
          style={{ zIndex: 10 }}
          type="button"
        >
          ×
        </button>
        
        {/* Left side - Hidden on mobile */}
        <div className="hidden md:flex md:w-3/5 bg-[#E8F4F4] p-6 flex-col justify-start items-start">
          <h2 className="text-2xl font-bold text-black mb-4 self-start ml-4">
            Quickfolio
          </h2>
          <div className="flex justify-center items-center h-[340px] w-full ml-[-30px] mt-16 overflow-visible relative">
            <img
              src="https://blush.design/api/download?shareUri=Obam7yDIr&w=800&h=800&fm=png"
              alt="login doodle"
              className="w-[320px] h-[320px] object-contain transform scale-[1.3]"
            />
          </div>
        </div>

        {/* Right side - Full width on mobile */}
        <form
          onSubmit={handleLogin}
          className="w-full md:w-2/5 p-5 md:p-8 flex flex-col justify-start items-center pt-10 md:pt-17"
        >
          {/* No logo on mobile view now */}
          
          <h2 className="text-xl md:text-2xl font-bold text-black mb-6 text-center">
            Login
          </h2>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="text-[13px] mb-3 px-4 py-2 rounded-md bg-[#b9b9b9] focus:outline-none focus:ring-2 focus:ring-[#8dd9c4]"
            style={{ 
              width: "100%", 
              maxWidth: "180px", 
              height: "30.71px"
            }}
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="text-[13px] mb-4 px-4 py-2 rounded-md bg-[#b9b9b9] focus:outline-none focus:ring-2 focus:ring-[#8dd9c4]"
            style={{
              width: "100%",
              maxWidth: "180px",
              height: "30.71px",
              marginBottom: "12px",
            }}
          />

          <p
            className="text-[10px] mb-4 text-center text-black"
            style={{ fontFamily: "arial" }}
          >
            Don't have an account?{" "}
            <button type="button" onClick={onSwitch} className="text-[#0051F3]">
              Register now
            </button>
          </p>

          <button
            type="submit"
            className="bg-black text-white text-[14px] flex items-center justify-center py-2 rounded-full hover:bg-[#dedede] hover:text-[#333333] transition-colors"
            style={{ width: "90px", height: "33px" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;