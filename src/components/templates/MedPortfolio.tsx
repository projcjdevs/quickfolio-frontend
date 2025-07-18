// src/components/templates/MedPortfolio.tsx
"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { FiMail, FiLinkedin } from "react-icons/fi";
import { FiBook, FiBriefcase, FiUserCheck, FiAward } from "react-icons/fi"; // Added FiAward
import { useEffect, useState, useRef } from "react"; // Added useRef
import { PortfolioData, DEFAULT_PROFILE } from "../types";

const DEFAULT_PARTICLE_COUNT = 0; // No particles for minimalist design

// Medical-themed default colors based on description
const DEFAULT_MEDICAL_COLORS = {
  bg: "#FFFFFF", // Explicitly white background
  text: "#000000", // Black for body text
  accent: "#043382", // Navy blue for separator and accents
  highlight: "#eaf4ff", // Updated to lighter blue for header
  dust: "#F3F4F6", // Subtle gray tint
  glow: "transparent", // No glow
};

// Main Component
export default function MedPortfolio({ data = {} as PortfolioData }) {
  const mergedData = {
    ...DEFAULT_PROFILE,
    ...(data || {}),
    contact: {
      ...DEFAULT_PROFILE.contact,
      ...(data?.contact || {}),
    },
    config: {
      colors: {
        ...DEFAULT_MEDICAL_COLORS,
        ...(data?.config?.colors || {}),
      },
      particleDensity: data?.config?.particleDensity || DEFAULT_PARTICLE_COUNT,
    },
    summary: data?.summary || "", // Use summary field
  };

  const COLORS = mergedData.config.colors;

  const controls = useAnimation();
  const [showContent, setShowContent] = useState(false);
  const [educationHeight, setEducationHeight] = useState(100); // Default height to ensure initial rendering
  const [experienceHeight, setExperienceHeight] = useState(100); // Default height to ensure initial rendering
  const educationRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      });
      setShowContent(true);
    };
    sequence();
  }, [controls]);

  useEffect(() => {
    if (educationRef.current) {
      setEducationHeight(educationRef.current.scrollHeight + 10); // Add 10px excess
    }
    if (experienceRef.current) {
      setExperienceHeight(experienceRef.current.scrollHeight + 10); // Add 10px excess
    }
  }, [mergedData.education, mergedData.experience]); // Recompute on data change

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Header Section */}
      <div className="w-full">
        <motion.div
          className="text-left py-0 px-6 flex justify-between items-start"
          style={{ backgroundColor: COLORS.highlight }} // Lighter blue header
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
        >
          <div>
            <motion.h1
              className="text-4xl font-bold tracking-tight mt-7 mb-0 pt-6"
              style={{ color: "#043382" }} // Navy blue for name
              whileHover={{
                textShadow: `0 0 4px #04338240`,
                transition: { duration: 0.3 },
              }}
            >
              {mergedData.name || "Mocha Pande"}
            </motion.h1>
            <motion.p
              className="text-lg mb-7"
              style={{ color: "#353535" }} // Dark gray for professional title
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.3 }}
            >
              {mergedData.title || "Registered Nurse"}
            </motion.p>
          </div>
          <div className="text-right">
            <div className="flex justify-end gap-2 mb-2 mt-17"> {/* Align items to the bottom and lower with the title */}
              {mergedData.contact.linkedin && (
                <a href={`https://linkedin.com/in/${mergedData.contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                  <div className="bg-[#043382] bg-gradient-to-br from-white/40 to-[#043382] text-white w-9 h-9 flex items-center justify-center rounded-lg"> {/* Larger square with gradient and rounded corners */}
                    <FiLinkedin size={20} color="#FFFFFF" />
                  </div>
                </a>
              )}
              {mergedData.contact.email && (
                <a href={`mailto:${mergedData.contact.email}`} target="_blank" rel="noopener noreferrer">
                  <div className="bg-[#043382] text-white w-9 h-9 flex items-center justify-center rounded-full"> {/* Larger circle */}
                    <FiMail size={20} color="#FFFFFF" />
                  </div>
                </a>
              )}
            </div>
            <span className="text-[13px] font-poppins block mt-1" style={{ color: "#353535" }}>
              {mergedData.contact.prc ? `PRC #${mergedData.contact.prc}` : ""}
            </span>
          </div>
        </motion.div>

        {/* Separator Line */}
        <div className="w-12/13 mx-auto border-t-3 border-solid" style={{ borderColor: "#043382" }} />
      </div>

      {/* Body Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 relative">
        <AnimatePresence>
          {showContent && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-[minmax(260px,1fr)_minmax(300px,2.5fr)] gap-8" // Adjusted widths
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Left Column: Professional Summary and Certifications */}
              <div>
                {/* Professional Summary */}
                {mergedData.title && (
                  <Section title="Professional Summary" icon={<FiUserCheck style={{ color: "#4d4d4f" }} />} accentColor="#4d4d4f">
                    <ContentItem accentColor="#4d4d4f">
                      <p className="text-sm leading-normal" style={{ color: "#4d4d4f" }}>
                        {mergedData.summary || "Add your professional summary here."}
                      </p>
                    </ContentItem>
                  </Section>
                )}

                {/* Certifications */}
                {mergedData.certifications && mergedData.certifications.length > 0 && (
                  <Section title="Certifications" icon={<FiAward style={{ color: "#4d4d4f" }} />} accentColor="#4d4d4f">
                    {mergedData.certifications.map((cert, i) => (
                      <ContentItem key={`cert-${i}`} accentColor="#4d4d4f">
                        <div className="flex flex-col">
                          <h3 className="text-lg font-medium" style={{ color: "#4d4d4f" }}>
                            {cert.name}
                          </h3>
                          <p className="text-sm" style={{ color: "#4d4d4f" }}>{cert.issuer}</p>
                          <p className="text-sm" style={{ color: "#4d4d4f" }}>{cert.date}</p>
                        </div>
                      </ContentItem>
                    ))}
                  </Section>
                )}
              </div>

              {/* Right Column: Education and Experience */}
              <div>
                {/* Education */}
                {mergedData.education && mergedData.education.length > 0 && (
                  <Section title="Education" icon={<FiBook style={{ color: "#4d4d4f", position: 'relative', zIndex: 1 }} />} accentColor="#4d4d4f" className="relative">
                    {mergedData.education.map((edu, i) => (
                      <ContentItem key={`edu-${i}`} accentColor="#4d4d4f" ref={mergedData.education && i === mergedData.education.length - 1 ? educationRef : null}>
                        <div className="flex flex-col">
                          <h3 className="text-lg font-medium leading-tight" style={{ color: "#4d4d4f" }}>
                            {edu.institution}
                          </h3>
                          <p className="text-sm font-semibold italic leading-relaxed" style={{ color: "#4d4d4f" }}>{edu.degree}</p>
                          <p className="text-sm" style={{ color: "#4d4d4f" }}>{edu.details}</p>
                        </div>
                      </ContentItem>
                    ))}
                    {/* Vertical Line under Education Icon */}
                    <div className="absolute w-px bg-[#608abf] z-0" style={{ left: "0.5rem", top: '2rem', height: `${educationHeight}px` }}>
                      <div className="absolute top-0 transform -translate-x-1/2 w-3 h-3 bg-[#608abf] rounded-full"></div>
                    </div>
                  </Section>
                )}

                {/* Experience */}
                {mergedData.experience && mergedData.experience.length > 0 && (
                  <Section title="Experience" icon={<FiBriefcase style={{ color: "#4d4d4f", position: 'relative', zIndex: 1 }} />} accentColor="#4d4d4f" className="relative">
                    {mergedData.experience.map((exp, i) => (
                      <ContentItem key={`exp-${i}`} accentColor="#4d4d4f" ref={mergedData.experience && i === mergedData.experience.length - 1 ? experienceRef : null}>
                        <div className="flex flex-col">
                          <h3 className="text-lg font-medium leading-tight" style={{ color: "#4d4d4f" }}>
                            {exp.role} at {exp.company}
                          </h3>
                            <p className="text-sm" style={{ color: "#4d4d4f" }}>{exp.duration}</p>
                          <ul className="list-disc pl-5 mt-2">
                            {exp.highlights.map((item, j) => (
                              <li key={j} className="text-sm" style={{ color: "#4d4d4f" }}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </ContentItem>
                    ))}
                    {/* Vertical Line under Experience Icon */}
                    <div className="absolute w-px bg-[#608abf] z-0" style={{ left: "0.5rem", top: '2rem', height: `${experienceHeight}px` }}>
                      <div className="absolute top-0 transform -translate-x-1/2 w-3 h-3 bg-[#608abf] rounded-full"></div>
                    </div>
                  </Section>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Reusable Components
function Section({ title, icon, children, accentColor, className }: { title: string; icon: React.ReactNode; children: React.ReactNode; accentColor: string; className?: string }) {
  return (
    <motion.section className={`mb-6 ${className}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center gap-2 mb-3">
        <div style={{ color: accentColor }}>{icon}</div>
        <h2 className="text-xl font-bold" style={{ color: accentColor }}>
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

function ContentItem({ children, icon, accentColor, ref }: { children: React.ReactNode; icon?: React.ReactNode; accentColor: string; ref?: React.Ref<HTMLDivElement> }) {
  return (
    <motion.div className="mb-4 pl-6" ref={ref} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="space-y-1">{children}</div>
    </motion.div>
  );
}