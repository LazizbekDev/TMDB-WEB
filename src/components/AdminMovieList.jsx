import { Link } from 'react-router-dom';

function AdminMovieList({ movies, setMovies }) {
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://tmdb-hr4k.onrender.com/api/movies/${id}`, {
        method: 'DELETE',
        headers: {
          'telegram-init-data': window.Telegram.WebApp.initData,
        },
      });
      console.log('Film o‘chirildi:', await res.json());
      setMovies(movies.filter(movie => movie._id !== id));
    } catch (err) {
      console.error('Filmni o‘chirishda xatolik:', err);
    }
  };

  return (
    <div className="space-y-4">
      <Link
        to="/admin/add"
        className="bg-green-500 text-white px-4 py-2 rounded inline-block mb-4"
      >
        Yangi film qo‘shish
      </Link>
      {movies.map(movie => (
        <div key={movie._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">{movie.name}</h2>
            <p className="text-sm text-gray-600">{movie.caption}</p>
            <p className="text-sm text-gray-500">Janrlar: {movie.keywords.join(', ')}</p>
            <p className="text-sm text-gray-500">Fayl turi: {movie.fileType}</p>
          </div>
          <div className="space-x-2">
            <Link
              to={`/admin/edit/${movie._id}`}
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Tahrirlash
            </Link>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDelete(movie._id)}
            >
              O‘chirish
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminMovieList;