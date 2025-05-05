import React, { useMemo, useRef, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import './UserTable.css'; // 👈 Import CSS

const UserTable = ({ data, loadMore, hasMore }) => {
  const parentRef = useRef();

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: info => {
        const num = info.getValue().replace(/\D/g, '').slice(0, 10);
        return `+1-${num.slice(0, 3)}-${num.slice(3, 6)}-${num.slice(6)}`;
      },
    },
    {
      accessorFn: row => `${row.company.name} (${row.address.city})`,
      id: 'companyCity',
      header: 'Company (City)',
    },
  ], []);

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {},
  });

  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 10,
  });

  const totalSize = rowVirtualizer.getTotalSize();
  const virtualRows = rowVirtualizer.getVirtualItems();

  const handleScroll = useCallback(() => {
    const parent = parentRef.current;
    if (parent.scrollTop + parent.clientHeight >= parent.scrollHeight - 10) {
      if (hasMore) loadMore();
    }
  }, [hasMore, loadMore]);

  return (
    <div className="table">
      <div className="header-row">
        {table.getHeaderGroups().map(headerGroup =>
          headerGroup.headers.map(header => (
            <div
              key={header.id}
              className="header-cell"
              onClick={header.column.getToggleSortingHandler?.()}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
              {header.column.getIsSorted() === 'asc' ? ' 🔼' :
               header.column.getIsSorted() === 'desc' ? ' 🔽' : ''}
            </div>
          ))
        )}
      </div>

      <div ref={parentRef} className="body" onScroll={handleScroll}>
        <div className="row-container" style={{ height: `${totalSize}px` }}>
          {virtualRows.map(virtualRow => {
            const row = table.getRowModel().rows[virtualRow.index];
            return (
              <div
                key={row.id}
                className="virtual-row"
                style={{ transform: `translateY(${virtualRow.start}px)` }}
              >
                {row.getVisibleCells().map(cell => (
                  <div key={cell.id} className="cell">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserTable);
