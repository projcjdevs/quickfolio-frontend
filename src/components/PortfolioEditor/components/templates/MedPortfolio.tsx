"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLinkedin, FiBook, FiBriefcase, FiUserCheck, FiAward } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";
import { PortfolioData, DEFAULT_PROFILE, generateFullColorScheme } from "@/components/PortfolioEditor/types";

const DEFAULT_PARTICLE_COUNT = 0;

export default function MedPortfolio({ data = DEFAULT_PROFILE }: { data?: PortfolioData }) {
  const [showContent, setShowContent] = useState(false);
  const educationRefs = useRef<(HTMLDivElement | null)[]>([]);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [educationHeights, setEducationHeights] = useState<number[]>([]);
  const [experienceHeights, setExperienceHeights] = useState<number[]>([]);

  // Generate full color scheme including derived colors
  const fullColorScheme = generateFullColorScheme(
    data.config?.colors || {}, 
    data.config?.template || 'medPortfolio'
  );

  const mergedData = {
    ...DEFAULT_PROFILE,
    ...data,
    contact: {
      ...DEFAULT_PROFILE.contact,
      ...(data?.contact || {}),
    },
    config: {
      ...DEFAULT_PROFILE.config,
      ...(data?.config || {}),
      particleDensity: data?.config?.particleDensity || DEFAULT_PARTICLE_COUNT,
      template: data?.config?.template || "medPortfolio",
    },
    summary: data?.summary || "",
  };

  // Use the full color scheme including derived colors
  const COLORS = fullColorScheme;

  useEffect(() => {
    setShowContent(true);
    
    // Calculate heights for education items
    const eduHeights = educationRefs.current
      .filter(Boolean)
      .map(el => el?.clientHeight || 100);
    setEducationHeights(eduHeights);

    // Calculate heights for experience items
    const expHeights = experienceRefs.current
      .filter(Boolean)
      .map(el => el?.clientHeight || 100);
    setExperienceHeights(expHeights);
  }, [data]);

  return (
    <div className="flex flex-col min-h-screen font-sans overflow-x-hidden" style={{ backgroundColor: COLORS.background }}>
      {/* header */}
      <div className="w-full">
        <motion.div
          className="text-left py-0 px-6 flex justify-between items-start break-words"
          style={{ backgroundColor: COLORS.highlight }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.h1
              className="text-4xl font-bold tracking-tight mt-7 mb-0 pt-6 break-words"
              style={{ color: COLORS.primary }}
              whileHover={{
                textShadow: `0 0 4px ${COLORS.secondary}40`,
                transition: { duration: 0.3 },
              }}
            >
              {mergedData.name || " "}
            </motion.h1>
            <motion.p
              className="text-lg mb-7 break-words"
              style={{ color: COLORS.secondary }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.3 }}
            >
              {mergedData.title || " "}
            </motion.p>
          </div>
          <div className="text-right">
            <div className="flex justify-end gap-2 mb-2 mt-17 break-words">
              {mergedData.contact.linkedin && (
                <a href={`https://linkedin.com/in/${mergedData.contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                  <div className="text-white w-9 h-9 flex items-center justify-center rounded-lg" style={{ 
                    backgroundColor: COLORS.background,
                    background: `linear-gradient(to bottom right, rgba(255,255,255,0.4), ${COLORS.secondary})`
                  }}>
                    <FiLinkedin size={20} color="#FFFFFF" />
                  </div>
                </a>
              )}
              {mergedData.contact.email && (
                <a href={`mailto:${mergedData.contact.email}`} target="_blank" rel="noopener noreferrer">
                  <div className="text-white w-9 h-9 flex items-center justify-center rounded-full" style={{ backgroundColor: COLORS.secondary }}>
                    <FiMail size={20} color="#FFFFFF" />
                  </div>
                </a>
              )}
            </div>
            <span className="text-[13px] font-poppins block mt-1 break-words" style={{ color: COLORS.text }}>
              {mergedData.contact.prc ? `PRC #${mergedData.contact.prc}` : ""}
            </span>
          </div>
        </motion.div>

        {/* line */}
        <div className="w-12/13 mx-auto border-t-3 border-solid break-words" style={{ borderColor: COLORS.primary }} />
      </div>

      {/* body */}
      <div className="max-w-full mx-auto px-6 py-8 flex-1 relative overflow-x-hidden">
        <AnimatePresence>
          {showContent && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 break-words"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* left column */}
              <div>
                {/* prof summary */}
                <Section title="Professional Summary" icon={<FiUserCheck style={{ color: COLORS.secondary }} />}>
                  <ContentItem>
                    <p className="text-sm leading-normal break-words" style={{ color: COLORS.text }}>
                      {mergedData.summary || "Add your professional summary here."}
                    </p>
                  </ContentItem>
                </Section>

                {/* certification - exclusive */}
                {mergedData.config?.template === "medPortfolio" && mergedData.certifications && mergedData.certifications.length > 0 && (
                  <Section title="Certifications" icon={<FiAward style={{ color: COLORS.secondary }} />}>
                    {mergedData.certifications.map((cert, i) => (
                      <ContentItem key={`cert-${i}`}>
                        <div className="flex flex-col break-words">
                          <h3 className="text-lg font-medium break-words" style={{ color: COLORS.text }}>
                            {cert.name}
                          </h3>
                          <p className="text-sm break-words" style={{ color: COLORS.text }}>{cert.issuer}</p>
                          <p className="text-sm break-words" style={{ color: COLORS.text }}>{cert.date}</p>
                        </div>
                      </ContentItem>
                    ))}
                  </Section>
                )}

                {/* leadership */}
{mergedData.leadership && mergedData.leadership.length > 0 && (
  <Section title="Leadership" icon={<FiAward style={{ color: COLORS.secondary }} />}>
    {mergedData.leadership.map((lead, i) => (
      <ContentItem key={`lead-${i}`}>
        <div className="flex flex-col break-words">
          <h3 className="text-lg font-medium leading-tight break-words" style={{ color: COLORS.text }}>
            {lead.role} at {lead.organization}
          </h3>
          <p className="text-sm break-words" style={{ color: COLORS.text }}>{lead.duration}</p>
          {lead.highlights && lead.highlights.length > 0 && (
            <ul className="pl-5 mt-2 break-words" style={{ listStyleType: 'none' }}>
              {lead.highlights.map((highlight, j) => (
                <li key={j} className="text-sm break-words flex items-start" style={{ color: COLORS.text }}>
                  <span className="mr-2" style={{ color: COLORS.primary }}>•</span>
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </div>
      </ContentItem>
    ))}
  </Section>
)}
              </div>

              {/* right column */}
              <div>
                {/* education */}
                {mergedData.education && mergedData.education.length > 0 && (
                  <Section title="Education" icon={<FiBook style={{ color: COLORS.secondary, position: 'relative', zIndex: 1 }} />} className="relative">
                    {mergedData.education.map((edu, i) => (
                      <ContentItem
                        key={`edu-${i}`}
                        ref={el => { educationRefs.current[i] = el; }}
                      >
                        <div className="flex flex-col break-words">
                          <h3 className="text-lg font-medium leading-tight break-words" style={{ color: COLORS.text }}>
                            {edu.institution}
                          </h3>
                          <p className="text-sm font-semibold italic leading-relaxed break-words" style={{ color: COLORS.text }}>{edu.degree}</p>
                          <p className="text-sm break-words" style={{ color: COLORS.text }}>{edu.details}</p>
                        </div>
                      </ContentItem>
                    ))}
                    {mergedData.education.map((_, i) => (
                      <div
                        key={`line-edu-${i}`}
                        className="absolute w-px z-0 break-words"
                        style={{
                          left: "0.5rem",
                          top: i === 0 ? '2rem' : `calc(2rem + ${educationHeights.slice(0, i).reduce((sum, h) => sum + h, 0)}px)`,
                          height: `${educationHeights[i] || 100}px`,
                          backgroundColor: COLORS.primary,
                        }}
                      >
                        <div
                          className="absolute top-0 transform -translate-x-1/2 w-3 h-3 rounded-full break-words"
                          style={{ 
                            top: '-4px',
                            backgroundColor: COLORS.primary
                          }}
                        />
                      </div>
                    ))}
                  </Section>
                )}

                {mergedData.experience && mergedData.experience.length > 0 && (
  <Section title="Experience" icon={<FiBriefcase style={{ color: COLORS.secondary, position: 'relative', zIndex: 1 }} />} className="relative">
    {mergedData.experience.map((exp, i) => (
      <ContentItem
        key={`exp-${i}`}
        ref={el => { experienceRefs.current[i] = el; }}
      >
        <div className="flex flex-col break-words">
          <h3 className="text-lg font-medium leading-tight break-words" style={{ color: COLORS.text }}>
            {exp.role} at {exp.company}
          </h3>
          <p className="text-sm break-words" style={{ color: COLORS.text }}>{exp.duration}</p>
          <ul className="pl-5 mt-2 break-words" style={{ listStyleType: 'none' }}>
            {exp.highlights.map((item, j) => (
              <li key={j} className="text-sm break-words flex items-start" style={{ color: COLORS.text }}>
                <span className="mr-2" style={{ color: COLORS.primary }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </ContentItem>
    ))}
                    {mergedData.experience.map((_, i) => (
                      <div
                        key={`line-exp-${i}`}
                        className="absolute w-px z-0 break-words"
                        style={{
                          left: "0.5rem",
                          top: i === 0 ? '2rem' : `calc(2rem + ${experienceHeights.slice(0, i).reduce((sum, h) => sum + h, 0)}px)`,
                          height: `${experienceHeights[i] || 100}px`,
                          backgroundColor: COLORS.primary,
                        }}
                      >
                        <div
                          className="absolute top-0 transform -translate-x-1/2 w-3 h-3 rounded-full break-words"
                          style={{ 
                            top: '-4px',
                            backgroundColor: COLORS.primary
                          }}
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

      {/* footer */}
      <div className="w-full">
        <div className="w-12/13 mx-auto border-t-3 border-solid break-words" style={{ borderColor: COLORS.primary }} />
        <div style={{ backgroundColor: COLORS.highlight, height: '60px' }} />
      </div>
    </div>
  );
}

function Section({ title, icon, children, className }: { title: string; icon: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <motion.section className={`mb-6 ${className} break-words`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center gap-2 mb-3 break-words">
        {icon}
        <h2 className="text-xl font-bold break-words" style={{ color: 'inherit' }}>
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

function ContentItem({ children, ref }: { children: React.ReactNode; ref?: React.Ref<HTMLDivElement> }) {
  return (
    <motion.div className="mb-4 pl-6 break-words" ref={ref} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="space-y-1 break-words">{children}</div>
    </motion.div>
  );
}