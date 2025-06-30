import { useState } from "react";
import { Eye, Play, Maximize2 } from "lucide-react"; // Replaced Fa icons with lucide-react

function MovieCard({ movie }) {
  const [teaserUrl, setTeaserUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Default placeholder image for video poster
  const placeholderImage = "/assets/placeholder.jpg"; // Adjust path or use a public URL

  // Load teaser URL
  const loadTeaserUrl = async () => {
    setIsLoading(true);
    try {
      if (movie.teaserpath) {
        setTeaserUrl(movie.teaserpath);
        setIsPlaying(true);
        return;
      }

      const response = await fetch(
        `https://tmdb-m3sw.onrender.com/api/file/${movie.teaser}`,
        {
          headers: {
            "telegram-init-data": window.Telegram.WebApp?.initData || "",
          },
        }
      );
      if (!response.ok) throw new Error("Video URL xatosi");
      const data = await response.json();
      setTeaserUrl(data.fileUrl);
      setIsPlaying(true);
    } catch (err) {
      console.error(err);
      setError("Teaser yuklanmadi");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendToBot = () => {
    const botUsername = "tmdb_listbot";
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.openTelegramLink(
        `https://t.me/${botUsername}?start=${movie._id}`
      );
    } else {
      console.warn("Telegram WebApp is not available");
      // Fallback: Open in a new tab
      window.open(`https://t.me/${botUsername}?start=${movie._id}`, "_blank");
    }
  };

  const handleFullScreenToggle = () => setIsFullScreen(!isFullScreen);

  return (
    <div className="flex flex-col h-full bg-black/30 backdrop-blur-lg border border-yellow-400/20 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 group animate-fade-in">
      {/* Video Preview with Poster */}
      <div className="relative h-48 sm:h-56 md:h-64 bg-black flex items-center justify-center">
        <video
          src={teaserUrl || undefined}
          poster={placeholderImage}
          muted
          loop
          playsInline
          autoPlay={isPlaying}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-white text-base animate-pulse">Yuklanmoqda...</div>
          </div>
        )}
        {error && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-red-400 text-base">{error}</div>
          </div>
        )}
        {!isPlaying && !isLoading && !error && (
          <button
            onClick={loadTeaserUrl}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-yellow-400/20 hover:bg-yellow-400/30 px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition duration-300"
          >
            <Play className="w-4 h-4" />
            Teaser ko‘rish
          </button>
        )}
        {isPlaying && (
          <>
            <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-0.5 rounded-full">
              Teaser
            </div>
            <button
              onClick={handleFullScreenToggle}
              className="absolute bottom-2 right-2 bg-yellow-400/80 text-black text-xs px-2 py-1 rounded hover:bg-yellow-400 transition flex items-center gap-1"
            >
              <Maximize2 className="w-3 h-3" /> To‘liq
            </button>
          </>
        )}
      </div>

      {/* Fullscreen modal */}
      {isFullScreen && teaserUrl && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={handleFullScreenToggle}
        >
          <video
            src={teaserUrl}
            controls
            autoPlay
            className="max-w-[90%] max-h-[90%] rounded-xl"
          />
        </div>
      )}

      {/* Movie info */}
      <div className="flex flex-col flex-grow p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base sm:text-lg font-bold line-clamp-1">{movie.name}</h2>
          <span className="text-xs bg-yellow-400/20 text-gray-200 px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-gray-300" />
            <span className="font-medium">{movie.views}</span>
          </span>
        </div>

        <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 mb-3 animate-fade-in">
          {movie.caption}
        </p>

        <div className="text-xs text-gray-400 space-y-1 mb-4">
          <p>
            Janrlar:{" "}
            <span className="text-cyan-400">
              {movie.keywords.map((k) => `#${k}`).join(" ")}
            </span>
          </p>
          <p>
            Format: <span className="text-white">{movie.fileType}</span>
          </p>
          <p>
            Hajmi: <span className="text-white">{movie.size}</span>
          </p>
          <p>
            Davomiyligi: <span className="text-white">{movie.duration}</span>
          </p>
        </div>

        {/* Button at bottom */}
        <div className="mt-auto">
          <button
            onClick={handleSendToBot}
            className="w-full bg-gradient-to-r from-yellow-400 to-cyan-400 hover:from-yellow-500 hover:to-cyan-500 transition text-white py-2 rounded-lg flex items-center justify-center gap-2 font-semibold shadow-md hover:shadow-lg animate-fade-in"
          >
            <Play className="w-4 h-4" /> Ko‘rishni boshlash
          </button>
        </div>
      </div>

      {/* Tailwind animation styles */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-in;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default MovieCard;