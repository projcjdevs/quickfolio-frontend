import React, { useState, useRef, useEffect } from 'react';

type PortfolioDisplayBoxProps = {
  id: string;
  isActive: boolean;
  onActivate: () => void;
  onDelete: (id: string) => void;
};

const PortfolioDisplayBox: React.FC<PortfolioDisplayBoxProps> = ({ id, isActive, onActivate, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
        ref={containerRef}
        className={`relative group container w-94 h-90 ${
            isActive ? 'bg-white' : 'bg-gray-300'
        } shadow-md rounded-3xl p-5 transition-colors duration-300`} 
    >
        {/* 3-dot button INSIDE container */}
         <div className="absolute top-4 right-4">
          <div className="opacity-0 hover:opacity-100 transition">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-gray-100 p-2 rounded-lg shadow hover:bg-gray-200 flex space-x-1"
              aria-label="More options"
            >
              <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-gray-700 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* Dropdown menu inside container */}
        {menuOpen && (
          <div className="absolute top-12 right-4 bg-white border border-gray-300 rounded-md shadow-lg w-40 z-50">
            <button 
            onClick={() => {
            onActivate();
            setMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Activate
            </button>
            <button 
            onClick={() => onDelete(id)}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Delete
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Button 3
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Button 
            </button>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
              Button 3
            </button>
          </div>
        )}

        {/* Grid layout */}
        <div className="grid md:grid-cols-2 pt-2">
          <div>
            <img
              src="https://i.pinimg.com/1200x/36/e2/75/36e275e0148c1ef01e77f07abed5705a.jpg"
              alt="Portfolio Preview"
              className="w-45 h-45 object-cover"
            />
          </div>

          <div className="pt-3 px-4 ">
            <p className="pb-3 text-2xl font-semibold">Portfolio 1</p>

            <button className="border border-black bg-gray-200 text-black px-6 py-2 rounded-lg hover:bg-gray-500 transition">
              Edit
            </button>
          </div>
        </div>

        <p className="py-5 text-gray-500 text-xl">Description</p>
      </div>
  );
};

export default PortfolioDisplayBox;
