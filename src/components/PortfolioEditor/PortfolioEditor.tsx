"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiEye } from "react-icons/fi";
import dynamic from 'next/dynamic';
import { PortfolioData, DEFAULT_PROFILE, DEFAULT_COLORS } from "@/components/PortfolioEditor/types";
import EditorShell from "@/components/PortfolioEditor/components/EditorShell";
import TemplatePlaceholder from "@/components/PortfolioEditor/components/templates/TemplatePlaceholder";

type TemplateComponent = React.ComponentType<{ data: PortfolioData }>;

const AVAILABLE_TEMPLATES = {
  cosmic: {
    name: "Cosmic Glow",
    component: dynamic(() => import("@/components/PortfolioEditor/components/templates/CosmicGlowPortfolio").then(mod => ({ default: mod.default })), {
      ssr: false,
      loading: () => <TemplatePlaceholder name="Cosmic Glow" />
    }) as TemplateComponent
  },
  simple: {
    name: "Simple Portfolio",
    component: dynamic(() => import("@/components/PortfolioEditor/components/templates/SimplePortfolio").then(mod => ({ default: mod.default })), {
      ssr: false,
      loading: () => <TemplatePlaceholder name="Simple Portfolio" />
    }) as TemplateComponent
  },
  medPortfolio: {
    name: "Medical Minimal",
    component: dynamic(() => import("@/components/PortfolioEditor/components/templates/MedPortfolio").then(mod => ({ default: mod.default })), {
      ssr: false,
      loading: () => <TemplatePlaceholder name="Medical Minimal" />
    }) as TemplateComponent
  },
};

type TemplateKey = keyof typeof AVAILABLE_TEMPLATES;

interface PortfolioEditorProps {
  initialTemplate?: TemplateKey;
}

export default function PortfolioEditor({ initialTemplate = 'cosmic' }: PortfolioEditorProps) {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>(initialTemplate);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    const defaultData = {
      ...DEFAULT_PROFILE,
      config: { 
        ...DEFAULT_PROFILE.config, 
        template: initialTemplate 
      }
    };

    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('portfolio-data');
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...defaultData,
            ...parsed,
            contact: { 
              ...defaultData.contact, 
              ...(parsed.contact || {}) 
            },
            config: { 
              ...defaultData.config,
              colors: { 
                ...defaultData.config.colors, 
                ...(parsed.config?.colors || {}) 
              },
              template: (parsed.config?.template as TemplateKey) || initialTemplate
            }
          };
        }
      } catch (err) {
        console.error("Error loading saved data:", err);
      }
    }
    return defaultData;
  });


  // Sync template with portfolio data
  useEffect(() => {
    setPortfolioData(prev => ({
      ...prev,
      config: {
        ...prev.config,
        template: selectedTemplate,
      },
    }));
  }, [selectedTemplate]);

  // Auto-save to localStorage
  useEffect(() => {
    const saveData = () => {
      try {
        localStorage.setItem('portfolio-data', JSON.stringify(portfolioData));
        localStorage.setItem(
          'preview-data',
          JSON.stringify({
            data: portfolioData,
            templateId: selectedTemplate,
          })
        );
      } catch (err) {
        console.error("Error saving to localStorage:", err);
      }
    };

    if (typeof window !== 'undefined') {
      saveData();
    }
  }, [portfolioData, selectedTemplate]);

  const handlePreview = () => {
    try {
      localStorage.setItem(
        'preview-data',
        JSON.stringify({
          data: portfolioData,
          templateId: selectedTemplate,
        })
      );
      window.open("/preview", "_blank");
    } catch (err) {
      console.error("Error saving preview data:", err);
      alert("There was an error preparing the preview. Please try again.");
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: portfolioData,
          templateId: selectedTemplate,
        }),
      });

      if (!response.ok) throw new Error("Save failed");
      alert("Saved successfully!");
    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save. Using local storage instead.");
    }
  };

  return (
    <EditorShell
      selectedTemplate={selectedTemplate}
      setSelectedTemplate={(template: string) => setSelectedTemplate(template as TemplateKey)}
      portfolioData={portfolioData}
      setPortfolioData={setPortfolioData}
      availableTemplates={AVAILABLE_TEMPLATES}
      onPreview={handlePreview}
      onSave={handleSave}
    />
  );
}