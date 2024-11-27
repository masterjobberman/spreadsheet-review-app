import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import { SpreadsheetEntry } from '../types';
import { ArrowUpDown, Check, Trash2 } from 'lucide-react';

interface SpreadsheetTableProps {
  data: SpreadsheetEntry[];
  onToggleStatus: (id: number, field: 'reviewSent' | 'reviewPosted' | 'paymentReceived') => void;
  onDelete: (id: number) => void;
}

export function SpreadsheetTable({ data, onToggleStatus, onDelete }: SpreadsheetTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<SpreadsheetEntry>();

  const columns = [
    columnHelper.accessor('id', {
      header: '#',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('imageUrl', {
      header: 'Image',
      cell: (info) => (
        <img
          src={info.getValue()}
          alt={info.row.original.name}
          className="w-12 h-12 object-cover rounded"
        />
      ),
    }),
    columnHelper.accessor('name', {
      header: ({ column }) => (
        <button
          className="flex items-center gap-2 hover:text-gray-700"
          onClick={() => column.toggleSorting()}
        >
          Name
          <ArrowUpDown className="h-4 w-4" />
        </button>
      ),
      cell: (info) => (
        <button
          onClick={() => navigate(`/review/${info.row.original.id}`)}
          className="text-blue-500 hover:text-blue-700"
        >
          {info.getValue()}
        </button>
      ),
    }),
    columnHelper.accessor('commission', {
      header: 'Commission',
      cell: (info) => `$${info.getValue().toFixed(2)}`,
    }),
    columnHelper.accessor('purchaseAmount', {
      header: 'Purchase Amount',
      cell: (info) => `$${info.getValue().toFixed(2)}`,
    }),
    columnHelper.accessor('refundAmount', {
      header: 'Refund Amount',
      cell: (info) => `$${info.getValue().toFixed(2)}`,
    }),
    columnHelper.accessor('check', {
      header: 'Check',
      cell: (info) => {
        const value = info.getValue();
        const colorClass = value === 'Correct' 
          ? 'text-green-600' 
          : value === 'LOW' 
            ? 'text-red-600' 
            : value === 'HIGH' 
              ? 'text-red-600' 
              : '';
        return <span className={colorClass}>{value}</span>;
      },
    }),
    columnHelper.accessor('reviewSent', {
      header: 'Review Sent',
      cell: (info) => (
        <button
          onClick={() => onToggleStatus(info.row.original.id, 'reviewSent')}
          className={`flex justify-center ${info.getValue() ? 'text-green-600' : 'text-gray-300'}`}
        >
          <Check className="h-5 w-5" />
        </button>
      ),
    }),
    columnHelper.accessor('reviewPosted', {
      header: 'Review Posted',
      cell: (info) => (
        <button
          onClick={() => onToggleStatus(info.row.original.id, 'reviewPosted')}
          className={`flex justify-center ${info.getValue() ? 'text-green-600' : 'text-gray-300'}`}
        >
          <Check className="h-5 w-5" />
        </button>
      ),
    }),
    columnHelper.accessor('paymentReceived', {
      header: 'Payment Received',
      cell: (info) => (
        <button
          onClick={() => onToggleStatus(info.row.original.id, 'paymentReceived')}
          className={`flex justify-center ${info.getValue() ? 'text-green-600' : 'text-gray-300'}`}
        >
          <Check className="h-5 w-5" />
        </button>
      ),
    }),
    columnHelper.accessor('productLink', {
      header: 'Product Link',
      cell: (info) => (
        <a 
          href={info.getValue()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          Link
        </a>
      ),
    }),
    columnHelper.accessor('reviewLink', {
      header: 'Review Link',
      cell: (info) => (
        <a 
          href={info.getValue()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800"
        >
          Link
        </a>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: (info) => (
        <button
          onClick={() => onDelete(info.row.original.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >
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