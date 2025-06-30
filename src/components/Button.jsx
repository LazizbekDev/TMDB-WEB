import { Link } from "react-router-dom";

function Button({ children, onClick, to, gradient = false, icon: Icon, disabled = false }) {
  const baseClasses = "flex items-center justify-center gap-2 mt-4 px-4 py-2 rounded-lg font-medium transition duration-300 text-white";
  const gradientClasses = gradient
    ? "bg-gradient-to-r from-yellow-400 to-cyan-400 hover:from-yellow-500 hover:to-cyan-500 shadow-md hover:shadow-lg"
    : "bg-gray-600 hover:bg-gray-700";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  if (to) {
    return (
      <Link
        to={to}
        className={`${baseClasses} ${gradientClasses} ${disabledClasses}`}
        aria-label={children}
      >
        {Icon && <Icon className="w-4 h-4" />}
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${gradientClasses} ${disabledClasses}`}
      aria-label={children}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}

export default Button;