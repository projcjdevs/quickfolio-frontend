// src/components/TemplateSelectionModal.tsx
"use client";

import { useState } from 'react';
import { FiX } from 'react-icons/fi';

interface TemplateOption {
  id: string;
  name: string;
  preview: string;
  description: string;
}

const TEMPLATE_OPTIONS: TemplateOption[] = [
  {
    id: 'cosmic',
    name: 'Cosmic Glow',
    preview: '/images/templates/cosmic-preview.jpg',
    description: 'A dark, modern portfolio with cosmic animations and sleek design.',
  },
  {
    id: 'simple',
    name: 'Simple Portfolio',
    preview: '/images/templates/simple-preview.jpg',
    description: 'A clean, minimal portfolio with focus on content clarity.',
  },
];

interface TemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
}

export default function TemplateSelectionModal({
  isOpen,
  onClose,
  onSelect,
}: TemplateSelectionModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATE_OPTIONS[0].id);

  if (!isOpen) return null;

  const handleCreate = () => {
    onSelect(selectedTemplate);
  };

  const selectedTemplateData = TEMPLATE_OPTIONS.find(t => t.id === selectedTemplate) || TEMPLATE_OPTIONS[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-2xl font-bold">Choose a Template</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <FiX size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 h-[500px]">
          {/* Template List */}
          <div className="bg-gray-50 overflow-y-auto p-4 border-r">
            {TEMPLATE_OPTIONS.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-3 rounded mb-2 cursor-pointer ${
                  selectedTemplate === template.id
                    ? 'bg-blue-100 border border-blue-300'
                    : 'hover:bg-gray-100'
                }`}
              >
                <h3 className="font-semibold">{template.name}</h3>
              </div>
            ))}
          </div>

          {/* Template Preview */}
          <div className="col-span-2 p-6 flex flex-col">
            <div className="mb-4">
              <h3 className="text-xl font-bold">{selectedTemplateData.name}</h3>
              <p className="text-gray-600 mt-1">{selectedTemplateData.description}</p>
            </div>
            
            <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden border">
              <img
                src={selectedTemplateData.preview}
                alt={`${selectedTemplateData.name} preview`}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Use this template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}