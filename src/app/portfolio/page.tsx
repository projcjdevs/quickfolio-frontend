// app/portfolio/page.tsx
import CosmicGlowPortfolio from '@/components/SpacePS';

async function getPortfolioData() {
  try {
    const res = await fetch('http://localhost:3000/api/portfolio', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch portfolio:", error);
    // Return default data if fetch fails
    return {
      name: "Your Name",
      title: "Your Title",
      education: [],
      experience: [],
      leadership: [],
      contact: {},
      config: {
        colors: {
          bg: "#0a0a0a",
          text: "#e5e5e5",
          accent: "#facc15"
        },
        particleDensity: 50
      }
    };
  }
}

export default async function PortfolioPage() {
  const portfolioData = await getPortfolioData();

  return (
    <div className="min-h-screen">
      <CosmicGlowPortfolio data={portfolioData} />
    </div>
  );
}