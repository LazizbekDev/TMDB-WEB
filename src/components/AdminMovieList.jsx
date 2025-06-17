import { Link } from 'react-router-dom';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';

function AdminMovieList({ movies, setMovies }) {
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bu filmni o‘chirilsinmi?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://tmdb-hr4k.onrender.com/api/movies/${id}`, {
        method: 'DELETE',
        headers: {
          'telegram-init-data': window.Telegram.WebApp.initData,
        },
      });

      const result = await res.json();
      console.log('O‘chirildi:', result);
      setMovies(prev => prev.filter(movie => movie._id !== id));
    } catch (err) {
      console.error('Filmni o‘chirishda xatolik:', err);
      alert("Filmni o‘chirishda xatolik yuz berdi.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🎞️ Filmlar ro‘yxati</h1>
        <Link
          to="/admin/add"
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          <PlusCircle size={18} />
          Yangi qo‘shish
        </Link>
      </div>

      {movies.length === 0 ? (
        <p className="text-gray-500 text-center">Hozircha hech qanday film mavjud emas.</p>
      ) : (
        <div className="space-y-4">
          {movies.map(movie => (
            <div
              key={movie._id}
              className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex justify-between items-start gap-4"
            >
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800">{movie.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{movie.caption}</p>
                <p className="text-xs text-gray-500 mt-2">
                  <strong>Janrlar:</strong> {movie.keywords.join(', ')}
                </p>
                <p className="text-xs text-gray-500">
                  <strong>Fayl turi:</strong> {movie.fileType}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  to={`/admin/edit/${movie._id}`}
                  className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded text-sm"
                >
                  <Pencil size={16} />
                  Tahrirlash
                </Link>
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm"
                >
                  <Trash2 size={16} />
                  O‘chirish
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminMovieList;
