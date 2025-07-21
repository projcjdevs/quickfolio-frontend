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
          className="fixed inset-0 flex items-center justify-center z-[1000] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop with blur effect */}
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm" 
            onClick={onClose}
          />
          
          {/* Modal content - INCREASED SIZE */}
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-6xl z-10 overflow-hidden"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col md:flex-row h-[700px] md:h-[600px]">
              {/* Sidebar */}
              <div className="w-full md:w-1/4 bg-gray-50 p-6 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6 text-black">Choose Template</h2>
                
                <div className="space-y-4">
                  {TEMPLATE_OPTIONS.map((template) => (
                    <div
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? 'bg-indigo-100 border border-indigo-300'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <h3 className="font-semibold text-black text-lg mb-1">{template.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Preview Area - INCREASED SIZE */}
              <div className="flex-1 p-8 flex flex-col">
                <div className="flex-1 overflow-hidden">
                  {TEMPLATE_OPTIONS.map((template) => (
                    selectedTemplate === template.id && (
                      <div key={template.id} className="h-full flex flex-col">
                        <h2 className="text-3xl font-bold mb-3 text-black">{template.name}</h2>
                        <p className="text-gray-600 mb-6 text-lg">{template.description}</p>
                        
                        {/* Larger image container */}
                        <div className="relative flex-1 bg-gray-100 rounded-lg overflow-hidden">
                          {/* Template Preview Image */}
                          {template.preview ? (
                            <img 
                              src={template.preview} 
                              alt={`${template.name} preview`} 
                              className="w-full h-full object-contain p-2"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <p className="text-gray-500">Preview not available</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="mt-8 flex justify-between">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={handleCreate}
                    className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 font-medium"
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