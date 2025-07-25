"use client";

import NavBarDB from "@/components/NavBarDB";
import TemplateSelectionModal from "@/components/TemplateSelectionModal";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleTemplateSelect = (templateId: string) => {
    // Close the modal
    setIsModalOpen(false);

    // Navigate to the editor with the selected template
    router.push(`/edit?template=${templateId}`);
  };

  return (
    <div className="bg-[#2D3748] min-h-screen flex flex-col">
      {/* Fixed border to match landing page */}
      <div className="flex-1 font-sans bg-white text-gray-800 lg:border-[70px] border-[#2D3748] lg:m-4">
        {/* Navigation */}
        <NavBarDB />

        {/* Main Content */}
        <main className="px-4 sm:px-5 md:px-6 py-6 sm:py-8 md:py-10 bg-[#F5F4ED]">
          {/* Welcome section with adaptive spacing and text sizes */}
          <section className="py-6 sm:py-10 md:py-15 px-3 sm:px-6 md:px-10 lg:px-20">
            <div className="grid gap-6 sm:gap-8 md:gap-10">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-black font-bold mb-2">
                  Welcome back!
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-md">
                  Manage your portfolios and create new ones here.
                </p>
              </div>
            </div>
          </section>

          {/* Portfolios Section with responsive spacing */}
          <section className="mt-8 sm:mt-12 md:mt-16 px-3 sm:px-6 md:px-10 lg:px-20">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-2xl md:text-3xl font-bold text-black mb-3 sm:mb-0">
                Your Portfolios
              </h2>
              
              {/* Could add filters or sorting options here, aligned right on larger screens */}
              <div className="hidden md:block">
                {/* Placeholder for future functionality */}
              </div>
            </div>

            {/* Empty state with responsive card styling */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="p-6 sm:p-10 md:p-16 text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-4">📂</div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 text-black">
                  No portfolios yet
                </h3>
                <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8 max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                  Create your first portfolio to showcase your skills and experience.
                  Choose from our professional templates to get started quickly.
                </p>
                
                {/* Responsive button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-black text-white text-sm sm:text-base rounded-md hover:bg-gray-800 transition-colors"
                >
                  Create Your First Portfolio
                </button>
              </div>
            </div>
            
            {/* Mobile-specific helpful hints section */}
            <div className="mt-8 bg-white rounded-xl p-5 border border-gray-100 shadow-sm block sm:hidden">
              <h4 className="font-medium text-lg mb-2">Quick Tips</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">✨</span>
                  <span>Pick templates designed for your specific industry</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📱</span>
                  <span>All portfolios are mobile-optimized</span>
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>

      <Footer />

      {/* Template Selection Modal */}
      <TemplateSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleTemplateSelect}
      />
    </div>
  );
}