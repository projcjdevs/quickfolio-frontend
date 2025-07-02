'use client';

import { useState } from 'react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    yourName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.yourName.trim()) {
      newErrors.yourName = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Handle successful registration
      console.log('Registration data:', formData);
      
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
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-[#F5F4ED] rounded-3xl shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
        >
          <span className="text-[#333333] text-xl font-bold">×</span>
        </button>

        <div className="flex min-h-[500px]">
          {/* Left side - Welcome content */}
          <div className="flex-1 p-8 flex flex-col justify-center bg-gradient-to-br from-[#E8F4F4] to-[#cbcadb] rounded-l-3xl">
            <div className="text-left">
              <h1 className="text-3xl font-bold text-[#333333] mb-3">
                Welcome to QuickFolio
              </h1>
              <p className="text-[#333333]/80 text-lg mb-6">
                Create. Connect. Showcase.
              </p>
              <p className="text-[#333333]/70 text-sm leading-relaxed">
                Ditch the clutter. Go clean, clear, and always accessible.
              </p>
            </div>
            
            
            <div className="mt-8 flex justify-center">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-4xl">🎨</span>
              </div>
            </div>
          </div>

          {/* Right side - Registration form */}
          <div className="flex-1 p-8 bg-white rounded-r-3xl">
            <div className="max-w-sm mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#333333] mb-2">Register</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    id="yourName"
                    name="yourName"
                    value={formData.yourName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-0 rounded-xl bg-gray-100 text-[#333333] text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8dd9c4] transition-colors ${
                      errors.yourName ? 'ring-2 ring-[#ff5678]' : ''
                    }`}
                    placeholder="Your Name"
                  />
                  {errors.yourName && (
                    <p className="text-[#ff5678] text-xs mt-1">{errors.yourName}</p>
                  )}
                </div>
                  

                {/* Email */}
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-0 rounded-xl bg-gray-100 text-[#333333] text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8dd9c4] transition-colors ${
                      errors.email ? 'ring-2 ring-[#ff5678]' : ''
                    }`}
                    placeholder="Email Address"
                  />
                  {errors.email && (
                    <p className="text-[#ff5678] text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-0 rounded-xl bg-gray-100 text-[#333333] text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8dd9c4] transition-colors ${
                      errors.password ? 'ring-2 ring-[#ff5678]' : ''
                    }`}
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="text-[#ff5678] text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-0 rounded-xl bg-gray-100 text-[#333333] text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8dd9c4] transition-colors ${
                      errors.confirmPassword ? 'ring-2 ring-[#ff5678]' : ''
                    }`}
                    placeholder="Confirm Password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-[#ff5678] text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Login Link */}
                <div className="text-center">
                  <p className="text-gray-500 text-sm">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-blue-600 font-medium hover:underline focus:outline-none"
                    >
                      Login now
                    </button>
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#333333] text-white py-3 px-4 rounded-xl font-medium text-sm hover:bg-[#333333]/90 focus:outline-none focus:ring-2 focus:ring-[#8dd9c4] focus:ring-offset-2 transition-colors mt-6"
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
