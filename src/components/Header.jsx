import React from "react";
import { supabase } from "../supabase";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-slate-100 mb-8 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/admin" className="hover:opacity-80 transition-opacity">
          <img src="/assets/logo.png" alt="Logo" className="h-10 w-auto" />
        </Link>

        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-95"
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}