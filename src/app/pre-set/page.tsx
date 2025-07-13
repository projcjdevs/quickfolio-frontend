"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { FiMail, FiGithub, FiLinkedin, FiAward, FiBriefcase, FiBook } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function CosmicGlowPortfolio() {
  // ===== COLORS & THEME ===== //
  const COLORS = {
    bg: "#0a0a0a",
    text: "#e5e5e5",
    accent: "#facc15",
    highlight: "#3b82f6",
    nebula: "#7c3aed",
    dust: "#facc1560",
    glow: "#b03aff70"   
  };

  // ===== ANIMATION CONTROLS ===== //
  const controls = useAnimation();
  const [showContent, setShowContent] = useState(false);

  // ===== DYNAMIC COSMIC PARTICLES ===== //
  const particles = Array.from({ length: 50 }).map((_, i) => {
    const isHighlight = Math.random() > 0.7; // 30% bright stars
    return {
      id: i,
      size: isHighlight ? Math.random() * 4 + 3 : Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: isHighlight ? Math.random() * 0.6 + 0.4 : Math.random() * 0.2 + 0.05,
      duration: Math.random() * 10 + 5, // Faster overall duration
      delay: Math.random() * 2, // Shorter delay
      blur: isHighlight ? 0 : Math.random() * 2 + 1,
      speed: Math.random() * 1.5 + 0.5 // Faster speed multiplier
    };
  });

  // ===== PROFILE DATA ===== //
  const PROFILE = {
    name: "ALEX RIVERA",
    title: "SENIOR SOFTWARE ENGINEER",
    education: [
      {
        icon: <FiBook className="text-xl" />,
        institution: "Stanford University",
        degree: "B.Sc Computer Science",
        details: "Stanford, CA | 2016 - 2020 | GPA: 3.8/4.0"
      }
    ],
    experience: [
      {
        icon: <FiBriefcase className="text-xl" />,
        role: "Lead Developer",
        company: "TechSolutions Inc.",
        duration: "2021 - Present",
        highlights: [
          "Built 15+ production applications with React/Node",
          "Improved system performance by 40% through optimization"
        ]
      }
    ],
    leadership: [
      {
        icon: <FiAward className="text-xl" />,
        role: "Tech Lead",
        organization: "Open Source Community",
        duration: "2020 - Present",
        highlights: [
          "Organized 3 annual hackathons with 500+ participants"
        ]
      }
    ],
    contact: {
      email: "alex@cosmic.dev",
      github: "alex-cosmic",
      linkedin: "alex-senior"
    }
  };

  // ===== ANIMATION SEQUENCE ===== //
  useEffect(() => {
    const sequence = async () => {
      await controls.start({ 
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 }
      });

      await controls.start({
        scale: 0.95,
        transition: { 
          duration: 0.8,
          ease: "easeOut"
        }
      });

      setShowContent(true);
    };

    sequence();
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-y-auto" style={{ backgroundColor: COLORS.bg }}>
      {/* ===== COSMIC BACKGROUND WITH FASTER PARTICLES ===== */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Central Glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '60vw',
            height: '60vh',
            background: `radial-gradient(ellipse at center, ${COLORS.glow} 0%, transparent 80%)`,
            filter: 'blur(40px)'
          }}
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />

        {/* Faster Moving & Blinking Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              backgroundColor: COLORS.dust,
              filter: `blur(${particle.blur}px)`,
              boxShadow: particle.opacity > 0.3 ? `0 0 ${particle.size}px ${particle.size/3}px rgba(255,255,255,0.2)` : 'none'
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100 * particle.speed],
              y: [0, (Math.random() - 0.5) * 50 * particle.speed],
              opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* ===== MAIN CONTENT CONTAINER ===== */}
      <div className="w-full max-w-3xl mx-auto px-6 py-12">
        {/* Name Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
        >
          <h1 
            className="text-4xl md:text-5xl font-bold tracking-tight mb-2"
            style={{ color: COLORS.text }}
          >
            {PROFILE.name.split(' ')[0]}
            <span style={{ color: COLORS.accent }}> {PROFILE.name.split(' ')[1]}</span>
          </h1>
          <motion.p
            className="text-lg md:text-xl tracking-wider"
            style={{ color: COLORS.accent }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {PROFILE.title}
          </motion.p>
        </motion.div>

        {/* Content Sections */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              {/* Education */}
              <Section title="EDUCATION" icon={<FiBook />}>
                {PROFILE.education.map((edu, i) => (
                  <ContentItem key={i} icon={edu.icon}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold" style={{ color: COLORS.text }}>
                          {edu.institution}
                        </h3>
                        <p style={{ color: COLORS.accent }}>{edu.degree}</p>
                      </div>
                      <p style={{ color: COLORS.text + "aa" }}>{edu.details}</p>
                    </div>
                  </ContentItem>
                ))}
              </Section>

              {/* Experience */}
              <Section title="EXPERIENCE" icon={<FiBriefcase />}>
                {PROFILE.experience.map((exp, i) => (
                  <ContentItem key={i} icon={exp.icon}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold" style={{ color: COLORS.text }}>
                          {exp.role}
                        </h3>
                        <p style={{ color: COLORS.accent }}>{exp.company}</p>
                      </div>
                      <p style={{ color: COLORS.text + "aa" }}>{exp.duration}</p>
                    </div>
                    <ul className="space-y-3 pl-6">
                      {exp.highlights.map((item, j) => (
                        <motion.li 
                          key={j}
                          className="relative"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * j + 0.3 }}
                        >
                          <div 
                            className="absolute left-0 top-2 w-2 h-2 rounded-full"
                            style={{ backgroundColor: COLORS.highlight }}
                          />
                          <p style={{ color: COLORS.text }} className="ml-4">{item}</p>
                        </motion.li>
                      ))}
                    </ul>
                  </ContentItem>
                ))}
              </Section>

              {/* Leadership */}
              <Section title="LEADERSHIP" icon={<FiAward />}>
                {PROFILE.leadership.map((lead, i) => (
                  <ContentItem key={i} icon={lead.icon}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold" style={{ color: COLORS.text }}>
                          {lead.role}
                        </h3>
                        <p style={{ color: COLORS.accent }}>{lead.organization}</p>
                      </div>
                      <p style={{ color: COLORS.text + "aa" }}>{lead.duration}</p>
                    </div>
                    <ul className="space-y-3 pl-6">
                      {lead.highlights.map((item, j) => (
                        <motion.li 
                          key={j}
                          className="relative"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * j + 0.3 }}
                        >
                          <div 
                            className="absolute left-0 top-2 w-2 h-2 rounded-full"
                            style={{ backgroundColor: COLORS.highlight }}
                          />
                          <p style={{ color: COLORS.text }} className="ml-4">{item}</p>
                        </motion.li>
                      ))}
                    </ul>
                  </ContentItem>
                ))}
              </Section>

              {/* Contact */}
              <motion.div 
                className="mt-20 pt-10 border-t"
                style={{ borderColor: COLORS.text + "20" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex flex-wrap justify-center gap-6">
                  <ContactItem 
                    icon={<FiMail />} 
                    text="EMAIL" 
                    href={`mailto:${PROFILE.contact.email}`} 
                    color={COLORS.highlight}
                  />
                  <ContactItem 
                    icon={<FiGithub />} 
                    text="GITHUB" 
                    href={`https://github.com/${PROFILE.contact.github}`} 
                    color={COLORS.text}
                  />
                  <ContactItem 
                    icon={<FiLinkedin />} 
                    text="LINKEDIN" 
                    href={`https://linkedin.com/in/${PROFILE.contact.linkedin}`} 
                    color={COLORS.text}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ===== REUSABLE COMPONENTS ===== //

function Section({ 
  title, 
  icon,
  children 
}: { 
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode 
}) {
  return (
    <motion.section 
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div style={{ color: "#facc15" }}>{icon}</div>
        <h2 
          className="text-2xl font-bold tracking-wider"
          style={{ color: "#facc15" }}
        >
          {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

function ContentItem({ 
  children,
  icon
}: { 
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <motion.div
      className="mb-12 pl-12 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div 
        className="absolute left-0 top-0 p-2 rounded-full"
        style={{ 
          backgroundColor: "#facc1520",
          color: "#facc15"
        }}
      >
        {icon}
      </div>
      <div className="space-y-2">
        {children}
      </div>
    </motion.div>
  );
}

function ContactItem({ icon, text, href, color }: { 
  icon: React.ReactNode; 
  text: string; 
  href: string; 
  color: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-3"
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
        style={{ 
          backgroundColor: color + "20",
          color: color,
          border: `1px solid ${color}`
        }}
        whileHover={{ 
          backgroundColor: color + "40",
          scale: 1.1
        }}
      >
        {icon}
      </motion.div>
      <span 
        className="text-sm tracking-widest"
        style={{ color: "#e5e5e5" }}
      >
        {text}
      </span>
    </motion.a>
  );
}