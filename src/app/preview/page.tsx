// src/app/preview/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { PortfolioData, DEFAULT_PROFILE } from '@/components/types';
import dynamic from 'next/dynamic';

// Available templates - dynamically import to avoid SSR issues
const templateComponents = {
  cosmic: dynamic(() => import('@/components/templates/CosmicGlowPortfolio'), {
    loading: () => <TemplatePlaceholder name="Cosmic Glow" />,
    ssr: false
  }),
  simple: dynamic(() => import('@/components/templates/SimplePortfolio'), {
    loading: () => <TemplatePlaceholder name="Simple Portfolio" />,
    ssr: false
  })
};

// Template names for display
const templateNames = {
  cosmic: "Cosmic Glow",
  simple: "Simple Portfolio"
};

// Placeholder component while template loads
function TemplatePlaceholder({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gray-100">
      <div className="text-center p-8 bg-white rounded shadow-md">
        <div className="animate-pulse w-16 h-16 rounded-full bg-blue-200 mx-auto mb-4"></div>
        <h3 className="text-lg font-medium">Loading {name} Template...</h3>
        <p className="text-gray-500 mt-2">Please wait...</p>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  const [previewData, setPreviewData] = useState<{
    data: PortfolioData;
    templateId: string;
  } | null>(null);
  
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load preview data from localStorage
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('preview-data');
        if (saved) {
          setPreviewData(JSON.parse(saved));
        } else {
          setError("No preview data found. Please return to the editor.");
        }
      }
    } catch (e) {
      console.error("Error loading preview data:", e);
      setError("Failed to load portfolio data. Please try again.");
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded shadow-md max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h1 className="text-xl font-bold mb-4">Error</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          <button 
            onClick={() => window.close()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close Preview
          </button>
        </div>
      </div>
    );
  }

  if (!previewData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-lg">Loading preview...</p>
        </div>
      </div>
    );
  }

  const { data = DEFAULT_PROFILE, templateId = 'cosmic' } = previewData;
  const TemplateComponent = templateComponents[templateId as keyof typeof templateComponents] || templateComponents.cosmic;
  const templateName = templateNames[templateId as keyof typeof templateNames] || 'Unknown Template';

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 left-0 w-full bg-gray-800 p-4 flex justify-between items-center z-50">
        <h1 className="text-white font-medium">Portfolio Preview</h1>
        <p className="text-gray-300">Template: {templateName}</p>
        <button 
          onClick={() => window.close()} 
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded"
        >
          Close Preview
        </button>
      </div>
      
      <div className="pt-16">
        <TemplateComponent data={data} />
      </div>
    </div>
  );
}