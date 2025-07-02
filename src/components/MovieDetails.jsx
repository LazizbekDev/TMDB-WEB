import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Film, Clapperboard, Play, Pause } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Button from "./Button";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [movie, setMovie] = useState(null);
  const [teaserUrl, setTeaserUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [error, setError] = useState(null);
  const [videoError, setVideoError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
    } else if (movie?.teaserpath) {
      setTeaserUrl(movie.teaserpath);
    }
  }, [movie]);

  // Toggle play/pause for custom controls
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
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
                <>
                  <video
                    ref={videoRef}
                    src={teaserUrl}
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                    aria-label={`Teaser for ${movie.name}`}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
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
                  {/* Custom Play/Pause Button */}
                  <Button
                    onClick={togglePlayPause}
                    icon={isPlaying ? Pause : Play}
                    className="absolute bottom-2 left-2 bg-yellow-400/80 text-black text-xs px-2 py-1 rounded hover:bg-yellow-400 transition z-20"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? "To‘xtatish" : "O‘ynatish"}
                  </Button>
                </>
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400 text-sm">
                  Teaser mavjud emas
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
                <strong>Ko‘rishlar soni:</strong> {movie.views || 0}
              </p>
            </div>

            {/* Navigation to Similar Movies */}
            <Button
              to={`/movie/${movie._id}/similar`}
              icon={Clapperboard}
              gradient
              className="mt-6 w-full sm:w-auto text-sm px-3 py-1.5"
            >
              O‘xshash filmlar
            </Button>

            {/* Back Button */}
            {/* Flex justify between buttons */}
            <div className="mt-4 flex justify-between">
              <Button
              onClick={() => navigate("/")}
              icon={ArrowLeft}
              className="mt-6 w-full sm:w-auto text-sm px-3 py-1.5"
            >
              Orqaga
            </Button>
            {movie.movieUrl ? (
                <Button
                  onClick={() => {
                    const telegramUrl = `https://t.me/tmdb_listbot?start=${movie._id}`;
                    if (window.Telegram?.WebApp) {
                      window.Telegram.WebApp.openLink(telegramUrl);
                    } else {
                      window.location.href = telegramUrl;
                    }
                  }}
                  gradient
                  className="text-sm px-3 py-1.5 hover:shadow-[0_0_8px_rgba(255,204,0,0.5)] transition-shadow duration-300"
                  aria-label={`Watch ${movie.name}`}
                >
                  Ko‘rish
                </Button>
              ) : (
                "Yo‘q"
              )}
              </div>
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