// src/components/templates/MedPortfolio.tsx
"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { FiMail, FiLinkedin } from "react-icons/fi";
import { FiBook, FiBriefcase, FiUserCheck, FiAward } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";
import { PortfolioData, DEFAULT_PROFILE } from "../types";

const DEFAULT_PARTICLE_COUNT = 0;

// Medical-themed default colors based on description
const DEFAULT_MEDICAL_COLORS = {
  bg: "#FFFFFF",
  text: "#000000",
  accent: "#043382",
  highlight: "#eaf4ff",
  dust: "#F3F4F6",
  glow: "transparent",
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
    summary: data?.summary || "",
  };

  const COLORS = mergedData.config.colors;

  const controls = useAnimation();
  const [showContent, setShowContent] = useState(false);
  const [educationHeights, setEducationHeights] = useState<number[]>([100]);
  const [experienceHeights, setExperienceHeights] = useState<number[]>([100]);
  const educationRefs = useRef<(HTMLDivElement | null)[]>([]);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    // Update heights for education items
    if (mergedData.education && mergedData.education.length > 0) {
      const newHeights = mergedData.education.map((_, i) => {
        return educationRefs.current[i]?.scrollHeight || 100;
      });
      setEducationHeights(newHeights.map(h => h + 10));
    }
    // Update heights for experience items
    if (mergedData.experience && mergedData.experience.length > 0) {
      const newHeights = mergedData.experience.map((_, i) => {
        return experienceRefs.current[i]?.scrollHeight || 100;
      });
      setExperienceHeights(newHeights.map(h => h + 10));
    }
  }, [mergedData.education, mergedData.experience]);

  return (
    <div className="bg-white flex flex-col min-h-screen font-sans">
      {/* Header Section */}
      <div className="w-full">
        <motion.div
          className="text-left py-0 px-6 flex justify-between items-start"
          style={{ backgroundColor: COLORS.highlight }}
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
        >
          <div>
            <motion.h1
              className="text-4xl font-bold tracking-tight mt-7 mb-0 pt-6"
              style={{ color: "#043382" }}
              whileHover={{
                textShadow: `0 0 4px #04338240`,
                transition: { duration: 0.3 },
              }}
            >
              {mergedData.name || " "}
            </motion.h1>
            <motion.p
              className="text-lg mb-7"
              style={{ color: "#353535" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.3 }}
            >
              {mergedData.title || " "}
            </motion.p>
          </div>
          <div className="text-right">
            <div className="flex justify-end gap-2 mb-2 mt-17">
              {mergedData.contact.linkedin && (
                <a href={`https://linkedin.com/in/${mergedData.contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                  <div className="bg-[#043382] bg-gradient-to-br from-white/40 to-[#043382] text-white w-9 h-9 flex items-center justify-center rounded-lg">
                    <FiLinkedin size={20} color="#FFFFFF" />
                  </div>
                </a>
              )}
              {mergedData.contact.email && (
                <a href={`mailto:${mergedData.contact.email}`} target="_blank" rel="noopener noreferrer">
                  <div className="bg-[#043382] text-white w-9 h-9 flex items-center justify-center rounded-full">
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
      <div className="max-w-4xl mx-auto px-6 py-8 flex-1 relative">
        <AnimatePresence>
          {showContent && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-[minmax(260px,1fr)_minmax(300px,2.5fr)] gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Left Column: Professional Summary, Certifications, and Leadership */}
              <div>
                {/* Professional Summary */}
                <Section title="Professional Summary" icon={<FiUserCheck style={{ color: "#4d4d4f" }} />} accentColor="#4d4d4f">
                  <ContentItem accentColor="#4d4d4f">
                    <p className="text-sm leading-normal" style={{ color: "#4d4d4f" }}>
                      {mergedData.summary || "Add your professional summary here."}
                    </p>
                  </ContentItem>
                </Section>

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

                {/* Leadership (only for medPortfolio) */}
                {mergedData.leadership && mergedData.leadership.length > 0 && (
                  <Section title="Leadership" icon={<FiAward style={{ color: "#4d4d4f" }} />} accentColor="#4d4d4f">
                    {mergedData.leadership.map((lead, i) => (
                      <ContentItem key={`lead-${i}`} accentColor="#4d4d4f">
                        <div className="flex flex-col">
                          <h3 className="text-lg font-medium leading-tight" style={{ color: "#4d4d4f" }}>
                            {lead.role} at {lead.organization}
                          </h3>
                          <p className="text-sm" style={{ color: "#4d4d4f" }}>{lead.duration}</p>
                          {lead.highlights && lead.highlights.length > 0 && (
                            <ul className="list-disc pl-5 mt-2">
                              {lead.highlights.map((highlight, j) => (
                                <li key={j} className="text-sm" style={{ color: "#4d4d4f" }}>{highlight}</li>
                              ))}
                            </ul>
                          )}
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
                      <ContentItem
                        key={`edu-${i}`}
                        accentColor="#4d4d4f"
                        ref={el => { educationRefs.current[i] = el; }}
                      >
                        <div className="flex flex-col">
                          <h3 className="text-lg font-medium leading-tight" style={{ color: "#4d4d4f" }}>
                            {edu.institution}
                          </h3>
                          <p className="text-sm font-semibold italic leading-relaxed" style={{ color: "#4d4d4f" }}>{edu.degree}</p>
                          <p className="text-sm" style={{ color: "#4d4d4f" }}>{edu.details}</p>
                        </div>
                      </ContentItem>
                    ))}
                    {mergedData.education.map((_, i) => (
                      <div
                        key={`line-edu-${i}`}
                        className="absolute w-px bg-[#608abf] z-0"
                        style={{
                          left: "0.5rem",
                          top: i === 0 ? '2rem' : `calc(2rem + ${educationHeights.slice(0, i).reduce((sum, h) => sum + h, 0)}px)`,
                          height: `${educationHeights[i] || 100}px`,
                        }}
                      >
                        <div
                          className="absolute top-0 transform -translate-x-1/2 w-3 h-3 bg-[#608abf] rounded-full"
                          style={{ top: '-4px' }}
                        />
                      </div>
                    ))}
                  </Section>
                )}

                {/* Experience */}
                {mergedData.experience && mergedData.experience.length > 0 && (
                  <Section title="Experience" icon={<FiBriefcase style={{ color: "#4d4d4f", position: 'relative', zIndex: 1 }} />} accentColor="#4d4d4f" className="relative">
                    {mergedData.experience.map((exp, i) => (
                      <ContentItem
                        key={`exp-${i}`}
                        accentColor="#4d4d4f"
                        ref={el => { experienceRefs.current[i] = el; }}
                      >
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
                    {mergedData.experience.map((_, i) => (
                      <div
                        key={`line-exp-${i}`}
                        className="absolute w-px bg-[#608abf] z-0"
                        style={{
                          left: "0.5rem",
                          top: i === 0 ? '2rem' : `calc(2rem + ${experienceHeights.slice(0, i).reduce((sum, h) => sum + h, 0)}px)`,
                          height: `${experienceHeights[i] || 100}px`,
                        }}
                      >
                        <div
                          className="absolute top-0 transform -translate-x-1/2 w-3 h-3 bg-[#608abf] rounded-full"
                          style={{ top: '-4px' }}
                        />
                      </div>
                    ))}
                  </Section>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Section */}
      <div className="w-full">
        <div className="w-12/13 mx-auto border-t-3 border-solid" style={{ borderColor: "#043382" }} />
        <div style={{ backgroundColor: COLORS.highlight, height: '60px' }} />
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