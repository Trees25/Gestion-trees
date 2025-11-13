import React, { useState } from "react";
import Folder from "../../reactbits/Folder"; // Asegúrate de ajustar la ruta

const Portfolio = () => {
  const [openFolder, setOpenFolder] = useState(null);

  const handleToggle = (folderId) => {
    setOpenFolder(openFolder === folderId ? null : folderId);
  };

  return (
    <section id="portafolio" className="py-16 bg-[#202E40] text-white">
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <h2
          style={{
            marginBottom: "40px",
            fontSize: "2rem",
            color: "#ffffffff",
          }}
        >
          Nuestros Proyectos
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "60px",
            height: "400px",
          }}
        >
          {/* 📂 Carpeta 1 */}
          <div style={{ textAlign: "center" }}>
            <h3
              style={{ marginBottom: "50px", fontSize: "1.2rem", color: "#fff" }}
            >
              Paginas Web
            </h3>
            <Folder
              color="#296cf2"
              images={[
                "/images/proyecto1a.jpg",
                "/images/proyecto1b.jpg",
                "/images/proyecto1c.jpg",
              ]}
              isOpen={openFolder === 1}
              onToggle={() => handleToggle(1)}
            />
          </div>

          {/* 📂 Carpeta 2 */}
          <div style={{ textAlign: "center" }}>
            <h3
              style={{ marginBottom: "50px", fontSize: "1.2rem", color: "#fff" }}
            >
              Aplicacion web
            </h3>
            <Folder
              color="#3d8bf2"
              images={[
                "/assets/molinaautos3.png",
                "/assets/molinaautos2.png",
                "/assets/molinaautos1.png",
              ]}
              isOpen={openFolder === 2}
              onToggle={() => handleToggle(2)}
            />
          </div>

          {/* 📂 Carpeta 3 */}
          <div style={{ textAlign: "center" }}>
            <h3
              style={{ marginBottom: "50px", fontSize: "1.2rem", color: "#fff" }}
            > 
              Sistemas Personalizados
            </h3>
            <Folder
              color="#5eadf2"
              images={[
                "/assets/posventa3.png",
                "/assets/posventa2.png",
                "/assets/posventa1.png",
              ]}
              isOpen={openFolder === 3}
              onToggle={() => handleToggle(3)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;