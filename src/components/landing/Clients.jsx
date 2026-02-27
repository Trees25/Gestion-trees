import React from "react";
import { motion } from "framer-motion";
import PixelCard from "../reactbits/PixelCard";
import '../../styles/PixelCard.css';

const ClientItem = ({ logo, name, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ scale: 1.05 }}
    className="flex items-center justify-center bg-slate-900 p-4 rounded-2xl shadow-2xl border border-white/5 w-full h-40 transition-all duration-300"
  >
    <img
      src={logo}
      alt={`Logotipo de ${name}`}
      className="h-full w-full object-contain filter brightness-90 grayscale hover:grayscale-0 transition-all duration-500"
      loading="lazy"
    />
  </motion.div>
);

const Clients = () => {
  const clients = [
    { name: "MiPañalera", logo: "/assets/MiPañalera_logo.jpg" },
    { name: "Molinautos", logo: "/assets/molinautos_logo.png" },
    { name: "Ilcapitano", logo: "/assets/Ilcapitano_logo.jpg" },
    { name: "Biscui", logo: "/assets/Biscui_logo.jpg" },
    { name: "AsocSarm", logo: "/assets/AsocSar_logo.jpg" },
  ];

  return (
    <section id="clientes" className="py-24 bg-slate-950">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">Confianza y Resultados</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-2 mb-6">Nuestros Clientes</h2>
          <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-8 text-slate-400 text-lg max-w-2xl mx-auto">
            Empresas que confían en nuestras soluciones tecnológicas para potenciar su crecimiento.
          </p>
        </motion.div>

        <div className="mx-auto w-full max-w-6xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {clients.map((client, index) => (
            <ClientItem key={index} logo={client.logo} name={client.name} delay={index * 0.1} />
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center bg-blue-600 p-1 rounded-2xl shadow-xl hover:shadow-2xl transition w-full h-40 overflow-hidden relative"
          >
            <PixelCard variant="blue" className="w-full h-full relative">
              <a
                href="#contacto"
                className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 p-2"
              >
                <span className="text-2xl mb-1">🤝</span>
                <span className="font-black text-lg">Sé el Próximo</span>
                <span className="text-xs font-medium opacity-80">¡Contáctanos!</span>
              </a>
            </PixelCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
