import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./components/Admin";
import LandingPage from "./pages/LandingPage";
import Presupuesto from "./components/Presupuesto";
import Recibo from "./components/Recibo";
import Resumen from "./components/Resumen";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import Clientes from "./components/Clientes";
import Perfiles from "./components/Perfiles";
import Catalogo from "./components/Catalogo";
import Estadisticas from "./components/Estadisticas";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          {/* Rutas privadas protegidas */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Inicio />
              </PrivateRoute>
            }
          />
          <Route
            path="/clientes"
            element={
              <PrivateRoute>
                <Clientes />
              </PrivateRoute>
            }
          />
          <Route
            path="/presupuesto"
            element={
              <PrivateRoute>
                <Presupuesto />
              </PrivateRoute>
            }
          />
          <Route
            path="/recibo"
            element={
              <PrivateRoute>
                <Recibo />
              </PrivateRoute>
            }
          />
          <Route
            path="/resumen"
            element={
              <PrivateRoute>
                <Resumen />
              </PrivateRoute>
            }
          />
          <Route
            path="/perfiles"
            element={
              <PrivateRoute>
                <Perfiles />
              </PrivateRoute>
            }
          />
          <Route
            path="/catalogo"
            element={
              <PrivateRoute>
                <Catalogo />
              </PrivateRoute>
            }
          />
          <Route
            path="/estadisticas"
            element={
              <PrivateRoute>
                <Estadisticas />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
