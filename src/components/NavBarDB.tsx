'use client';

import { Menu } from 'react-feather';
import AnimatedHeader from '@/components/AnimatedLogo';

const NavBarDB = () => {
    const links = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Community', href: '/community' },
        { name: 'Products', href: '/products' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 bg-[#F5F4ED] border-b border-gray-200">
            <div className="w-full px-10 py-0 flex justify-between items-center">
                
                <div className="text-4xl font-semibold text-[#1d1d1b]">
                    <AnimatedHeader /> {/* logo, calls AnimatedHeader */}
                </div>

                <div className="hidden md:flex items-center space-x-8 text-[#333] font-normal text-sm"> {/* 4 desktop nav*/}
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="hover:underline hover:text-black"
                        >
                            {link.name}
                        </a>
                    ))}

                    {/* hamburger yum */}
                    <button aria-label="hamburger panel">
                        <Menu size={24} color="#333" />
                    </button>
                </div>

                {/* hamburger 4 mobile */}
                <div className="md:hidden">
                    <button aria-label="Open Hamburger Panel">
                        <Menu size={24} color="#333" />
                    </button>
                </div>
            </div>

            <div className="md:hidden bg-[#F5F4ED] border-t border-gray-200 px-10 pt-4 pb-4 flex flex-col space-y-3"> {/* 4 mobile nav */}
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
    );
};

export default NavBarDB;