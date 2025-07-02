import { FaXTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa6";

//dynamic rendering for less repetition, more scalability .map() method is used to iterate over arrays of links
// { label: "UI design", link: "/ui-design" } pag sure na tayo 
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
        <footer className="bg-[#1d1d1b] shadow-sm text-[#B0AEA5] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {/* Social Icons */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-6 mb-10">
            <a href="#"><FaXTwitter className="text-3xl hover:text-white transition" /></a>
            <a href="#"><FaInstagram className="text-3xl hover:text-white transition" /></a>
            <a href="#"><FaYoutube className="text-3xl hover:text-white transition" /></a>
            <a href="#"><FaLinkedin className="text-3xl hover:text-white transition" /></a>
            </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-20 text-sm">
          {/* Use Cases */}
        <div>
            <h4 className="text-base md:text-lg font-semibold mb-6 text-white">Use cases</h4>
            <ul className="space-y-2.5 text-sm md:text-base">
            {useCases.map((text, idx) => (
                <li key={idx}>
                <a
                    href="#"
                    className="hover:text-white underline-offset-4 hover:underline transition-colors duration-300"
                >
                    {text}
                </a>
                </li>
            ))}
            </ul>
        </div>

          {/* Explore */}
        <div>
            <h4 className="text-base md:text-lg font-semibold mb-6 text-white">Explore</h4>
            <ul className="space-y-2.5 text-sm md:text-base">
            {exploreLinks.map((text, idx) => (
                <li key={idx}>
                <a
                    href="#"
                    className="hover:text-white underline-offset-4 hover:underline transition-colors duration-300"
                >
                    {text}
                </a>
                </li>
            ))}
            </ul>
        </div>

          {/* Resources */} 
        <div>
            <h4 className="text-base md:text-lg font-semibold mb-6 text-white">Resources</h4>
            <ul className="space-y-2.5 text-sm md:text-base">
            {resourcesLinks.map((text, idx) => (
                <li key={idx}>
                <a
                    href="#"
                    className="hover:text-white underline-offset-4 hover:underline transition-colors duration-300"
                >
                    {text}
                </a>
                </li>
            ))}
            </ul>
            </div>
        </div>
    </div>
    </footer>
);
}
