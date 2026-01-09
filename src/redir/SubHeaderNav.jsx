import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SubHeaderNav() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const categories = [
    { name: "CPU", slug: "cpu" },
    { name: "GPU", slug: "gpu" },
    { name: "RAM", slug: "ram" },
    { name: "SSD", slug: "ssd" },
    { name: "Motherboard", slug: "motherboard" },
    { name: "Power Supply", slug: "psu" },
    { name: "Case", slug: "case" },
    { name: "Cooler", slug: "cooler" },
    { name: "Peripherals", slug: "peripherals" },
  ];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Invisible hoverable area */}
      <div className="h-10 w-full cursor-pointer" /> {/* reduced from 20 to 16 */}

      {/* Dropdown appears on top of hoverable area */}
      <div
        className={`absolute top-0 left-0 right-0 bg-gray-900 shadow-md z-20
          transform transition-all duration-500 ease-out
          ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}
      >
        <ul className="flex justify-center space-x-8 px-6 py-4 h-20 items-center"> {/* reduced spacing and height */}
          {categories.map((cat) => (
            <li key={cat.slug}>
              <button
                className="text-white font-semibold uppercase hover:text-purple-400 transition text-lg"
                onClick={() => navigate(`/component/${cat.slug}`)}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
