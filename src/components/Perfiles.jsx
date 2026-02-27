import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function Perfiles() {
    const [perfiles, setPerfiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nuevo, setNuevo] = useState({
        alias: "",
        beneficiario: "",
        dni: "",
        banco: "",
        cbu_alias: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        cargarPerfiles();
    }, []);

    const cargarPerfiles = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("perfiles_pago")
            .select("*")
            .order("creado_en", { ascending: false });

        if (!error) setPerfiles(data);
        setLoading(false);
    };

    const handleAgregar = async (e) => {
        e.preventDefault();
        if (!nuevo.alias) return;

        setLoading(true);
        const { error } = await supabase.from("perfiles_pago").insert([nuevo]);
        if (!error) {
            setNuevo({ alias: "", beneficiario: "", dni: "", banco: "", cbu_alias: "" });
            cargarPerfiles();
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar esta cuenta de pago?")) return;
        const { error } = await supabase.from("perfiles_pago").delete().eq("id", id);
        if (!error) cargarPerfiles();
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            <Header />
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">Cuentas de Pago</h2>
                        <p className="text-slate-500">Configura tus datos bancarios para los PDFs</p>
                    </div>
                    <button onClick={() => navigate("/admin")} className="px-4 py-2 bg-white border rounded-lg text-sm transition-all hover:bg-slate-50">
                        ← Volver
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Formulario */}
                    <div className="md:col-span-1">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
                            <h3 className="font-bold text-lg mb-4">Nueva Cuenta</h3>
                            <form onSubmit={handleAgregar} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Alias de Cuenta (interno)</label>
                                    <input
                                        required
                                        className="w-full px-4 py-2 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                                        placeholder="Ej: Santander Nicolas"
                                        value={nuevo.alias}
                                        onChange={e => setNuevo({ ...nuevo, alias: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Beneficiario</label>
                                    <input
                                        className="w-full px-4 py-2 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                                        placeholder="Nombre completo"
                                        value={nuevo.beneficiario}
                                        onChange={e => setNuevo({ ...nuevo, beneficiario: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">DNI/CUIT</label>
                                    <input
                                        className="w-full px-4 py-2 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                                        value={nuevo.dni}
                                        onChange={e => setNuevo({ ...nuevo, dni: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Banco</label>
                                    <input
                                        className="w-full px-4 py-2 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                                        value={nuevo.banco}
                                        onChange={e => setNuevo({ ...nuevo, banco: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">CBU o Alias Bancario</label>
                                    <input
                                        className="w-full px-4 py-2 bg-slate-50 border border-transparent rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                                        value={nuevo.cbu_alias}
                                        onChange={e => setNuevo({ ...nuevo, cbu_alias: e.target.value })}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? "Agregando..." : "Agregar Cuenta"}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Lista */}
                    <div className="md:col-span-2 space-y-4">
                        {perfiles.map(perfil => (
                            <div key={perfil.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center group">
                                <div>
                                    <h4 className="font-bold text-slate-800 text-lg">{perfil.alias}</h4>
                                    <p className="text-sm text-slate-500 italic">{perfil.beneficiario}</p>
                                    <div className="mt-2 flex gap-4 text-xs text-slate-400">
                                        <span>{perfil.banco}</span>
                                        <span>{perfil.cbu_alias}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(perfil.id)}
                                    className="p-2 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                        {perfiles.length === 0 && !loading && (
                            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 text-slate-400">
                                Aún no has agregado cuentas de pago.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
