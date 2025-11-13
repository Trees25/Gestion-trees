import React from "react";

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

export default Clients;