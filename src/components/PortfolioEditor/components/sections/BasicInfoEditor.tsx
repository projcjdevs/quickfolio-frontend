import { PortfolioData } from "@/components/PortfolioEditor/types";
import TextInput from "@/components/PortfolioEditor/components/TextInput";

interface BasicInfoEditorProps {
  portfolioData: PortfolioData;
  setPortfolioData: React.Dispatch<React.SetStateAction<PortfolioData>>;
  selectedTemplate: string;
}

export default function BasicInfoEditor({
  portfolioData,
  setPortfolioData,
  selectedTemplate,
}: BasicInfoEditorProps) {
  const updateBasicInfo = (field: keyof PortfolioData, value: string) => {
    setPortfolioData((prev) => ({ ...prev, [field]: value }));
  };

  const updateContact = (field: keyof PortfolioData['contact'], value: string) => {
    setPortfolioData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  return (
    <div className="mb-8 p-4 border border-gray-700 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Basic Information</h3>
      </div>

      <TextInput
        label="Full Name"
        value={portfolioData.name}
        onChange={(e) => updateBasicInfo("name", e.target.value)}
      />
      <TextInput
        label="Professional Title"
        value={portfolioData.title}
        onChange={(e) => updateBasicInfo("title", e.target.value)}
      />
      
      {selectedTemplate === "medPortfolio" && (
        <TextInput
          label="Professional Summary"
          value={portfolioData.summary || ""}
          onChange={(e) => updateBasicInfo("summary", e.target.value)}
        />
      )}

      <h4 className="text-lg font-bold text-white mt-6 mb-4">Contact Information</h4>
      <TextInput
        label="Email"
        value={portfolioData.contact?.email || ""}
        onChange={(e) => updateContact("email", e.target.value)}
      />
      
      {selectedTemplate !== "medPortfolio" && (
        <TextInput
          label="GitHub Username"
          value={portfolioData.contact?.github || ""}
          onChange={(e) => updateContact("github", e.target.value)}
        />
      )}
      
      <TextInput
        label="LinkedIn Username"
        value={portfolioData.contact?.linkedin || ""}
        onChange={(e) => updateContact("linkedin", e.target.value)}
      />
      
      {selectedTemplate === "medPortfolio" && (
        <TextInput
          label="PRC License Number"
          value={portfolioData.contact?.prc || ""}
          onChange={(e) => updateContact("prc", e.target.value)}
        />
      )}
    </div>
  );
}