"use client";

import NavBarDB from "@/components/NavBarDB";
import TemplateSelectionModal from "@/components/TemplateSelectionModal";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
    <div className="min-h-screen bg-[#F5F4ED]">
      <NavBarDB />

      <div>
        <main className="px-6 pt-10 bg-[#F5F4ED]">
          <section className="px-9 py-10 font-sans">
            <h1 className="text-8xl text-black font-semibold px-5">
              Welcome back
            </h1>
            <h1 className="text-8xl text-black font-semibold px-5">*user*</h1>

            <div className="grid gap-1 md:grid-cols-2">
              <div className="px-6 py-10">
                <p className="text-2xl text-black font-semibold">Portfolio</p>
                <p className="text-2xl text-gray-500">
                  Create your own professional portfolio using our templates.
                </p>
              </div>
            </div>

            {/* Recent Portfolios Section */}
            <div className="px-5 mt-10">
              <h2 className="text-2xl font-semibold mb-6">Your Portfolios</h2>

              {/* Empty state */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-12 text-center">
                  <div className="text-4xl mb-3">📂</div>
                  <h3 className="text-lg font-medium mb-2">
                    No portfolios yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Create your first portfolio to see it here
                  </p>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
                  >
                    Create Portfolio
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Template Selection Modal */}
      <TemplateSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleTemplateSelect}
      />
    </div>
  );
}
