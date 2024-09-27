// src/table/dashBoard/BasicTable.tsx
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

interface ColumnMeta {
  isNumeric: boolean;
}

interface BasicTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

// Function to render table headers
const renderHeader = (headerGroup: any) => (
  <Tr key={headerGroup.id}>
    {headerGroup.headers.map((header: any) => {
      const meta: ColumnMeta = header.column.columnDef.meta as ColumnMeta;
      return (
        <Th
          key={header.id}
          onClick={header.column.getToggleSortingHandler()}
          className={`px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider ${
            meta?.isNumeric ? "text-right" : "text-left"
          }`}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
        </Th>
      );
    })}
  </Tr>
);

// Function to render table rows
const renderRow = (row: any) => (
  <Tr key={row.id} className="hover:bg-blue-50 transition duration-300 ease-in-out">
    {row.getVisibleCells().map((cell: any) => {
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
);

export function BasicTable<TData extends { fileId: number }, TValue>({
  columns,
  data,
}: BasicTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="min-w-full divide-y divide-gray-200 shadow-lg rounded-lg">
      <Thead className="bg-blue-50">
        {table.getHeaderGroups().map(renderHeader)}
      </Thead>
      <Tbody className="bg-white divide-y divide-gray-200">
        {table.getRowModel().rows.map(renderRow)}
      </Tbody>
    </Table>
  );
}