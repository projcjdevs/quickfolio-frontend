'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, LogOut } from 'react-feather';
import SignOutModal from './SignOutModal';
import { FiUser, FiCreditCard, FiSettings, FiGrid } from 'react-icons/fi';

interface HamburgerProps {
    isOpen: boolean;
    onClose: () => void;
}

const Hamburger = ({ isOpen, onClose }: HamburgerProps) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

    // click outside to close (excluding som)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(event.target as Node) &&
                !isSignOutModalOpen 
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, isSignOutModalOpen]);

    const handleSignOut = () => {
        setIsSignOutModalOpen(false);
        console.log('Signed out!');
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: 400 }}
                        animate={{ x: 0 }}
                        exit={{ x: 400 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-screen w-[370px] max-w-full bg-white shadow-lg z-[1000]"
                        ref={panelRef}
                    >
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <button onClick={onClose} aria-label="Close Panel">
                                <Menu size={24} color="#333" strokeWidth={3.5} />
                            </button>

                            <button
                                onClick={() => setIsSignOutModalOpen(true)}
                                aria-label="Sign Out"
                            >
                                <LogOut size={22} color="#333" strokeWidth={3.5} />
                            </button>
                        </div>

                        {/* avatar, name & description */}
                        <div className="flex px-6 h-[120px] items-center gap-5 mt-6 mb-6">
                            <div className="flex-shrink-0">
                                <img
                                    src="/sample-avatar.png"
                                    alt="User Avatar"
                                    className="w-[92px] h-[87px] object-cover"
                                    style={{ borderRadius: 0 }}
                                />
                            </div>

                            <div>
                                <h2 className="text-[16px] font-semibold text-[#757575]">Name</h2>
                                <p className="text-[14px] text-[#B3B3B3]">Description</p>
                            </div>
                        </div>

                        <hr className="border-t border-gray-200 mx-0" />

                        {/* options */}
                        <div className="px-6 py-2 space-y-4">

                        {/* profile section */}
                        <div className="flex items-center gap-4 cursor-pointer mt-3 mb-4 hover:opacity-70">
                            <FiUser size={20} className="text-[#1d1d1b]" />
                            <span className="text-sm text-[#1d1d1b] font-medium">Manage Profile</span>
                        </div>

                        <hr className="border-t border-gray-200 -mx-6" />

                        {/* bills & payment section */}
                        <div className="flex items-center gap-4 cursor-pointer mt-3 mb-4 hover:opacity-70">
                            <FiCreditCard size={20} className="text-[#1d1d1b]" />
                            <span className="text-sm text-[#1d1d1b] font-medium">Billings & Payments</span>
                        </div>

                        <hr className="border-t border-gray-200 -mx-6" />

                        {/* settings section */}
                        <div className="flex items-center gap-4 cursor-pointer mt-3 mb-4 hover:opacity-70">
                            <FiSettings size={20} className="text-[#1d1d1b]" />
                            <span className="text-sm text-[#1d1d1b] font-medium">Settings</span>
                        </div>

                        <hr className="border-t border-gray-200 -mx-6" />

                        {/* qr code */}
                        <div className="flex items-center gap-4 cursor-pointer mt-3 mb-4 hover:opacity-70">
                            <FiGrid size={20} className="text-[#1d1d1b]" />
                            <span className="text-sm text-[#1d1d1b] font-medium">QR Code</span>
                        </div>

                        <hr className="border-t border-gray-200 -mx-6" />
                        </div>

                    </motion.div>
                )}
            </AnimatePresence>

            {/* sign out panel / modal */}
            <SignOutModal
                isVisible={isSignOutModalOpen}
                onClose={() => setIsSignOutModalOpen(false)}
                onConfirm={handleSignOut}
                modalRef={modalRef}
            />
        </>
    );
};

export default Hamburger;