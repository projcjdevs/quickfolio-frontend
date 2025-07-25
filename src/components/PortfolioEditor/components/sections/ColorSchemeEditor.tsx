import { PortfolioData, DEFAULT_COLORS } from "@/components/PortfolioEditor/types";

interface ColorSchemeEditorProps {
  portfolioData: PortfolioData;
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function ColorSchemeEditor({
  portfolioData,
  setPortfolioData,
}: ColorSchemeEditorProps) {
  const updateColor = (key: keyof typeof DEFAULT_COLORS, value: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      config: {
        ...prev.config,
        colors: {
          ...prev.config.colors,
          [key]: value,
        },
      },
    }));
  };

  return (
    <div className="mb-8 p-4 border border-gray-700 rounded-lg">
      <h3 className="text-xl font-bold text-white mb-4">Color Scheme</h3>
      {Object.entries(DEFAULT_COLORS).map(([key]) => (
        <div key={key} className="mb-4">
          <label className="block mb-1 capitalize text-gray-300">
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <div className="flex gap-2">
            <input
              type="color"
              value={
                portfolioData.config?.colors?.[key as keyof typeof DEFAULT_COLORS] ||
                DEFAULT_COLORS[key as keyof typeof DEFAULT_COLORS]
              }
              onChange={(e) => updateColor(key as keyof typeof DEFAULT_COLORS, e.target.value)}
              className="w-10 h-10 cursor-pointer"
            />
            <input
              type="text"
              value={
                portfolioData.config?.colors?.[key as keyof typeof DEFAULT_COLORS] ||
                DEFAULT_COLORS[key as keyof typeof DEFAULT_COLORS]
              }
              onChange={(e) => updateColor(key as keyof typeof DEFAULT_COLORS, e.target.value)}
              className="flex-1 p-2 bg-gray-700 rounded text-white"
            />
          </div>
        </div>
      ))}
    </div>
  );
}