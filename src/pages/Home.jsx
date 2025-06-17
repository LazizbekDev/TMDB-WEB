import { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import HeroBanner from "../components/HeroBanner";

function Home() {
  const [movies, setMovies] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    fetch("https://tmdb-hr4k.onrender.com/api/movies", {
      headers: {
        "telegram-init-data": window.Telegram.WebApp.initData,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setFeatured(data.slice(0, 5));
      })
      .catch((err) => console.error("Filmlarni olishda xatolik:", err));
  }, []);

  const handleSendData = (movie) => {
    window.Telegram.WebApp.sendData(
      JSON.stringify({ movieId: movie._id, name: movie.name })
    );
  };

  // _id dan vaqtni olish funksiyasi
  const getDateFromObjectId = (id) =>
    new Date(parseInt(id.substring(0, 8), 16) * 1000);

  const sortedMovies = [...movies].sort((a, b) => {
    switch (sortOption) {
      case "newest":
        return getDateFromObjectId(b._id) - getDateFromObjectId(a._id);
      case "oldest":
        return getDateFromObjectId(a._id) - getDateFromObjectId(b._id);
      case "mostViewed":
        return b.views - a.views;
      case "leastViewed":
        return a.views - b.views;
      default:
        return 0;
    }
  });

  return (
    <div className="w-full text-white bg-gradient-to-b from-[#0f0f0f] via-[#111] to-[#1a1a1a] min-h-screen">
      <HeroBanner featured={featured} onSendData={handleSendData} />
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Barcha Filmlar</h2>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-[#222] text-white border border-gray-600 rounded px-3 py-2"
          >
            <option value="newest">Eng yangilari</option>
            <option value="oldest">Eng eskilari</option>
            <option value="mostViewed">Ko‘p ko‘rilgan</option>
            <option value="leastViewed">Kam ko‘rilgan</option>
          </select>
        </div>
        <MovieList movies={sortedMovies} onSendData={handleSendData} />
      </section>
    </div>
  );
}

export default Home;
