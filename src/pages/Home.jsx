import { useState, useEffect } from "react";
import { Film } from "lucide-react";
import MovieList from "../components/MovieList";
import HeroBanner from "../components/HeroBanner";
import Footer from "../components/Footer";

function Home() {
  const [movies, setMovies] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [sortOption, setSortOption] = useState("newest");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://tmdb-m3sw.onrender.com/api/movies", {
      headers: {
        "telegram-init-data": window.Telegram.WebApp?.initData || "",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Filmlarni olishda xatolik yuz berdi");
        return res.json();
      })
      .then((data) => {
        setMovies(data);
        setFeatured(data.slice(0, 5));
      })
      .catch((err) => {
        console.error("Filmlarni olishda xatolik:", err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSendData = (movie) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.sendData(
        JSON.stringify({ movieId: movie._id, name: movie.name })
      );
    } else {
      console.warn("Telegram WebApp is not available");
    }
  };

  const getDateFromObjectId = (id) =>
    new Date(parseInt(id.substring(0, 8), 16) * 1000);

  const sortedMovies = [...movies].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return getDateFromObjectId(b._id) - getDateFromObjectId(a._id);
      case "oldest":
        return getDateFromObjectId(a._id) - getDateFromObjectId(b._id);
      case "mostViewed":
        return b.views - a.views;
      case "leastViewed":
        return a.views - b.views;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-black/50 backdrop-blur-md text-white">
      <HeroBanner featured={featured} onSendData={handleSendData} />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 pt-20">
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/20 text-red-400 rounded-lg text-center animate-fade-in">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex-1 flex items-center justify-center text-white text-lg animate-pulse">
            Yuklanmoqda...
          </div>
        )}

        {/* Movie List */}
        {!isLoading && (
          <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Film className="w-6 h-6 text-yellow-400" />
                Barcha Filmlar
              </h2>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-gray-800/80 text-white border border-yellow-400/20 rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400 mt-4 sm:mt-0"
                aria-label="Sort movies"
              >
                <option value="newest">Eng yangilari</option>
                <option value="oldest">Eng eskilari</option>
                <option value="mostViewed">Ko‘p ko‘rilgan</option>
                <option value="leastViewed">Kam ko‘rilgan</option>
              </select>
            </div>
            <MovieList movies={sortedMovies} onSendData={handleSendData} />
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

export default Home;