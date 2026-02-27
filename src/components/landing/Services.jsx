import React from "react";
import { motion } from "framer-motion";

const ServiceItem = ({ icon, title, description, delay }) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -10 }}
    className="relative group bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-white/5 flex flex-col items-center text-center transition-all duration-300"
  >
    <div className="w-20 h-20 mb-6 bg-blue-900/20 rounded-3xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-2xl font-black mb-4 text-white">{title}</h3>
    <p className="text-slate-400 mb-8 leading-relaxed">
      {description}
    </p>
    <a
      href="#contacto"
      className="mt-auto px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20"
    >
      Conocer más
    </a>
  </motion.article>
);

const Services = () => (
  <section id="servicios" className="py-24 bg-slate-950">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <span className="text-blue-500 font-bold tracking-widest uppercase text-sm">Nuestra Experiencia</span>
        <h2 className="text-4xl md:text-6xl font-black text-white mt-2 mb-6">Nuestros Servicios</h2>
        <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full"></div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <ServiceItem
          icon="🌐"
          title="Desarrollo Web"
          description="Creamos sitios web modernos, responsivos y optimizados, adaptados a las necesidades de tu negocio."
          delay={0}
        />
        <ServiceItem
          icon="💻"
          title="Software a Medida"
          description="Desarrollamos soluciones de software personalizadas para optimizar procesos y mejorar la eficiencia."
          delay={0.2}
        />
        <ServiceItem
          icon="🛠️"
          title="Mantenimiento"
          description="Ofrecemos servicios de mantenimiento y reparación de hardware para garantizar el rendimiento de tus equipos."
          delay={0.4}
        />
      </div>
    </div>
  </section>
);

export default Services;