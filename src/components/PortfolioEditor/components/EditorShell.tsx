"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { FiSave, FiEye, FiMove, FiMinimize, FiMaximize, FiX, FiPlus } from "react-icons/fi";
import TemplateSelector from "@/components/PortfolioEditor/components/templates/TemplateSelector";
import BasicInfoEditor from "@/components/PortfolioEditor/components/sections/BasicInfoEditor";
import ExperienceEditor from "@/components/PortfolioEditor/components/sections/ExperienceEditor";
import EducationEditor from "@/components/PortfolioEditor/components/sections/EducationEditor";
import ColorSchemeEditor from "@/components/PortfolioEditor/components/sections/ColorSchemeEditor";
import LeadershipEditor from "@/components/PortfolioEditor/components/sections/LeadershipEditor";
import CertificationsEditor from "@/components/PortfolioEditor/components/sections/CertificationsEditor";
import { PortfolioData } from "@/components/PortfolioEditor/types";
import TemplatePlaceholder from "@/components/PortfolioEditor/components/templates/TemplatePlaceholder";

interface EditorShellProps {
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  portfolioData: PortfolioData;
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  availableTemplates: {
    [key: string]: {
      name: string;
      component: React.ComponentType<{ data: PortfolioData }>;
    };
  };
  onPreview: () => void;
  onSave: () => void;
}

export default function EditorShell({
  selectedTemplate,
  setSelectedTemplate,
  portfolioData,
  setPortfolioData,
  availableTemplates,
  onPreview,
  onSave,
}: EditorShellProps) {
  const [isMobileEditorOpen, setIsMobileEditorOpen] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [panelSize, setPanelSize] = useState(() => ({
    width: typeof window !== 'undefined' ? Math.min(window.innerWidth * 0.9, 400) : 400,
    height: typeof window !== 'undefined' ? window.innerHeight * 0.6 : 600,
  }));
  const [isMaximized, setIsMaximized] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const resizeStartSize = useRef({ width: 0, height: 0 });
  const resizeStartPos = useRef({ x: 0, y: 0 });
  const editorRef = useRef<HTMLDivElement>(null);

  const handleDragStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!editorRef.current || isResizing) return;
    setIsDragging(true);
    
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    dragStartPos.current = {
      x: clientX - position.x,
      y: clientY - position.y
    };
    
    if (editorRef.current) {
      editorRef.current.style.transition = 'none';
    }
    
    e.preventDefault();
  }, [position.x, position.y, isResizing]);

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || !editorRef.current) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
    
    const maxX = window.innerWidth - editorRef.current.offsetWidth;
    const maxY = window.innerHeight - editorRef.current.offsetHeight;
    
    setPosition({
      x: Math.max(0, Math.min(clientX - dragStartPos.current.x, maxX)),
      y: Math.max(0, Math.min(clientY - dragStartPos.current.y, maxY))
    });
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
    if (editorRef.current) {
      editorRef.current.style.transition = 'all 0.2s ease';
    }
  }, []);

  const handleResizeStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!editorRef.current) return;
    setIsResizing(true);
    
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    
    resizeStartSize.current = { ...panelSize };
    resizeStartPos.current = { x: clientX, y: clientY };
    
    if (editorRef.current) {
      editorRef.current.style.transition = 'none';
    }
    
    e.preventDefault();
    e.stopPropagation();
  }, [panelSize]);

  const handleResizeMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isResizing || !editorRef.current) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
    
    const deltaX = clientX - resizeStartPos.current.x;
    const deltaY = clientY - resizeStartPos.current.y;
    
    const newWidth = Math.max(200, Math.min(window.innerWidth - position.x, resizeStartSize.current.width + deltaX));
    const newHeight = Math.max(200, Math.min(window.innerHeight - position.y, resizeStartSize.current.height + deltaY));
    
    setPanelSize({
      width: newWidth,
      height: newHeight
    });
  }, [isResizing, position.x, position.y]);

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
    if (editorRef.current) {
      editorRef.current.style.transition = 'all 0.2s ease';
    }
  }, []);

  const toggleMaximize = useCallback(() => {
    if (isMaximized) {
      setPanelSize({
        width: Math.min(window.innerWidth * 0.9, 400),
        height: window.innerHeight * 0.6,
      });
    } else {
      setPanelSize({
        width: window.innerWidth - 20,
        height: window.innerHeight - 20,
      });
      setPosition({ x: 10, y: 10 });
    }
    setIsMaximized(!isMaximized);
  }, [isMaximized]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove as EventListener);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }
    if (isResizing) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('touchmove', handleResizeMove as EventListener);
      window.addEventListener('mouseup', handleResizeEnd);
      window.addEventListener('touchend', handleResizeEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove as EventListener);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('touchmove', handleResizeMove as EventListener);
      window.removeEventListener('mouseup', handleResizeEnd);
      window.removeEventListener('touchend', handleResizeEnd);
    };
  }, [isDragging, isResizing, handleDragMove, handleDragEnd, handleResizeMove, handleResizeEnd]);

   const renderTemplate = () => {
    const TemplateComponent = availableTemplates[selectedTemplate]?.component;
    
    if (!TemplateComponent) {
      return (
        <div className="flex items-center justify-center h-full bg-gray-900 text-white p-8 text-center">
          <div>
            <p className="text-xl mb-2">Template not found</p>
            <p className="text-gray-400">The selected template is unavailable.</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="max-w-full overflow-x-hidden h-full">
        <TemplateComponent data={portfolioData} />
      </div>
    );
  };

  const renderEditorContent = () => (
    <div className="bg-gray-800 p-6 rounded-lg overflow-y-auto h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Portfolio Editor</h1>
        <button
          onClick={() => setIsMobileEditorOpen(false)}
          className="lg:hidden p-2 text-gray-300 hover:text-white"
        >
          <FiX size={24} />
        </button>
      </div>

      <TemplateSelector
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        availableTemplates={availableTemplates}
      />

      <BasicInfoEditor
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
        selectedTemplate={selectedTemplate}
      />

      <ExperienceEditor
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
      />

      <EducationEditor
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
      />

      <LeadershipEditor
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
      />

      {selectedTemplate === "medPortfolio" && (
        <CertificationsEditor
          portfolioData={portfolioData}
          setPortfolioData={setPortfolioData}
        />
      )}

      <ColorSchemeEditor
        portfolioData={portfolioData}
        setPortfolioData={setPortfolioData}
      />

      <div className="flex gap-4 mt-8">
        <button
          onClick={onPreview}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
        >
          <FiEye /> Preview
        </button>
        <button
          onClick={onSave}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700 text-white"
        >
          <FiSave /> Save Portfolio
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Desktop Layout - Side by Side */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-8 p-4">
        {/* Preview Column */}
        <div className="border-2 border-gray-700 rounded-lg p-4 overflow-auto relative">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button
              onClick={onPreview}
              className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 rounded hover:bg-blue-700 text-white"
            >
              <FiEye size={16} /> Preview
            </button>
          </div>
          {renderTemplate()}
        </div>

        {/* Editor Column */}
        {renderEditorContent()}
      </div>

      {/* Mobile Layout - Floating Editor */}
      <div className="lg:hidden">
        {/* Preview on mobile takes full screen */}
        <div className="relative h-screen">
          {renderTemplate()}
          
          {/* Floating action button to open editor */}
          {!isMobileEditorOpen && (
            <button
              onClick={() => setIsMobileEditorOpen(true)}
              className="fixed bottom-6 right-6 z-50 p-4 bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 text-white"
            >
              <FiPlus size={24} />
            </button>
          )}
        </div>

        {/* Mobile editor overlay */}
        {isMobileEditorOpen && (
          <div 
            ref={editorRef}
            className="fixed z-50 rounded-lg shadow-xl overflow-hidden border border-gray-600 bg-gray-800"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: `${panelSize.width}px`,
              height: `${panelSize.height}px`,
              touchAction: 'none',
              transition: isDragging || isResizing ? 'none' : 'all 0.2s ease',
              willChange: 'transform',
            }}
          >
            {/* Drag handle */}
            <div 
              className="w-full h-8 bg-gray-700 flex items-center justify-between px-2 cursor-move touch-none select-none"
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
            >
              <div className="flex items-center gap-2">
                <FiMove className="text-gray-400" />
                <span className="text-sm text-gray-300">Editor Panel</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={toggleMaximize}
                  className="p-1 text-gray-300 hover:text-white"
                >
                  {isMaximized ? <FiMinimize size={16} /> : <FiMaximize size={16} />}
                </button>
                <button 
                  onClick={() => setIsMobileEditorOpen(false)}
                  className="p-1 text-gray-300 hover:text-white"
                >
                  <FiX size={16} />
                </button>
              </div>
            </div>
            
            {/* Editor content */}
            <div className="overflow-y-auto h-[calc(100%-32px)]">
              {renderEditorContent()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}