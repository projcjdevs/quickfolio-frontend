import { FiPlus, FiTrash2 } from "react-icons/fi";
import { PortfolioData, ExperienceItem } from "@/components/PortfolioEditor/types";
import ItemEditor from "@/components/PortfolioEditor/components/ItemEditor";

interface ExperienceEditorProps {
  portfolioData: PortfolioData;
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function ExperienceEditor({
  portfolioData,
  setPortfolioData,
}: ExperienceEditorProps) {
  const addItem = () => {
    setPortfolioData((prev) => ({
      ...prev,
      experience: [
        ...(prev.experience || []),
        {
          role: "",
          company: "",
          duration: "",
          highlights: [""],
        } satisfies ExperienceItem,
      ],
    }));
  };

  const updateItem = (
    index: number,
    key: keyof ExperienceItem,
    value: string | string[]
  ) => {
    setPortfolioData((prev) => {
      const currentExperience = prev.experience || [];
      const updated = [...currentExperience];
      updated[index] = {
        ...updated[index],
        [key]: value,
      };
      return { ...prev, experience: updated };
    });
  };

  const removeItem = (index: number) => {
    setPortfolioData((prev) => ({
      ...prev,
      experience: (prev.experience || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="mb-8 p-4 border border-gray-700 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Experience</h3>
        <button
          onClick={addItem}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-700 rounded hover:bg-gray-600 text-white"
        >
          <FiPlus size={14} /> Add
        </button>
      </div>

      {portfolioData.experience?.map((exp, i) => (
        <ItemEditor
          key={`exp-${i}`}
          item={exp}
          fields={[
            { key: "role", label: "Role" },
            { key: "company", label: "Company" },
            { key: "duration", label: "Duration" },
          ]}
          onUpdate={(key, value) => updateItem(i, key as keyof ExperienceItem, value)}
          onRemove={() => removeItem(i)}
        >
          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-300">
              Highlights
            </label>
            {exp.highlights?.map((highlight, hi) => (
              <div key={`exp-${i}-highlight-${hi}`} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => {
                    const newHighlights = [...exp.highlights];
                    newHighlights[hi] = e.target.value;
                    updateItem(i, "highlights", newHighlights);
                  }}
                  className="flex-1 p-2 bg-gray-700 rounded text-white"
                />
                <button
                  onClick={() => {
                    const newHighlights = exp.highlights.filter(
                      (_, hii) => hii !== hi
                    );
                    updateItem(i, "highlights", newHighlights);
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
                updateItem(i, "highlights", newHighlights);
              }}
              className="flex items-center gap-1 mt-2 text-sm text-yellow-400 hover:text-yellow-300"
            >
              <FiPlus size={14} /> Add Highlight
            </button>
          </div>
        </ItemEditor>
      ))}
    </div>
  );
}