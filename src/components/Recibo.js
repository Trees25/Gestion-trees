import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { useDocumento } from "../hooks/useDocument";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Recibo() {
  const {
    contador,
    filas,
    actualizarFila,
    agregarFila,
    eliminarFila,
    calcularTotal,
    guardarDocumento,
    setFilas,
  } = useDocumento("recibo");

  const [cliente, setCliente] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("presupuesto_en_recibo");
    if (data) {
      const parsed = JSON.parse(data);
      setCliente(parsed.cliente || "");
      setFecha(parsed.fecha || new Date().toISOString().split("T")[0]);
      if (Array.isArray(parsed.filas)) {
        const nuevas = parsed.filas.map(f => ({
          descripcion: f.descripcion || "",
          cantidad: f.cantidad || 1,
          precio: f.precio || 0,
        }));
        setFilas(nuevas);
      }
      localStorage.removeItem("presupuesto_en_recibo");
    }
  }, [setFilas]);

  const generarPDF = () => {
    const doc = new jsPDF();

    const img = new Image();
    img.src = "/assets/logo.png"; // desde public/assets

    let y = 30;

    doc.setFontSize(16);
    doc.text(`RECIBO Nº ${contador}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date(fecha).toLocaleDateString()}`, 10, 16);
    doc.addImage(img, "PNG", 150, 5, 40, 20);

    doc.text(`Recibí de: ${cliente}`, 10, y);
    y += 10;

    doc.text("Cantidad", 10, y);
    doc.text("Descripción", 40, y);
    doc.text("Importe", 160, y, { align: "right" });
    doc.line(10, y + 1, 200, y + 1);
    y += 6;

    filas.forEach(({ descripcion, cantidad, precio }) => {
      if (!descripcion.trim()) return;
      doc.rect(9, y - 4.5, 192, 6, "S");
      doc.text(cantidad.toString(), 10, y);
      doc.text(descripcion, 40, y);
      doc.text(`$${parseFloat(precio).toFixed(2)}`, 160, y, { align: "right" });
      y += 6;
    });

    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL RECIBIDO: $${calcularTotal().toFixed(2)}`, 10, y);
    y += 10;

    return doc;
  };

  const verPDF = () => {
    const doc = generarPDF();
    const url = doc.output("bloburl");
    window.open(url, "_blank");
  };

  const descargarPDF = () => {
    const doc = generarPDF();
    doc.save(`recibo_${contador}.pdf`);
  };

  const handleGuardar = async () => {
    if (!cliente || !filas.some(f => f.descripcion.trim())) {
      alert("Faltan datos");
      return;
    }

    await guardarDocumento({ cliente, fecha, filas });
    navigate("/resumen");
  };

  return (
     <>
      <Header />
    <div className="container mt-4">
      <div className="mb-3">
        <button className="btn btn-outline-secondary me-2" onClick={() => navigate("/admin")}>Inicio</button>
        <button className="btn btn-outline-secondary" onClick={() => navigate("/resumen")}>Ir a Resumen</button>
      </div>

      <h2 className="mb-4">Generar Recibo</h2>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Cliente *</label>
          <input className="form-control" value={cliente} onChange={(e) => setCliente(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Fecha *</label>
          <input className="form-control" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Recibo Nº</label>
          <input className="form-control" value={contador} disabled />
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Descripción</th>
            <th style={{ width: 100 }}>Cantidad</th>
            <th style={{ width: 100 }}>Precio</th>
            <th style={{ width: 50 }}></th>
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, i) => (
            <tr key={i}>
              <td><input className="form-control" value={fila.descripcion} onChange={e => actualizarFila(i, "descripcion", e.target.value)} /></td>
              <td><input className="form-control" type="number" value={fila.cantidad} onChange={e => actualizarFila(i, "cantidad", e.target.value)} /></td>
              <td><input className="form-control" type="number" value={fila.precio} onChange={e => actualizarFila(i, "precio", e.target.value)} /></td>
              <td className="text-center align-middle">
                <button className="btn btn-outline-danger btn-sm" onClick={() => eliminarFila(i)}>
                  <i className="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3 mb-4">
        <button className="btn btn-outline-primary me-2" onClick={agregarFila}>Agregar fila</button>
        <button className="btn btn-success me-2" onClick={handleGuardar}>Guardar</button>
        <button className="btn btn-secondary me-2" onClick={verPDF}>Ver PDF</button>
        <button className="btn btn-danger" onClick={descargarPDF}>Descargar PDF</button>
      </div>
    </div>
    </>
  );
}
