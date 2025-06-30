import Logo from "./Logo";
import { Instagram, Send, Bot } from "lucide-react";

export default function Footer() {
  const handleTelegramLink = (url) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openTelegramLink(url);
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <footer className="bg-black/50 backdrop-blur-md text-gray-300 py-8 sm:py-10 border-t border-yellow-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* TMDB Section */}
        <div className="animate-fade-in">
          <Logo className="mb-4 w-32 sm:w-40" enableGlitch={false} />
          <p className="text-sm sm:text-base leading-relaxed text-gray-200">
            TMDB — Telegram uchun mo‘ljallangan film va seriallarni topish, ko‘rish va tavsiya qilish imkonini beruvchi bot. Foydalanuvchilar filmlar va seriallarni izlashlari, ko‘rishlari, o‘z takliflarini yuborishlari va fikr-mulohazalarini qoldirishlari mumkin.
          </p>
        </div>

        {/* Features Section */}
        <div className="animate-fade-in">
          <h3 className="text-white font-semibold text-base sm:text-lg mb-3">
            Xususiyatlar
          </h3>
          <ul className="text-sm sm:text-base space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-yellow-400">🔍</span> Film va seriallarni izlash
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-400">🎬</span> Ko‘rish va yuklab olish
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-400">🤖</span> Tavsiya tizimi
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-400">💬</span> Fikr va takliflar
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-400">🛠️</span> Admin panel
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-400">⚡</span> Inline search
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="animate-fade-in">
          <h3 className="text-white font-semibold text-base sm:text-lg mb-3">
            Aloqa
          </h3>
          <ul className="text-sm sm:text-base space-y-2">
            <li className="flex items-center gap-2">
              <Instagram className="w-5 h-5 text-yellow-400" />
              <a
                href="https://instagram.com/tmdbase"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-100 transition duration-300"
              >
                @tmdbase
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Send className="w-5 h-5 text-yellow-400" />
              <button
                onClick={() => handleTelegramLink("https://t.me/tmdbase")}
                className="text-yellow-400 hover:text-yellow-100 transition duration-300"
              >
                @tmdbase
              </button>
            </li>
            <li className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-yellow-400" />
              <button
                onClick={() => handleTelegramLink("https://t.me/tmdb_listbot")}
                className="text-yellow-400 hover:text-yellow-100 transition duration-300"
              >
                @tmdb_listbot
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm sm:text-base text-gray-400 relative animate-fade-in">
        <span className="relative">
          © {new Date().getFullYear()} TMDB — Barcha huquqlar himoyalangan
          <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-400 to-cyan-400" />
        </span>
      </div>

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
    </footer>
  );
}