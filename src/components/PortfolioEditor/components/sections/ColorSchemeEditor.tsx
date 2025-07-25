'use client';

import { PortfolioData } from "@/components/PortfolioEditor/types";

interface ColorSchemeEditorProps {
  portfolioData: PortfolioData;
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

const EDITABLE_COLORS = ['primary', 'secondary', 'background', 'text'] as const;

export default function ColorSchemeEditor({
  portfolioData,
  setPortfolioData,
}: ColorSchemeEditorProps) {
  const updateColor = (key: typeof EDITABLE_COLORS[number], value: string) => {
    setPortfolioData(prev => {
      // Only update if the color value actually changed
      if (prev.config?.colors?.[key] === value) return prev;
      
      return {
        ...prev,
        config: {
          ...prev.config,
          colors: {
            ...prev.config.colors,
            [key]: value,
          },
        },
      };
    });
  };

  // Memoize current colors to prevent unnecessary re-renders
  const currentColors = portfolioData.config?.colors || {};

  return (
    <div className="mb-8 p-4 border border-gray-700 rounded-lg">
      <h3 className="text-xl font-bold text-white mb-4">Color Scheme</h3>
      {EDITABLE_COLORS.map((key) => {
        const colorValue = currentColors[key] ?? '';
        const label = key.replace(/([A-Z])/g, ' $1').trim();
        const inputId = `color-${key}`;
        
        return (
          <div key={key} className="mb-4">
            <label 
              htmlFor={inputId}
              className="block mb-1 capitalize text-gray-300"
            >
              {label}
            </label>
            <div className="flex gap-2 items-center">
              <input
                id={inputId}
                type="color"
                value={colorValue}
                onChange={(e) => updateColor(key, e.target.value)}
                className="w-10 h-10 cursor-pointer rounded border border-gray-600"
                aria-label={`Select ${label} color`}
              />
              <input
                type="text"
                value={colorValue}
                onChange={(e) => updateColor(key, e.target.value)}
                className="flex-1 p-2 bg-gray-700 rounded text-white border border-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                aria-label={`${label} color value`}
                placeholder={`Hex code (e.g. ${key === 'background' ? '#0a0a23' : '#facc15'})`}
                pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}