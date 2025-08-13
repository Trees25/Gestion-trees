import React from "react";
import { supabase } from "../supabase";
import { useNavigate, Link } from "react-router-dom";
import { animate, svg, stagger } from 'animejs';
export default function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };
animate(svg.createDrawable('.line'), {
  draw: ['0 0', '0 1', '1 1'],
  ease: 'inOutQuad',
  duration: 2000,
  delay: stagger(100),
  loop: true
});
  return (
    <header className="d-flex justify-content-between align-items-center p-3 border-bottom mb-4">
       <Link to="/admin">
        <img src="/assets/logo.png" alt="Logo" style={{ width: "150px", cursor: "pointer" }} />
      </Link>
      <button className="btn btn-outline-danger" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </header>
  );
}