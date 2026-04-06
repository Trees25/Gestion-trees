import React, { useEffect, useState } from "react";
import { supabasePosventa, authenticatePosventa } from "../supabasePosventa";
import { supabase } from "../supabase";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function ClientesPosventa() {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dbError, setDbError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        cargarClientes();
    }, []);

    const cargarClientes = async () => {
        if (!supabasePosventa) {
            console.warn("Cliente Supabase Posventa no inicializado. Faltan credenciales en .env");
            return;
        }

        setLoading(true);
        setDbError(null);
        try {
            // Primero nos autenticamos con la cuenta de servicio de fondo
            const authSuccess = await authenticatePosventa();
            if (!authSuccess) {
                console.warn("No se pudo iniciar sesión con la cuenta de servicio de posventa. Si hay políticas RLS, la consulta fallará.");
            }

            // Consultamos la tabla 'empresa' con sus 'usuarios'
            const { data, error } = await supabasePosventa
                .from("empresa")
                .select(`
                    *,
                    usuarios (*)
                `);

            // Imprimimos en consola también para debug extra
            console.log("Datos de empresa con usuarios:", data, "Error:", error);

            if (error) throw error;
            if (data) setClientes(data);
        } catch (error) {
            console.error("Error al cargar clientes posventa:", error.message);
            setDbError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const handleGenerarRecibo = (cliente) => {
        // Redirige al creador de recibos, precompletando los datos del cliente
        navigate("/recibo", {
            state: {
                clientePredefinido: {
                    nombre: cliente.nombre || cliente.name || "",
                    dni_cuit: cliente.dni || cliente.cuit || "",
                    email: cliente.email || "",
                    // Agrego una nota indicando que viene de pago de mensualidad
                    nota: "Pago de suscripción mensualidad Posventa" 
                }
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-12">
            <Header />
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800">Clientes Posventa</h2>
                        <p className="text-slate-500">Control de clientes y suscripciones del sistema Posventa</p>
                    </div>
                    <button
                        className="px-4 py-2 text-sm font-medium bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 transition-all active:scale-95"
                        onClick={() => navigate("/admin")}
                    >
                        ← Volver al Admin
                    </button>
                </div>

                {!supabasePosventa && (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-xl mb-6">
                        <strong>Atención:</strong> Faltan configurar las credenciales de la base de datos de Posventa en el archivo <code>.env</code>.
                    </div>
                )}

                {dbError && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl mb-6">
                        <strong>Error de Base de Datos Posventa:</strong> {dbError}
                        <p className="text-sm mt-2 opacity-80">
                            Esto suele ocurrir porque el nombre de la tabla no es "clientes" o faltan permisos de lectura.
                        </p>
                    </div>
                )}

                {/* DEBUG BLOCK TO HELP US SEE THE REAL DATA STRUCTURE */}
                {clientes.length > 0 && (
                    <div className="bg-slate-800 text-green-400 p-4 rounded-xl mb-6 overflow-auto text-xs font-mono max-h-64">
                        <p className="text-white mb-2 font-bold">// ESTRUCTURA DEL PRIMER RESULTADO (Copia esto para la IA):</p>
                        {JSON.stringify(clientes[0], null, 2)}
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                        <h3 className="font-bold text-slate-700">Listado de Suscriptores</h3>
                        <button 
                            onClick={cargarClientes}
                            className="text-sm px-3 py-1 bg-white border border-slate-300 rounded hover:bg-slate-50 text-slate-600"
                        >
                            Actualizar
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white border-b border-slate-200">
                                    <th className="py-4 px-6 text-sm font-semibold text-slate-600">Nombre / Comercio</th>
                                    <th className="py-4 px-6 text-sm font-semibold text-slate-600">Contacto</th>
                                    <th className="py-4 px-6 text-sm font-semibold text-slate-600">Estado / Pago</th>
                                    <th className="py-4 px-6 text-sm font-semibold text-slate-600 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading && (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-slate-500">Cargando clientes de posventa...</td>
                                    </tr>
                                )}
                                {!loading && clientes.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="py-12 text-center text-slate-400 italic">
                                            {supabasePosventa 
                                                ? "No se encontraron clientes en la base de datos de Posventa."
                                                : "Conecta la base de datos para ver los clientes."}
                                        </td>
                                    </tr>
                                )}
                                {!loading && clientes.map(cli => {
                                    // Extraemos el nombre de la empresa (puede llamarse nombre, razon_social, etc.)
                                    const nombreEmpresa = cli.nombre || cli.razon_social || cli.name || "Empresa sin nombre";
                                    
                                    // Buscamos el email en la tabla usuarios unida
                                    let email = "Sin email";
                                    let phone = cli.telefono || cli.phone || "";
                                    
                                    if (cli.usuarios) {
                                        // Si es un arreglo (ej. muchos usuarios), intentamos buscar el admin o tomamos el primero
                                        if (Array.isArray(cli.usuarios)) {
                                            const admin = cli.usuarios.find(u => u.rol === 'admin' || u.role === 'admin') || cli.usuarios[0];
                                            if (admin) {
                                                email = admin.email || admin.correo || email;
                                                phone = admin.telefono || admin.phone || phone;
                                            }
                                        } else {
                                            // Si es un objeto único (1 a 1)
                                            email = cli.usuarios.email || cli.usuarios.correo || email;
                                            phone = cli.usuarios.telefono || cli.usuarios.phone || phone;
                                        }
                                    }

                                    return (
                                        <tr key={cli.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="py-4 px-6 text-sm font-bold text-slate-900">
                                                {nombreEmpresa}
                                            </td>
                                            <td className="py-4 px-6 text-sm text-slate-500">
                                                <div>{email}</div>
                                                <div className="text-xs text-slate-400">{phone}</div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-slate-500">
                                                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs">
                                                    Por comprobar
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button
                                                    onClick={() => handleGenerarRecibo({ ...cli, nombre: nombreEmpresa, email })}
                                                    className="px-3 py-1.5 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                                                >
                                                    + Registrar Pago
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
