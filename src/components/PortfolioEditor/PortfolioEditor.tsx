"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiEye } from "react-icons/fi";
import dynamic from 'next/dynamic';
import { PortfolioData, DEFAULT_PROFILE, TEMPLATE_DEFAULT_COLORS } from "@/components/PortfolioEditor/types";
import EditorShell from "@/components/PortfolioEditor/components/EditorShell";
import TemplatePlaceholder from "@/components/PortfolioEditor/components/templates/TemplatePlaceholder";

// Define the exact props type for template components
type TemplateComponentProps = {
  data: PortfolioData; // Make data required
};

type TemplateComponent = React.ComponentType<TemplateComponentProps>;

type TemplateKey = keyof typeof TEMPLATE_DEFAULT_COLORS;

// Create a typed dynamic import function
const createDynamicTemplate = (loader: () => Promise<{ default: React.ComponentType<TemplateComponentProps> }>) => {
  return dynamic(loader, {
    ssr: false,
    loading: () => <TemplatePlaceholder name="Loading..." />
  }) as TemplateComponent; // Explicit cast to TemplateComponent
};

const AVAILABLE_TEMPLATES: Record<TemplateKey, {
  name: string;
  component: TemplateComponent;
}> = {
  cosmic: {
    name: "Cosmic Glow",
    component: createDynamicTemplate(() => import("@/components/PortfolioEditor/components/templates/CosmicGlowPortfolio"))
  },
  medPortfolio: {
    name: "Medical Minimal",
    component: createDynamicTemplate(() => import("@/components/PortfolioEditor/components/templates/MedPortfolio"))
  },
  minimal: {
    name: "Simple Portfolio",
    component: createDynamicTemplate(() => import("@/components/PortfolioEditor/components/templates/SimplePortfolio"))
  },
};

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
        template: initialTemplate,
        colors: {
          primary: TEMPLATE_DEFAULT_COLORS[initialTemplate].primary,
          secondary: TEMPLATE_DEFAULT_COLORS[initialTemplate].secondary,
          background: TEMPLATE_DEFAULT_COLORS[initialTemplate].background,
          text: TEMPLATE_DEFAULT_COLORS[initialTemplate].text,
        }
      }
    };

    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('portfolio-data');
        if (saved) {
          const parsed = JSON.parse(saved);
          const template = (parsed.config?.template as TemplateKey) || initialTemplate;
          
          // Extract only non-editable colors from saved data
          const { primary, secondary, background, text, ...otherColors } = parsed.config?.colors || {};
          
          return {
            ...defaultData,
            ...parsed,
            contact: { 
              ...defaultData.contact, 
              ...(parsed.contact || {}) 
            },
            config: { 
              ...defaultData.config,
              template,
              colors: { 
                primary: TEMPLATE_DEFAULT_COLORS[template].primary,
                secondary: TEMPLATE_DEFAULT_COLORS[template].secondary,
                background: TEMPLATE_DEFAULT_COLORS[template].background,
                text: TEMPLATE_DEFAULT_COLORS[template].text,
                ...otherColors
              },
            }
          };
        }
      } catch (err) {
        console.error("Error loading saved data:", err);
      }
    }
    return defaultData;
  });

  // Sync template with portfolio data and apply template-specific colors
  useEffect(() => {
    setPortfolioData(prev => {
      const templateColors = TEMPLATE_DEFAULT_COLORS[selectedTemplate];
      // Extract only non-editable colors from previous data
      const { primary, secondary, background, text, ...otherColors } = prev.config.colors || {};
      
      return {
        ...prev,
        config: {
          ...prev.config,
          template: selectedTemplate,
          colors: {
            primary: templateColors.primary,
            secondary: templateColors.secondary,
            background: templateColors.background,
            text: templateColors.text,
            ...otherColors
          },
        },
      };
    });
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