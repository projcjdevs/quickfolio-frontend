"use client";

import { useState, useEffect } from 'react';
import CosmicGlowPortfolio from './SpacePS';
import { FiSave, FiPlus, FiTrash2, FiBook, FiBriefcase, FiAward } from 'react-icons/fi';

// Type Definitions
interface EducationItem {
  institution: string;
  degree: string;
  details: string;
}

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  highlights: string[];
}

interface LeadershipItem {
  role: string;
  organization: string;
  duration: string;
  highlights: string[];
}

interface ContactInfo {
  email?: string;
  github?: string;
  linkedin?: string;
}

interface ColorScheme {
  bg: string;
  text: string;
  accent: string;
  highlight: string;
  nebula: string;
  dust: string;
  glow: string;
}

interface PortfolioData {
  name: string;
  title: string;
  education?: EducationItem[];
  experience?: ExperienceItem[];
  leadership?: LeadershipItem[];
  contact: ContactInfo;
  config?: {
    colors?: Partial<ColorScheme>;
    particleDensity?: number;
  };
}

const DEFAULT_COLORS: ColorScheme = {
  bg: "#0a0a0a",
  text: "#e5e5e5",
  accent: "#facc15",
  highlight: "#3b82f6",
  nebula: "#7c3aed",
  dust: "#facc1560",
  glow: "#b03aff70"
};

const DEFAULT_PROFILE: PortfolioData = {
  name: "Your Name",
  title: "Your Profession",
  education: [],
  experience: [],
  leadership: [],
  contact: {},
  config: {
    colors: DEFAULT_COLORS,
    particleDensity: 50
  }
};

const TEMPLATES = {
  education: {
    institution: "",
    degree: "",
    details: ""
  },
  experience: {
    role: "",
    company: "",
    duration: "",
    highlights: [""]
  },
  leadership: {
    role: "",
    organization: "",
    duration: "",
    highlights: [""]
  }
};

export default function PortfolioEditor() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-data');
      return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
    }
    return DEFAULT_PROFILE;
  });

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('portfolio-data', JSON.stringify(portfolioData));
  }, [portfolioData]);

  const handleSave = async () => {
  try {
    const response = await fetch('/api/portfolio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(portfolioData)
    });

    if (!response.ok) {
      throw new Error('Save failed');
    }

    alert('Saved successfully!');
  } catch (error) {
    console.error('Error saving:', error);
    alert('Failed to save. Using local storage instead.');
    localStorage.setItem('portfolio-data', JSON.stringify(portfolioData));
  }
};

  // Field update handlers
  const updateBasicInfo = (field: keyof PortfolioData, value: string) => {
    setPortfolioData(prev => ({ ...prev, [field]: value }));
  };

  const updateContact = (field: keyof ContactInfo, value: string) => {
    setPortfolioData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  const addItem = (field: 'education' | 'experience' | 'leadership') => {
    setPortfolioData(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), TEMPLATES[field]]
    }));
  };

  const updateItem = (
    field: 'education' | 'experience' | 'leadership',
    index: number,
    key: string,
    value: any
  ) => {
    setPortfolioData(prev => {
      const updated = [...(prev[field] || [])];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, [field]: updated };
    });
  };

  const removeItem = (
    field: 'education' | 'experience' | 'leadership',
    index: number
  ) => {
    setPortfolioData(prev => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index)
    }));
  };

  const updateColor = (key: keyof ColorScheme, value: string) => {
    setPortfolioData(prev => ({
      ...prev,
      config: {
        ...prev.config,
        colors: {
          ...prev.config?.colors,
          [key]: value
        }
      }
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen p-4 bg-gray-900">
      {/* Preview Column */}
      <div className="border-2 border-gray-700 rounded-lg p-4 overflow-auto">
        <CosmicGlowPortfolio data={portfolioData} />
      </div>

      {/* Editor Column */}
      <div className="bg-gray-800 p-6 rounded-lg overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-white">Portfolio Editor</h1>

        {/* Basic Info Section */}
        <EditorSection title="Basic Information">
          <TextInput
            label="Full Name"
            value={portfolioData.name}
            onChange={(e) => updateBasicInfo('name', e.target.value)}
          />
          <TextInput
            label="Professional Title"
            value={portfolioData.title}
            onChange={(e) => updateBasicInfo('title', e.target.value)}
          />
        </EditorSection>

        {/* Contact Info Section */}
        <EditorSection title="Contact Information">
          <TextInput
            label="Email"
            value={portfolioData.contact.email || ''}
            onChange={(e) => updateContact('email', e.target.value)}
          />
          <TextInput
            label="GitHub Username"
            value={portfolioData.contact.github || ''}
            onChange={(e) => updateContact('github', e.target.value)}
          />
          <TextInput
            label="LinkedIn Username"
            value={portfolioData.contact.linkedin || ''}
            onChange={(e) => updateContact('linkedin', e.target.value)}
          />
        </EditorSection>

        {/* Education Section */}
        <EditorSection 
          title="Education" 
          icon={<FiBook />}
          onAdd={() => addItem('education')}
        >
          {portfolioData.education?.map((edu, i) => (
            <ItemEditor
              key={`edu-${i}`}
              item={edu}
              fields={[
                { key: 'institution', label: 'Institution' },
                { key: 'degree', label: 'Degree' },
                { key: 'details', label: 'Details' }
              ]}
              onUpdate={(key, value) => updateItem('education', i, key, value)}
              onRemove={() => removeItem('education', i)}
            />
          ))}
        </EditorSection>

        {/* Experience Section */}
        <EditorSection 
          title="Experience" 
          icon={<FiBriefcase />}
          onAdd={() => addItem('experience')}
        >
          {portfolioData.experience?.map((exp, i) => (
            <ItemEditor
              key={`exp-${i}`}
              item={exp}
              fields={[
                { key: 'role', label: 'Role' },
                { key: 'company', label: 'Company' },
                { key: 'duration', label: 'Duration' }
              ]}
              onUpdate={(key, value) => updateItem('experience', i, key, value)}
              onRemove={() => removeItem('experience', i)}
            >
              <div className="mt-4">
                <label className="block mb-2 font-medium text-gray-300">Highlights</label>
                {exp.highlights?.map((highlight, hi) => (
                  <div key={`exp-${i}-highlight-${hi}`} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => {
                        const newHighlights = [...exp.highlights];
                        newHighlights[hi] = e.target.value;
                        updateItem('experience', i, 'highlights', newHighlights);
                      }}
                      className="flex-1 p-2 bg-gray-700 rounded text-white"
                    />
                    <button
                      onClick={() => {
                        const newHighlights = exp.highlights.filter((_, hii) => hii !== hi);
                        updateItem('experience', i, 'highlights', newHighlights);
                      }}
                      className="p-2 text-red-400 hover:text-red-300"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newHighlights = [...exp.highlights, ''];
                    updateItem('experience', i, 'highlights', newHighlights);
                  }}
                  className="flex items-center gap-1 mt-2 text-sm text-yellow-400 hover:text-yellow-300"
                >
                  <FiPlus size={14} /> Add Highlight
                </button>
              </div>
            </ItemEditor>
          ))}
        </EditorSection>

        {/* Leadership Section */}
        <EditorSection 
          title="Leadership" 
          icon={<FiAward />}
          onAdd={() => addItem('leadership')}
        >
          {portfolioData.leadership?.map((lead, i) => (
            <ItemEditor
              key={`lead-${i}`}
              item={lead}
              fields={[
                { key: 'role', label: 'Role' },
                { key: 'organization', label: 'Organization' },
                { key: 'duration', label: 'Duration' }
              ]}
              onUpdate={(key, value) => updateItem('leadership', i, key, value)}
              onRemove={() => removeItem('leadership', i)}
            />
          ))}
        </EditorSection>

        {/* Color Customization */}
        <EditorSection title="Color Scheme">
          {Object.entries(DEFAULT_COLORS).map(([key]) => (
            <div key={key} className="mb-4">
              <label className="block mb-1 capitalize text-gray-300">{key}</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={portfolioData.config?.colors?.[key as keyof ColorScheme] || DEFAULT_COLORS[key as keyof ColorScheme]}
                  onChange={(e) => updateColor(key as keyof ColorScheme, e.target.value)}
                  className="w-10 h-10"
                />
                <input
                  type="text"
                  value={portfolioData.config?.colors?.[key as keyof ColorScheme] || DEFAULT_COLORS[key as keyof ColorScheme]}
                  onChange={(e) => updateColor(key as keyof ColorScheme, e.target.value)}
                  className="flex-1 p-2 bg-gray-700 rounded text-white"
                />
              </div>
            </div>
          ))}
        </EditorSection>

        {/* Save Button */}
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700 transition mt-8 w-full justify-center text-white"
        >
          <FiSave /> Save Portfolio
        </button>
      </div>
    </div>
  );
}

// Helper Components
function EditorSection({ 
  title, 
  icon, 
  children, 
  onAdd 
}: { 
  title: string; 
  icon?: React.ReactNode;
  children: React.ReactNode; 
  onAdd?: () => void 
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
  onChange 
}: { 
  label: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
}) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium text-gray-300">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
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
  onRemove 
}: { 
  item: any;
  fields: { key: string; label: string }[];
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
          value={item[field.key] || ''}
          onChange={(e) => onUpdate(field.key, e.target.value)}
        />
      ))}
      {children}
    </div>
  );
}