import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import EditMovie from "./components/EditMovie";
import AddMovie from "./components/AddMovie";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      console.log("Foydalanuvchi:", window.Telegram.WebApp.initDataUnsafe.user);
    } else {
      console.warn("Telegram WebApp is not available");
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <TransitionGroup component={null}>
          <CSSTransition
            key={location.pathname}
            classNames="fade"
            timeout={300}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/admin/edit/:id" element={<EditMovie />} />
              <Route path="/admin/add" element={<AddMovie />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>

      {/* Tailwind animation styles */}
      <style jsx global>{`
        .fade-enter {
          opacity: 0;
          transform: translateY(10px);
        }
        .fade-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 300ms ease-in, transform 300ms ease-in;
        }
        .fade-exit {
          opacity: 1;
          transform: translateY(0);
        }
        .fade-exit-active {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 300ms ease-in, transform 300ms ease-in;
        }
      `}</style>
    </Router>
  );
}

export default App;