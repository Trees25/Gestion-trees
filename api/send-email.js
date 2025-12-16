import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Método no permitido" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Todos los campos son obligatorios" });
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).json({ success: false, message: "Email inválido" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 📩 Mail para vos
    await transporter.sendMail({
      from: `"Formulario Web - ${name}" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: "trees.sanjuan@gmail.com",
      subject: `Nuevo mensaje de ${name}`,
      text: message,
    });

    // 📤 Respuesta automática
    await transporter.sendMail({
      from: `"Trees Tech" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Gracias por contactarte",
      text: `Hola ${name}, Gracias por comunicarte con nosotros. Hemos recibido tu mensaje y te responderemos a la brevedad posible. Saludos cordiales,`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error mail:", error);
    return res.status(500).json({ success: false, message: "Error enviando correo" });
  }
}
