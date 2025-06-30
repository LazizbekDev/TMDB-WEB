import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo"; // Import the new Logo component

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Check scroll position for navbar styling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Check if user is admin via Telegram WebApp
  useEffect(() => {
    if (window.Telegram?.WebApp?.initData) {
      // Mock admin check (replace with actual API call)
      const checkAdmin = async () => {
        try {
          const response = await fetch("https://tmdb-m3sw.onrender.com/api/auth/verify", {
            headers: {
              "telegram-init-data": window.Telegram.WebApp.initData,
            },
          });
          const data = await response.json();
          setIsAdmin(data.isAdmin || false);
        } catch (err) {
          console.error("Panicked: Admin check failed:", err);
        }
      };
      checkAdmin();
    }
  }, []);

  // Search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    if (search.trim()) {
      try {
        navigate(`/search?q=${encodeURIComponent(search)}`);
        setMenuOpen(false);
      } catch (err) {
        console.error("Search failed:", err);
      }
    }
  };

  const navLinks = [
    { label: "Filmlar", href: "/#movies" },
    { label: "Haqida", href: "/#about" },
    { label: "Bog‘lanish", href: "/#contact" },
    ...(isAdmin ? [{ label: "Admin Panel", href: "/admin" }] : []),
  ];

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-lg shadow-lg" : "bg-black/30 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Logo className={scrolled ? "scale-95" : "scale-100"} />

        {/* Desktop Search and Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Qidiruv..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 pr-8 rounded-md bg-gray-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-yellow-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </button>
          </form>
          <nav className="flex space-x-6 text-sm font-medium tracking-wider items-center uppercase">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative text-yellow-300 hover:text-yellow-100 transition-all duration-300 group"
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>
        </div>

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
        <div className="md:hidden bg-black/90 backdrop-blur-lg px-4 py-4 space-y-4 transition-all duration-300 ease-in-out">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Qidiruv..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 pr-8 rounded-md bg-gray-800/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-yellow-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </button>
          </form>
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block text-yellow-300 hover:text-yellow-100 text-base font-medium uppercase tracking-wide"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}