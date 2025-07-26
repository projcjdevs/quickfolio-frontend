// src/components/SharePortfolioModal.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiShare2, FiCopy, FiCheck, FiExternalLink } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';

interface SharePortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioId: number;
  portfolioName: string;
}

export default function SharePortfolioModal({
  isOpen,
  onClose,
  portfolioId,
  portfolioName
}: SharePortfolioModalProps) {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [portfolioUrl, setPortfolioUrl] = useState('');

  useEffect(() => {
    if (user?.username) {
      const baseUrl = window.location.origin;
      setPortfolioUrl(`${baseUrl}/portfolio/${user.username}`);
    }
  }, [user?.username]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = portfolioUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenPortfolio = () => {
    window.open(portfolioUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-[1000] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm" 
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-lg z-10"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiShare2 className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Share Portfolio</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-2">"{portfolioName}"</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Share your public portfolio with others. This link shows your currently active portfolio.
                </p>
              </div>

              {/* URL Display */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Public Portfolio URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={portfolioUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 text-sm"
                  />
                  <button
                    onClick={handleCopyUrl}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg transition-colors flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <FiCheck className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <FiCopy className="w-4 h-4 text-gray-600" />
                        <span className="text-sm text-gray-600">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Note about active portfolio */}
              <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> This URL always shows your active portfolio. To share this specific portfolio, make sure it's set as your active portfolio first.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={handleOpenPortfolio}
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <FiExternalLink className="w-4 h-4" />
                  Open Portfolio
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
