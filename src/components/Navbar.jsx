import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // Hamburger icon va close icon

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  
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
        <div
          className={`tmdb-logo relative inline-block transition-all duration-300 ${
            scrolled ? "scale-95" : "scale-100"
          }`}
          style={{ maxWidth: "150px", height: "auto" }} // Navbar uchun o'lchamni moslashtirdim
        >
          <svg
            className="w-full h-auto glitch-effect"
            viewBox="0 0 150 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="150" height="50" rx="8" fill="#FFCC00" />
            <path
              d="M20 10 L30 25 L20 40 M40 10 L50 25 L40 40 M60 10 L70 25 L60 40 M80 10 L90 25 L80 40"
              stroke="#111111"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M100 15 L110 25 L100 35 M120 15 L130 25 L120 35"
              stroke="#111111"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M35 25 Q40 20 45 25 Q50 30 55 25 Q60 20 65 25"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              fill="none"
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize="20"
              fill="#111111"
              fontWeight="bold"
            >
              TMDB
            </text>
            <foreignObject x="10" y="35" width="130" height="15">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                className="tagline-container"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                <div className="tagline-text">
                  Because Netflix suggestions are trash. TMDB isn't
                </div>
              </div>
            </foreignObject>
          </svg>
          <style jsx>{`
            .tmdb-logo {
              transition: filter 0.3s ease, transform 0.3s ease;
            }
            .tmdb-logo:hover {
              filter: drop-shadow(0 4px 12px rgba(255, 204, 0, 0.6));
            }
            .glitch-effect {
              animation: glitch 2s linear infinite;
            }
            @keyframes glitch {
              2%,
              64% {
                transform: translate(2px, 0) skew(0deg);
              }
              4%,
              60% {
                transform: translate(-2px, 0) skew(0deg);
              }
              62% {
                transform: translate(0, 0) skew(5deg);
              }
              63% {
                transform: translate(0, 0) skew(-5deg);
              }
              65% {
                transform: translate(0, 0) skew(0deg);
              }
              84% {
                filter: hue-rotate(10deg);
              }
              86% {
                filter: hue-rotate(-10deg);
              }
              88% {
                filter: hue-rotate(5deg);
              }
              90% {
                filter: hue-rotate(0deg);
              }
              100% {
                filter: hue-rotate(0deg);
              }
            }
            .tagline-container {
              background: rgba(40, 110, 113, 0.57); /* Cyan background */
              border-radius: 0;
              width: 110%;
              backdrop-filter: blur(2px);
            }
            .tagline-text {
              white-space: nowrap;
              animation: marquee 10s linear infinite;
              color: #000000; /* Black text */
              font-size: 8px;
              font-family: Arial, sans-serif;
              padding: 0 2px;
            }
            @keyframes marquee {
              0% {
                transform: translateX(100%);
              }
              100% {
                transform: translateX(-100%);
              }
            }
            @media (max-width: 768px) {
              .tmdb-logo {
                max-width: 120px;
              }
              .tmdb-logo svg text {
                font-size: 16px;
              }
              .tagline-text {
                font-size: 6px;
              }
            }
          `}</style>
        </div>
        <input
          type="text"
          placeholder="Qidiruv..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-md bg-gray-700 text-white placeholder-gray-400 hidden md:block"
        />
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
