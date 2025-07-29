import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

export default function Admin() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
    <div className="flex flex-col items-center justify-center">
      <div className="container"></div>
      <h1 className="mb-4">Sistema de Presupuestos y Recibos</h1>

      <div className="row justify-content-center">
        <div className="col-md-4 mb-4">
          <div className="card shadow" onClick={() => navigate("/presupuesto")} style={{ cursor: "pointer" }}>
            <div className="card-body">
              <h3 className="card-title">📝 Nuevo Presupuesto</h3>
              <p className="card-text">Crear un nuevo presupuesto detallado.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow" onClick={() => navigate("/resumen")} style={{ cursor: "pointer" }}>
            <div className="card-body">
              <h3 className="card-title">📋 Ver Resumen</h3>
              <p className="card-text">Ver presupuestos y recibos emitidos.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow" onClick={() => navigate("/recibo")} style={{ cursor: "pointer" }}>
            <div className="card-body">
              <h3 className="card-title">💵 Crear Recibo</h3>
              <p className="card-text">Emitir un recibo manual o desde presupuesto.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
