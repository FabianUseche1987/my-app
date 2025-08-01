import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FacturasTable from "./FacturasTable";

function FacturasUsuarioTable() {
  const { id } = useParams(); // id del usuario
  const navigate = useNavigate();

  const [facturas, setFacturas] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const res = await fetch(`http://localhost:5000/facturas/${id}`);
        const data = await res.json();
        setFacturas(data);
      } catch (error) {
        console.error("Error al cargar facturas:", error);
      }
    };

    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://localhost:5000/users/${id}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error al cargar usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
    fetchFacturas();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      {/* Header sticky */}
      <div className="sticky top-0 bg-gray-100 dark:bg-gray-900 z-10 border-b border-gray-300 dark:border-gray-700">
        <div className="max-w-7xl mx-auto pt-10 pb-4 px-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">
              Facturas de {loading ? "Cargando..." : `${user?.name || ""}`}
            </h2>
          </div>
          <div className="flex justify-between">
            <button
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded mb-4"
              onClick={() => navigate(`/usuarios/${id}/facturas/nueva`)}
            >
              + Agregar factura
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
            >
              ← Volver a usuarios
            </button>
          </div>
        </div>
      </div>

      {/* Contenido de las facturas */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        {facturas.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No hay facturas registradas
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Comienza creando la primera factura para este usuario.
              </p>
              <button
                onClick={() => navigate(`/usuarios/${id}/facturas/nueva`)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded transition-colors duration-200 shadow-sm font-medium"
              >
                Crear primera factura
              </button>
            </div>
          </div>
        ) : (
          <FacturasTable facturas={facturas} />
        )}
      </div>
    </div>
  );
}

export default FacturasUsuarioTable;
