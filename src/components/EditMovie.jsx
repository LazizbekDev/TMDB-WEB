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
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Telegram WebApp initData:', window.Telegram.WebApp.initData);

    fetch(`https://tmdb-hr4k.onrender.com/api/movies/${id}`, {
      headers: {
        'telegram-init-data': window.Telegram.WebApp.initData || '',
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}, Message: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched movie data:', data);
        setMovie({
          ...data,
          keywords: Array.isArray(data.keywords) ? data.keywords : [],
          accessedBy: Array.isArray(data.accessedBy) ? data.accessedBy : [],
        });
      })
      .catch(err => {
        console.error('Filmni olishda xatolik:', err);
        setError('Film ma’lumotlarini olishda xato yuz berdi.');
      });
  }, [id]);

  const validateMovieData = (data) => {
    const errors = [];
    if (!data.name.trim()) errors.push('Film nomi kiritilishi shart.');
    if (!data.caption.trim()) errors.push('Tavsif kiritilishi shart.');
    if (!data.movieUrl.trim()) errors.push('Ko‘rish havolasi kiritilishi shart.');
    if (!data.fileType.trim()) errors.push('Fayl turi kiritilishi shart.');
    if (!data.teaser && !data.teaserpath) errors.push('Teaser File ID yoki Teaser URL kiritilishi shart.');
    if (isNaN(data.views) || data.views < 0) errors.push('Ko‘rishlar soni 0 yoki undan katta bo‘lishi kerak.');
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate movie data
    const validationErrors = validateMovieData(movie);
    if (validationErrors.length > 0) {
      setError(validationErrors.join(' '));
      return;
    }

    // Prepare payload
    const payload = {
      ...movie,
      keywords: Array.isArray(movie.keywords) ? movie.keywords : movie.keywords.split(',').map(k => k.trim()),
      accessedBy: Array.isArray(movie.accessedBy) ? movie.accessedBy : movie.accessedBy.split(',').map(id => id.trim()),
      views: parseInt(movie.views) || 0,
    };

    console.log('Submitting movie data:', payload);
    console.log('Telegram initData for PUT:', window.Telegram.WebApp.initData);

    try {
      const response = await fetch(`https://tmdb-hr4k.onrender.com/api/movies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'telegram-init-data': window.Telegram.WebApp.initData || '',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Xatolik: ${errorData.error || 'Noma’lum xato'}`);
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error || 'Unknown error'}`);
      }

      navigate('/admin');
    } catch (err) {
      console.error('Filmni yangilashda xatolik:', err);
      setError(`Filmni saqlashda xato: ${err.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🎬 Filmni tahrirlash</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
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