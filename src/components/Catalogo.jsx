import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function Catalogo() {
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nuevo, setNuevo] = useState({ nombre: "", precio: "" });
    const navigate = useNavigate();

    useEffect(() => {
        cargarServicios();
    }, []);

    const cargarServicios = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("servicios")
            .select("*")
            .order("nombre", { ascending: true });

        if (!error) setServicios(data);
        setLoading(false);
    };

    const handleAgregar = async (e) => {
        e.preventDefault();
        if (!nuevo.nombre) return;

        setLoading(true);
        const { error } = await supabase.from("servicios").insert([nuevo]);
        if (!error) {
            setNuevo({ nombre: "", precio: "" });
            cargarServicios();
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar este servicio del catálogo?")) return;
        const { error } = await supabase.from("servicios").delete().eq("id", id);
        if (!error) cargarServicios();
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            <Header />
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">Catálogo de Servicios</h2>
                        <p className="text-slate-500">Administra tus servicios y precios frecuentes</p>
                    </div>
                    <button onClick={() => navigate("/admin")} className="px-4 py-2 bg-white border rounded-lg text-sm transition-all hover:bg-slate-50">
                        ← Volver
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
                            <h3 className="font-bold text-lg mb-4">Nuevo Servicio</h3>
                            <form onSubmit={handleAgregar} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nombre del Servicio</label>
                                    <input
                                        required
                                        className="w-full px-4 py-2 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                                        placeholder="Ej: Mantenimiento de Jardín"
                                        value={nuevo.nombre}
                                        onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Precio Sugerido</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="w-full px-4 py-2 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                                        placeholder="0.00"
                                        value={nuevo.precio}
                                        onChange={e => setNuevo({ ...nuevo, precio: e.target.value })}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? "Agregando..." : "Agregar al Catálogo"}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        {servicios.map(serv => (
                            <div key={serv.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center group">
                                <div>
                                    <h4 className="font-bold text-slate-800 text-lg">{serv.nombre}</h4>
                                    <p className="text-indigo-600 font-bold">${Number(serv.precio).toFixed(2)}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(serv.id)}
                                    className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                        {servicios.length === 0 && !loading && (
                            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400">
                                Tu catálogo está vacío.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
