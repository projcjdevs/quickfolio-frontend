"use client";

import React, { useEffect, useState } from 'react';
import { PortfolioData, DEFAULT_PROFILE } from '@/components/types';
import dynamic from 'next/dynamic';
import { FiX, FiRotateCw, FiAlertCircle, FiMoon, FiSun } from 'react-icons/fi';

const PreviewUIContext = React.createContext({
  darkMode: true,
  toggleDarkMode: () => {}
});

const templateComponents = {
  cosmic: dynamic(() => import('@/components/templates/CosmicGlowPortfolio'), {
    loading: () => <TemplateSkeleton />,
    ssr: false
  }),
  simple: dynamic(() => import('@/components/templates/SimplePortfolio'), {
    loading: () => <TemplateSkeleton />,
    ssr: false
  }),
  medPortfolio: dynamic(() => import('@/components/templates/MedPortfolio'), {
    loading: () => <TemplateSkeleton />,
    ssr: false
  })
};

function TemplateSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] transition-colors duration-300">
      <FiRotateCw className="h-8 w-8 animate-spin text-gray-400" />
      <p className="mt-4 text-gray-500">Loading portfolio template...</p>
    </div>
  );
}

export default function PreviewPage() {
  const [previewData, setPreviewData] = useState<{
    data: PortfolioData;
    templateId: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    document.documentElement.classList.add('transition-colors', 'duration-300');
    
    const loadPreviewData = async () => {
      try {
        setIsLoading(true);
        // Only access localStorage after component mounts
        const saved = localStorage.getItem('preview-data');
        if (saved) {
          const parsedData = JSON.parse(saved);
          setPreviewData(parsedData);
          // Optionally log to debug the templateId
          console.log("Loaded templateId:", parsedData.templateId);
        } else {
          setError("No portfolio data found");
        }
      } catch (e) {
        setError("Invalid portfolio data");
      } finally {
        setIsLoading(false);
      }
    };

    loadPreviewData();

    return () => {
      document.documentElement.classList.remove('transition-colors', 'duration-300');
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Don't render anything until component has mounted
  if (!hasMounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        <div className="text-center">
          <FiRotateCw className="mx-auto h-8 w-8 animate-spin" />
          <p className="mt-4">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        <div className={`p-6 rounded-lg max-w-md transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-[#F5F4ED]'}`}>
          <FiAlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h3 className="mt-4 text-lg font-medium">Error</h3>
          <p className="mt-2">{error}</p>
          <button
            onClick={() => window.close()}
            className={`mt-6 px-4 py-2 rounded-md transition-colors duration-200 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!previewData) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        <div className={`p-6 rounded-lg max-w-md transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-[#F5F4ED]'}`}>
          <h3 className="text-lg font-medium">No Preview</h3>
          <p className="mt-2">Please create a portfolio first</p>
          <button
            onClick={() => window.close()}
            className={`mt-6 px-4 py-2 rounded-md transition-colors duration-200 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const TemplateComponent = templateComponents[previewData.templateId as keyof typeof templateComponents] || templateComponents.cosmic;

  return (
    <PreviewUIContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        <header className={`sticky top-0 z-50 p-4 transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-[#F5F4ED] border-gray-200'} border-b`}>
          <div className="flex justify-between items-center max-w-7xl mx-auto">
            <h1 className="font-medium">Portfolio Preview</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-opacity-10 hover:bg-white transition-colors duration-200"
                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
              >
                {darkMode ? (
                  <FiSun className="text-yellow-300" />
                ) : (
                  <FiMoon className="text-gray-600" />
                )}
              </button>
              <button
                onClick={() => window.close()}
                className={`px-3 py-1 rounded-md transition-colors duration-200 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                Close
              </button>
            </div>
          </div>
        </header>

        <main className="pb-11">
          <div className="max-w-4xl mx-auto overflow-x-hidden">
            <TemplateComponent data={previewData.data} />
          </div>
        </main>

        <footer className={`fixed bottom-0 left-0 right-0 p-3 transition-colors duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-[#F5F4ED] border-gray-200'} border-t`}>
          <div className="max-w-7xl mx-auto text-sm text-center transition-colors duration-300">
            Preview only • Changes not saved
          </div>
        </footer>
      </div>
    </PreviewUIContext.Provider>
  );
}