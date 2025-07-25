// src/components/PortfolioEditor/components/TextInput.tsx
export default function TextInput({
  label,
  value,
  onChange,
  disabled = false,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block mb-1 font-medium text-gray-300">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full p-2 bg-gray-700 rounded text-white"
      />
    </div>
  );
}