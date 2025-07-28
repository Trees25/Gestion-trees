import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export function useDocumento(tipo) {
  const tabla = tipo === "recibo" ? "recibos" : "presupuestos";
  const [contador, setContador] = useState(1);
  const [filas, setFilas] = useState([{ descripcion: "", cantidad: 1, precio: 0 }]);
  const [listado, setListado] = useState([]);
  const [documentoExtra, setDocumentoExtra] = useState({});
  const [id, setId] = useState(null); // Para guardar el id si es edición

  useEffect(() => {
    obtenerContador();
    listarDocumentos();
  }, []);

  const obtenerContador = async () => {
    const { count } = await supabase.from(tabla).select("*", { count: "exact", head: true });
    setContador((count || 0) + 1);
  };

  const listarDocumentos = async () => {
    const { data, error } = await supabase.from(tabla).select("*").order("creado_en", { ascending: false });
    if (!error) setListado(data);
  };

  const actualizarFila = (index, campo, valor) => {
    const nuevas = [...filas];
    nuevas[index][campo] = campo === "cantidad" || campo === "precio" ? parseFloat(valor) || 0 : valor;
    setFilas(nuevas);
  };

  const agregarFila = () => {
    setFilas([...filas, { descripcion: "", cantidad: 1, precio: 0 }]);
  };

  const eliminarFila = (index) => {
    const nuevas = [...filas];
    nuevas.splice(index, 1);
    setFilas(nuevas);
  };

  const calcularTotal = () => {
    return filas.reduce((t, f) => t + (f.cantidad || 1) * (f.precio || 0), 0);
  };

  const guardarDocumento = async (extra) => {
    const nuevoDoc = {
      numero: extra.numero || contador,
      cliente: extra.cliente || "",
      fecha: extra.fecha || new Date().toISOString().split("T")[0],
      filas,
      creado_en: new Date().toISOString(),
    };

    if (id) {
      // Actualizar documento existente
      const { error } = await supabase.from(tabla).update(nuevoDoc).eq("id", id);
      if (error) {
        console.error("Error al actualizar documento:", error.message);
        alert("Error al actualizar: " + error.message);
      } else {
        alert("Documento actualizado con éxito");
        setId(null);
        obtenerContador();
        listarDocumentos();
      }
    } else {
      // Insertar nuevo documento
      const { error } = await supabase.from(tabla).insert([nuevoDoc]);
      if (error) {
        console.error("Error al guardar documento:", error.message);
        alert("Error al guardar: " + error.message);
      } else {
        alert("Documento guardado con éxito");
        obtenerContador();
        listarDocumentos();
      }
    }
  };

  // Función para cargar documento para editar
  const cargarDocumento = (doc) => {
    if (!doc) return;
    setId(doc.id || null);
    setDocumentoExtra(doc);
    setFilas(doc.filas || [{ descripcion: "", cantidad: 1, precio: 0 }]);
  };

  return {
    contador,
    filas,
    listado,
    actualizarFila,
    agregarFila,
    eliminarFila,
    calcularTotal,
    guardarDocumento,
    setDocumentoExtra,
    setFilas,
    cargarDocumento,
  };
}
