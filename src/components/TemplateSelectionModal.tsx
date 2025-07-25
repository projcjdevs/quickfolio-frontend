"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
}

const TEMPLATE_OPTIONS: Template[] = [
  {
    id: 'cosmic',
    name: 'Cosmic Glow',
    description: 'A modern, dark theme with animated particles and glowing accents.',
    preview: '/Images/template-previews/cosmicglow.png'
  },
  {
    id: 'simple',
    name: 'Simple Portfolio',
    description: 'A clean, minimalist design that lets your work speak for itself.',
    preview: '/images/templates/simple-preview.jpg'
  },
  {
    id: 'medical',
    name: 'Medical Minimal',
    description: 'A minimalist medical-themed design with soft colors and clean layout.',
    preview: '/images/template-previews/medical-minimal.png'
  },
];

interface TemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
}

export default function TemplateSelectionModal({ isOpen, onClose, onSelect }: TemplateSelectionModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATE_OPTIONS[0].id);

  const handleCreate = () => {
    onSelect(selectedTemplate);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-[1000] p-4 sm:p-6 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop with blur effect */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm" 
            onClick={onClose}
          />
          
          {/* Modal content - Responsive sizing */}
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-[95%] sm:max-w-[90%] md:max-w-4xl lg:max-w-6xl z-10 overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Mobile View: Stack layout */}
            <div className="flex flex-col h-[90vh] md:h-auto md:max-h-[80vh] md:flex-row">
              {/* Sidebar - Horizontal on mobile, Vertical on larger screens */}
              <div className="w-full md:w-1/4 bg-gray-50 p-4 sm:p-5 md:p-6 overflow-y-auto flex-shrink-0">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-6 text-black">Choose Template</h2>
                
                {/* Template options - Horizontal scrollable on mobile */}
                <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 space-x-3 md:space-x-0 md:space-y-4">
                  {TEMPLATE_OPTIONS.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-3 sm:p-4 rounded-lg cursor-pointer transition-all flex-shrink-0 md:flex-shrink w-36 sm:w-auto md:w-full ${
                        selectedTemplate === template.id
                          ? 'bg-indigo-100 border border-indigo-300'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <h3 className="font-semibold text-black text-base sm:text-lg truncate">{template.name}</h3>
                    </div>
                  ))}
                </div>
              </div>  
              
              {/* Preview Area - Adjusted for all screen sizes */}
              <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-hidden">
                  {TEMPLATE_OPTIONS.map((template) => (
                    selectedTemplate === template.id && (
                      <div key={template.id} className="h-full flex flex-col">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 md:mb-3 text-black">{template.name}</h2>
                        <p className="text-gray-600 mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base md:text-lg">{template.description}</p>
                        
                        {/* Template Preview Container - Responsive height */}
                        <div className="relative flex-1 bg-gray-100 rounded-lg overflow-hidden min-h-[200px] sm:min-h-[250px] md:min-h-0">
                          {/* Template Preview Image */}
                          {template.preview ? (
                            <img 
                              src={template.preview} 
                              alt={`${template.name} preview`} 
                              className="w-full h-full object-contain p-2"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <p className="text-gray-500 text-sm sm:text-base">Preview not available</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  ))}
                </div>
                
                {/* Action Buttons - Responsive spacing and sizing */}
                <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:justify-between">
                  <button
                    onClick={onClose}
                    className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium text-sm sm:text-base order-2 sm:order-1"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={handleCreate}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-medium text-sm sm:text-base order-1 sm:order-2"
                  >
                    Use this template
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}