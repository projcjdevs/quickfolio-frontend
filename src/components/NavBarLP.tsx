"use client";

import { Poppins } from 'next/font/google';
import AnimatedHeader from '@/components/AnimatedLogo';

const poppins = Poppins({ 
    weight: '700',
    subsets: ['latin'],
    display: 'swap'
});

const Navbar = () => {
    return (
        <header className={`sticky top-0 z-50 bg-[#F5F4ED] ${poppins.className}`}>
            <div className="w-full px-10 py-0 flex justify-between items-center">
                <div className="text-4xl font-semibold text-[#1d1d1b]">
                    <AnimatedHeader />
                </div>

                <button className="bg-[#1d1d1b] text-[#F5F4ED] px-6 py-2 rounded-md font-normal hover:bg-opacity-90 transition duration-200">
                    Get Started
                </button>
            </div>
        </header>
    );
};

export default Navbar;