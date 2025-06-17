import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    name: '',
    caption: '',
    movieUrl: '',
    keywords: [],
    fileType: '',
    teaser: '',
    teaserpath: '',
    size: '',
    duration: '',
    views: 0,
    accessedBy: [],
  });

  useEffect(() => {
    fetch(`https://tmdb-hr4k.onrender.com/api/movies/${id}`, {
      headers: {
        'telegram-init-data': window.Telegram.WebApp.initData,
      },
    })
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(err => console.error('Filmni olishda xatolik:', err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`https://tmdb-hr4k.onrender.com/api/movies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'telegram-init-data': window.Telegram.WebApp.initData,
        },
        body: JSON.stringify(movie),
      });
      navigate('/admin');
    } catch (err) {
      console.error('Filmni yangilashda xatolik:', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🎬 Filmni tahrirlash</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Nomi" value={movie.name} onChange={v => setMovie({ ...movie, name: v })} />
        <Textarea label="Tavsif" value={movie.caption} onChange={v => setMovie({ ...movie, caption: v })} />
        <Input label="Ko‘rish havolasi" value={movie.movieUrl} onChange={v => setMovie({ ...movie, movieUrl: v })} />
        <Input label="Kalit so‘zlar (vergul bilan)" value={movie.keywords.join(', ')} onChange={v => setMovie({ ...movie, keywords: v.split(',').map(k => k.trim()) })} />
        <Input label="Fayl turi" value={movie.fileType} onChange={v => setMovie({ ...movie, fileType: v })} />

        <Input label="Teaser File ID (agar teaserpath yo‘q bo‘lsa)" value={movie.teaser} onChange={v => setMovie({ ...movie, teaser: v })} />
        <Input label="Teaser URL (to‘g‘ridan-to‘g‘ri)" value={movie.teaserpath} onChange={v => setMovie({ ...movie, teaserpath: v })} />

        <Input label="Hajmi" value={movie.size} onChange={v => setMovie({ ...movie, size: v })} />
        <Input label="Davomiyligi" value={movie.duration} onChange={v => setMovie({ ...movie, duration: v })} />
        <Input label="Ko‘rishlar soni" type="number" value={movie.views} onChange={v => setMovie({ ...movie, views: parseInt(v) || 0 })} />
        <Input label="Foydalanuvchilar ID (vergul bilan)" value={movie.accessedBy.join(', ')} onChange={v => setMovie({ ...movie, accessedBy: v.split(',').map(id => id.trim()) })} />

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold">
          💾 Saqlash
        </button>
      </form>
    </div>
  );
}

// Kichik reusable Input component
function Input({ label, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded"
        required={label !== 'Teaser URL' && label !== 'Teaser File ID'}
      />
    </div>
  );
}

// Reusable Textarea
function Textarea({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
    </div>
  );
}

export default EditMovie;
