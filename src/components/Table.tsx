import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { TableData } from '../types';
import { ArrowUpDown } from 'lucide-react';

export function Table({ columns, data }: TableData) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const columnHelper = createColumnHelper<any>();

  const tableColumns = columns.map((col) =>
    columnHelper.accessor(col.accessorKey, {
      header: ({ column }) => (
        <button
          className="flex items-center gap-2 hover:text-gray-700"
          onClick={() => column.toggleSorting()}
        >
          {col.header}
          <ArrowUpDown className="h-4 w-4" />
        </button>
      ),
      cell: (info) => info.getValue(),
    })
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead className="table-header">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="table-body">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}