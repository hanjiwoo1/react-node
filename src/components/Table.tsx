import {ColumnDef, flexRender, getCoreRowModel, Row, useReactTable} from '@tanstack/react-table';
import styled from '@emotion/styled';
import {Fragment} from 'react';

export type TableProps<T> = {
  name: string;
  data: T[];
  columns: ColumnDef<T>[];
  noDataMessage?: string;
  useMinHeight?: boolean;
};
export type TableRenderSubRowComponent<T> = (props: { row: Row<T> }) => React.ReactElement;

function Table<T>(props: TableProps<T>) {
  const { useMinHeight = true, data, columns, noDataMessage } = props;
  const table = useReactTable<T>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { getHeaderGroups, getRowModel } = table;

  const isNoData = getRowModel().rows.length === 0;

  return (
    <TableContainer>
      {getHeaderGroups().map((headerGroup) => (
        <TableHeader className="row">
          {headerGroup.headers.map((header) =>
            header.isPlaceholder ? null : (
              <TableCell key={header.id} width={header.column.getSize()}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableCell>
            ),
          )}
        </TableHeader>
      ))}
      <TableBody useMinHeight={useMinHeight}>
        {isNoData ? (
          <NoDataComponent useMinHeight={useMinHeight}>{noDataMessage}</NoDataComponent>
        ) : (
          getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <TableRow className="row">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} width={cell.column.getSize()}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            </Fragment>
          ))
        )}
      </TableBody>
    </TableContainer>
  );
}

export default Table;

const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;

  .row {
    width: 100%;
    display: flex;
    border-bottom: 1px solid rgba(224, 224, 224, 1);
  }
`;

const TableCell = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
  padding: 16px;
  color: rgba(0, 0, 0, 0.87);
  display: flex;
  align-items: center;
  word-break: break-all;
`;

const TableRow = styled.div`
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

// const TableSubRow = styled.div`
//   width: 100%;
//   padding: 24px;
// `;

const TableHeader = styled.div`
  font-weight: 500;
`;

const TableBody = styled.div<{ useMinHeight: boolean }>`
  min-height: ${({ useMinHeight }) => (useMinHeight ? '560px' : 'auto')};
  display: flex;
  flex-direction: column;
`;

const NoDataComponent = styled.div<{ useMinHeight: boolean }>`
  width: 100%;
  height: ${({ useMinHeight }) => (useMinHeight ? '560px' : 'auto')};
  display: flex;
  justify-content: center;
  align-items: center;
`;