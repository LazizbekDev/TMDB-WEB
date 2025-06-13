import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-black/20 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Custom TMDB Logo */}
        <div className="relative inline-block text-yellow-400 text-lg font-brand tracking-wide drop-shadow-md">
          <div className="bg-yellow-500 text-black px-6 py-1 rounded-md border border-yellow-300 shadow-md clip-ticket">
            TMDB
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-x-8 text-sm font-nav tracking-wider flex items-center uppercase">
          {[
            { label: "Filmlar", href: "#movies" },
            { label: "Haqida", href: "#about" },
            { label: "Bog‘lanish", href: "#contact" },
          ].map((item) => (
            <a
              href="#movies"
              className="relative brand-text text-yellow-300 hover:text-yellow-50 hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.7)] transition-all duration-300 group"
            >
              <span className="relative z-10">{item.label}</span>
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 rounded-full group-hover:w-full transition-all duration-500 ease-out" />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
