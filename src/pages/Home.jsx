import { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import HeroBanner from "../components/HeroBanner";

function Home() {
  const [movies, setMovies] = useState([]);
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch("https://tmdb-hr4k.onrender.com/api/movies", {
      headers: {
        "telegram-init-data": window.Telegram.WebApp.initData,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setFeatured(data.slice(0, 5)); // Birinchi 5 ta featured
      })
      .catch((err) => console.error("Filmlarni olishda xatolik:", err));
  }, []);

  const handleSendData = (movie) => {
    window.Telegram.WebApp.sendData(
      JSON.stringify({ movieId: movie._id, name: movie.name })
    );
  };

  return (
    <div className="w-full text-white bg-gradient-to-b from-[#0f0f0f] via-[#111] to-[#1a1a1a] min-h-screen">
      <HeroBanner featured={featured} onSendData={handleSendData} />
      <section className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">Barcha Filmlar</h2>
        <MovieList movies={movies} onSendData={handleSendData} />
      </section>
    </div>
  );
}

export default Home;
