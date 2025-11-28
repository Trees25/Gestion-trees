import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Configuración de CORS:
// Para desarrollo, puedes usar 'http://localhost:3000'
// Para producción, reemplázalo con el dominio de tu frontend (ej: 'https://tudominio.com')
app.use(cors({
  origin: process.env.NODE_ENV === "production"
    ? "https://treestech.dev" // ¡CAMBIA ESTO por el dominio de tu frontend en producción!
    : "http://localhost:3000" // Para desarrollo
}));

app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Validación básica del lado del servidor (opcional pero recomendable)
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Todos los campos son obligatorios." });
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ success: false, message: "Formato de correo electrónico inválido." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 📩 1️⃣ Enviar el mensaje al administrador (vos)
    // Usamos tu EMAIL_USER como "from" para mayor fiabilidad,
    // y establecemos el "replyTo" para que puedas responder directamente al usuario.
    await transporter.sendMail({
      from: `"Formulario Web de ${name}" <${process.env.EMAIL_USER}>`, // Remitente visible
      replyTo: email, // El correo al que responderás
      to: "trees.sanjuan@gmail.com", // Donde vos recibís los mensajes
      subject: `Nuevo mensaje de ${name} (Desde la web)`,
      text: `
        Has recibido un nuevo mensaje de tu formulario web:
        -------------------------------------------------
        Nombre: ${name}
        Correo: ${email}
        Mensaje: ${message}
        -------------------------------------------------
        Puedes responder directamente a este correo para contactar a ${name}.
      `,
      html: `
        <p>Has recibido un nuevo mensaje de tu formulario web:</p>
        <p>-------------------------------------------------</p>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
        <p>-------------------------------------------------</p>
        <p>Puedes responder directamente a este correo para contactar a ${name}.</p>
      `,
    });

    // 📤 2️⃣ Enviar la respuesta automática al usuario
    await transporter.sendMail({
      from: `"Trees Tech" <${process.env.EMAIL_USER}>`, // Tu empresa como remitente
      to: email,
      subject: "Gracias por contactarte con Trees Tech",
      text: `Hola ${name},\n\nGracias por comunicarte con nosotros. Recibimos tu mensaje y te responderemos a la brevedad.\n\nSaludos,\nEl equipo de Trees Tech.`,
      html: `
        <p>Hola ${name},</p>
        <p>Gracias por comunicarte con nosotros. Hemos recibido tu mensaje y te responderemos a la brevedad posible.</p>
        <p>Nos pondremos en contacto contigo pronto.</p>
        <p>Saludos cordiales,</p>
        <p>El equipo de Trees Tech.</p>
        <img src="cid:logo_trees_tech" alt="Logo Trees Tech" style="width: 150px; margin-top: 20px;">
      `,
      attachments: [{
        filename: 'logo.png',
        path: './public/assets/Trees_logo.png', // Ajusta esta ruta si es necesario
        cid: 'logo_trees_tech' // Mismo CID que en el HTML img src
      }]
    });

    res.json({ success: true, message: "Correo enviado correctamente" });
  } catch (error) {
    console.error("Error al enviar correo:", error); // Log más descriptivo
    // Envía un estado de error 500 al cliente
    res.status(500).json({ success: false, message: "Error interno del servidor al enviar el correo." });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));