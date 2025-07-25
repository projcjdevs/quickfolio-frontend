import { FiPlus, FiTrash2 } from "react-icons/fi";
import { PortfolioData, EducationItem } from "@/components/PortfolioEditor/types";
import ItemEditor from "@/components/PortfolioEditor/components/ItemEditor";

interface EducationEditorProps {
  portfolioData: PortfolioData;
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function EducationEditor({
  portfolioData,
  setPortfolioData,
}: EducationEditorProps) {
  const addItem = () => {
    setPortfolioData((prev) => ({
      ...prev,
      education: [
        ...(prev.education || []),
        {
          institution: "",
          degree: "",
          details: "",
        } satisfies EducationItem, // Ensures type matches
      ],
    }));
  };

  const updateItem = (
    index: number, 
    key: keyof EducationItem, 
    value: string
  ) => {
    setPortfolioData((prev) => {
      const currentEducation = prev.education || [];
      const updated = [...currentEducation];
      updated[index] = { 
        ...updated[index], 
        [key]: value 
      };
      return { 
        ...prev, 
        education: updated 
      };
    });
  };

  const removeItem = (index: number) => {
    setPortfolioData((prev) => ({
      ...prev,
      education: (prev.education || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="mb-8 p-4 border border-gray-700 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Education</h3>
        <button
          onClick={addItem}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-700 rounded hover:bg-gray-600 text-white"
        >
          <FiPlus size={14} /> Add
        </button>
      </div>

      {portfolioData.education?.map((edu, i) => (
        <ItemEditor
          key={`edu-${i}`}
          item={edu}
          fields={[
            { key: "institution", label: "Institution" },
            { key: "degree", label: "Degree" },
            { key: "details", label: "Details" },
          ]}
          onUpdate={(key, value) => updateItem(i, key as keyof EducationItem, value)}
          onRemove={() => removeItem(i)}
        />
      ))}
    </div>
  );
}