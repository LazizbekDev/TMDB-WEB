import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import Navbar from "../components/Navbar";
import AdminMovieList from "../components/AdminMovieList";

function AdminPanel() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch("https://tmdb-m3sw.onrender.com/api/movies", {
      headers: {
        "telegram-init-data": window.Telegram.WebApp?.initData || "",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Filmlarni olishda xatolik yuz berdi");
        return res.json();
      })
      .then((data) => setMovies(data))
      .catch((err) => {
        console.error("Filmlarni olishda xatolik:", err);
        setError(err.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-black/50 backdrop-blur-md text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 pt-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 animate-fade-in">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Home className="w-6 h-6 text-yellow-400" />
            Admin Panel
          </h1>
          <Link
            to="/"
            className="flex items-center gap-2 text-yellow-400 hover:text-yellow-100 text-sm sm:text-base font-medium transition duration-300"
          >
            <Home className="w-5 h-5" />
            Asosiy sahifaga qaytish
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/20 text-red-400 rounded-lg text-center animate-fade-in">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center text-white text-lg animate-pulse">
            Yuklanmoqda...
          </div>
        )}

        {/* Movie List */}
        {!isLoading && <AdminMovieList movies={movies} setMovies={setMovies} />}
      </main>

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

export default AdminPanel;