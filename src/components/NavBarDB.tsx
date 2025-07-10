'use client';

import { useState } from 'react';
import { Menu } from 'react-feather';
import AnimatedHeader from '@/components/AnimatedLogo';
import Hamburger from '@/components/Hamburger';

const NavBarDB = () => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

    const links = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Community', href: '/community' },
        { name: 'Products', href: '/products' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <>
            <header className="sticky top-0 z-50 bg-[#F5F4ED] border-b border-gray-200">
                <div className="w-full px-10 py-0 flex justify-between items-center">
                    {/* logo, calls AnimatedHeader */}
                    <div className="text-4xl font-semibold text-[#1d1d1b]">
                        <AnimatedHeader />
                    </div>

                    {/* desktop nav */}
                    <div className="hidden md:flex items-center space-x-8 text-[#333] font-normal text-sm">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="hover:underline hover:text-black"
                            >
                                {link.name}
                            </a>
                        ))}

                        {/* hamburger (desktop) */}
                        <button
                            aria-label="Open Hamburger Panel"
                            onClick={() => setIsHamburgerOpen(true)}
                        >
                            <Menu size={24} color="#333" strokeWidth={3.5}/>
                        </button>
                    </div>

                    {/* hamburger (mobile) */}
                    <div className="md:hidden">
                        <button
                            aria-label="Open Hamburger Panel"
                            onClick={() => setIsHamburgerOpen(true)}
                        >
                            <Menu size={24} color="#333" strokeWidth={3.5} />
                        </button>
                    </div>
                </div>

                {/* mobile nav */}
                <div className="md:hidden bg-[#F5F4ED] border-t border-gray-200 px-10 pt-4 pb-4 flex flex-col space-y-3">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-[#333] hover:underline text-sm"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </header>

            <Hamburger isOpen={isHamburgerOpen} onClose={() => setIsHamburgerOpen(false)} />
        </>
    );
};

export default NavBarDB;
