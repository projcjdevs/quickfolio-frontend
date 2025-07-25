// src/components/PortfolioEditor/components/ItemEditor.tsx
import { FiTrash2 } from "react-icons/fi";
import TextInput from "@/components/PortfolioEditor/components/TextInput";

export default function ItemEditor({
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
        />
      ))}
      {children}
    </div>
  );
}