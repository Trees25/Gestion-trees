import React, { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Nuevo estado para los errores de validación

  // Función para validar el formulario
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "El formato del correo electrónico es inválido.";
      isValid = false;
    }

    if (!message.trim()) {
      newErrors.message = "El mensaje es obligatorio.";
      isValid = false;
    }

    setErrors(newErrors); // Actualiza el estado de errores
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) { // Ejecuta la validación antes de enviar
      return; // Detiene el envío si hay errores
    }

    setLoading(true);
    setStatus(""); // Limpia el estado anterior

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();
      console.log("STATUS HTTP:", response.status);
      console.log("RESPUESTA BACKEND:", data);
      
      if (data.success) {
        setStatus("✅ Tu mensaje fue enviado correctamente.");
        setName("");
        setEmail("");
        setMessage("");
        setErrors({}); // Limpia errores si el envío fue exitoso
      } else {
        setStatus("❌ Ocurrió un error al enviar el mensaje.");
      }
    } catch (error) {
      console.error("Error de conexión:", error); // Log del error para depuración
      setStatus("⚠️ Error de conexión con el servidor. Intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4"> {/* Usamos form y onSubmit */}
      <div>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors(prev => ({ ...prev, name: null })); }} // Limpia error al escribir
          className={`w-full p-3 rounded-lg bg-[#101726] text-white border ${errors.name ? 'border-red-500' : 'border-[#3D8BF2]'} focus:outline-none focus:border-[#5EADF2]`}
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "name-error" : null}
        />
        {errors.name && <p id="name-error" className="text-red-400 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: null })); }} // Limpia error al escribir
          className={`w-full p-3 rounded-lg bg-[#101726] text-white border ${errors.email ? 'border-red-500' : 'border-[#3D8BF2]'} focus:outline-none focus:border-[#5EADF2]`}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : null}
        />
        {errors.email && <p id="email-error" className="text-red-400 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <textarea
          placeholder="Mensaje"
          rows="5"
          value={message}
          onChange={(e) => { setMessage(e.target.value); setErrors(prev => ({ ...prev, message: null })); }} // Limpia error al escribir
          className={`w-full p-3 rounded-lg bg-[#101726] text-white border ${errors.message ? 'border-red-500' : 'border-[#3D8BF2]'} focus:outline-none focus:border-[#5EADF2]`}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : null}
        />
        {errors.message && <p id="message-error" className="text-red-400 text-sm mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit" // Importante para formularios
        disabled={loading}
        className={`${loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#296CF2] hover:bg-[#3D8BF2]"
          } text-white px-6 py-3 rounded-full font-semibold transition`}
      >
        {loading ? "Enviando..." : "Enviar Mensaje"}
      </button>

      {status && (
        <p
          className={`text-sm p-3 rounded ${status.includes("✅")
            ? "bg-green-100 text-green-700"
            : status.includes("❌")
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
            }`}
        >
          {status}
        </p>
      )}
    </form>
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

export default Contact;