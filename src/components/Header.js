import React from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3 border-bottom mb-4">
       <img src={"/assets/logo.png"} alt="Logo" style={{ width: "150px" }} />
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </header>
  );
}