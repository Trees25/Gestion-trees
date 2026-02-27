import { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase";

export function useDocumento(tipo) {
    const [contador, setContador] = useState(1);
    const [filas, setFilas] = useState([{ descripcion: "", cantidad: 1, precio_unitario: 0 }]);
    const [listado, setListado] = useState([]);
    const [id, setId] = useState(null);
    const [clientes, setClientes] = useState([]);
    const [perfilesPago, setPerfilesPago] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        cargarDatosIniciales();
    }, [tipo]);

    const cargarDatosIniciales = async () => {
        setLoading(true);
        await Promise.all([
            listarDocumentos(),
            obtenerContador(),
            cargarClientes(),
            cargarPerfilesPago(),
            cargarServicios()
        ]);
        setLoading(false);
    };

    const obtenerContador = async () => {
        const { count } = await supabase
            .from("documentos")
            .select("*", { count: "exact", head: true })
            .eq("tipo", tipo);

        setContador((count || 0) + 1);
    };

    const listarDocumentos = async () => {
        const { data, error } = await supabase
            .from("documentos")
            .select(`
                *,
                clientes(nombre, dni_cuit),
                documento_items(*)
            `)
            .eq("tipo", tipo)
            .order("creado_en", { ascending: false });

        if (!error) setListado(data);
    };

    const cargarClientes = async () => {
        const { data, error } = await supabase
            .from("clientes")
            .select("*")
            .order("nombre", { ascending: true });
        if (!error) setClientes(data);
    };

    const cargarPerfilesPago = async () => {
        const { data, error } = await supabase
            .from("perfiles_pago")
            .select("*")
            .order("alias", { ascending: true });
        if (!error) setPerfilesPago(data);
    };

    const cargarServicios = async () => {
        const { data, error } = await supabase
            .from("servicios")
            .select("*")
            .order("nombre", { ascending: true });
        if (!error) setServicios(data);
    };

    const actualizarFila = (index, campo, valor) => {
        const nuevas = [...filas];
        nuevas[index][campo] = (campo === "cantidad" || campo === "precio_unitario")
            ? parseFloat(valor) || 0
            : valor;
        setFilas(nuevas);
    };

    const agregarFila = () => {
        setFilas([...filas, { descripcion: "", cantidad: 1, precio_unitario: 0 }]);
    };

    const eliminarFila = (index) => {
        const nuevas = [...filas];
        nuevas.splice(index, 1);
        setFilas(nuevas);
    };

    const calcularTotal = () =>
        filas.reduce((t, f) => t + (f.cantidad || 0) * (f.precio_unitario || 0), 0);

    const guardarDocumento = async (data) => {
        setLoading(true);
        try {
            const { error: errorDoc, data: doc } = await supabase
                .from("documentos")
                .upsert({
                    id: id || undefined,
                    tipo,
                    numero: data.numero || contador,
                    cliente_id: data.cliente_id,
                    fecha: data.fecha,
                    perfil_pago_id: data.perfil_pago_id,
                    observaciones: data.observaciones,
                    estado: data.estado || 'pendiente'
                })
                .select()
                .single();

            if (errorDoc) throw errorDoc;

            // Delete old items if updating
            if (id) {
                await supabase.from("documento_items").delete().eq("documento_id", id);
            }

            const itemsAInsertar = filas.map(f => ({
                documento_id: doc.id,
                descripcion: f.descripcion,
                cantidad: f.cantidad,
                precio_unitario: f.precio_unitario
            }));

            const { error: errorItems } = await supabase.from("documento_items").insert(itemsAInsertar);
            if (errorItems) throw errorItems;

            alert(id ? "Actualizado correctamente" : "Guardado correctamente");
            resetForm();
            cargarDatosIniciales();
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setId(null);
        setFilas([{ descripcion: "", cantidad: 1, precio_unitario: 0 }]);
    };

    const cargarDocumento = useCallback(async (doc) => {
        if (!doc) return;
        setId(doc.id);
        const { data: items } = await supabase
            .from("documento_items")
            .select("*")
            .eq("documento_id", doc.id);

        if (items) setFilas(items);
    }, []);

    return {
        contador,
        filas,
        listado,
        clientes,
        perfilesPago,
        loading,
        actualizarFila,
        agregarFila,
        eliminarFila,
        calcularTotal,
        guardarDocumento,
        cargarDocumento,
        resetForm,
        listarDocumentos,
        cargarClientes,
        cargarPerfilesPago,
        cargarServicios,
        servicios,
        setFilas
    };
}
