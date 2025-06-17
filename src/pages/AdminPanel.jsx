import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminMovieList from '../components/AdminMovieList';

function AdminPanel() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://tmdb-hr4k.onrender.com/api/movies', {
      headers: {
        'telegram-init-data': window.Telegram.WebApp.initData,
      },
    })
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Filmlarni olishda xatolik:', err));
  }, []);

  return (
    <div className="container mx-auto p-4 my-12">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <Link to="/" className="text-blue-500 hover:underline mb-4 block">Asosiy sahifaga qaytish</Link>
      <AdminMovieList movies={movies} setMovies={setMovies} />
    </div>
  );
}

export default AdminPanel;