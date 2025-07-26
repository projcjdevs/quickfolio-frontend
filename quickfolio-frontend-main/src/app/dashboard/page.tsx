"use client";

import NavBarDB from "@/components/NavBarDB";
import TemplateSelectionModal from "@/components/TemplateSelectionModal";
import ProtectedRoute from "@/components/ProtectedRoute";
import PortfolioGrid from "@/components/PortfolioGrid";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { user, userLoading } = useAuth();

  const handleTemplateSelect = (templateId: string) => {
    // Close the modal
    setIsModalOpen(false);

    // Navigate to the editor with the selected template
    router.push(`/edit?template=${templateId}`);
  };

  return (
    <ProtectedRoute>
      <div className="bg-[#2D3748] min-h-screen flex flex-col">
        <div className="flex-1 font-sans bg-white text-gray-800 border-[70px] border-[#2D3748] m-4">
          {/* Navigation */}
          <NavBarDB />

          {/* Main Content */}
          <main className="px-6 py-10 bg-[#F5F4ED]">
            <section className="py-15 px-6 md:px-10 lg:px-20">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                {userLoading ? (
                  <h1 className="text-5xl md:text-7xl text-black font-bold mb-2">
                    Welcome back!
                  </h1>
                ) : (
                  <h1 className="text-5xl md:text-7xl text-black font-bold mb-2">
                    Welcome back{user?.username ? `, ${user.username}` : ''}!
                  </h1>
                )}
              </div>
            </div>
          </section>

          {/* Portfolio Management Section */}
          <section className="mt-16 px-6 md:px-10 lg:px-20">
            <PortfolioGrid onTemplateSelect={handleTemplateSelect} />
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
    </ProtectedRoute>
  );
}