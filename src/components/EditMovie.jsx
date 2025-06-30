import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, Film } from "lucide-react";
import Navbar from "../components/Navbar";

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    name: "",
    caption: "",
    movieUrl: "",
    keywords: [],
    fileType: "",
    teaser: "",
    teaserpath: "",
    size: "",
    duration: "",
    views: 0,
    accessedBy: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://tmdb-m3sw.onrender.com/api/movies/${id}`, {
      headers: {
        "telegram-init-data": window.Telegram.WebApp?.initData || "",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Film ma’lumotlarini olishda xato yuz berdi");
        return res.json();
      })
      .then((data) => {
        setMovie({
          ...data,
          keywords: Array.isArray(data.keywords) ? data.keywords : [],
          accessedBy: Array.isArray(data.accessedBy) ? data.accessedBy : [],
        });
      })
      .catch((err) => {
        console.error("Filmni olishda xatolik:", err);
        setError("Film ma’lumotlarini olishda xato yuz berdi.");
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const validateMovieData = (data) => {
    const errors = [];
    if (!data.name.trim()) errors.push("Film nomi kiritilishi shart.");
    if (!data.caption.trim()) errors.push("Tavsif kiritilishi shart.");
    if (!data.movieUrl.trim()) errors.push("Ko‘rish havolasi kiritilishi shart.");
    if (!data.fileType.trim()) errors.push("Fayl turi kiritilishi shart.");
    if (!data.teaser && !data.teaserpath)
      errors.push("Teaser File ID yoki Teaser URL kiritilishi shart.");
    if (isNaN(data.views) || data.views < 0)
      errors.push("Ko‘rishlar soni 0 yoki undan katta bo‘lishi kerak.");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const validationErrors = validateMovieData(movie);
    if (validationErrors.length > 0) {
      setError(validationErrors);
      setIsLoading(false);
      return;
    }

    const payload = {
      ...movie,
      keywords: Array.isArray(movie.keywords)
        ? movie.keywords
        : movie.keywords.split(",").map((k) => k.trim()),
      accessedBy: Array.isArray(movie.accessedBy)
        ? movie.accessedBy
        : movie.accessedBy.split(",").map((id) => id.trim()),
      views: parseInt(movie.views) || 0,
    };

    try {
      const response = await fetch(`https://tmdb-m3sw.onrender.com/api/movies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "telegram-init-data": window.Telegram.WebApp?.initData || "",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Noma’lum xato");
      }

      navigate("/admin");
    } catch (err) {
      console.error("Filmni yangilashda xatolik:", err);
      setError([`Filmni saqlashda xato: ${err.message}`]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black/50 backdrop-blur-md text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 pt-20">
        <div className="flex items-center gap-2 mb-6 animate-fade-in">
          <Film className="w-6 h-6 text-yellow-400" />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Filmni tahrirlash
          </h1>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center text-white text-lg animate-pulse">
            Yuklanmoqda...
          </div>
        )}

        {/* Error Message */}
        {error && !isLoading && (
          <div className="mb-4 p-4 bg-red-500/20 text-red-400 rounded-lg animate-fade-in">
            {Array.isArray(error) ? (
              <ul className="list-disc list-inside">
                {error.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            ) : (
              error
            )}
          </div>
        )}

        {/* Form */}
        {!isLoading && (
          <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
            <Input
              label="Nomi"
              value={movie.name}
              onChange={(v) => setMovie({ ...movie, name: v })}
            />
            <Textarea
              label="Tavsif"
              value={movie.caption}
              onChange={(v) => setMovie({ ...movie, caption: v })}
            />
            <Input
              label="Ko‘rish havolasi"
              value={movie.movieUrl}
              onChange={(v) => setMovie({ ...movie, movieUrl: v })}
            />
            <Input
              label="Kalit so‘zlar (vergul bilan)"
              value={movie.keywords.join(", ")}
              onChange={(v) =>
                setMovie({ ...movie, keywords: v.split(",").map((k) => k.trim()) })
              }
            />
            <Input
              label="Fayl turi"
              value={movie.fileType}
              onChange={(v) => setMovie({ ...movie, fileType: v })}
            />
            <Input
              label="Teaser File ID (agar teaserpath yo‘q bo‘lsa)"
              value={movie.teaser}
              onChange={(v) => setMovie({ ...movie, teaser: v })}
            />
            <Input
              label="Teaser URL (to‘g‘ridan-to‘g‘ri)"
              value={movie.teaserpath}
              onChange={(v) => setMovie({ ...movie, teaserpath: v })}
            />
            <Input
              label="Hajmi"
              value={movie.size}
              onChange={(v) => setMovie({ ...movie, size: v })}
            />
            <Input
              label="Davomiyligi"
              value={movie.duration}
              onChange={(v) => setMovie({ ...movie, duration: v })}
            />
            <Input
              label="Ko‘rishlar soni"
              type="number"
              value={movie.views}
              onChange={(v) => setMovie({ ...movie, views: parseInt(v) || 0 })}
            />
            <Input
              label="Foydalanuvchilar ID (vergul bilan)"
              value={movie.accessedBy.join(", ")}
              onChange={(v) =>
                setMovie({ ...movie, accessedBy: v.split(",").map((id) => id.trim()) })
              }
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-yellow-400 to-cyan-400 hover:from-yellow-500 hover:to-cyan-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Saqlash
            </button>
          </form>
        )}
      </main>

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

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm sm:text-base font-medium text-gray-200 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 sm:p-3 bg-gray-800/80 text-white border border-yellow-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
        required={label !== "Teaser URL (to‘g‘ridan-to‘g‘ri)" && label !== "Teaser File ID (agar teaserpath yo‘q bo‘lsa)"}
      />
    </div>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-sm sm:text-base font-medium text-gray-200 mb-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 sm:p-3 bg-gray-800/80 text-white border border-yellow-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
        rows={4}
        required
      />
    </div>
  );
}

export default EditMovie;