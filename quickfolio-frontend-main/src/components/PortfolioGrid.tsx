// src/components/PortfolioGrid.tsx
"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiGrid, FiList, FiRefreshCw } from 'react-icons/fi';
import { portfolioApi, PortfolioSummary } from '@/services/portfolioApi';
import { useRouter } from 'next/navigation';
import { useAsyncOperation } from '@/hooks/useAsyncOperation';
import { useDebounceCallback } from '@/hooks/useDebounce';
import PortfolioCard from './PortfolioCard';
import CreatePortfolioModal from './CreatePortfolioModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import SharePortfolioModal from './SharePortfolioModal';

type ViewMode = 'grid' | 'list';

interface PortfolioGridProps {
  onTemplateSelect?: (templateId: string) => void;
}

export default function PortfolioGrid({ onTemplateSelect }: PortfolioGridProps) {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState<PortfolioSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null); // Track which menu is open
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    portfolio: PortfolioSummary | null;
  }>({ isOpen: false, portfolio: null });
  const [shareModal, setShareModal] = useState<{
    isOpen: boolean;
    portfolio: PortfolioSummary | null;
  }>({ isOpen: false, portfolio: null });

  // Load portfolios on component mount
  useEffect(() => {
    // Add a small delay to prevent rapid requests
    const timeoutId = setTimeout(() => {
      loadPortfolios();
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  const loadPortfolios = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await portfolioApi.getMyPortfolios();
      setPortfolios(data);
    } catch (err) {
      console.error('Error loading portfolios:', err);
      setError(err instanceof Error ? err.message : 'Failed to load portfolios');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePortfolio = async (name: string) => {
    try {
      const newPortfolio = await portfolioApi.createPortfolio({ name });
      setPortfolios(prev => [...prev, newPortfolio]);
    } catch (err) {
      throw err; // Re-throw to let the modal handle the error
    }
  };

  const handleEditPortfolio = (portfolioId: number) => {
    router.push(`/edit?portfolioId=${portfolioId}`);
  };

  const handleDeletePortfolio = async (portfolioId: number) => {
    try {
      await portfolioApi.deletePortfolio(portfolioId);
      setPortfolios(prev => prev.filter(p => p.id !== portfolioId));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      
      // If it's an authentication error, clear the token and suggest re-login
      if (errorMessage.includes('Authentication token invalid') || errorMessage.includes('expired')) {
        localStorage.removeItem('authToken');
        alert(`${errorMessage}\n\nClearing your session. Please refresh the page and log in again.`);
        window.location.href = '/';
        return;
      }
      
      alert(`Failed to delete portfolio: ${errorMessage}`);
      throw err; // Re-throw to let the modal handle the error
    }
  };

  const handleDuplicatePortfolio = async (portfolioId: number) => {
    try {
      const originalPortfolio = portfolios.find(p => p.id === portfolioId);
      if (!originalPortfolio) return;

      const newName = `${originalPortfolio.name} (Copy)`;
      const duplicatedPortfolio = await portfolioApi.duplicatePortfolio(portfolioId, newName);
      setPortfolios(prev => [...prev, duplicatedPortfolio]);
    } catch (err) {
      console.error('Error duplicating portfolio:', err);
      alert('Failed to duplicate portfolio. Please try again.');
    }
  };

  const handleSetActivePortfolio = async (portfolioId: number) => {
    try {
      await portfolioApi.setActivePortfolio(portfolioId);
      setPortfolios(prev => prev.map(p => ({
        ...p,
        isActive: p.id === portfolioId
      })));
    } catch (err) {
      console.error('Error setting active portfolio:', err);
      alert(`Failed to set active portfolio: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const handlePreviewPortfolio = (portfolioId: number) => {
    // Store the portfolio ID in localStorage for preview
    localStorage.setItem('previewPortfolioId', portfolioId.toString());
    window.open('/preview', '_blank');
  };

  const handleSharePortfolio = (portfolioId: number) => {
    const portfolio = portfolios.find(p => p.id === portfolioId);
    if (portfolio) {
      setShareModal({ isOpen: true, portfolio });
    }
  };

  const openDeleteModal = (portfolioId: number) => {
    const portfolio = portfolios.find(p => p.id === portfolioId);
    if (portfolio) {
      setDeleteModal({ isOpen: true, portfolio });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <p className="text-lg font-medium">Error loading portfolios</p>
          <p className="text-sm">{error}</p>
        </div>
        <button
          onClick={loadPortfolios}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiRefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Portfolios</h2>
          <p className="text-gray-600">
            {portfolios.length} portfolio{portfolios.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle - only show if there are portfolios */}
          {portfolios.length > 0 && (
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Create Portfolio Button - only show if there are portfolios */}
          {portfolios.length > 0 && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="w-4 h-4" />
              Create Portfolio
            </button>
          )}
        </div>
      </div>

      {/* Portfolio Grid/List */}
      {portfolios.length === 0 ? (
        // Empty State
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📂</div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            No portfolios yet
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Create your first portfolio to showcase your skills and experience.
            Choose from our professional templates to get started quickly.
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" />
            Create Your First Portfolio
          </button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {portfolios.map((portfolio) => (
                <PortfolioCard
                  key={portfolio.id}
                  portfolio={portfolio}
                  onEdit={handleEditPortfolio}
                  onDelete={openDeleteModal}
                  onDuplicate={handleDuplicatePortfolio}
                  onSetActive={handleSetActivePortfolio}
                  onPreview={handlePreviewPortfolio}
                  onShare={handleSharePortfolio}
                  openMenuId={openMenuId}
                  setOpenMenuId={setOpenMenuId}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="divide-y divide-gray-200">
                {portfolios.map((portfolio) => (
                  <div key={portfolio.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${
                          portfolio.isActive ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <div>
                          <h3 className="font-medium text-gray-900">{portfolio.name}</h3>
                          <p className="text-sm text-gray-600">
                            {portfolio.isActive ? 'Active Portfolio' : 'Inactive'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditPortfolio(portfolio.id)}
                          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => openDeleteModal(portfolio.id)}
                          className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Modals */}
      <CreatePortfolioModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreatePortfolio}
      />

      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, portfolio: null })}
        onConfirm={async () => {
          if (deleteModal.portfolio) {
            await handleDeletePortfolio(deleteModal.portfolio.id);
          }
        }}
        portfolioName={deleteModal.portfolio?.name || ''}
        isActive={deleteModal.portfolio?.isActive || false}
      />

      <SharePortfolioModal
        isOpen={shareModal.isOpen}
        onClose={() => setShareModal({ isOpen: false, portfolio: null })}
        portfolioId={shareModal.portfolio?.id || 0}
        portfolioName={shareModal.portfolio?.name || ''}
      />
    </div>
  );
}
