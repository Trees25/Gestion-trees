import React, { useState } from "react";
import { supabase } from "../../supabase";
import { motion } from "framer-motion";

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
      // Guardar en Supabase como Cliente (Lead)
      const { error: errInsert } = await supabase.from("clientes").insert([{
        nombre: name,
        email: email,
        direccion: `MENSAJE WEB: ${message}`,
        dni_cuit: 'LEAD',
        tipo: 'lead'
        // usuario_id será NULL si el usuario no está logueado, lo cual es correcto para leads
      }]);

      if (errInsert) throw errInsert;

      setStatus("✅ ¡Gracias! Hemos recibido tu mensaje y nos contactaremos pronto.");
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
    } catch (error) {
      console.error("Error al guardar lead:", error);
      setStatus("⚠️ Hubo un problema al enviar tu mensaje. Intenta de nuevo.");
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
  <section id="contacto" className="py-20 bg-slate-950 text-white">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Contáctanos</h2>
        <div className="w-24 h-1 bg-[#296CF2] mx-auto rounded-full"></div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 bg-slate-900/50 p-8 rounded-3xl border border-white/5 backdrop-blur-sm"
        >
          <ContactForm />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <ContactInfo />
        </motion.div>
      </div>
    </div>
  </section>
);

export default Contact;