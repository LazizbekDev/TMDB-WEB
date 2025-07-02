import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Film, ArrowLeft } from "lucide-react";
import MovieList from "../components/MovieList";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";

function SimilarMovies() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    // Fetch movie details to get the movie name
    fetch(`https://tmdb-m3sw.onrender.com/api/movies/${id}`, {
      headers: {
        "telegram-init-data": window.Telegram.WebApp?.initData || "",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Film ma’lumotlarini olishda xato yuz berdi");
        return res.json();
      })
      .then((data) => setMovieName(data.name))
      .catch((err) => console.error("Filmni olishda xatolik:", err))
      .finally(() => setIsLoading(false));

    // Fetch recommendations
    fetch(`https://tmdb-m3sw.onrender.com/api/recommendations/${id}`, {
      headers: {
        "telegram-init-data": window.Telegram.WebApp?.initData || "",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("O‘xshash filmlarni olishda xato yuz berdi");
        return res.json();
      })
      .then((data) => setMovies(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 pt-20">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 animate-fade-in">
          <Film className="w-8 h-8 text-yellow-400" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">
            {movieName ? `${movieName} uchun o‘xshash filmlar` : "O‘xshash filmlar"}
          </h1>
        </div>

        {/* Back Button */}
        <Button
          onClick={() => navigate(`/movie/${id}`)}
          icon={ArrowLeft}
          className="mb-6 text-sm px-3 py-1.5"
        >
          Orqaga
        </Button>

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
            {movies.length > 0 ? (
              <MovieList movies={movies} />
            ) : (
              <div className="text-center text-gray-400 text-sm sm:text-base">
                O‘xshash filmlar topilmadi
              </div>
            )}
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

export default SimilarMovies;