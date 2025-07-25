// src/components/PortfolioEditor/components/templates/TemplateSelector.tsx
export default function TemplateSelector({
  selectedTemplate,
  setSelectedTemplate,
  availableTemplates,
}: {
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  availableTemplates: any;
}) {
  return (
    <div className="mb-8 p-4 border border-gray-700 rounded-lg">
      <h3 className="text-xl font-bold text-white mb-4">Choose Template</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {Object.entries(availableTemplates).map(([id, template]: [string, any]) => (
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
                : id === "simple"
                ? "Clean minimal light theme"
                : "Professional medical theme"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}