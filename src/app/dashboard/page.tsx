// temporary dashboard
import NavBarDB from '@/components/NavBarDB';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F5F4ED]">
      <NavBarDB />

      <main className="p-10">
        <p className="text-3xl font-bold text-[#333] mb-4">Dashboard (Testing Page)</p>

        {/* filler content (to be scrollable 4 checking of animated logo) */}
        <div className="space-y-8">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow text-[#333] text-sm"
            >
              Placeholder content block #{i + 1}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
