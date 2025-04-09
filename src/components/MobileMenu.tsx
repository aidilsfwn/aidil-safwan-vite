import { useState } from "react";
import { X, Menu } from "lucide-react";
import { menu } from "../constants";

export const MobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 right-4 z-50 bg-indigo-600 text-white p-2 rounded-full shadow-lg"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-90 z-40 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-8 text-center">
            {menu.map((item) => {
              return (
                <a
                  key={item.label}
                  href={item.link}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white text-xl"
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
