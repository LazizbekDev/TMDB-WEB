import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddMovie() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    name: '',
    caption: '',
    movieUrl: '',
    keywords: [],
    fileType: '',
    teaser: '',
    size: '',
    duration: '',
    views: 0,
    accessedBy: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://tmdb-hr4k.onrender.com/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'telegram-init-data': window.Telegram.WebApp.initData,
        },
        body: JSON.stringify(movie),
      });
      navigate('/admin');
    } catch (err) {
      console.error('Film qo‘shishda xatolik:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Yangi film qo‘shish</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nomi</label>
          <input
            type="text"
            value={movie.name}
            onChange={(e) => setMovie({ ...movie, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Tavsif</label>
          <textarea
            value={movie.caption}
            onChange={(e) => setMovie({ ...movie, caption: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Ko‘rish havolasi</label>
          <input
            type="text"
            value={movie.movieUrl}
            onChange={(e) => setMovie({ ...movie, movieUrl: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Kalit so‘zlar (vergul bilan ajratilgan)</label>
          <input
            type="text"
            value={movie.keywords.join(', ')}
            onChange={(e) => setMovie({ ...movie, keywords: e.target.value.split(',').map(k => k.trim()) })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Fayl turi</label>
          <input
            type="text"
            value={movie.fileType}
            onChange={(e) => setMovie({ ...movie, fileType: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Teaser havolasi</label>
          <input
            type="text"
            value={movie.teaser}
            onChange={(e) => setMovie({ ...movie, teaser: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Hajmi</label>
          <input
            type="text"
            value={movie.size}
            onChange={(e) => setMovie({ ...movie, size: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Davomiyligi</label>
          <input
            type="text"
            value={movie.duration}
            onChange={(e) => setMovie({ ...movie, duration: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Ko‘rishlar soni</label>
          <input
            type="number"
            value={movie.views}
            onChange={(e) => setMovie({ ...movie, views: parseInt(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Foydalanuvchilar (vergul bilan ajratilgan)</label>
          <input
            type="text"
            value={movie.accessedBy.join(', ')}
            onChange={(e) => setMovie({ ...movie, accessedBy: e.target.value.split(',').map(id => id.trim()) })}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Qo‘shish
        </button>
      </form>
    </div>
  );
}

export default AddMovie;