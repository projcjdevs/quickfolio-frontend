"use client";

import React from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBarLP";
import AuthButton from "@/components/AuthButton";
import { motion } from "framer-motion";

const App: React.FC = () => {
  // Feature cards data
  const featureCards = [
    {
      title: "Built for Professionals",
      description:
        "Clean, modern templates designed for every industry and career stage",
      icon: (
        <svg
          className="h-6 w-6 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      title: "Always Up-to-Date",
      description:
        "Update your portfolio anytime and your card link always shows the latest version",
      icon: (
        <svg
          className="h-6 w-6 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Lightning Fast",
      description:
        "Optimized for mobile and desktop with instant loading times",
      icon: (
        <svg
          className="h-6 w-6 text-gray-800"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
  ];

  // Step cards data with proper Motion
  const stepCards = [
    {
      title: "Create",
      description: "Pick a template and add your content—fast and easy.",
      image: "/images/landing-page/laying.png",
      motionProps: {
        animate: {
          y: [0, -6, 0],
          rotate: [0, -2, 2, 0],
        },
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      },
    },
    {
      title: "Customize",
      description:
        "Edit colors, fonts, and layout to fit your brand perfectly.",
      image: "/images/landing-page/reading.png",
      motionProps: {
        animate: {
          y: [0, -7, 0],
        },
        transition: {
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut" as const,
          repeatType: "reverse" as const,
        },
      },
    },
    {
      title: "Publish",
      description: "Launch your website live in seconds—no code needed.",
      image: "/images/landing-page/swinging.png",
      motionProps: {
        animate: {
          y: [0, -3, 0],
          rotate: [0, 2, -2, 0],
        },
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      },
    },
  ];

  // Updated floating boxes - positioned closer to the image without excessive overlap
  const floatingBoxes = [
    {
      className:
        "hidden xl:block absolute top-60 left-2 w-36 h-20 bg-white rounded-xl shadow-lg z-20",
      motionProps: {
        animate: { y: [0, -9, 0] },
        transition: {
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      },
    },
    {
      className:
        "hidden xl:block absolute top-16 right-3 w-48 h-24 bg-white rounded-xl shadow-lg z-20",
      motionProps: {
        animate: { y: [0, -7, 0] },
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      },
    },
    {
      className:
        "hidden xl:block absolute bottom-24 right-20 w-40 h-24 bg-white rounded-xl shadow-lg z-20",
      motionProps: {
        animate: { y: [0, -11, 0] },
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      },
    },
  ];

  return (
    <div className="bg-[#2D3748] min-h-screen flex flex-col">
      <div className="flex-1 font-sans bg-white text-gray-800 lg:border-[70px] border-[#2D3748] lg:m-4">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section with Text and Floating Image */}
        <main className="px-4 lg:px-6 py-10 bg-[#F5F4ED]">
          <section className="py-8 lg:py-15 px-4 lg:px-35">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left side - Hero text */}
              <div className="text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black font-bold">
                  One Page,
                </h1>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black font-bold">
                  Infinite
                </h1>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black font-bold mb-6">
                  Potential.
                </h1>
                <p className="text-lg md:text-xl lg:text-xl xl:text-2xl text-black max-w-lg mb-6">
                  Whether you're applying, networking, or just vibing — make sure
                  your link feels like you.
                </p>
                
                {/* Mobile CTA - only visible on mobile */}
                <div className="flex justify-center lg:hidden mt-8">
                  <AuthButton variant="body" className="w-full sm:w-auto" />
                </div>

                {/* Desktop CTA - hidden on mobile */}
                <div className="hidden lg:flex mt-8">
                  <AuthButton variant="body" className="w-full sm:w-auto" />
                </div>
              </div>

              {/* Right side - Floating Image Section (hidden on tablet and below) */}
              <div className="hidden lg:block relative w-full h-[400px] xl:h-[500px] 2xl:h-[600px]">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Main floating image - SMALLER size with 85% height */}
                  <motion.img
                    src="/images/landing-page/float.png"
                    alt="main pic"
                    className="h-[85%] w-auto object-contain z-10"
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, -1, 1, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatType: "reverse",
                    }}
                  />

                  {/* Floating boxes - positioned relative to the container */}
                  {floatingBoxes.map((box, index) => (
                    <motion.div
                      key={index}
                      className={box.className}
                      {...box.motionProps}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Steps section - adjusted for tablet */}
          <section className="px-4 md:px-8 lg:px-20 xl:px-40 py-10 lg:py-20">
            <div className="grid gap-8 md:gap-10 lg:gap-16 md:grid-cols-3">
              {stepCards.map((card, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                >
                  <div className="bg-white shadow-md px-6 pb-8 w-full text-center border border-gray-200 rounded-lg overflow-hidden relative min-h-[350px] md:min-h-[380px] lg:min-h-[400px] xl:min-h-[450px]">
                    {/* Doodle image inside the card - made larger */}
                    <div className="h-40 md:h-48 lg:h-56 xl:h-64 flex items-center justify-center -mt-2 mb-6 relative">
                      <motion.img
                        src={card.image}
                        alt={card.title}
                        className="w-36 h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-56 xl:h-56 object-contain"
                        {...card.motionProps}
                      />
                    </div>

                    <h2 className="text-xl lg:text-xl xl:text-2xl font-bold mb-4 whitespace-pre-line">
                      {card.title}
                    </h2>
                    <p className="text-gray-600 text-base leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Feature cards - adjusted for tablet */}
          <div className="grid gap-6 md:gap-6 lg:gap-8 md:grid-cols-3 bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-4xl lg:max-w-5xl mx-auto p-4 md:p-6 lg:p-8 my-8 lg:my-16">
            {featureCards.map((card, index) => (
              <a
                key={index}
                href="#"
                className="group relative p-4 lg:p-6 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-4 p-3 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-lg lg:text-xl font-medium text-gray-900 mb-2 group-hover:scale-[1.02] transition-transform duration-300">
                    {card.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 text-center max-w-xs leading-relaxed group-hover:translate-y-0.5 transition-transform duration-300">
                    {card.description}
                  </p>
                  <div className="absolute bottom-0 left-1/2 h-[2px] w-0 bg-gray-800 transform -translate-x-1/2 group-hover:w-[calc(100%-3rem)] transition-all duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]" />
                </div>
              </a>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default App;