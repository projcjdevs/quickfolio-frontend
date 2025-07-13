"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { FiMail, FiGithub, FiLinkedin, FiAward, FiBriefcase, FiBook } from "react-icons/fi";
import { useEffect, useState } from "react";

interface PortfolioData {
    name: string;
    title: string;
    education?: EducationItem[];
    experience?: ExperienceItem[];
    leadership?: LeadershipItem[];
    contact: ContactInfo;
    config?: {
    colors?: Partial<ColorScheme>;
    particleDensity?: number;
    };
}

interface EducationItem {
    institution: string;
    degree: string;
    details: string;
    icon?: React.ReactNode;
}

interface ExperienceItem {
    role: string;
    company: string;
    duration: string;
    highlights: string[];
    icon?: React.ReactNode;
}

interface LeadershipItem {
    role: string;
    organization: string;
    duration: string;
    highlights: string[];
    icon?: React.ReactNode;
}

interface ContactInfo {
    email?: string;
    github?: string;
    linkedin?: string;
}

interface ColorScheme {
    bg: string;
    text: string;
    accent: string;
    highlight: string;
    nebula: string;
    dust: string;
    glow: string;
}

// ===== DEFAULT VALUES ===== //
const DEFAULT_COLORS: ColorScheme = {
    bg: "#0a0a0a",
    text: "#e5e5e5",
    accent: "#facc15",
    highlight: "#3b82f6",
    nebula: "#7c3aed",
    dust: "#facc1560",
    glow: "#b03aff70"
};

const DEFAULT_PARTICLE_COUNT = 50;
const DEFAULT_PROFILE = {
    name: "FULL NAME",
    title: "PROFESSIONAL TITLE",
    education: [],
    experience: [],
    leadership: [],
    contact: {}
};

// ===== MAIN COMPONENT ===== //
export default function CosmicGlowPortfolio({ data }: { data?: PortfolioData }) {
  // ===== DATA MERGING ===== //
    const mergedData = {
    ...DEFAULT_PROFILE,
    ...data,
    contact: {
        ...DEFAULT_PROFILE.contact,
        ...data?.contact
    },
    config: {
        colors: {
        ...DEFAULT_COLORS,
        ...data?.config?.colors
        },
        particleDensity: data?.config?.particleDensity || DEFAULT_PARTICLE_COUNT
    }
    };

    const COLORS = mergedData.config.colors;

  // ===== ANIMATION CONTROLS ===== //
    const controls = useAnimation();
    const [showContent, setShowContent] = useState(false);
    const [isLoading, setIsLoading] = useState(!data);

  // ===== DYNAMIC PARTICLES ===== //
    const particles = Array.from({ length: mergedData.config.particleDensity }).map((_, i) => {
    const isHighlight = Math.random() > 0.7;
    return {
        id: i,
      size: isHighlight ? Math.random() * 4 + 3 : Math.random() * 3 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: isHighlight ? Math.random() * 0.6 + 0.4 : Math.random() * 0.2 + 0.05,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 2,
      blur: isHighlight ? 0 : Math.random() * 2 + 1,
      speed: Math.random() * 1.5 + 0.5
    };
    });

  // ===== ANIMATION SEQUENCE ===== //
    useEffect(() => {
    if (isLoading) return;

    const sequence = async () => {
        await controls.start({ 
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 }
        });
        await controls.start({
        scale: 0.95,
        transition: { duration: 0.8, ease: "easeOut" }
        });
        setShowContent(true);
    };

    sequence();
    }, [isLoading, controls]);

  // ===== LOADING STATE ===== //
    if (isLoading) {
    return (
        <div className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: COLORS.bg }}>
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ color: COLORS.accent }}
        >
            <FiGithub className="text-4xl" />
        </motion.div>
        </div>
    );
    }

    return (
    <div className="relative w-full min-h-screen overflow-y-auto" style={{ backgroundColor: COLORS.bg }}>
      {/* Cosmic Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
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

      {/* Main Content */}
        <div className="w-full max-w-3xl mx-auto px-6 py-12">
        {/* Name Section */}
        <motion.div className="text-center mb-20" initial={{ opacity: 0, y: 40 }} animate={controls}>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2" style={{ color: COLORS.text }}>
            {mergedData.name.split(' ')[0]}
            <span style={{ color: COLORS.accent }}> {mergedData.name.split(' ')[1]}</span>
            </h1>
            <motion.p
            className="text-lg md:text-xl tracking-wider"
            style={{ color: COLORS.accent }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            >
            {mergedData.title}
            </motion.p>
        </motion.div>

        <AnimatePresence>
            {showContent && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.5 }}
            >
              {/* Education Section */}
                {mergedData.education && mergedData.education.length > 0 && (
                <Section title="EDUCATION" icon={<FiBook />}>
                    {mergedData.education.map((edu, i) => (
                    <ContentItem key={`edu-${i}`} icon={edu.icon || <FiBook />}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-bold" style={{ color: COLORS.text }}>
                            {edu.institution}
                            </h3>
                            <p style={{ color: COLORS.accent }}>{edu.degree}</p>
                        </div>
                        <p style={{ color: `${COLORS.text}aa` }}>{edu.details}</p>
                        </div>
                    </ContentItem>
                    ))}
                </Section>
                )}

              {/* Experience Section */}
                {mergedData.experience && mergedData.experience.length > 0 && (
                <Section title="EXPERIENCE" icon={<FiBriefcase />}>
                    {mergedData.experience.map((exp, i) => (
                    <ContentItem key={`exp-${i}`} icon={exp.icon || <FiBriefcase />}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                            <h3 className="text-xl font-bold" style={{ color: COLORS.text }}>
                            {exp.role}
                            </h3>
                            <p style={{ color: COLORS.accent }}>{exp.company}</p>
                        </div>
                        <p style={{ color: `${COLORS.text}aa` }}>{exp.duration}</p>
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
                )}

              {/* Contact Section */}
                {(mergedData.contact.email || mergedData.contact.github || mergedData.contact.linkedin) && (
                <motion.div 
                    className="mt-20 pt-10 border-t"
                    style={{ borderColor: `${COLORS.text}20` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="flex flex-wrap justify-center gap-6">
                    {mergedData.contact.email && (
                        <ContactItem 
                        icon={<FiMail />} 
                        text="EMAIL" 
                        href={`mailto:${mergedData.contact.email}`} 
                        color={COLORS.highlight}
                        />
                    )}
                    {mergedData.contact.github && (
                        <ContactItem 
                        icon={<FiGithub />} 
                        text="GITHUB" 
                        href={`https://github.com/${mergedData.contact.github}`} 
                        color={COLORS.text}
                        />
                    )}
                    {mergedData.contact.linkedin && (
                        <ContactItem 
                        icon={<FiLinkedin />} 
                        text="LINKEDIN" 
                        href={`https://linkedin.com/in/${mergedData.contact.linkedin}`} 
                        color={COLORS.text}
                        />
                    )}
                    </div>
                </motion.div>
                )}
            </motion.div>
            )}
        </AnimatePresence>
        </div>
    </div>
    );
}

// ===== REUSABLE COMPONENTS ===== //
function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
    return (
    <motion.section 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    >
        <div className="flex items-center gap-3 mb-6">
        <div style={{ color: "#facc15" }}>{icon}</div>
        <h2 className="text-2xl font-bold tracking-wider" style={{ color: "#facc15" }}>
            {title}
        </h2>
        </div>
        {children}
    </motion.section>
    );
}

function ContentItem({ children, icon }: { children: React.ReactNode; icon: React.ReactNode }) {
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
            backgroundColor: `${color}20`,
            color: color,
            border: `1px solid ${color}`
        }}
        whileHover={{ 
            backgroundColor: `${color}40`,
            scale: 1.1
        }}
        >
        {icon}
        </motion.div>
        <span className="text-sm tracking-widest" style={{ color: "#e5e5e5" }}>
        {text}
        </span>
    </motion.a>
    );
}