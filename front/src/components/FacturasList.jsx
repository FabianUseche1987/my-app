// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom"; // 👈 importar Link

// function FacturasList() {
//   const [facturas, setFacturas] = useState([]);
//   const [busqueda, setBusqueda] = useState("");

//   const fetchFacturas = async () => {
//     const res = await fetch("http://localhost:5000/facturas");
//     const data = await res.json();
//     setFacturas(data);
//   };

//   useEffect(() => {
//     fetchFacturas();
//   }, []);

//   const facturasFiltradas = facturas.filter(
//     (factura) =>
//       factura.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
//       factura.numeroFactura.toLowerCase().includes(busqueda.toLowerCase())
//   );

//   return (
//     <div className="max-w-4xl mx-auto mt-10 px-4">
//       <h2 className="text-2xl font-bold mb-4">📄 Lista de Facturas</h2>

//       <input
//         type="text"
//         placeholder="Buscar por nombre o número de factura..."
//         className="mb-4 p-2 border rounded w-full"
//         value={busqueda}
//         onChange={(e) => setBusqueda(e.target.value)}
//       />

//       {facturasFiltradas.length === 0 ? (
//         <p>No se encontraron facturas.</p>
//       ) : (
//         <ul className="space-y-2">
//           {facturasFiltradas.map((factura) => (
//             <li
//               key={factura._id}
//               className="p-4 bg-white shadow-md rounded border"
//             >
//               <Link
//                 to={`/usuarios/${factura.userId}/facturas`}
//                 className="hover:underline text-blue-600"
//               >
//                 <strong>{factura.numeroFactura}</strong> - {factura.nombre}{" "}
//                 {factura.apellido}
//               </Link>
//               <br />
//               💰 Valor: <strong>${factura.valor}</strong> | Tipo:{" "}
//               {factura.tipoPago}
//               <br />
//               🗓️ {new Date(factura.fecha).toLocaleDateString()}
//               <br />
//               🛒 Items:{" "}
//               {Array.isArray(factura.items)
//                 ? factura.items.map((item) => item.nombre).join(", ")
//                 : ""}
//               <br />
//               📝 {factura.observaciones}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default FacturasList;
