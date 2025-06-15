import { useEffect, useState } from "react";
import { FaEye, FaPlay, FaExpand } from "react-icons/fa";

function MovieCard({ movie }) {
  const [teaserUrl, setTeaserUrl] = useState("");
  const [error, setError] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const loadTeaserUrl = async () => {
    if (movie.teaserpath) {
      setTeaserUrl(movie.teaserpath);
      setIsPlaying(true);
      return;
    }

    try {
      const response = await fetch(
        `https://tmdb-hr4k.onrender.com/api/file/${movie.teaser}`,
        {
          headers: {
            "telegram-init-data": window.Telegram.WebApp.initData,
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
    }
  };

  const handleSendToBot = () => {
    const botUsername = "tmdb_listbot";
    window.Telegram.WebApp.openTelegramLink(
      `https://t.me/${botUsername}?start=${movie._id}`
    );
  };

  const handleFullScreenToggle = () => setIsFullScreen(!isFullScreen);

  return (
    <div className="flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.015] transition-all duration-300 group">
      {/* Teaser Preview */}
      <div className="relative h-[200px] bg-black flex items-center justify-center">
        {isPlaying && teaserUrl ? (
          <>
            <video
              src={teaserUrl}
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              Teaser
            </div>
            <button
              onClick={handleFullScreenToggle}
              className="absolute bottom-2 right-2 bg-white/80 text-black text-xs px-2 py-1 rounded hover:bg-white transition flex items-center gap-1"
            >
              <FaExpand className="text-xs" /> To‘liq
            </button>
          </>
        ) : (
          <button
            onClick={loadTeaserUrl}
            className="text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded text-sm"
          >
            {error || "▶️ Teaser ko‘rish"}
          </button>
        )}
      </div>

      {/* Fullscreen modal */}
      {isFullScreen && teaserUrl && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={handleFullScreenToggle}
        >
          <video
            src={teaserUrl}
            controls
            autoPlay
            className="max-w-full max-h-full rounded-xl"
          />
        </div>
      )}

      {/* Movie info */}
      <div className="flex flex-col flex-grow p-4 text-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold line-clamp-1">{movie.name}</h2>
          <span className="text-xs bg-white/10 text-gray-200 px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <FaEye className="text-gray-300 text-sm" />
            <span className="font-medium">{movie.views}</span>
          </span>
        </div>

        <p className="text-sm text-gray-300 line-clamp-2 mb-3">
          {movie.caption}
        </p>

        <div className="text-xs text-gray-400 space-y-1 mb-4">
          <p>
            Janrlar:{" "}
            <span className="text-blue-400">
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

        {/* Tugma doim pastda */}
        <div className="mt-auto">
          <button
            onClick={handleSendToBot}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 transition text-white py-2 rounded-lg flex items-center justify-center gap-2 font-semibold"
          >
            <FaPlay className="text-xs" /> Ko‘rishni boshlash
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
