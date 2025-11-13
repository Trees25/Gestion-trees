import React from "react";

const Footer = () => (
  <footer className="bg-[#101726] text-white py-8">
    <div className="container mx-auto px-4 text-center">
      <p>© {new Date().getFullYear()} Trees Tech. Todos los derechos reservados.</p>
    </div>
  </footer>
);

export default Footer;