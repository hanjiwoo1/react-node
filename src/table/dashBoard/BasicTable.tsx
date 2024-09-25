// src/table/dashBoard/BasicTable.tsx
import {ColumnDef, flexRender, getCoreRowModel, useReactTable,} from "@tanstack/react-table"
import {Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";

interface ColumnMeta {
  isNumeric: boolean;
}

interface BasicTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function BasicTable<TData extends {fileId:number}, TValue>({
                                                                    columns,
                                                                    data,
                                                                  }: BasicTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg">
      <Thead className="bg-blue-50">
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const meta: ColumnMeta = header.column.columnDef.meta as ColumnMeta;
              return (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className={`px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider ${
                    meta?.isNumeric ? "text-right" : "text-left"
                  }`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody className="bg-white divide-y divide-gray-200">
        {table.getRowModel().rows.map((row) => (
          <Tr
            key={row.id}
            className="hover:bg-blue-50 transition duration-300 ease-in-out"
          >
            {row.getVisibleCells().map((cell) => {
              const meta: ColumnMeta = cell.column.columnDef.meta as ColumnMeta;
              return (
                <Td
                  key={cell.id}
                  className={`px-6 py-4 whitespace-nowrap ${
                    meta?.isNumeric ? "text-right" : "text-left"
                  } text-sm text-gray-900`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
