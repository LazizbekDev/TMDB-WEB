import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // hamburger icon va close icon

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Filmlar", href: "#movies" },
    { label: "Haqida", href: "#about" },
    { label: "Bog‘lanish", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-black/20 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="relative inline-block text-yellow-400 text-lg font-brand tracking-wide drop-shadow-md">
          <div className="bg-yellow-500 text-black px-6 py-1 rounded-md border border-yellow-300 shadow-md clip-ticket">
            TMDB
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-sm font-nav tracking-wider items-center uppercase">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative brand-text text-yellow-300 hover:text-yellow-50 hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.7)] transition-all duration-300 group"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-full group-hover:w-full transition-all duration-500 ease-out" />
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-yellow-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-sm px-4 pb-4 space-y-4">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block text-yellow-300 hover:text-yellow-50 text-base uppercase font-nav tracking-wide"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
