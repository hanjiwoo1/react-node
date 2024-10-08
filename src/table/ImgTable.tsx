// import {ColumnDef, flexRender, getCoreRowModel, useReactTable,} from "@tanstack/react-table"
// import {Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
// import {Photo} from "../../pages/dashBoard/DashBoard.tsx";
// import ImageGallery from 'react-image-gallery';
// import './ImageGalleryStyles.css'
//
// interface ColumnMeta{
//   isNumeric: boolean;
// }
//
// interface BasicTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[]
//   data: TData[]
//   photo?: Photo | null
// }
//
// export function BasicTable<TData extends {fileId:number}, TValue>({
//   columns,
//   data,
//   photo,
// }: BasicTableProps<TData, TValue>) {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   })
//
//   return (
//     <Table >
//       <Thead>
//         {table.getHeaderGroups().map((headerGroup) => (
//           <Tr key={headerGroup.id}>
//             {headerGroup.headers.map((header) => {
//               const meta: ColumnMeta = header.column.columnDef.meta as ColumnMeta;
//               return (
//                 <Th
//                   key={header.id}
//                   onClick={header.column.getToggleSortingHandler()}
//                   isNumeric={meta?.isNumeric}
//                 >
//                   {flexRender(
//                     header.column.columnDef.header,
//                     header.getContext()
//                   )}
//                 </Th>
//               );
//             })}
//           </Tr>
//         ))}
//       </Thead>
//       <Tbody>
//         {table.getRowModel().rows.map((row) => {
//           // console.log('photo results filepath:', photo?.results.find((p) => p.id === row.original.fileId)?.filepath);
//           return (
//             <Tr key={row.id}>
//               {row.getVisibleCells().map((cell) => {
//                 const meta: ColumnMeta = cell.column.columnDef.meta as ColumnMeta;
//                 return (
//                   <Td key={cell.id} isNumeric={meta?.isNumeric}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </Td>
//                 );
//               })}
//               {photo && photo.results && photo.results.find((p) => p.id === row.original.fileId) && (
//                 <Td>
//                   <ImageGallery
//                     items={[
//                       {
//                         original: `${photo.results.find((p) => p.id === row.original.fileId)?.filepath}`,
//                       }
//                     ]}
//                   />
//                 </Td>
//               )}
//             </Tr>
//           );
//         })}
//       </Tbody>
//     </Table>
//   )
// }