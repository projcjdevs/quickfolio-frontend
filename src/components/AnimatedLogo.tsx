'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function AnimatedHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setPrefersReducedMotion(
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        );

        const handleScroll = () => {
            const shouldBeScrolled = window.scrollY > 50;
            if (shouldBeScrolled !== isScrolled) {
                setIsScrolled(shouldBeScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isScrolled]);

    if (!isMounted) {
        return (
            <div style={{
                height: '80px',
                borderBottom: '1px solid #ddd'
            }} />
        );
    }

    if (prefersReducedMotion) {
        return (
            <div style={{
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                zIndex: 100,
                fontFamily: 'Poppins, sans-serif'
            }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#222' }}>
                    quickfolio
                </div>
            </div>
        );
    }

    return (
        <div style={{
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            zIndex: 100,
            fontFamily: 'Poppins, sans-serif'
        }}>
            <div style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                color: '#222',
                display: 'flex',
                gap: '0rem',
            }}>
                <motion.span
                    initial={{ x: 0, rotate: 0, fontSize: '1.8rem', fontWeight: 700 }}
                    animate={{ 
                        x: isScrolled ? 0 : 0,
                        rotate: isScrolled ? -54 : 0,
                        fontSize: isScrolled ? '1.8erm' : '1.8rem',
                        fontWeight: isScrolled ? 900 : 700,
                        transition: { duration: 0.4 }
                    }}
                >
                    Q
                </motion.span>

                <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: isScrolled ? 0 : 1 }}
                    transition={{
                        duration: isScrolled ? 0.1 : 0.6, 
                        ease: "easeInOut",
                        delay: isScrolled ? 0: 0.2
                    }}
                >
                    uickfoli
                </motion.span>

                <motion.span
                    initial={{ x: 0, textTransform: 'lowercase' }}
                    animate={{ 
                        x: isScrolled ? -109 : 0,
                        textTransform: isScrolled ? 'uppercase' : 'lowercase'
                    }}
                    transition={{ duration: 0.4 }}
                >
                    o
                </motion.span>
            </div>
        </div>
    );
}