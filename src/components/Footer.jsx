export default function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">TMDB</h2>
          <p className="text-sm leading-relaxed">
            TMDB — bu Telegram uchun mo‘ljallangan film va seriallarni topish, ko‘rish va tavsiya qilish imkonini beruvchi bot. Foydalanuvchilar filmlar va seriallarni izlashlari, ko‘rishlari, o‘z takliflarini yuborishlari va fikr-mulohazalarini qoldirishlari mumkin.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Xususiyatlar</h3>
          <ul className="text-sm space-y-1">
            <li>🔍 Film va seriallarni izlash</li>
            <li>🎬 Ko‘rish va yuklab olish</li>
            <li>🤖 Tavsiya tizimi</li>
            <li>💬 Fikr va takliflar</li>
            <li>🛠️ Admin panel</li>
            <li>⚡ Inline search</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Aloqa</h3>
          <ul className="text-sm space-y-2">
            <li>
              📸 Instagram:{" "}
              <a
                href="https://instagram.com/tmdbase"
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @tmdbase
              </a>
            </li>
            <li>
              📢 Telegram kanal:{" "}
              <a
                href="https://t.me/tmdbase"
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @tmdbase
              </a>
            </li>
            <li>
              🤖 Telegram bot:{" "}
              <a
                href="https://t.me/kasimkhujaevabot"
                className="text-blue-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @kasimkhujaevabot
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} TMDB — Barcha huquqlar himoyalangan
      </div>
    </footer>
  );
}
