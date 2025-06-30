import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function HeroBanner({ featured = [], onSendData }) {
  const [active, setActive] = useState(0);
  const [teaserUrl, setTeaserUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const movie = featured[active];
  const placeholderImage = "/assets/placeholder.jpg"; // Adjust path or use a public URL

  // Carousel auto-rotation
  useEffect(() => {
    if (featured.length <= 1) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % featured.length);
    }, 8000); // Reduced to 8 seconds for better engagement
    return () => clearInterval(interval);
  }, [featured]);

  // Fetch teaser URL
  useEffect(() => {
    if (!movie || !movie.teaser) {
      setTeaserUrl("");
      setError(null);
      return;
    }

    setIsLoading(true);
    fetch(`https://tmdb-m3sw.onrender.com/api/file/${movie.teaser}`, {
      headers: {
        "telegram-init-data": window.Telegram.WebApp?.initData || "",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Video yuklanmadi");
        return res.json();
      })
      .then((data) => {
        setTeaserUrl(data.fileUrl);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Video yuklanmadi");
        setTeaserUrl("");
      })
      .finally(() => setIsLoading(false));
  }, [movie]);

  // Navigation handlers
  const handlePrev = () => setActive((prev) => (prev - 1 + featured.length) % featured.length);
  const handleNext = () => setActive((prev) => (prev + 1) % featured.length);
  const handleDotClick = (index) => setActive(index);

  // Telegram bot link handler
  const handleSendToBot = () => {
    if (movie && onSendData) {
      onSendData(movie); // Call parent callback
      const botUsername = "tmdb_listbot";
      window.Telegram.WebApp?.openTelegramLink(
        `https://t.me/${botUsername}?start=${movie._id}`
      );
    }
  };

  if (!movie) return null;

  return (
    <div className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] flex items-end p-4 sm:p-6 md:p-8 overflow-hidden">
      {/* Video background with poster */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={teaserUrl || undefined}
        poster={placeholderImage} // Use placeholder as default poster
        autoPlay={!!teaserUrl}
        loop
        muted
        playsInline
        onError={() => setError("Video yuklanmadi")}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-0" />

      {/* Loading or error state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-white text-lg animate-pulse">Yuklanmoqda...</div>
        </div>
      )}
      {error && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-red-400 text-lg">{error}</div>
        </div>
      )}

      {/* Text content */}
      <div className="relative z-10 max-w-full sm:max-w-2xl md:max-w-3xl text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 animate-fade-in">
          {movie.name}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-5 line-clamp-3 animate-fade-in">
          {movie.caption}
        </p>
        <button
          onClick={handleSendToBot}
          className="bg-gradient-to-r from-yellow-400 to-cyan-400 hover:from-yellow-500 hover:to-cyan-500 transition px-5 py-2 sm:px-6 sm:py-3 text-white rounded-lg font-semibold shadow-md hover:shadow-lg animate-fade-in"
        >
          Ko‘rishni boshlash
        </button>
        {/* Carousel navigation */}
        {featured.length > 1 && (
          <div className="flex items-center space-x-4 mt-4">
            {/* Arrows */}
            <button
              onClick={handlePrev}
              className="p-2 bg-black/50 rounded-full text-yellow-400 hover:bg-black/70 transition"
            >
              <ChevronLeft size={24} />
            </button>
            {/* Dots */}
            <div className="flex space-x-2">
              {featured.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    active === index ? "bg-yellow-400" : "bg-gray-400/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-2 bg-black/50 rounded-full text-yellow-400 hover:bg-black/70 transition"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
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

export default HeroBanner;