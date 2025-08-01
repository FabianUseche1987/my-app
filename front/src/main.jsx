import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./Users";
import FacturasUsuario from "./components/FacturasUsuario";
import FacturaForm from "./components/FacturaForm";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/usuarios" element={<Users />} />
        <Route path="/usuarios/:id/facturas" element={<FacturasUsuario />} />
        <Route path="/usuarios/:id/facturas/nueva" element={<FacturaForm />} />
        <Route
          path="/usuarios/:id/facturas/:facturaId/editar"
          element={<FacturaForm />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
