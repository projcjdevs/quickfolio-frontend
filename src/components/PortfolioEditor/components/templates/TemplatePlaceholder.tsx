// src/components/PortfolioEditor/components/templates/TemplatePlaceholder.tsx
export default function TemplatePlaceholder({ name }: { name: string }) {
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