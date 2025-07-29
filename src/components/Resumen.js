// src/components/Resumen.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { jsPDF } from "jspdf";
import Header from "./Header";

export default function Resumen() {
  const [presupuestos, setPresupuestos] = useState([]);
  const [recibos, setRecibos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchPresupuestos();
    fetchRecibos();
  }, []);

  const fetchPresupuestos = async () => {
    const { data, error } = await supabase.from("presupuestos").select("*");
    if (!error) setPresupuestos(data);
  };

  const fetchRecibos = async () => {
    const { data, error } = await supabase.from("recibos").select("*");
    if (!error) setRecibos(data);
  };

  const eliminarDocumento = async (tipo, id) => {
    if (!window.confirm("¿Estás seguro que querés eliminar este documento?")) return;
    const { error } = await supabase.from(tipo).delete().eq("id", id);
    if (!error) {
      alert("Documento eliminado correctamente.");
      tipo === "presupuestos" ? fetchPresupuestos() : fetchRecibos();
    } else {
      alert("Error al eliminar: " + error.message);
    }
  };

  const handleEditarPresupuesto = (doc) => {
    localStorage.setItem("presupuesto_activo", JSON.stringify({
      extra: {
        id: doc.id,
        cliente: doc.cliente,
        fecha: doc.fecha,
        alias: doc.alias,
        beneficiario: doc.beneficiario,
        dni: doc.dni,
      },
      filas: doc.filas,
    }));
    navigate("/presupuesto");
  };

  const handleGenerarReciboDesdePresupuesto = (doc) => {
    localStorage.setItem("presupuesto_en_recibo", JSON.stringify({
      cliente: doc.cliente,
      fecha: doc.fecha,
      filas: doc.filas,
    }));
    navigate("/recibo");
  };

const handleDuplicarDocumento = (tipo, doc) => {
  const duplicado = {
    ...doc,
    id: null,
    numero: null,
    creado_en: new Date().toISOString(),
  };

  const storageKey = tipo === "presupuestos" ? "presupuesto_activo" : "presupuesto_en_recibo";

  localStorage.setItem(storageKey, JSON.stringify({
    extra: {
      cliente: duplicado.cliente,
      fecha: duplicado.fecha,
      alias: duplicado.alias,
      beneficiario: duplicado.beneficiario,
      dni: duplicado.dni,
      numero: null, // nueva numeración
    },
    filas: duplicado.filas,
  }));

  navigate(tipo === "presupuestos" ? "/presupuesto" : "/recibo");
};


  const descargarReciboPDF = (recibo) => {
    const doc = new jsPDF();
    let y = 20;
    const img = new Image();
    img.src = "/assets/logo.png"; // desde public/assets

    img.onload = () => {
      let y = 30;

    doc.setFontSize(16);
    doc.text(`RECIBO Nº ${recibo.numero}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Fecha: ${new Date(recibo.fecha).toLocaleDateString()}`, 10, 16);
    doc.addImage(img, "PNG", 150, 5, 40, 20);

    doc.text(`Recibí de: ${recibo.cliente}`, 10, y);
    y += 10;

    doc.text("Cantidad", 10, y);
    doc.text("Descripción", 40, y);
    doc.text("Importe", 160, y, { align: "right" });
    y += 6;

    recibo.filas.forEach(({ descripcion, cantidad, precio }) => {
      if (!descripcion?.trim()) return;
      doc.text(cantidad.toString(), 10, y);
      doc.text(descripcion, 40, y);
      doc.text(`$${parseFloat(precio).toFixed(2)}`, 160, y, { align: "right" });
      y += 6;
    });

    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL: $${recibo.filas.reduce((t, f) => t + f.precio * f.cantidad, 0).toFixed(2)}`, 10, y);
    y += 20;
    doc.text("Firma y aclaración del responsable", 10, y);
    y += 20;
    doc.line(10, y, 100, y);

    doc.save(`recibo_${recibo.numero}.pdf`);
  };
  };

  const filtrados = (lista) =>
    lista.filter((item) => item.cliente.toLowerCase().includes(busqueda.toLowerCase()));

  return (
     <>
          <Header />
    <div className="container mt-4">
      <div className="mb-3">
        <button className="btn btn-outline-secondary me-2" onClick={() => navigate("/admin")}>Inicio</button>
        <input
          type="text"
          placeholder="Buscar por cliente..."
          className="form-control d-inline-block w-auto"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <h2 className="mb-4">Resumen</h2>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#presupuestos">
            Presupuestos
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link" data-bs-toggle="tab" data-bs-target="#recibos">
            Recibos
          </button>
        </li>
      </ul>

      <div className="tab-content pt-3">
        <div className="tab-pane fade show active" id="presupuestos">
          {filtrados(presupuestos).length === 0 ? (
            <p>No hay presupuestos.</p>
          ) : (
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtrados(presupuestos).map((p) => (
                  <tr key={p.id}>
                    <td>{p.numero}</td>
                    <td>{p.cliente}</td>
                    <td>{p.fecha}</td>
                    <td>${p.filas.reduce((t, f) => t + f.precio * f.cantidad, 0).toFixed(2)}</td>
                    <td>
                      <button className="btn btn-sm btn-primary me-1" onClick={() => handleEditarPresupuesto(p)}>Editar</button>
                      <button className="btn btn-sm btn-success me-1" onClick={() => handleGenerarReciboDesdePresupuesto(p)}>Generar Recibo</button>
                      <button className="btn btn-sm btn-warning me-1" onClick={() => handleDuplicarDocumento("presupuestos", p)}>Duplicar</button>
                      <button className="btn btn-sm btn-danger" onClick={() => eliminarDocumento("presupuestos", p.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="tab-pane fade" id="recibos">
          {filtrados(recibos).length === 0 ? (
            <p>No hay recibos.</p>
          ) : (
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Cliente</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtrados(recibos).map((r) => (
                  <tr key={r.id}>
                    <td>{r.numero}</td>
                    <td>{r.cliente}</td>
                    <td>{r.fecha}</td>
                    <td>${r.filas.reduce((t, f) => t + f.precio * f.cantidad, 0).toFixed(2)}</td>
                    <td>
                      <button className="btn btn-sm btn-secondary me-1" onClick={() => descargarReciboPDF(r)}>PDF</button>
                      <button className="btn btn-sm btn-warning me-1" onClick={() => handleDuplicarDocumento("recibos", r)}>Duplicar</button>
                      <button className="btn btn-sm btn-danger" onClick={() => eliminarDocumento("recibos", r.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
