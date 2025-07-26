'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, LogOut, Edit2, Check, X } from 'react-feather';
import { FiUser, FiCreditCard, FiSettings, FiGrid } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import SignOutModal from './SignOutModal';

interface HamburgerProps {
    isOpen: boolean;
    onClose: () => void;
}

const Hamburger = ({ isOpen, onClose }: HamburgerProps) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
    const { logout, user, userLoading, updateUser } = useAuth();

    const [isEditing, setIsEditing] = useState(false);  // editing user info (local state)
    const [editedName, setEditedName] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

    // Update local editing state when user data changes
    useEffect(() => {
        if (user) {
            setEditedName(user.username || user.name || 'User');
            setEditedDescription('Description'); // This could come from user profile data
        }
    }, [user]);

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

    const handleSignOut = () => {   // backend call to sign out can be added here
        setIsSignOutModalOpen(false);
        logout(); // Use auth context logout - navigation is handled automatically
        onClose(); // Close the hamburger menu
    };

    // Save edited user info to context
    const handleSave = () => {
        updateUser({
            name: editedName,
        });
        setIsEditing(false);
        // TODO: Add API call to save user data to backend
    };

    const handleCancel = () => {
        if (user) {
            setEditedName(user.username || user.name || 'User');
            setEditedDescription('Description'); // Placeholder until we have description in user data
        }
        setIsEditing(false);
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
                        className="fixed top-0 right-0 h-screen w-[361px] max-w-full bg-white shadow-lg z-[1000]"
                        ref={panelRef}
                    >
                        {/* hamburger panel header */}
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

                        {/* avatar + name/description */}
                        <div className="flex px-6 h-[120px] items-center gap-5 mt-6 mb-6 relative">
                            <div className="flex-shrink-0">
                                <img
                                    src={user?.avatarUrl || '/Images/avatar/sample-avatar.png'}
                                    alt="User Avatar"
                                    className="w-[72px] md:w-[92px] md:h-[87px] aspect-square object-cover rounded-none"
                                />
                            </div>

                            <div className="flex flex-col flex-grow">
                                {isEditing ? (
                                    <>
                                        <input
                                            className="text-[16px] font-semibold text-[#757575] outline-none border-b border-gray-300 focus:border-black"
                                            value={editedName}
                                            onChange={(e) => setEditedName(e.target.value)}
                                        />
                                        <input
                                            className="text-[14px] text-[#B3B3B3] mt-1 outline-none border-b border-gray-300 focus:border-black"
                                            value={editedDescription}
                                            onChange={(e) => setEditedDescription(e.target.value)}
                                        />
                                        <div className="flex gap-2 mt-2">
                                            <button onClick={handleSave} aria-label="Save">
                                                <Check size={16} className="text-green-600" />
                                            </button>
                                            <button onClick={handleCancel} aria-label="Cancel">
                                                <X size={16} className="text-gray-500" />
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-[16px] font-semibold text-[#757575]">
                                            {userLoading ? (
                                                <span className="animate-pulse">Loading...</span>
                                            ) : (
                                                user?.username || user?.name || 'User'
                                            )}
                                        </h2>
                                        <div className="flex items-center gap-3">
                                            <p className="text-[14px] text-[#B3B3B3]">
                                                {userLoading ? (
                                                    <span className="animate-pulse">Loading...</span>
                                                ) : (
                                                    'Description'
                                                )}
                                            </p>
                                            <button
                                                className="text-gray-500 hover:text-black"
                                                onClick={() => setIsEditing(true)}
                                                aria-label="Edit"
                                            >
                                                <Edit2 size={14} />
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <hr className="border-t border-gray-200 mx-0" />

                        {/* profile, billings, settings, qr */}
                        <div className="px-6 py-2 space-y-4">
                            <div className="flex items-center gap-4 cursor-pointer mt-3 mb-4 hover:opacity-70">
                                <FiUser size={20} className="text-[#1d1d1b]" />
                                <span className="text-sm text-[#1d1d1b] font-medium">Manage Profile</span>
                            </div>
                            <hr className="border-t border-gray-200 -mx-6" />

                            <div className="flex items-center gap-4 cursor-pointer mt-3 mb-4 hover:opacity-70">
                                <FiCreditCard size={20} className="text-[#1d1d1b]" />
                                <span className="text-sm text-[#1d1d1b] font-medium">Billings & Payments</span>
                            </div>
                            <hr className="border-t border-gray-200 -mx-6" />

                            <div className="flex items-center gap-4 cursor-pointer mt-3 mb-4 hover:opacity-70">
                                <FiSettings size={20} className="text-[#1d1d1b]" />
                                <span className="text-sm text-[#1d1d1b] font-medium">Settings</span>
                            </div>
                            <hr className="border-t border-gray-200 -mx-6" />

                            <div className="flex items-center gap-4 cursor-pointer mt-3 mb-4 hover:opacity-70">
                                <FiGrid size={20} className="text-[#1d1d1b]" />
                                <span className="text-sm text-[#1d1d1b] font-medium">QR Code</span>
                            </div>
                            <hr className="border-t border-gray-200 -mx-6" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* som / panel */}
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