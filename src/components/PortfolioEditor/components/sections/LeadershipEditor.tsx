import { FiPlus, FiTrash2 } from "react-icons/fi";
import { PortfolioData, LeadershipItem } from "@/components/PortfolioEditor/types";
import ItemEditor from "@/components/PortfolioEditor/components/ItemEditor";

interface LeadershipEditorProps {
  portfolioData: PortfolioData;
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function LeadershipEditor({
  portfolioData,
  setPortfolioData,
}: LeadershipEditorProps) {
  const addItem = () => {
    setPortfolioData((prev) => ({
      ...prev,
      leadership: [
        ...(prev.leadership || []),
        {
          role: "",
          duration: "",
          organization: "",
          highlights: [""],
        } satisfies LeadershipItem,
      ],
    }));
  };

  const updateItem = (
    index: number,
    key: keyof LeadershipItem,
    value: string | string[]
  ) => {
    setPortfolioData((prev) => {
      const currentLeadership = prev.leadership || [];
      const updated = [...currentLeadership];
      updated[index] = {
        ...updated[index],
        [key]: value,
      };
      return { ...prev, leadership: updated };
    });
  };

  const removeItem = (index: number) => {
    setPortfolioData((prev) => ({
      ...prev,
      leadership: (prev.leadership || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="mb-8 p-4 border border-gray-700 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Leadership</h3>
        <button
          onClick={addItem}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-700 rounded hover:bg-gray-600 text-white"
        >
          <FiPlus size={14} /> Add
        </button>
      </div>

      {portfolioData.leadership?.map((item, i) => (
        <ItemEditor
          key={`lead-${i}`}
          item={item}
          fields={[
            { key: "role", label: "Role" },
            { key: "duration", label: "Duration" },
            { key: "organization", label: "Organization" },
          ]}
          onUpdate={(key, value) => updateItem(i, key as keyof LeadershipItem, value)}
          onRemove={() => removeItem(i)}
        >
          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-300">
              Highlights
            </label>
            {item.highlights?.map((highlight, hi) => (
              <div key={`lead-${i}-highlight-${hi}`} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) => {
                    const newHighlights = [...(item.highlights || [])];
                    newHighlights[hi] = e.target.value;
                    updateItem(i, "highlights", newHighlights);
                  }}
                  className="flex-1 p-2 bg-gray-700 rounded text-white"
                />
                <button
                  onClick={() => {
                    const newHighlights = (item.highlights || []).filter(
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
                const newHighlights = [...(item.highlights || []), ""];
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