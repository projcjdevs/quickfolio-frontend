'use client';

import React from 'react';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useState } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/NavBarLP';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  // const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Feature cards data
  const featureCards = [
    {
      title: "Built for Professionals",
      description: "Clean, modern templates designed for every industry and career stage",
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "Always Up-to-Date",
      description: "Update your portfolio anytime and your card link always shows the latest version",
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Lightning Fast",
      description: "Optimized for mobile and desktop with instant loading times",
      icon: (
        <svg className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  // Step cards data with proper Motion 
  const stepCards = [
    {
      title: "Step 1\nCreate",
      description: "Pick a template and add your content—fast and easy.",
      image: "/images/landing-page/laying.png",
      position: "absolute -top-48 -right-6 z-10",
      motionProps: {
        animate: {
          y: [0, -6, 0],
          rotate: [0, -2, 2, 0],
        },
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }
      }
    },
    {
      title: "Step 2\nCustomize",
      description: "Edit colors, fonts, and layout to fit your brand perfectly.",
      image: "/images/landing-page/reading.png",
      position: "absolute -bottom-28 z-10",
      motionProps: {
        animate: {
          y: [0, -7, 0],
        },
        transition: {
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut" as const,
          repeatType: "reverse" as const
        }
      }
    },
    {
      title: "Step 3\nPublish",
      description: "Launch your website live in seconds—no code needed.",
      image: "/images/landing-page/swinging.png",
      position: "absolute -top-25 -right-18 z-10",
      motionProps: {
        animate: {
          y: [0, -3, 0],
          rotate: [0, 2, -2, 0],
        },
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut" as const
        }
      }
    }
  ];

  // Floating boxes with proper Motion 
  const floatingBoxes = [
    {
      className: "absolute top-68 right-18 w-48 h-24 bg-white rounded-xl shadow-md z-20",
      motionProps: {
        animate: { y: [0, -9, 0] },
        transition: { 
          duration: 3.5, 
          repeat: Infinity, 
          ease: "easeInOut" as const 
        }
      }
    },
    {
      className: "absolute top-10 -right-1 w-36 h-16 bg-white rounded-xl shadow-md z-20",
      motionProps: {
        animate: { y: [0, -7, 0] },
        transition: { 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" as const 
        }
      }
    },
    {
      className: "absolute top-30 right-110 w-44 h-22 bg-white rounded-xl shadow-md z-20",
      motionProps: {
        animate: { y: [0, -11, 0] },
        transition: { 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" as const 
        }
      }
    }
  ];

  return (
    <div className="bg-[#2D3748] min-h-screen flex flex-col">
      <div className="flex-1 font-sans bg-white text-gray-800 border-[70px] border-[#2D3748] m-4">
        {/* header placeholder yes oo tama */}
        <Navbar />

        {/* Top Intro Text & Image */}
        <main className="px-6 py-10 bg-[#F5F4ED]">
          <section className="py-15 px-35">
            <div className="grid gap-15 md:grid-cols-2">
              <div>
                <h1 className="text-7xl text-black font-bold"> One Page,  </h1>
                <h1 className="text-7xl text-black font-bold"> Infinite  </h1>
                <h1 className="text-7xl text-black font-bold"> Potential. </h1>
                <p className="text-2xl text-black max-w-sm">
                  Whether you're applying, networking, or just vibing — make sure your link feels like you.
                </p>
              </div>

              <div className="relative">
                {/* Main character (now behind the boxes) */}
                <motion.img
                  src="/images/landing-page/float.png"
                  alt="main pic"
                  className="w-100 h-100 outline-none ring-0 focus:outline-none focus:ring-0 relative z-0"
                  animate={{
                    y: [0, -4, 0],
                    rotate: [0, -3, 3, 0]
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "reverse"
                  }}
                />

                {/* Floating boxes */}
                {floatingBoxes.map((box, index) => (
                  <motion.div
                    key={index}
                    className={box.className}
                    {...box.motionProps}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Steps section */}
          <section className="px-40 py-20">
            <div className="grid gap-16 md:grid-cols-3">
              {stepCards.map((card, index) => (
                <div key={index} className="relative flex flex-col items-center">
                  <div className={card.position}>
                    <motion.img
                      src={card.image}
                      alt={card.title.split('\n')[1].toLowerCase()}
                      className="w-80 h-80 object-contain"
                      {...card.motionProps}
                    />
                  </div>
                  <div className="bg-white shadow-md px-6 pt-24 pb-8 w-full text-center border-gray-200 min-h-[350px]">
                    <h2 className="text-xl font-bold mb-2 whitespace-pre-line">{card.title}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Feature cards */}
          <div className="grid gap-8 md:grid-cols-3 bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-5xl mx-auto p-8 my-16">
            {featureCards.map((card, index) => (
              <a 
                key={index}
                href="#"
                className="group relative p-6 rounded-lg hover:bg-gray-50 transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  <div className="mb-4 p-3 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:scale-[1.02] transition-transform duration-300">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-center max-w-xs leading-relaxed group-hover:translate-y-0.5 transition-transform duration-300">
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