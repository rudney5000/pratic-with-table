import React, { useState, type ReactNode } from "react"
import type { Column } from "../types/types"

interface TreeRow { 
  id: number, 
  children?: TreeRow[] 
} 

interface TableWithExpandedChildrenRowsProps<T extends TreeRow> {
  data: T[]
  columns: Column<T>[]
}

export function TableWithExpandedChildrenRows<T extends TreeRow>({ data, columns }: TableWithExpandedChildrenRowsProps<T>){
  const [expandedRowsId, setExpandedRowsId] = useState<Set<number>>(new Set())

  function toggleRow(index: number) {
    setExpandedRowsId((prev) => {
      const next = new Set(prev)
      if(next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  function renderRows(rows: T[], depth: number = 0): ReactNode {
    return rows.map((row) => (
      <React.Fragment key={row.id}>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td style={{ paddingLeft: `${depth * 24 + 16}px`}}>
            {row.children?.length
              ? <button onClick={() => toggleRow(row.id)}>
                  {expandedRowsId.has(row.id) ? '▼' : '►'}
                </button>
              : <span className="text-gray-300">•</span>
            }
          </td>
          {columns.map((col)=> (
            <td key={String(col.key)} className="px-6 py-4">
              {String(row[col.key])}
            </td>
          ))}
        </tr>
        {expandedRowsId.has(row.id) && row.children && renderRows(row.children as T[], depth + 1)}
      </React.Fragment>
    ))
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3 w-10" />
            {columns.map((col) => (
              <th 
                key={String(col.key)} 
                scope="col" 
                className="px-6 py-3"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderRows(data)}
        </tbody>
      </table>
    </div>
  )
}