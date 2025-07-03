import {
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa6";

const aboutCompany = [
  "Quickfolio",
  "Mission & Vision",
  "Team",
  "Privacy Policy",
  "Terms of Service",
];

const exploreLinks = [
  "FAQs",
  "Help Center",
  "Tutorials/Guides",
  "Template Gallery",
  "Collaboration features",
  "Pricing Plans",
];

const community = ["User Showcase", "Forums", "Communities", "Events"];

export default function Footer() {
  return (
    <footer className="bg-[#1d1d1b] text-[#B0AEA5] py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Logo */}
        <div className="mb-12">
          <img
            src="/images/logo-white.png"
            alt="QuickFolio"
            className="h-12 w-auto"
          />
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-16">
          {/* Use Cases */}
          <div>
            <h4 className="text-white font-medium mb-6 text-sm md:text-base">
              About the Company
            </h4>
            <ul className="space-y-3.5">
              {aboutCompany.map((text, idx) => (
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
              Community
            </h4>
            <ul className="space-y-3.5">
              {community.map((text, idx) => (
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
          <p className="text-xs opacity-80">© 2025 Quickfolio</p>
        </div>
      </div>
    </footer>
  );
}
