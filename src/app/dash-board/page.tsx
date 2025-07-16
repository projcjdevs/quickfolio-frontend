"use client";

import Navbar from "@/components/NavBarLP";
import PortfolioDisplayBox from "@/components/PortfolioDisplayBox/page";
import React, { useState } from "react";

export default function DashboardPage() {
    const [boxes, setBoxes] = useState<string[]>([]);
    const [counter, setCounter] = useState(1);
    const [activeId, setActiveId] = useState<string | null>(null);


    const addNewBox = () => {
    const newId = `Portfolio${counter}`;
    setBoxes((prev) => [...prev, newId]);
    setCounter(counter + 1);
};

  return (
    <div className="min-h-screen bg-[#F5F4ED]">
      <Navbar />

      <div>
        <main className="px-6 pt-10 bg-[#F5F4ED]">
          <section className="px-9 py-10 font-sans">
            <h1 className="text-8xl text-black font-semibold px-5">Welcome back</h1>
            <h1 className="text-8xl text-black font-semibold px-5">*user*</h1>

            <div className="grid gap-1 md:grid-cols-2">

                <div className="px-6 py-10">
                <p className="text-2xl text-black font-semibold">Portfolio</p>
                <p className="text-2xl text-gray-500">
                    Click the button to add a new portfolio display box.
                </p>
                </div>

                {/* Button to add new box */}
                <div className="pt-10 pl-115 mb-6">
                <button
                    onClick={addNewBox}
                    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                >
                    + Add Portfolio 
                </button>
                </div>

            </div>

            {/* Render all the boxes */}
            <div className="px-10 grid gap-y-10 gap-x-4 md:grid-cols-3">
              {boxes.map((id) => (
                <PortfolioDisplayBox
                    key={id}
                    id={id} //can customize box id label here
                    isActive={id === activeId}
                    onActivate={() => setActiveId(id)}
                    onDelete={(deleteId) => {
                        setBoxes((prev) => prev.filter((boxId) => boxId !== deleteId));
                            if (deleteId === activeId) setActiveId(null);}}
                />
                ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
