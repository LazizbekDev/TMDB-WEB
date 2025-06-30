import { useState } from "react";

function Logo({ enableGlitch = true, className = "" }) {
  const [isGlitchActive, setIsGlitchActive] = useState(enableGlitch);

  return (
    <div
      className={`tmdb-logo relative inline-block w-32 sm:w-40 transition-all duration-300 ${className}`}
      onClick={() => setIsGlitchActive((prev) => !prev)} // Toggle glitch on click (optional)
    >
      <svg
        className={`w-full h-auto ${isGlitchActive ? "glitch-effect" : ""}`}
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
          filter: drop-shadow(0 4px 12px rgba(255, 204, 0, 0.8));
          transform: scale(1.05);
        }
        .glitch-effect {
          animation: glitch 4s linear infinite; /* Smoother, longer animation */
        }
        @keyframes glitch {
          0%, 20%, 60%, 100% {
            transform: translate(0, 0);
            filter: none;
          }
          10% {
            transform: translate(1px, 0) skew(2deg);
          }
          15% {
            transform: translate(-1px, 0) skew(-2deg);
          }
          50% {
            filter: hue-rotate(5deg);
          }
        }
        .tagline-container {
          background: rgba(40, 110, 113, 0.7); /* Slightly darker cyan */
          border-radius: 0;
          width: 110%;
          backdrop-filter: blur(3px);
        }
        .tagline-text {
          white-space: nowrap;
          animation: marquee 12s linear infinite; /* Slower marquee */
          color: #F5F5F5; /* Light gray for better contrast */
          font-size: 8px;
          font-family: Arial, sans-serif;
          padding: 0 4px;
        }
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @media (max-width: 640px) {
          .tmdb-logo {
            width: 28;
          }
          .tmdb-logo svg text {
            font-size: 16px;
          }
          .tagline-text {
            font-size: 7px;
          }
        }
      `}</style>
    </div>
  );
}

export default Logo;