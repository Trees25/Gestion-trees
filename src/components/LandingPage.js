import React, { useState } from "react";
import TrueFocus from '../reactbits/TrueFocus';
import ProfileCard from '../reactbits/ProfileCard'
import GooeyNav from "../reactbits/GooeyNav";
import FaultyTerminal from "../reactbits/FaultyTerminal";

const LandingPage = () => {
  // --- Subcomponentes ---
  // Navbar
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

  // Hero
  const Hero = () => (
    <section id="inicio" className="relative min-h-screen flex items-center bg-gradient-to-r from-[#101726] to-[#101726] overflow-hidden pt-10 pb-6">
       <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <FaultyTerminal
          scale={1.5}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={1}
          pause={false}
          scanlineIntensity={1}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint="#1e40af"
          mouseReact={true}
          mouseStrength={0.5}
          pageLoadAnimation={false}
          brightness={1}
        />

        <div className="text-box">
          <h1>
            Soluciones Innovadoras en<br />
            <div className="true-focus">
              <TrueFocus
                sentence="Software Hardware"
                manualMode={false}
                blurAmount={5}
                borderColor="white"
                animationDuration={2}
              />

            </div>
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-6 leading-relaxed">Desarrollo web, software a medida y mantenimiento de hardware para tu negocio.</p>
          <a href="#contacto" className="bg-[#5EADF2] text-[#101726] px-5 py-3 text-sm sm:text-base rounded-full font-semibold hover:bg-[#3D8BF2] transitio">Contáctanos</a>
        </div>
      </div>
      </div>
    </section>
  );


  // Services
  const ServiceItem = ({ iconClass, title, children }) => (
    <article className="bg-[#101726] p-6 rounded-lg shadow-lg hover:shadow-xl transition">
      <i className={`${iconClass} text-[#5EADF2] text-4xl mb-4 block text-center`} aria-hidden="true"></i>
      <h3 className="text-2xl font-semibold mb-4 text-[#5EADF2]">{title}</h3>
      <p className="mb-4">{children}</p>
      <a href="#contacto" className="text-[#296CF2] font-semibold hover:underline">Conoce más</a>
    </article>
  );
  const Services = () => (
    <section id="servicios" className="py-16 bg-[#202E40] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceItem iconClass="fas fa-globe" title="Desarrollo Web">
            Creamos sitios web modernos, responsivos y optimizados, adaptados a las necesidades de tu negocio.
          </ServiceItem>
          <ServiceItem iconClass="fas fa-code" title="Software a Medida">
            Desarrollamos soluciones de software personalizadas para optimizar procesos y mejorar la eficiencia.
          </ServiceItem>
          <ServiceItem iconClass="fas fa-tools" title="Mantenimiento de Hardware">
            Ofrecemos servicios de mantenimiento y reparación de hardware para garantizar el rendimiento de tus equipos.
          </ServiceItem>
        </div>
      </div>
    </section>
  );

  // About
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

  const TeamMember = ({ photo, name, role }) => (
    <article className="bg-[#101726] p-6 rounded-lg shadow-lg hover:shadow-xl transition max-w-xs">
      <img src={photo} alt={`Foto de ${name}`} className="w-32 h-32 mx-auto rounded-full mb-4 border-2 border-[#3D8BF2]" loading="lazy" />
      <h4 className="text-xl font-semibold text-center mb-2 text-[#5EADF2]">{name}</h4>
      <p className="text-center mb-0">{role}</p>
    </article>
  );

  const About = () => (
    <section id="nosotros" className="py-16 bg-[#202E40] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Sobre Nosotros</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <MissionVision />
          <div className="bg-[#101726] rounded-lg p-4 flex items-center justify-center">
            <img src="./assets/Trees_logo.png" alt="Equipo de desarrollo de software y hardware" className="w-[400px] h-[300px] rounded-lg" loading="lazy" />
          </div>
        </div>
        <h3 className="text-4xl font-semibold text-center mb-8 text-[#5EADF2]">Nuestro Equipo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          <ProfileCard
            name="Juan Mondre"
            title="Técnico programador universitario"
            handle="juanmondre"
            status="Online"
            contactText="Contact Me"
            avatarUrl="/assets/Juan_Mondre1.png"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={false}
            onContactClick={() => console.log("Contact clicked for Juan")}
          />
          <ProfileCard
            name="Nicolás Andreolli"
            title="Desarrollador Fullstack"
            handle="nicolasandreolli"
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

  // Portfolio
  const PortfolioItem = ({ imgSrc, title, description }) => (
    <article className="bg-[#101726] p-6 rounded-lg shadow-lg hover:shadow-xl transition">
      <img src={imgSrc} alt={title} className="w-full h-auto rounded-lg mb-4" loading="lazy" />
      <h3 className="text-2xl font-semibold mb-2 text-[#5EADF2]">{title}</h3>
      <p className="mb-4">{description}</p>
      <a href="#contacto" className="text-[#296CF2] font-semibold hover:underline">Ver Proyecto</a>
    </article>
  );

  const Portfolio = () => (
    <section id="portafolio" className="py-16 bg-[#202E40] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nuestro Portafolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PortfolioItem
            imgSrc="https://via.placeholder.com/300x200"
            title="Plataforma E-commerce"
            description="Desarrollo de una tienda en línea personalizada con integración de pagos y diseño responsivo."
          />
          <PortfolioItem
            imgSrc="https://via.placeholder.com/300x200"
            title="Sistema ERP"
            description="Solución de software a medida para optimizar procesos empresariales y gestión de datos."
          />
          <PortfolioItem
            imgSrc="https://via.placeholder.com/300x200"
            title="Mantenimiento de Servidores"
            description="Servicio de mantenimiento y optimización de servidores para máxima disponibilidad."
          />
        </div>
      </div>
    </section>
  );

  // Clients
  const ClientItem = ({ logo, name }) => (
    <div className="flex items-center justify-center bg-[#101726] p-2 rounded-lg shadow-lg hover:shadow-xl transition w-full h-54">
      <img
        src={logo}
        alt={`Logotipo de ${name}, socio de Trees Tech`}
        className="h-full object-contain"
        loading="lazy"
      />
    </div>
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
      <section id="clientes" className="py-16 bg-[#202E40] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Nuestros Clientes</h2>
          <p className="text-center mb-12 text-lg">Empresas que confían en nuestras soluciones tecnológicas para su éxito.</p>

          <div className="mx-auto w-[80%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[1mm]">
            {clients.map((client, index) => (
              <ClientItem key={index} logo={client.logo} name={client.name} />
            ))}
          </div>
        </div>
      </section>
    );
  };



  // Contact
  const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
      const whatsappNumber = "+542645851326";
      const messageText = `Hola Trees Tech, me gustaría contactarlos:\n\nNombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`;
      const encodedMessage = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
    };

    return (
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#101726] text-white border border-[#3D8BF2] focus:outline-none focus:border-[#5EADF2]"
        />
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#101726] text-white border border-[#3D8BF2] focus:outline-none focus:border-[#5EADF2]"
        />
        <textarea
          placeholder="Mensaje"
          rows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#101726] text-white border border-[#3D8BF2] focus:outline-none focus:border-[#5EADF2]"
        />
        <button
          onClick={handleSubmit}
          className="bg-[#296CF2] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#3D8BF2] transition"
        >
          Enviar Mensaje
        </button>
      </div>
    );
  };

  const ContactInfo = () => (
    <div className="flex flex-col justify-center ml-10 md:ml-20">
      <h3 className="text-2xl font-semibold mb-4 text-[#5EADF2]">Información de Contacto</h3>
      <p className="mb-3">
        <i className="fas fa-envelope mr-2 text-[#5EADF2]" aria-hidden="true"></i>
        trees.sanjuan@gmail.com
      </p>
      <p className="mb-2">
        <i className="fas fa-phone mr-2 text-[#5EADF2]" aria-hidden="true"></i>
        +54 2645851326
      </p>
      <p>
        <i className="fas fa-map-marker-alt mr-2 text-[#5EADF2]" aria-hidden="true"></i>
        Los Tilos 1664 N, San Juan, Capital.
      </p>
    </div>
  );

  const Contact = () => (
    <section id="contacto" className="py-16 bg-[#202E40] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Contáctanos</h2>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <ContactForm />
          </div>
          <div className="w-full md:w-1/2">
            <ContactInfo />
          </div>
        </div>

      </div>
    </section>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-[#101726] text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} Trees Tech. Todos los derechos reservados.</p>
      </div>
    </footer>
  );

  // --- Render principal ---
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Clients />
      <Contact />
      <Footer />
    </>
  );
};

export default LandingPage;
