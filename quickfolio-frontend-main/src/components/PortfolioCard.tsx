// src/components/PortfolioCard.tsx
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMoreVertical, 
  FiEdit, 
  FiTrash2, 
  FiCopy, 
  FiEye, 
  FiShare2, 
  FiCheck,
  FiStar
} from 'react-icons/fi';
import { PortfolioSummary } from '@/services/portfolioApi';

interface PortfolioCardProps {
  portfolio: PortfolioSummary;
  onEdit: (portfolioId: number) => void;
  onDelete: (portfolioId: number) => void;
  onDuplicate: (portfolioId: number) => void;
  onSetActive: (portfolioId: number) => void;
  onPreview: (portfolioId: number) => void;
  onShare: (portfolioId: number) => void;
  openMenuId: number | null;
  setOpenMenuId: (id: number | null) => void;
}

export default function PortfolioCard({
  portfolio,
  onEdit,
  onDelete,
  onDuplicate,
  onSetActive,
  onPreview,
  onShare,
  openMenuId,
  setOpenMenuId
}: PortfolioCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const isMenuOpen = openMenuId === portfolio.id;

  const handleMenuAction = async (action: () => void | Promise<void>) => {
    setIsLoading(true);
    setOpenMenuId(null);
    try {
      await action();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
    >
      {/* Active Portfolio Badge */}
      {portfolio.isActive && (
        <div className="absolute top-3 left-3 z-10">
          <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
            <FiStar className="w-3 h-3" />
            Active
          </div>
        </div>
      )}

      {/* Three-dot Menu */}
      <div className="absolute top-3 right-3 z-30">
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenuId(isMenuOpen ? null : portfolio.id);
            }}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            disabled={isLoading}
          >
            <FiMoreVertical className="w-5 h-5 text-gray-600" />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <>
              {/* Click-outside overlay */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setOpenMenuId(null)}
              />
              
              <motion.div
                className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[160px] z-50"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuAction(() => onEdit(portfolio.id));
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700"
              >
                <FiEdit className="w-4 h-4" />
                Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuAction(() => onPreview(portfolio.id));
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700"
              >
                <FiEye className="w-4 h-4" />
                Preview
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuAction(() => onDuplicate(portfolio.id));
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700"
              >
                <FiCopy className="w-4 h-4" />
                Duplicate
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuAction(() => onShare(portfolio.id));
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700"
              >
                <FiShare2 className="w-4 h-4" />
                Share
              </button>

              {!portfolio.isActive && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuAction(() => onSetActive(portfolio.id));
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm text-green-700"
                >
                  <FiCheck className="w-4 h-4" />
                  Set as Active
                </button>
              )}

              <hr className="my-1" />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMenuAction(() => onDelete(portfolio.id));
                }}
                className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-2 text-sm text-red-600"
              >
                <FiTrash2 className="w-4 h-4" />
                Delete
              </button>
            </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Portfolio Preview */}
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-3 flex items-center justify-center">
            <FiEye className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-sm text-gray-500">Portfolio Preview</p>
        </div>
      </div>

      {/* Portfolio Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 truncate">
          {portfolio.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${portfolio.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-sm text-gray-600">
              {portfolio.isActive ? 'Active Portfolio' : 'Inactive'}
            </span>
          </div>
          
          <button
            onClick={() => onEdit(portfolio.id)}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
            disabled={isLoading}
          >
            Edit
          </button>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
    </motion.div>
  );
}
