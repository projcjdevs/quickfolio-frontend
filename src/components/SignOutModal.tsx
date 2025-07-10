'use client';

import { Info } from 'react-feather';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    isVisible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    modalRef: React.RefObject<HTMLDivElement | null>;
}

const SignOutModal = ({ isVisible, onClose, onConfirm, modalRef }: Props) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[2000] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        ref={modalRef}
                        className="bg-white w-[400px] h-[171px] rounded-[8px] border border-black p-5 relative shadow-md flex flex-col justify-center"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-4 text-[24px] text-gray-500 hover:text-black focus:outline-none"
                            type="button"
                        >
                            ×
                        </button>

                        <div className="flex items-center space-x-2 mb-2">
                            <Info size={18} color="#000" />
                            <h2 className="text-md font-semibold text-[#1d1d1b]">Sign Out</h2>
                        </div>

                        <div className="pl-[26px]">
                            <p className="text-sm text-[#1d1d1b] mb-5">
                                Are you sure you want to sign out?
                            </p>

                            <div className="flex justify-start space-x-3">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-1 border border-black bg-black text-white rounded-md text-sm hover:bg-[#dedede] hover:text-[#333333] transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={onConfirm}
                                    className="px-4 py-1 border border-black bg-black text-white rounded-md text-sm hover:bg-[#dedede] hover:text-[#333333] transition"
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SignOutModal;