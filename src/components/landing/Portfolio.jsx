import React, { useState } from "react";
import { motion } from "framer-motion";
import Folder from "../reactbits/Folder";

const Portfolio = () => {
  const [openFolder, setOpenFolder] = useState(null);

  const handleToggle = (folderId) => {
    setOpenFolder(openFolder === folderId ? null : folderId);
  };

  return (
    <section id="portafolio" className="py-24 bg-[#120e2e] text-white portfolio-section overflow-hidden">
      <div className="portfolio-container container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 font-bold tracking-widest uppercase text-sm">Nuestro Trabajo</span>
          <h2 className="text-4xl md:text-6xl font-black mt-2 mb-6">Nuestros Proyectos</h2>
          <div className="w-24 h-2 bg-[#296cf2] mx-auto rounded-full"></div>
        </motion.div>

        <div className="folders-wrapper grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* 📂 Carpeta 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="folder-item flex flex-col items-center"
          >
            <h3 className="folder-title text-xl font-bold mb-6 text-blue-400 bg-blue-400/10 px-6 py-2 rounded-full border border-blue-400/20">
              Páginas Web
            </h3>
            <div className="folder-wrapper relative w-full aspect-square flex items-center justify-center">
              <Folder
                color="#296cf2"
                images={[
                  { src: "/assets/kaiserjagger.png", link: "https://kg-portfolio-nu.vercel.app/" },
                  { src: "/assets/anti-robo-auto.png", link: "" },
                  { src: "/assets/certibankos.png", link: "https://certibankos.com" },
                ]}
                isOpen={openFolder === 1}
                onToggle={() => handleToggle(1)}
              />
            </div>
          </motion.div>

          {/* 📂 Carpeta 2 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="folder-item flex flex-col items-center"
          >
            <h3 className="folder-title text-xl font-bold mb-6 text-blue-300 bg-blue-300/10 px-6 py-2 rounded-full border border-blue-300/20">
              Aplicación Web
            </h3>
            <div className="folder-wrapper relative w-full aspect-square flex items-center justify-center">
              <Folder
                color="#3d8bf2"
                images={[
                  { src: "/assets/molinaautos3.png", link: "https://molinaautos.com" },
                  { src: "/assets/molinaautos2.png", link: "https://molinaautos.com" },
                  { src: "/assets/molinaautos1.png", link: "https://molinaautos.com" },
                ]}
                isOpen={openFolder === 2}
                onToggle={() => handleToggle(2)}
              />
            </div>
          </motion.div>

          {/* 📂 Carpeta 3 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="folder-item flex flex-col items-center"
          >
            <h3 className="folder-title text-xl font-bold mb-6 text-blue-200 bg-blue-200/10 px-6 py-2 rounded-full border border-blue-200/20">
              Sistemas Personalizados
            </h3>
            <div className="folder-wrapper relative w-full aspect-square flex items-center justify-center">
              <Folder
                color="#5eadf2"
                images={[
                  { src: "/assets/posventa3.png", link: "https://posventatrees.web.app/" },
                  { src: "/assets/posventa2.png", link: "https://posventatrees.web.app/" },
                  { src: "/assets/posventa1.png", link: "https://posventatrees.web.app/" },
                ]}
                isOpen={openFolder === 3}
                onToggle={() => handleToggle(3)}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
