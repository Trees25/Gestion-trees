import React from "react";
import ProfileCard from "../reactbits/ProfileCard"; // Asegúrate de ajustar la ruta
import AboutAnimation from "../reactbits/Lottie"; // Asegúrate de ajustar la ruta

const MissionVision = () => (
  <div>
    <h3 className="text-2xl font-semibold mb-4 text-[#5EADF2]">Misión y Visión</h3>
    <p className="mb-4">
      Nuestra misión transformar los desafíos tecnológicos de nuestros clientes en soluciones innovadoras y eficientes, integrando desarrollo de software, hardware y servicios de soporte. Nos comprometemos a ofrecer calidad, confiabilidad y atención personalizada, generando impacto positivo en sus procesos y proyectos.
    </p>
    <p>
      Buscamos ser reconocidos como referentes en el desarrollo de soluciones tecnológicas integrales, fusionando software y hardware de calidad superior. Aspiramos a impulsar la transformación digital de nuestros clientes, brindándoles herramientas innovadoras que potencien su crecimiento, eficiencia y competitividad en el mercado.
    </p>
  </div>
);

const About = () => (
  <section id="nosotros" className="py-16 bg-[#202E40] text-white">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Sobre Nosotros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <MissionVision />
        <AboutAnimation />
      </div>
      <h3 className="text-4xl font-semibold text-center mb-8 text-[#5EADF2]">Nuestro Equipo</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
        <ProfileCard
          name="Juan Mondre"
          title="Desarrollador FullStack"
          handle="juanmondre"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/assets/Juan_Mondre1.png"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => window.open("https://linktr.ee/JuanMondre")}
        />
        <ProfileCard
          name="Nicolás Andreolli"
          title="Desarrollador Fullstack"
          handle="nico_andreolli"
          status="Online"
          contactText="Contact Me"
          avatarUrl="/assets/Nicolas_Andreolli1.png"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => window.open("https://linktr.ee/NicolasAndreolli")}
        />
      </div>
    </div>
  </section>
);

export default About;