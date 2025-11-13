import React, { useState } from "react";
import GooeyNav from "../../reactbits/GooeyNav"; // Asegúrate de ajustar la ruta

const Navbar = () => {
  const items = [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicios", href: "#servicios" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Portafolio", href: "#portafolio" },
    { label: "Clientes", href: "#clientes" },
    { label: "Contacto", href: "#contacto" },
    { label: "Admin", href: "/login" },
  ];

  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const cerrarMenu = () => setMenuAbierto(false);

  const handleLogoClick = () => {
    const section = document.getElementById("inicio");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    cerrarMenu();
  };

  return (
    <nav className="bg-[#101726] text-white p-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center relative">
        <img
          src="/assets/Trees_logo.png"
          alt="Logo"
          style={{ width: "150px", cursor: "pointer" }}
          onClick={handleLogoClick}
        />
        {/* Botón hamburguesa sólo en móvil */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* GooeyNav sólo en desktop */}
        <div
          className="hidden md:block"
          style={{ height: "80px", position: "relative", flexGrow: 1 }}
        >
          <GooeyNav
            items={items}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>

        {/* Menú desplegable móvil */}
        {menuAbierto && (
          <ul
            className="md:hidden absolute top-full right-0 mt-2 bg-[#101726] rounded w-48 py-2 z-50"
            onClick={cerrarMenu}
          >
            {items.map((item, i) => (
              <li key={i}>
                <a
                  href={item.href}
                  className="block px-4 py-2 hover:bg-[#5EADF2] hover:text-black"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;