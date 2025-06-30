import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Film } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Button from "./Button";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [teaserUrl, setTeaserUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoError, setVideoError] = useState(null);

  // Fetch movie details
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://tmdb-m3sw.onrender.com/api/movies/${id}`, {
      headers: {
        "telegram-init-data": window.Telegram.WebApp?.initData || "",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Film ma’lumotlarini olishda xato yuz berdi");
        return res.json();
      })
      .then((data) => {
        setMovie({
          ...data,
          keywords: Array.isArray(data.keywords) ? data.keywords : [],
        });
      })
      .catch((err) => {
        console.error("Filmni olishda xatolik:", err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  // Fetch teaser video URL
  useEffect(() => {
    if (movie?.teaser) {
      setIsVideoLoading(true);
      fetch(`https://tmdb-m3sw.onrender.com/api/file/${movie.teaser}`, {
        headers: {
          "telegram-init-data": window.Telegram.WebApp?.initData || "",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Teaser video yuklanmadi");
          return res.json();
        })
        .then((data) => {
          setTeaserUrl(data.fileUrl);
        })
        .catch((err) => {
          console.error("Teaser video xatosi:", err);
          setVideoError(err.message);
        })
        .finally(() => setIsVideoLoading(false));
    }
  }, [movie?.teaser]);

  return (
    <div className="min-h-screen flex flex-col bg-black/50 backdrop-blur-md text-white">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 pt-20">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 animate-fade-in">
          <Film className="w-8 h-8 text-yellow-400" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">
            Film ma’lumotlari
          </h1>
        </div>

        {/* Error Message for Movie Fetch */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/20 text-red-400 rounded-lg text-center animate-fade-in">
            {error}
          </div>
        )}

        {/* Loading State for Movie */}
        {isLoading && (
          <div className="flex-1 flex items-center justify-center text-white text-lg animate-pulse">
            Yuklanmoqda...
          </div>
        )}

        {/* Movie Details */}
        {movie && !isLoading && (
          <div className="animate-fade-in bg-black/30 backdrop-blur-lg border border-yellow-400/20 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-[0_0_8px_rgba(255,204,0,0.5)] transition-shadow duration-300">
            {/* Teaser Video */}
            <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-lg overflow-hidden mb-4">
              {teaserUrl && !videoError ? (
                <video
                  src={teaserUrl}
                  poster="/assets/placeholder.jpg"
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="/assets/placeholder.jpg"
                  alt={movie.name}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {isVideoLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              {videoError && !isVideoLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="text-red-400 text-base">{videoError}</div>
                </div>
              )}
            </div>

            {/* Movie Info */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">
              {movie.name}
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-4 leading-relaxed">
              {movie.caption}
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 text-sm sm:text-base text-gray-400">
              <p>
                <strong>Janrlar:</strong>{" "}
                <span className="text-cyan-400">
                  {movie.keywords?.length > 0 ? movie.keywords.join(", ") : "Yo‘q"}
                </span>
              </p>
              <p>
                <strong>Fayl turi:</strong> {movie.fileType || "Noma'lum"}
              </p>
              <p>
                <strong>Hajmi:</strong> {movie.size || "Noma'lum"}
              </p>
              <p>
                <strong>Davomiyligi:</strong> {movie.duration || "Noma'lum"}
              </p>
              <p>
                <strong>Ko‘rishlar soni:</strong> {movie.views || 0}
              </p>
              <p>
                <strong>Ko‘rish havolasi:</strong>{" "}
                {movie.movieUrl ? (
                  <a
                    href={movie.movieUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-400 hover:text-yellow-100 hover:shadow-[0_0_8px_rgba(255,204,0,0.5)] transition duration-300"
                  >
                    Ko‘rish
                  </a>
                ) : (
                  "Yo‘q"
                )}
              </p>
            </div>

            {/* Back Button */}
            <Button
              onClick={() => navigate("/")}
              icon={ArrowLeft}
              className="mt-6 w-full sm:w-auto"
            >
              Orqaga
            </Button>
          </div>
        )}
      </main>
      <Footer />

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

export default MovieDetails;