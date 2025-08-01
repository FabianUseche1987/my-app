import { useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

const UsersTable = ({ users, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ getValue }) => (
          <span className="font-medium">{getValue()}</span>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ getValue }) => (
          <span className="text-gray-600 dark:text-gray-300">{getValue()}</span>
        ),
      },
      {
        accessorKey: "age",
        header: "Edad",
        cell: ({ getValue }) => (
          <span className="text-center block">{getValue()}</span>
        ),
      },
      {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => (
          <div className="flex gap-2 justify-start">
            <button
              onClick={() => onEdit(row.original)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200 shadow-sm"
              title="Editar usuario"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(row.original)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200 shadow-sm"
              title="Eliminar usuario"
            >
              Eliminar
            </button>

            <button
              onClick={() =>
                navigate(`/usuarios/${row.original._id}/facturas-table`)
              }
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors duration-200 shadow-sm"
              title="Ver facturas (tabla)"
            >
              Facturas
            </button>
          </div>
        ),
      },
    ],
    [navigate, onEdit, onDelete]
  );

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 5, // Mostrar 5 usuarios por página
      },
    },
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
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

      {/* Controles de paginación */}
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({table.getFilteredRowModel().rows.length} usuarios)
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
            {[5, 10, 20, 50].map((pageSize) => (
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
    </div>
  );
};

export default UsersTable;
