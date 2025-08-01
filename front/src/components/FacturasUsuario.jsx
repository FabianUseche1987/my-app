import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function FacturasUsuario() {
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
        <div className="max-w-4xl mx-auto pt-10 pb-4 px-4">
          <h2 className="text-2xl font-bold mb-4">
            Facturas de {loading ? "Cargando..." : `${user?.name || ""}`}
          </h2>
          <div className="flex justify-between">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mb-4"
              onClick={() => navigate(`/usuarios/${id}/facturas/nueva`)}
            >
              Agregar factura
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
              onClick={() => navigate(`/usuarios`)}
            >
              Volver
            </button>
          </div>
        </div>
      </div>

      {/* Contenido de las facturas */}
      <div className="max-w-4xl mx-auto px-4 pt-4">
        {facturas.length === 0 ? (
          <p className="text-red-600">No hay facturas registradas.</p>
        ) : (
          <div className="space-y-4">
            {facturas.map((factura) => (
              <div
                key={factura._id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">
                    Factura {factura.numeroFactura}
                  </h3>
                  <button
                    onClick={() =>
                      navigate(`/usuarios/${id}/facturas/${factura._id}/editar`)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
                    title="Editar factura"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Editar
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="mb-2">
                      <strong>Cliente:</strong> {factura.nombre}
                    </p>
                    <p className="mb-2">
                      <strong>Identificación:</strong>{" "}
                      {factura.identificacion || "No especificada"}
                    </p>
                    <p className="mb-2">
                      <strong>Correo:</strong> {factura.correo}
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">
                      <strong>Valor Total:</strong> $
                      {factura.valor?.toLocaleString() || "0"}
                    </p>
                    <p className="mb-2">
                      <strong>Tipo de Pago:</strong> {factura.tipoPago}
                    </p>
                    <p className="mb-2">
                      <strong>Fecha:</strong>{" "}
                      {new Date(factura.fecha).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Items de la factura */}
                {factura.items && factura.items.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Items:</h4>
                    <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                      <div className="grid grid-cols-3 gap-2 font-semibold text-sm border-b border-gray-300 dark:border-gray-600 pb-2 mb-2">
                        <span>Producto</span>
                        <span>Cantidad</span>
                        <span>Precio Unit.</span>
                      </div>
                      {factura.items.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-3 gap-2 text-sm py-1"
                        >
                          <span>{item.nombre}</span>
                          <span>{item.cantidad}</span>
                          <span>
                            ${item.precioUnitario?.toLocaleString() || "0"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Observaciones */}
                {factura.observaciones && (
                  <div className="mt-4">
                    <p>
                      <strong>Observaciones:</strong> {factura.observaciones}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FacturasUsuario;
