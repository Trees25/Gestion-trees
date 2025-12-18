import React, { useState } from "react";
import Folder from "../reactbits/Folder"; // Asegúrate de ajustar la ruta

const Portfolio = () => {
  const [openFolder, setOpenFolder] = useState(null);

  const handleToggle = (folderId) => {
    setOpenFolder(openFolder === folderId ? null : folderId);
  };

  return (
    <section id="portafolio" className="py-16 bg-[#120e2e] text-white portfolio-section">
      <div className="portfolio-container">
        <h2 className="portfolio-title">
          Nuestros Proyectos
        </h2>

        <div className="folders-wrapper">
          {/* 📂 Carpeta 1 */}
          <div className="folder-item">
            <h3 className="folder-title">
              Paginas Web
            </h3>
            <div className="folder-wrapper">   {/* ← ESTE WRAPPER ES LA SOLUCIÓN */}
            <Folder
              color="#296cf2"
              images={[
    {
      src: "/assets/kaiserjagger.png",
      link: "https://kg-portfolio-nu.vercel.app/",
    },
    {
      src: "/assets/anti-robo-auto.png",
      link: "",
    },
    {
      src: "/assets/certibankos.png",
      link: "https://certibankos.com",
    },
  ]}
              isOpen={openFolder === 1}
              onToggle={() => handleToggle(1)}
            />
          </div>
          </div>

          {/* 📂 Carpeta 2 */}
          <div className="folder-item">
            <h3 className="folder-title">
              Aplicacion web
            </h3>
             <div className="folder-wrapper">   {/* ← ESTE WRAPPER ES LA SOLUCIÓN */}
            <Folder
              color="#3d8bf2"
               images={[
    {
      src: "/assets/molinaautos3.png",
      link: "https://molinaautos.com",
    },
    {
      src: "/assets/molinaautos2.png",
      link: "https://molinaautos.com",
    },
    {
      src: "/assets/molinaautos1.png",
      link: "https://molinaautos.com",
    },
  ]}
              isOpen={openFolder === 2}
              onToggle={() => handleToggle(2)}
            />
          </div>
          </div>
          {/* 📂 Carpeta 3 */}
          <div className="folder-item">
            <h3 className="folder-title"> 
              Sistemas Personalizados
            </h3>
            <div className="folder-wrapper">   {/* ← ESTE WRAPPER ES LA SOLUCIÓN */}
            <Folder
              color="#5eadf2"
              images={[
    {
      src: "/assets/posventa3.png",
      link: "https://posventatrees.web.app/",
    },
    {
      src: "/assets/posventa2.png",
      link: "https://posventatrees.web.app/",
    },
    {
      src: "/assets/posventa1.png",
      link: "https://posventatrees.web.app/",
    },
  ]}
              isOpen={openFolder === 3}
              onToggle={() => handleToggle(3)}
            />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;