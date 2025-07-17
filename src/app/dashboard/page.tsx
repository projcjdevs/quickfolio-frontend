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
      <div className="flex-1 font-sans bg-white text-gray-800 border-[70px] border-[#2D3748] m-4">
        {/* Navigation */}
        <NavBarDB />

        {/* Main Content */}
        <main className="px-6 py-10 bg-[#F5F4ED]">
          <section className="py-15 px-6 md:px-10 lg:px-20">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h1 className="text-5xl md:text-7xl text-black font-bold mb-2">Welcome back!</h1>
              </div>
            </div>
          </section>

          {/* Portfolios Section */}
          <section className="mt-16 px-6 md:px-10 lg:px-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h2 className="text-3xl font-bold text-black mb-4 md:mb-0">Your Portfolios</h2>
            </div>

            {/* Empty state with card styling */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="p-16 text-center">
                <div className="text-6xl mb-4">📂</div>
                <h3 className="text-xl font-semibold mb-3 text-black">
                  No portfolios yet
                </h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  Create your first portfolio to showcase your skills and experience.
                  Choose from our professional templates to get started quickly.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  Create Your First Portfolio
                </button>
              </div>
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