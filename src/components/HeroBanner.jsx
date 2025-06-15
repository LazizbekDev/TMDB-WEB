import { useEffect, useState } from "react";

function HeroBanner({ featured = [], onSendData }) {
  const [active, setActive] = useState(0);
  const [teaserUrl, setTeaserUrl] = useState("");

  const movie = featured[active];

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % featured.length);
    }, 16000);
    return () => clearInterval(interval);
  }, [featured]);

  useEffect(() => {
    if (!movie || !movie.teaser) return;
    fetch(`https://tmdb-hr4k.onrender.com/api/file/${movie.teaser}`, {
      headers: {
        "telegram-init-data": window.Telegram.WebApp.initData,
      },
    })
      .then((res) => res.json())
      .then((data) => setTeaserUrl(data.fileUrl))
      .catch(() => setTeaserUrl(""));
  }, [movie]);

  if (!movie || !teaserUrl) return null;

  return (
    <div className="relative h-[70vh] flex items-end p-6 overflow-hidden">
      {/* Video background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={teaserUrl}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Top to bottom gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0" />

      {/* Text content */}
      <div className="relative z-10 max-w-3xl text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">{movie.name}</h1>
        <p className="text-sm md:text-base text-gray-200 mb-5 line-clamp-3">
          {movie.caption}
        </p>
        <button
          onClick={() => onSendData(movie)}
          className="bg-red-600 hover:bg-red-700 transition px-5 py-2 text-white rounded-lg font-semibold"
        >
          Ko‘rishni boshlash
        </button>
      </div>
    </div>
  );
}

export default HeroBanner;
