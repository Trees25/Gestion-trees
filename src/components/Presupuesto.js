import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { useDocumento } from "../hooks/useDocument";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Presupuesto() {
  const {
    contador,
    filas,
    actualizarFila,
    agregarFila,
    eliminarFila,
    calcularTotal,
    guardarDocumento,
    setFilas,
    setDocumentoExtra,
    cargarDocumento,
  } = useDocumento("presupuesto");

  const [cliente, setCliente] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [alias, setAlias] = useState("");
  const [beneficiario, setBeneficiario] = useState("");
  const [dni, setDni] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const dataGuardada = localStorage.getItem("presupuesto_activo");
    if (dataGuardada) {
      const { extra, filas: filasGuardadas } = JSON.parse(dataGuardada);
      const docParaEditar = {
        id: extra.id,
        numero: extra.numero,
        cliente: extra.cliente || "",
        fecha: extra.fecha || new Date().toISOString().split("T")[0],
        alias: extra.alias || "",
        beneficiario: extra.beneficiario || "",
        dni: extra.dni || "",
        filas: Array.isArray(filasGuardadas) ? filasGuardadas : [{ descripcion: "", cantidad: 1, precio: 0 }]
      };
      cargarDocumento(docParaEditar);

      // Seteamos estados para inputs específicos
      setCliente(docParaEditar.cliente);
      setFecha(docParaEditar.fecha);
      setAlias(docParaEditar.alias);
      setBeneficiario(docParaEditar.beneficiario);
      setDni(docParaEditar.dni);

      localStorage.removeItem("presupuesto_activo");
    }
  }, [cargarDocumento]);

  const cuentasGuardadas = [
    { alias: "nico.andreolli.lemon", beneficiario: "Franco Nicolas Andreolli", dni: "42163028" },
    { alias: "porton.fila.tela", beneficiario: "Mondre Varas Juan", dni: "41909198" }
  ];

  const descargarPDF = () => {
    const doc = new jsPDF();
    let y = 30;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`PRESUPUESTO`, 10, 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`N°: ${contador}`, 10, 16);
    doc.text(`Fecha: ${new Date(fecha).toLocaleDateString()}`, 10, 22);
    doc.addImage(logo, "PNG", 150, 5, 40, 20);

    y += 10;
    doc.text(`Cliente: ${cliente}`, 10, y);
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Cantidad", 10, y);
    doc.text("Tipo", 35, y);
    doc.text("Descripción", 70, y);
    doc.text("Precio", 180, y, { align: "right" });
    doc.line(10, y + 1, 200, y + 1);
    y += 6;

    filas.forEach(({ descripcion, cantidad, precio, tipo }) => {
      if (!descripcion.trim()) return;
      doc.setFont("helvetica", "normal");
      doc.rect(9, y - 4.5, 192, 6, "S");
      doc.text(cantidad.toString(), 10, y);
      doc.text(tipo || "-", 35, y);
      doc.text(descripcion, 70, y);
      doc.text(`$${parseFloat(precio).toFixed(2)}`, 180, y, { align: "right" });
      y += 6;
    });

    y += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(`TOTAL: $${calcularTotal().toFixed(2)}`, 10, y);

    y += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text("* Una vez aceptado el presupuesto, se debe abonar el 50% del total.", 10, y);

    y += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("DATOS DE CONTACTO", 10, y);
    doc.text("INFORMACIÓN PARA EL PAGO", 100, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("trees.sanjuan@gmail.com", 10, y);
    doc.text(`Alias: ${alias}`, 100, y);
    y += 6;
    doc.text("+54 264-5851326", 10, y);
    doc.text(`Beneficiario: ${beneficiario}`, 100, y);
    y += 6;
    doc.text(`DNI: ${dni}`, 100, y);

    doc.save(`presupuesto_${contador}.pdf`);
  };

  const handleGuardar = async () => {
    if (!cliente.trim() || !fecha || filas.length === 0) {
      alert("Faltan datos obligatorios");
      return;
    }

    await guardarDocumento({ cliente, fecha, alias, beneficiario, dni });
    navigate("/resumen");
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="mb-3">
          <button className="btn btn-outline-secondary me-2" onClick={() => navigate("/")}>Inicio</button>
          <button className="btn btn-outline-secondary" onClick={() => navigate("/resumen")}>Ir a Resumen</button>
        </div>

        <h2 className="mb-4">Generar Presupuesto</h2>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Cliente *</label>
            <input className="form-control" value={cliente} onChange={e => setCliente(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Fecha *</label>
            <input type="date" className="form-control" value={fecha} onChange={e => setFecha(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Presupuesto N°</label>
            <input className="form-control" value={contador} disabled />
          </div>
        </div>

        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Descripción</th>
              <th style={{ width: 120 }}>Cantidad</th>
              <th style={{ width: 120 }}>Precio</th>
              <th style={{ width: 150 }}>Tipo</th>
              <th style={{ width: 50 }}></th>
            </tr>
          </thead>
          <tbody>
            {filas.map((fila, i) => (
              <tr key={i}>
                <td><input className="form-control" value={fila.descripcion} onChange={(e) => actualizarFila(i, "descripcion", e.target.value)} /></td>
                <td><input className="form-control" type="number" value={fila.cantidad} onChange={(e) => actualizarFila(i, "cantidad", e.target.value)} /></td>
                <td><input className="form-control" type="number" value={fila.precio} onChange={(e) => actualizarFila(i, "precio", e.target.value)} /></td>
                <td>
                  <select className="form-control" value={fila.tipo || "producto"} onChange={(e) => actualizarFila(i, "tipo", e.target.value)}>
                    <option value="producto">Producto</option>
                    <option value="servicio">Servicio</option>
                  </select>
                </td>
                <td className="text-center align-middle">
                  <button className="btn btn-outline-danger btn-sm" onClick={() => eliminarFila(i)} title="Eliminar fila">
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn btn-outline-primary me-2" onClick={agregarFila}>Agregar fila</button>

        <div className="row mt-4 mb-4">
          <div className="col-md-12">
            <label className="form-label">Seleccionar cuenta guardada</label>
            <select className="form-select" onChange={(e) => {
              const cuenta = cuentasGuardadas.find(c => c.alias === e.target.value);
              if (cuenta) {
                setAlias(cuenta.alias);
                setBeneficiario(cuenta.beneficiario);
                setDni(cuenta.dni);
              }
            }} defaultValue="">
              <option value="" disabled>Elegí una cuenta...</option>
              {cuentasGuardadas.map((c, i) => (
                <option key={i} value={c.alias}>{c.alias} - {c.beneficiario}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-4">
            <label className="form-label">Alias *</label>
            <input className="form-control" value={alias} onChange={e => setAlias(e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label">Beneficiario *</label>
            <input className="form-control" value={beneficiario} onChange={e => setBeneficiario(e.target.value)} />
          </div>
          <div className="col-md-4">
            <label className="form-label">DNI *</label>
            <input className="form-control" value={dni} onChange={e => setDni(e.target.value)} />
          </div>
        </div>

        <div className="mb-4">
          <button className="btn btn-success me-2" onClick={handleGuardar}>Guardar</button>
          <button className="btn btn-danger" onClick={descargarPDF}>Descargar PDF</button>
        </div>
      </div>
    </>
  );
}
