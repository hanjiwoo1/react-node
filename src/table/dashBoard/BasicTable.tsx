// src/table/dashBoard/BasicTable.tsx
import {ColumnDef, flexRender, getCoreRowModel, useReactTable,} from "@tanstack/react-table"
import {Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import './ImageGalleryStyles.css'

interface ColumnMeta{
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
    <Table className="custom-table">
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id} className="custom-header-row">
            {headerGroup.headers.map((header) => {
              const meta: ColumnMeta = header.column.columnDef.meta as ColumnMeta;
              return (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  isNumeric={meta?.isNumeric}
                  className="custom-header-cell"
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
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id} className="custom-row">
            {row.getVisibleCells().map((cell) => {
              const meta: ColumnMeta = cell.column.columnDef.meta as ColumnMeta;
              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric} className="custom-cell">
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