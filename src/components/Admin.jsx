import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { supabase } from "../supabase";

export default function Admin() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ budgets: 0, receipts: 0, clients: 0 });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const { count: budCount } = await supabase.from("documentos").select("*", { count: "exact", head: true }).eq("tipo", "presupuesto");
    const { count: recCount } = await supabase.from("documentos").select("*", { count: "exact", head: true }).eq("tipo", "recibo");
    const { count: cliCount } = await supabase.from("clientes").select("*", { count: "exact", head: true });

    setStats({
      budgets: budCount || 0,
      receipts: recCount || 0,
      clients: cliCount || 0
    });
  };

  const cards = [
    { title: "Nuevo Presupuesto", desc: "Crear un nuevo presupuesto detallado.", icon: "📝", path: "/presupuesto", color: "blue" },
    { title: "Crear Recibo", desc: "Emitir recibos de pago manuales.", icon: "💵", path: "/recibo", color: "emerald" },
    { title: "Ver Resumen", desc: "Historial de documentos y estados.", icon: "📋", path: "/resumen", color: "amber" },
    { title: "Gestión de Clientes", desc: "Administrar base de datos de clientes.", icon: "👥", path: "/clientes", color: "indigo" },
    { title: "Cuentas de Pago", desc: "Configurar CBU, Alias y Bancos.", icon: "🏦", path: "/perfiles", color: "purple" },
    { title: "Catálogo", desc: "Servicios y precios frecuentes.", icon: "📦", path: "/catalogo", color: "pink" },
    { title: "Estacísticas", desc: "Gráficos de facturación mensual.", icon: "📈", path: "/estadisticas", color: "rose" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-800">Panel de Control</h1>
          <p className="text-slate-500">Bienvenido al sistema de gestión de Trees</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard label="Presupuestos" value={stats.budgets} color="blue" />
          <StatCard label="Recibos" value={stats.receipts} color="emerald" />
          <StatCard label="Clientes" value={stats.clients} color="indigo" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group relative bg-white p-6 rounded-2xl shadow-sm border border-slate-100 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98]"
              onClick={() => navigate(card.path)}
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-${card.color}-50 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110`} />
              <div className="relative">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{card.title}</h3>
                <p className="text-sm text-slate-600">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-50",
    emerald: "text-emerald-600 bg-emerald-50",
    indigo: "text-indigo-600 bg-indigo-50"
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${colors[color]}`}>
        {label[0]}
      </div>
    </div>
  );
}
