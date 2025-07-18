// src/components/PortfolioEditor.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiSave,
  FiPlus,
  FiTrash2,
  FiBook,
  FiBriefcase,
  FiAward,
  FiEye,
} from "react-icons/fi";
import {
  EducationItem,
  ExperienceItem,
  LeadershipItem,
  ContactInfo,
  ColorScheme,
  PortfolioData,
  DEFAULT_PROFILE,
  DEFAULT_COLORS,
} from "@/components/types";

// Dynamically import templates to avoid SSR issues
import dynamic from 'next/dynamic';

// Available templates mapping with dynamic imports
const AVAILABLE_TEMPLATES = {
  cosmic: {
    name: "Cosmic Glow",
    component: dynamic(() => import("@/components/templates/CosmicGlowPortfolio"), {
      ssr: false,
      loading: () => <TemplatePlaceholder name="Cosmic Glow" />
    })
  },
  simple: {
    name: "Simple Portfolio",
    component: dynamic(() => import("@/components/templates/SimplePortfolio"), {
      ssr: false,
      loading: () => <TemplatePlaceholder name="Simple Portfolio" />
    })
  },
  medical: {
    name: "Medical Minimal",
    component: dynamic(() => import("@/components/templates/MedPortfolio"), {
      ssr: false,
      loading: () => <TemplatePlaceholder name="Medical Minimal" />
    })
  },
};

// Placeholder component while template loads
function TemplatePlaceholder({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gray-900">
      <div className="text-center p-8">
        <div className="animate-pulse w-16 h-16 rounded-full bg-blue-500/20 mx-auto mb-4"></div>
        <h3 className="text-lg font-medium text-white">Loading {name} Template...</h3>
        <p className="text-gray-400 mt-2">Please wait...</p>
      </div>
    </div>
  );
}

// Template skeleton data
const TEMPLATES = {
  education: {
    institution: "",
    degree: "",
    details: "",
  },
  experience: {
    role: "",
    company: "",
    duration: "",
    highlights: [""],
  },
  certification: { // Changed from leadership to certification
    name: "",
    date: "",
    issuer: "",
  },
};

interface PortfolioEditorProps {
  initialTemplate?: string;
}

export default function PortfolioEditor({ initialTemplate = 'cosmic' }: PortfolioEditorProps) {
  const router = useRouter();
  
  // Template selection state
  const [selectedTemplate, setSelectedTemplate] = useState<string>(initialTemplate);
  
  // Portfolio data state
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('portfolio-data');
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...DEFAULT_PROFILE,
            ...parsed,
            // Ensure nested objects
            contact: { ...DEFAULT_PROFILE.contact, ...(parsed.contact || {}) },
            config: { 
              colors: { ...DEFAULT_COLORS, ...(parsed.config?.colors || {}) },
              particleDensity: parsed.config?.particleDensity || 50
            }
          };
        }
      } catch (err) {
        console.error("Error loading saved data:", err);
        // Fall back to default if JSON parsing fails
      }
    }
    return DEFAULT_PROFILE;
  });

  // Handle template loading errors
  const [templateError, setTemplateError] = useState<string | null>(null);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portfolio-data', JSON.stringify(portfolioData));
    } catch (err) {
      console.error("Error saving to localStorage:", err);
    }
  }, [portfolioData]);

  // Render the template with error handling
  const renderTemplate = () => {
    try {
      const TemplateComponent = AVAILABLE_TEMPLATES[selectedTemplate as keyof typeof AVAILABLE_TEMPLATES]?.component;
      
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
      
      return <TemplateComponent data={portfolioData} />;
    } catch (error) {
      console.error("Error rendering template:", error);
      return (
        <div className="flex items-center justify-center h-full bg-gray-900 text-white p-8 text-center">
          <div>
            <p className="text-xl mb-2">Error rendering template</p>
            <p className="text-gray-400">Please try selecting a different template.</p>
          </div>
        </div>
      );
    }
  };

  // Handler for previewing the portfolio
  const handlePreview = () => {
    try {
      // Save current data to localStorage before preview
      localStorage.setItem(
        "preview-data",
        JSON.stringify({
          data: portfolioData || DEFAULT_PROFILE,
          templateId: selectedTemplate || "cosmic",
        })
      );

      // Open preview in a new tab
      window.open("/preview", "_blank");
    } catch (err) {
      console.error("Error saving preview data:", err);
      alert("There was an error preparing the preview. Please try again.");
    }
  };

  // Handler for saving portfolio to backend
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

      if (!response.ok) {
        throw new Error("Save failed");
      }

      alert("Saved successfully!");
    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save. Using local storage instead.");
      localStorage.setItem("portfolio-data", JSON.stringify(portfolioData));
    }
  };

  // Field update handlers
  const updateBasicInfo = (field: keyof PortfolioData, value: string) => {
    setPortfolioData((prev) => ({ ...prev, [field]: value }));
  };

  const updateContact = (field: keyof ContactInfo, value: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  const addItem = (field: "education" | "experience" | "certifications" | "leadership") => {
    setPortfolioData((prev) => ({
      ...prev,
      [field]: [
        ...(prev[field] || []),
        TEMPLATES[
          field === "certifications" || field === "leadership"
            ? "certification"
            : field
        ],
      ],
    }));
  };

  const updateItem = (
    field: "education" | "experience" | "certifications" | "leadership",
    index: number,
    key: string,
    value: any
  ) => {
    setPortfolioData((prev) => {
      const updated = [...(prev[field] || [])];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, [field]: updated };
    });
  };

  const removeItem = (
    field: "education" | "experience" | "certifications" | "leadership",
    index: number
  ) => {
    setPortfolioData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index),
    }));
  };

  const updateColor = (key: keyof ColorScheme, value: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        colors: {
          ...prev.config?.colors,
          [key]: value,
        },
      },
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen p-4 bg-gray-900">
      {/* Preview Column */}
      <div className="border-2 border-gray-700 rounded-lg p-4 overflow-auto relative">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={handlePreview}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 rounded hover:bg-blue-700 text-white"
          >
            <FiEye size={16} /> Preview
          </button>
        </div>
        {renderTemplate()}
      </div>

      {/* Editor Column */}
      <div className="bg-gray-800 p-6 rounded-lg overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-white">Portfolio Editor</h1>

        {/* Template Selector */}
        <EditorSection title="Choose Template">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {Object.entries(AVAILABLE_TEMPLATES).map(([id, template]) => (
              <div
                key={id}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedTemplate === id
                    ? "border-blue-500 bg-blue-900/20"
                    : "border-gray-600 hover:border-gray-400"
                }`}
                onClick={() => setSelectedTemplate(id)}
              >
                <div className="font-medium mb-1">{template.name}</div>
                <div className="text-xs text-gray-400">
                  {id === "cosmic"
                    ? "Dark theme with particle effects"
                    : "Clean minimal light theme"}
                </div>
              </div>
            ))}
          </div>
        </EditorSection>

        {/* Basic Info Section */}
        <EditorSection title="Basic Information">
          <TextInput
            label="Full Name"
            value={portfolioData.name}
            onChange={(e) => updateBasicInfo("name", e.target.value)}
          />
          <TextInput
            label="Professional Title"
            value={portfolioData.title}
            onChange={(e) => updateBasicInfo("title", e.target.value)}
          />
          {selectedTemplate === "medical" && (
            <TextInput
              label="Professional Summary"
              value={portfolioData.summary || ""} 
              onChange={(e) => updateBasicInfo("summary", e.target.value)}
            />
          )}
        </EditorSection>

        {/* Contact Info Section */}
        <EditorSection title="Contact Information">
          <TextInput
            label="Email"
            value={portfolioData.contact?.email || ""}
            onChange={(e) => updateContact("email", e.target.value)}
          />
          {selectedTemplate !== "medical" && (
            <TextInput
              label="GitHub Username"
              value={portfolioData.contact?.github || ""}
              onChange={(e) => updateContact("github", e.target.value)}
            />
          )}
          <TextInput
            label="LinkedIn Username"
            value={portfolioData.contact?.linkedin || ""}
            onChange={(e) => updateContact("linkedin", e.target.value)}
          />
          {selectedTemplate === "medical" && (
            <TextInput
              label="PRC License Number"
              value={portfolioData.contact?.prc || ""}
              onChange={(e) => updateContact("prc", e.target.value)}
            />
          )}
        </EditorSection>

        {/* Education Section */}
        <EditorSection
          title="Education"
          icon={<FiBook />}
          onAdd={() => addItem("education")}
        >
          {portfolioData.education?.map((edu, i) => (
            <ItemEditor
              key={`edu-${i}`}
              item={edu}
              fields={[
                { key: "institution", label: "Institution" },
                { key: "degree", label: "Degree" },
                { key: "details", label: "Details" },
              ]}
              onUpdate={(key, value) => updateItem("education", i, key, value)}
              onRemove={() => removeItem("education", i)}
            />
          ))}
        </EditorSection>

        {/* Experience Section */}
        <EditorSection
          title="Experience"
          icon={<FiBriefcase />}
          onAdd={() => addItem("experience")}
        >
          {portfolioData.experience?.map((exp, i) => (
            <ItemEditor
              key={`exp-${i}`}
              item={exp}
              fields={[
                { key: "role", label: "Role" },
                { key: "company", label: "Company" },
                { key: "duration", label: "Duration" },
              ]}
              onUpdate={(key: string, value: any) => updateItem("experience", i, key, value)}
              onRemove={() => removeItem("experience", i)}
            >
              <div className="mt-4">
                <label className="block mb-2 font-medium text-gray-300">
                  Highlights
                </label>
                {exp.highlights?.map((highlight, hi) => (
                  <div
                    key={`exp-${i}-highlight-${hi}`}
                    className="flex gap-2 mb-2"
                  >
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => {
                        const newHighlights = [...exp.highlights];
                        newHighlights[hi] = e.target.value;
                        updateItem(
                          "experience",
                          i,
                          "highlights",
                          newHighlights
                        );
                      }}
                      className="flex-1 p-2 bg-gray-700 rounded text-white"
                    />
                    <button
                      onClick={() => {
                        const newHighlights = exp.highlights.filter(
                          (_, hii) => hii !== hi
                        );
                        updateItem(
                          "experience",
                          i,
                          "highlights",
                          newHighlights
                        );
                      }}
                      className="p-2 text-red-400 hover:text-red-300"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newHighlights = [...exp.highlights, ""];
                    updateItem("experience", i, "highlights", newHighlights);
                  }}
                  className="flex items-center gap-1 mt-2 text-sm text-yellow-400 hover:text-yellow-300"
                >
                  <FiPlus size={14} /> Add Highlight
                </button>
              </div>
            </ItemEditor>
          ))}
        </EditorSection>

        {/* Certifications Section (replaces Leadership for Medical Minimal) */}
        <EditorSection
          title={selectedTemplate === "medical" ? "Certifications" : "Leadership"}
          icon={selectedTemplate === "medical" ? <FiAward /> : <FiAward />}
          onAdd={() => addItem(selectedTemplate === "medical" ? "certifications" : "leadership")}
        >
          {(portfolioData[selectedTemplate === "medical" ? "certifications" : "leadership"] || []).map((item, i) => (
            <ItemEditor
              key={`${selectedTemplate === "medical" ? "cert" : "lead"}-${i}`}
              item={item}
              fields={[
                { key: "name", label: selectedTemplate === "medical" ? "Certification Name" : "Role" },
                { key: "date", label: selectedTemplate === "medical" ? "Date" : "Duration" },
                { key: "issuer", label: selectedTemplate === "medical" ? "Issuer" : "Organization", optional: true },
              ]}
              onUpdate={(key, value) => updateItem(selectedTemplate === "medical" ? "certifications" : "leadership", i, key, value)}
              onRemove={() => removeItem(selectedTemplate === "medical" ? "certifications" : "leadership", i)}
            />
          ))}
        </EditorSection>

        {/* Color Customization */}
        <EditorSection title="Color Scheme">
          {Object.entries(DEFAULT_COLORS).map(([key]) => (
            <div key={key} className="mb-4">
              <label className="block mb-1 capitalize text-gray-300">
                {key}
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={
                    portfolioData.config?.colors?.[key as keyof ColorScheme] ||
                    DEFAULT_COLORS[key as keyof ColorScheme]
                  }
                  onChange={(e) =>
                    updateColor(key as keyof ColorScheme, e.target.value)
                  }
                  className="w-10 h-10"
                />
                <input
                  type="text"
                  value={
                    portfolioData.config?.colors?.[key as keyof ColorScheme] ||
                    DEFAULT_COLORS[key as keyof ColorScheme]
                  }
                  onChange={(e) =>
                    updateColor(key as keyof ColorScheme, e.target.value)
                  }
                  className="flex-1 p-2 bg-gray-700 rounded text-white"
                />
              </div>
            </div>
          ))}
        </EditorSection>

        {/* Actions */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handlePreview}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white"
          >
            <FiEye /> Preview
          </button>
          
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700 text-white"
          >
            <FiSave /> Save Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function EditorSection({
  title,
  icon,
  children,
  onAdd,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onAdd?: () => void;
}) {
  return (
    <div className="mb-8 p-4 border border-gray-700 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2 text-white">
          {icon && <span className="text-yellow-500">{icon}</span>}
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-700 rounded hover:bg-gray-600 text-white"
          >
            <FiPlus size={14} /> Add
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  disabled = false,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block mb-1 font-medium text-gray-300">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full p-2 bg-gray-700 rounded text-white"
      />
    </div>
  );
}

function ItemEditor({
  item,
  fields,
  children,
  onUpdate,
  onRemove,
}: {
  item: any;
  fields: { key: string; label: string; optional?: boolean }[];
  children?: React.ReactNode;
  onUpdate: (key: string, value: any) => void;
  onRemove: () => void;
}) {
  return (
    <div className="mb-6 p-4 bg-gray-700 rounded-lg">
      <div className="flex justify-end">
        <button
          onClick={onRemove}
          className="p-1 text-red-400 hover:text-red-300"
        >
          <FiTrash2 />
        </button>
      </div>
      {fields.map((field) => (
        <TextInput
          key={field.key}
          label={field.label}
          value={item[field.key] || ""}
          onChange={(e) => onUpdate(field.key, e.target.value)}
          disabled={field.optional && !item[field.key]} // Disable if optional and empty
        />
      ))}
      {children}
    </div>
  );
}