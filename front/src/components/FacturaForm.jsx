import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Notification from "./Notification";
import { API_ENDPOINTS } from "../config/api";

const FacturaForm = () => {
  const { id, facturaId } = useParams(); // Obtener el userId y facturaId de la URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    identificacion: "",
    correo: "",
    numeroFactura: "",
    valor: 0,
    tipoPago: "Contado",
    observaciones: "",
    items: [{ nombre: "", cantidad: 1, precioUnitario: 0 }],
  });

  const [notification, setNotification] = useState({
    show: false,
    type: "success",
    title: "",
    message: "",
  });

  const showNotification = (type, title, message = "") => {
    setNotification({
      show: true,
      type,
      title,
      message,
    });

    // Auto-cerrar después de 3 segundos para mensajes de éxito
    // y 5 segundos para mensajes de error
    const timeout = type === "success" ? 3000 : 5000;
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, timeout);
  };

  const closeNotification = () => {
    setNotification((prev) => ({ ...prev, show: false }));
  };

  // Efecto para recalcular el total cuando cambien los items
  useEffect(() => {
    const calcularTotal = () => {
      const total = form.items.reduce((sum, item) => {
        const cantidad = parseFloat(item.cantidad) || 0;
        const precio = parseFloat(item.precioUnitario) || 0;
        return sum + cantidad * precio;
      }, 0);
      return total;
    };

    const nuevoTotal = calcularTotal();
    setForm((prevForm) => ({
      ...prevForm,
      valor: nuevoTotal,
    }));
  }, [form.items]);

  // Efecto para cargar datos de la factura cuando estamos editando
  useEffect(() => {
    if (facturaId) {
      const fetchFactura = async () => {
        try {
          const res = await fetch(
            `${API_ENDPOINTS.FACTURAS}/single/${facturaId}`
          );
          const factura = await res.json();
          setForm({
            nombre: factura.nombre || "",
            identificacion: factura.identificacion || "",
            correo: factura.correo || "",
            numeroFactura: factura.numeroFactura || "",
            valor: factura.valor || 0,
            tipoPago: factura.tipoPago || "Contado",
            observaciones: factura.observaciones || "",
            items: factura.items || [
              { nombre: "", cantidad: 1, precioUnitario: 0 },
            ],
          });
        } catch (error) {
          console.error("Error al cargar factura:", error);
          showNotification(
            "error",
            "Error al cargar datos",
            "No se pudieron obtener los datos de la factura. Verifica tu conexión."
          );
        }
      };
      fetchFactura();
    }
  }, [facturaId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const newItems = [...form.items];
    let value = e.target.value;

    // Validación específica para precioUnitario y cantidad
    if (e.target.name === "precioUnitario") {
      // Permitir valores vacíos durante la edición
      if (value !== "" && parseFloat(value) < 0) {
        value = 0;
      }
    } else if (e.target.name === "cantidad") {
      // Validar que la cantidad sea al menos 1
      if (value !== "" && parseInt(value) < 1) {
        value = 1;
      }
    }

    newItems[index][e.target.name] = value;
    setForm({ ...form, items: newItems });
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { nombre: "", cantidad: 1, precioUnitario: 0 }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Incluir el userId en los datos a enviar
    const facturaData = {
      ...form,
      userId: id,
    };

    try {
      if (facturaId) {
        // Modo edición - PUT request
        await fetch(`${API_ENDPOINTS.FACTURAS}/${facturaId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(facturaData),
        });
        showNotification(
          "success",
          "¡Factura actualizada!",
          "Los cambios se han guardado exitosamente"
        );
      } else {
        // Modo creación - POST request
        await fetch(API_ENDPOINTS.FACTURAS, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(facturaData),
        });
        showNotification(
          "success",
          "¡Factura creada!",
          "La nueva factura se ha guardado correctamente"
        );
      }

      // Esperar un poco más antes de redirigir para que el usuario vea la notificación
      setTimeout(() => {
        navigate(`/usuarios/${id}/facturas-table`);
      }, 1000);
    } catch (error) {
      console.error("Error al guardar la factura:", error);
      showNotification(
        "error",
        "Error al procesar",
        "No se pudo completar la operación. Por favor, verifica los datos e intenta nuevamente."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Notification
        show={notification.show}
        onClose={closeNotification}
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />

      <div className="max-w-xl mx-auto p-6">
        <div className="mb-4 flex justify-end items-center">
          <button
            onClick={() => navigate(`/usuarios/${id}/facturas-table`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
          >
            Volver
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-800 text-black dark:text-white p-6 rounded-lg shadow-md space-y-4"
        >
          <h2 className="text-xl font-bold">
            {facturaId ? "Editar Factura" : "Crear Nueva Factura"}
          </h2>

          <input
            type="text"
            name="nombre"
            placeholder="Nombre del cliente"
            value={form.nombre}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600"
            required
          />
          <input
            type="number"
            name="identificacion"
            placeholder="Identificación del cliente"
            value={form.identificacion}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600"
            required
          />
          {/* <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={form.apellido}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-700"
        /> */}
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={form.correo}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600"
          />
          <input
            type="text"
            name="numeroFactura"
            placeholder="Número de factura"
            value={form.numeroFactura}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600"
            required
          />
          <div>
            <label className="block text-sm font-medium mb-1">
              Valor Total (calculado automáticamente)
            </label>
            <input
              type="number"
              name="valor"
              placeholder="Valor total"
              value={form.valor.toFixed(2)}
              className="w-full p-2 rounded bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600 bg-opacity-70 cursor-not-allowed"
              disabled
              readOnly
            />
          </div>

          <select
            name="tipoPago"
            value={form.tipoPago}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600"
          >
            <option value="Contado">Contado</option>
            <option value="Crédito">Crédito</option>
          </select>

          <textarea
            name="observaciones"
            placeholder="Observaciones"
            value={form.observaciones}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600"
          />

          <div className="space-y-2">
            <h3 className="font-semibold">Items comprados</h3>
            {form.items.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Item"
                  value={item.nombre}
                  onChange={(e) => handleItemChange(index, e)}
                  className="flex-1 p-2 rounded bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600"
                  required
                />
                <input
                  type="number"
                  name="cantidad"
                  placeholder="Cant."
                  value={item.cantidad}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-20 p-2 rounded bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600"
                  min="1"
                  required
                />
                <input
                  type="number"
                  name="precioUnitario"
                  placeholder="$"
                  value={item.precioUnitario}
                  onChange={(e) => handleItemChange(index, e)}
                  className="w-28 p-2 rounded bg-gray-100 dark:bg-slate-700 border border-gray-300 dark:border-slate-600"
                  min="0.01"
                  step="0.01"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addItem}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded"
            >
              Agregar ítem
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 p-2 rounded"
          >
            {facturaId ? "Actualizar" : "Guardar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FacturaForm;
