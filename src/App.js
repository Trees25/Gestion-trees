import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./components/Admin";
import LandingPage from "./components/LandingPage"; 
import Presupuesto from "./components/Presupuesto";
import Recibo from "./components/Recibo";
import Resumen from "./components/Resumen";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
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
      </Routes>
    </Router>
  );
}

export default App;
