"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../../components/ui/table"

import {Table, Th, Thead, Tr, chakra, Tbody, Td} from "@chakra-ui/react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
                                           columns,
                                           data,
                                         }: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    // <div className="rounded-md border">
    //   <Table>
    //     <TableHeader>
    //       {table.getHeaderGroups().map((headerGroup) => (
    //         <TableRow key={headerGroup.id}>
    //           {headerGroup.headers.map((header) => {
    //             return (
    //               <TableHead key={header.id}>
    //                 {header.isPlaceholder
    //                   ? null
    //                   : flexRender(
    //                     header.column.columnDef.header,
    //                     header.getContext()
    //                   )}
    //               </TableHead>
    //             )
    //           })}
    //         </TableRow>
    //       ))}
    //     </TableHeader>
    //     <TableBody>
    //       {table.getRowModel().rows?.length ? (
    //         table.getRowModel().rows.map((row) => (
    //           <TableRow
    //             key={row.id}
    //             data-state={row.getIsSelected() && "selected"}
    //           >
    //             {row.getVisibleCells().map((cell) => (
    //               <TableCell key={cell.id}>
    //                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //               </TableCell>
    //             ))}
    //           </TableRow>
    //         ))
    //       ) : (
    //         <TableRow>
    //           <TableCell colSpan={columns.length} className="h-24 text-center">
    //             No results.
    //           </TableCell>
    //         </TableRow>
    //       )}
    //     </TableBody>
    //   </Table>
    // </div>
    <Table>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta: any = header.column.columnDef.meta;
              return (
                <Th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  isNumeric={meta?.isNumeric}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  <chakra.span pl="4">

                  </chakra.span>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta: any = cell.column.columnDef.meta;
              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric}>
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
