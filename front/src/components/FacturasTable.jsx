import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useNavigate, useParams } from "react-router-dom";

const FacturasTable = ({ facturas }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // userId

  const columns = useMemo(
    () => [
      {
        accessorKey: "numeroFactura",
        header: "N° Factura",
        cell: ({ getValue }) => (
          <span className="font-medium text-blue-600 dark:text-blue-400">
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: "nombre",
        header: "Cliente",
        cell: ({ getValue }) => (
          <span className="font-medium">{getValue()}</span>
        ),
      },
      {
        accessorKey: "correo",
        header: "Email",
        cell: ({ getValue }) => (
          <span className="text-gray-600 dark:text-gray-300 text-sm">
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: "valor",
        header: "Valor Total",
        cell: ({ getValue }) => (
          <span className="font-semibold text-green-600 dark:text-green-400">
            ${getValue()?.toLocaleString() || "0"}
          </span>
        ),
      },
      {
        accessorKey: "tipoPago",
        header: "Tipo Pago",
        cell: ({ getValue }) => (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              getValue() === "Contado"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                : "bg-orange-100 text-red-800 dark:bg-red-900 dark:text-orange-200"
            }`}
          >
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: "fecha",
        header: "Fecha",
        cell: ({ getValue }) => (
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {new Date(getValue()).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        ),
      },
      {
        id: "items",
        header: "Items",
        cell: ({ row }) => (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {row.original.items?.length || 0} productos
          </span>
        ),
      },
      {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() =>
                navigate(`/usuarios/${id}/facturas/${row.original._id}/editar`)
              }
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200 shadow-sm"
              title="Editar factura"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 inline mr-1"
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
        ),
      },
    ],
    [navigate, id]
  );

  const table = useReactTable({
    data: facturas,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 8, // Mostrar 8 facturas por página
      },
    },
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Encabezado con información */}
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Lista de Facturas
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total: {facturas.length} facturas
          </span>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center space-x-1">
                      <span>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </span>
                      <span className="ml-1">
                        {{
                          asc: "↑",
                          desc: "↓",
                        }[header.column.getIsSorted()] ?? "↕"}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Estado vacío */}
      {facturas.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
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
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            No hay facturas
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Comienza creando una nueva factura.
          </p>
        </div>
      )}

      {/* Controles de paginación */}
      {facturas.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Página {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({table.getFilteredRowModel().rows.length} facturas)
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {"<<"}
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {"<"}
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {">"}
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {">>"}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Mostrar
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            >
              {[5, 8, 10, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              por página
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacturasTable;
