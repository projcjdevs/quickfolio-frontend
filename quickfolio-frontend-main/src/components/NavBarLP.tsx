"use client";

import { Poppins } from 'next/font/google';
import AnimatedHeader from '@/components/AnimatedLogo';
import AuthButton from '@/components/AuthButton';

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

                <div>
                    <AuthButton variant="navbar" />
                </div>
            </div>
        </header>
    );
};

export default Navbar;