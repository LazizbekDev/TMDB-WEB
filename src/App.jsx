import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import EditMovie from './components/EditMovie';
import AddMovie from './components/AddMovie';
import './index.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  useEffect(() => {
    window.Telegram.WebApp.ready();
    console.log('Foydalanuvchi:', window.Telegram.WebApp.initDataUnsafe.user);
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/edit/:id" element={<EditMovie />} />
          <Route path="/admin/add" element={<AddMovie />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;