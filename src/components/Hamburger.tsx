'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, LogOut } from 'react-feather';
import SignOutModal from './SignOutModal';

interface HamburgerProps {
    isOpen: boolean;
    onClose: () => void;
}

const Hamburger = ({ isOpen, onClose }: HamburgerProps) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

    // Click outside to close (excluding SignOutModal)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const clickedOutsidePanel =
                panelRef.current && !panelRef.current.contains(event.target as Node);
            const clickedOutsideModal =
                modalRef.current && !modalRef.current.contains(event.target as Node);

            // Close if clicked outside the hamburger panel
            // BUT ignore clicks inside the modal (SignOutModal)
            if (clickedOutsidePanel) {
            const clickedInsideModal = modalRef.current?.contains(event.target as Node);
            if (!clickedInsideModal) {
                onClose();
            }}
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

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
                                <Menu size={24} color="#333" />
                            </button>

                            <button
                                onClick={() => setIsSignOutModalOpen(true)}
                                aria-label="Sign Out"
                            >
                                <LogOut size={22} color="#333" />
                            </button>
                        </div>

                        {/* User Info Section */}
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

                        <hr className="border-t border-gray-200 mx-4" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sign Out Modal */}
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