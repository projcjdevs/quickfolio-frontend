import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa6";

const useCases = [
    "UI design",
    "UX design",
    "Wireframing",
    "Diagramming",
    "Brainstorming",
    "Online whiteboard",
    "Team collaboration",
];

const exploreLinks = [
    "Design",
    "Prototyping",
    "Development features",
    "Design systems",
    "Collaboration features",
    "Design process",
    "FigJam",
];

const resourcesLinks = [
    "Blog",
    "Best practices",
    "Colors",
    "Color wheel",
    "Support",
    "Developers",
    "Resource library",
];

export default function Footer() {
    return (
        <footer className="bg-[#1d1d1b] text-[#B0AEA5] py-16">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                
                {/* Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-16">
                    
                    {/* Use Cases */}
                    <div>
                        <h4 className="text-white font-medium mb-6 text-sm md:text-base">
                            Use cases
                        </h4>
                        <ul className="space-y-3.5">
                            {useCases.map((text, idx) => (
                                <li key={idx}>
                                    <a
                                        href="#"
                                        className="text-xs md:text-sm hover:text-white underline-offset-4 hover:underline transition-all"
                                    >
                                        {text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Explore */}
                    <div>
                        <h4 className="text-white font-medium mb-6 text-sm md:text-base">
                            Explore
                        </h4>
                        <ul className="space-y-3.5">
                            {exploreLinks.map((text, idx) => (
                                <li key={idx}>
                                    <a
                                        href="#"
                                        className="text-xs md:text-sm hover:text-white underline-offset-4 hover:underline transition-all"
                                    >
                                        {text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-white font-medium mb-6 text-sm md:text-base">
                            Resources
                        </h4>
                        <ul className="space-y-3.5">
                            {resourcesLinks.map((text, idx) => (
                                <li key={idx}>
                                    <a
                                        href="#"
                                        className="text-xs md:text-sm hover:text-white underline-offset-4 hover:underline transition-all"
                                    >
                                        {text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Branding + Social Icons */}
                <div className="flex flex-col items-center pt-10 border-t border-[#3a3a38]">
                    
                    {/* Social Icons */}
                    <div className="flex gap-6 mb-5">
                        <a href="#">
                            <FaXTwitter className="text-2xl hover:text-white transition" />
                        </a>
                        <a href="#">
                            <FaInstagram className="text-2xl hover:text-white transition" />
                        </a>
                        <a href="#">
                            <FaYoutube className="text-2xl hover:text-white transition" />
                        </a>
                        <a href="#">
                            <FaLinkedin className="text-2xl hover:text-white transition" />
                        </a>
                    </div>
                    
                    {/* Branding */}
                    <p className="text-xs opacity-80">
                        © 2025 Quickfolio
                    </p>
                </div>
            </div>
        </footer>
    );
}