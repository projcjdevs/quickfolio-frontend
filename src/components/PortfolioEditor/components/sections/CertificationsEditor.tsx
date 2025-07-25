import { FiPlus, FiTrash2 } from "react-icons/fi";
import { PortfolioData, CertificationItem } from "@/components/PortfolioEditor/types";
import ItemEditor from "@/components/PortfolioEditor/components/ItemEditor";

interface CertificationsEditorProps {
  portfolioData: PortfolioData;
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData>>;
}

export default function CertificationsEditor({
  portfolioData,
  setPortfolioData,
}: CertificationsEditorProps) {
  const addItem = () => {
    setPortfolioData((prev) => ({
      ...prev,
      certifications: [
        ...(prev.certifications || []),
        {
          name: "",
          date: "",
          issuer: "",
        } satisfies CertificationItem,
      ],
    }));
  };

  const updateItem = (
    index: number,
    key: keyof CertificationItem,
    value: string
  ) => {
    setPortfolioData((prev) => {
      const currentCertifications = prev.certifications || [];
      const updated = [...currentCertifications];
      updated[index] = {
        ...updated[index],
        [key]: value,
      };
      return { ...prev, certifications: updated };
    });
  };

  const removeItem = (index: number) => {
    setPortfolioData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="mb-8 p-4 border border-gray-700 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Certifications</h3>
        <button
          onClick={addItem}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-700 rounded hover:bg-gray-600 text-white"
        >
          <FiPlus size={14} /> Add
        </button>
      </div>

      {portfolioData.certifications?.map((item, i) => (
        <ItemEditor
          key={`cert-${i}`}
          item={item}
          fields={[
            { key: "name", label: "Certification Name" },
            { key: "date", label: "Date" },
            { key: "issuer", label: "Issuer" },
          ]}
          onUpdate={(key, value) => updateItem(i, key as keyof CertificationItem, value)}
          onRemove={() => removeItem(i)}
        />
      ))}
    </div>
  );
}