// src/components/Resumen.js
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Resumen() {
  const [recibos, setRecibos] = useState([]);
  const [presupuestos, setPresupuestos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    cargarRecibos();
    cargarPresupuestos();
  }, []);

  const cargarRecibos = async () => {
    const { data: reciboData } = await supabase
      .from("recibos")
      .select("*")
      .order("creado_en", { ascending: false });

    const { data: filasReciboData } = await supabase
      .from("recibo_filas")
      .select("*");

    const recibosConFilas = (reciboData || []).map((r) => ({
      ...r,
      filas: (filasReciboData || []).filter((f) => f.recibo_id === r.id),
    }));
    setRecibos(recibosConFilas);
  };

  const cargarPresupuestos = async () => {
    const { data: presupData } = await supabase
      .from("presupuestos")
      .select("*")
      .order("creado_en", { ascending: false });

    const { data: filasData } = await supabase
      .from("presupuesto_filas")
      .select("*");

    const presupConFilas = (presupData || []).map((p) => ({
      ...p,
      filas: (filasData || []).filter((f) => f.presupuesto_id === p.id),
    }));

    setPresupuestos(presupConFilas);
  };

  const calcularTotal = (filas) =>
    filas?.reduce(
      (acc, f) => acc + (Number(f.cantidad) || 0) * (Number(f.precio) || 0),
      0
    ) || 0;

  // Eliminar documento
  const eliminarDocumento = async (tipo, id) => {
    if (!window.confirm("¿Estás seguro que querés eliminar este documento?"))
      return;

    try {
      if (tipo === "recibo") {
        await supabase.from("recibo_filas").delete().eq("recibo_id", id);
        const { error } = await supabase.from("recibos").delete().eq("id", id);
        if (error) throw error;
        cargarRecibos();
      } else {
        await supabase.from("presupuesto_filas").delete().eq("presupuesto_id", id);
        const { error } = await supabase.from("presupuestos").delete().eq("id", id);
        if (error) throw error;
        cargarPresupuestos();
      }
      alert("Documento eliminado");
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("Error al eliminar: " + (err.message || err));
    }
  };

  const editarDocumento = (tipo, doc) => {
    if (tipo === "presupuesto") {
      const payload = {
        extra: {
          id: doc.id,
          numero: doc.numero,
          cliente: doc.cliente,
          fecha: doc.fecha,
          alias: doc.alias || "",
          beneficiario: doc.beneficiario || "",
          dni: doc.dni || "",
        },
        filas: doc.filas || [],
      };
      localStorage.setItem("presupuesto_activo", JSON.stringify(payload));
      navigate("/presupuesto");
    } else {
      const payload = {
        extra: {
          id: doc.id,
          numero: doc.numero,
          cliente: doc.cliente,
          fecha: doc.fecha,
        },
        filas: doc.filas || [],
      };
      localStorage.setItem("recibo_activo", JSON.stringify(payload));
      navigate("/recibo");
    }
  };

  const descargarPDF = (doc, tipo) => {
    const pdf = new jsPDF();
    const title = tipo === "recibo" ? "RECIBO" : "PRESUPUESTO";
    pdf.setFontSize(16);
    pdf.text(title, 14, 20);
    pdf.setFontSize(12);
    pdf.text(`N°: ${doc.numero}`, 14, 30);
    pdf.text(`Cliente: ${doc.cliente}`, 14, 36);
    pdf.text(`Fecha: ${new Date(doc.fecha).toLocaleDateString()}`, 14, 42);

    const body = (doc.filas || []).map((f) => [
      f.descripcion || "-",
      f.cantidad ?? 0,
      Number(f.precio)?.toFixed(2) ?? "0.00",
      ((Number(f.cantidad) || 0) * (Number(f.precio) || 0)).toFixed(2),
    ]);

    pdf.autoTable({
      head: [["Descripción", "Cantidad", "Precio", "Subtotal"]],
      body,
      startY: 50,
    });

    const finalY = pdf.lastAutoTable?.finalY || 50;
    pdf.text(`TOTAL: $${calcularTotal(doc.filas).toFixed(2)}`, 14, finalY + 10);
    pdf.save(`${tipo}-${doc.numero || doc.id}.pdf`);
  };

  const filtradoRecibos = recibos.filter((r) =>
    r.cliente?.toLowerCase().includes(busqueda.toLowerCase())
  );
  const filtradoPresupuestos = presupuestos.filter((p) =>
    p.cliente?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container mt-4">

      {/* BOTONES DE VOLVER */}
      <div className="mb-3 d-flex gap-2">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          ← Volver
        </button>
        <button className="btn btn-dark" onClick={() => navigate("/")}>
          ⬅ Ir al inicio
        </button>
      </div>

      <h2 className="mb-4">Resumen General</h2>

      <div className="mb-3 d-flex gap-2 align-items-center">
        <input
          className="form-control w-auto"
          placeholder="Buscar por cliente..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button
          className="btn btn-outline-secondary"
          onClick={() => {
            setBusqueda("");
            cargarRecibos();
            cargarPresupuestos();
          }}
        >
          Limpiar
        </button>
      </div>

      <h3>Recibos</h3>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Número</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th style={{ width: 220 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtradoRecibos.map((r) => (
            <tr key={r.id}>
              <td>{r.numero}</td>
              <td>{r.cliente}</td>
              <td>{new Date(r.fecha).toLocaleDateString()}</td>
              <td>${calcularTotal(r.filas).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => editarDocumento("recibo", r)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => descargarPDF(r, "recibo")}
                >
                  Descargar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarDocumento("recibo", r.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {filtradoRecibos.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                No hay recibos
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h3 className="mt-5">Presupuestos</h3>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Número</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th style={{ width: 220 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtradoPresupuestos.map((p) => (
            <tr key={p.id}>
              <td>{p.numero}</td>
              <td>{p.cliente}</td>
              <td>{new Date(p.fecha).toLocaleDateString()}</td>
              <td>${calcularTotal(p.filas).toFixed(2)}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => editarDocumento("presupuesto", p)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => descargarPDF(p, "presupuesto")}
                >
                  Descargar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarDocumento("presupuesto", p.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {filtradoPresupuestos.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                No hay presupuestos
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
