import { useState } from "react";
import { Link } from "react-router-dom";
import { Film, Pencil, Trash2, PlusCircle, X } from "lucide-react";

function AdminMovieList({ movies, setMovies }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null); // Movie ID to delete

  const handleDelete = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://tmdb-m3sw.onrender.com/api/movies/${id}`, {
        method: "DELETE",
        headers: {
          "telegram-init-data": window.Telegram.WebApp?.initData || "",
        },
      });
      if (!res.ok) throw new Error("Filmni o‘chirishda xatolik yuz berdi");
      const result = await res.json();
      console.log("O‘chirildi:", result);
      setMovies((prev) => prev.filter((movie) => movie._id !== id));
      setShowDeleteModal(null);
    } catch (err) {
      console.error("Filmni o‘chirishda xatolik:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 animate-fade-in">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
          <Film className="w-6 h-6 text-yellow-400" />
          Filmlar ro‘yxati
        </h1>
        <Link
          to="/admin/add"
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-cyan-400 hover:from-yellow-500 hover:to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition duration-300"
        >
          <PlusCircle className="w-5 h-5" />
          Yangi qo‘shish
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

      {/* Movie List or Empty State */}
      {movies.length === 0 && !isLoading ? (
        <div className="text-center text-gray-400 py-8 animate-fade-in">
          <Film className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
          <p className="text-lg">Hozircha hech qanday film mavjud emas.</p>
          <Link
            to="/admin/add"
            className="inline-flex items-center gap-2 mt-4 text-yellow-400 hover:text-yellow-100 underline"
          >
            <PlusCircle className="w-5 h-5" />
            Birinchi filmni qo‘shing
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {movies.map((movie) => (
            <div
              key={movie._id}
              className="bg-black/30 backdrop-blur-lg border border-yellow-400/20 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start gap-4 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in"
            >
              <div className="flex-1">
                <h2 className="text-base sm:text-lg font-semibold text-white line-clamp-1">
                  {movie.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 line-clamp-2">
                  {movie.caption}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  <strong>Janrlar:</strong>{" "}
                  <span className="text-cyan-400">{movie.keywords.join(", ")}</span>
                </p>
                <p className="text-xs text-gray-400">
                  <strong>Fayl turi:</strong> {movie.fileType}
                </p>
              </div>
              <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                <Link
                  to={`/admin/edit/${movie._id}`}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-gradient-to-r from-yellow-400 to-cyan-400 hover:from-yellow-500 hover:to-cyan-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition duration-300"
                >
                  <Pencil className="w-4 h-4" />
                  Tahrirlash
                </Link>
                <button
                  onClick={() => setShowDeleteModal(movie._id)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1 bg-red-500/80 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition duration-300"
                >
                  <Trash2 className="w-4 h-4" />
                  O‘chirish
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-black/90 border border-yellow-400/20 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">Filmni o‘chirish</h2>
              <button
                onClick={() => setShowDeleteModal(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-300 mb-6">
              Ushbu filmni rostdan ham o‘chirib tashlamoqchimisiz?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              >
                O‘chirish
              </button>
            </div>
          </div>
        </div>
      )}

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

export default AdminMovieList;