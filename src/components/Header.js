import React from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3 border-bottom mb-4">
      <h1 style={{ margin: 0 }}>Gestion Trees</h1>
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </header>
  );
}
