import React, { useState } from "react"
import type { Column } from "../types/types"

interface TableWithExpandedRowsProps<T> {
  data: T[]
  columns: Column<T>[]
}

export function TableWithExpandedRows<T>({ data, columns }: TableWithExpandedRowsProps<T>){
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  function toggleRow(index: number) {
    setExpandedRows((prev) => {
      const next = new Set(prev)
      if(next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
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
          {data.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <tr
                key={rowIndex}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td>
                  <button onClick={() => toggleRow(rowIndex)}>
                    {expandedRows.has(rowIndex) ? '▼' : '►'}
                  </button>
                </td>
                {columns.map((col)=>(
                  <td
                    key={String(col.key)}
                    className="px-6 py-4"
                  >
                    {String(row[col.key])}
                  </td>
                ))}
              </tr>
              {expandedRows.has(rowIndex) && (
                <tr key={`details-${rowIndex}`}>
                  <td colSpan={columns.length + 1} className="px-6 py-4 bg-gray-50 dark:bg-gray-900">
                    <div className="flex flex-wrap gap-4">
                      {Object.entries(row as object).map(([key, value]) => (
                        <div key={key}>
                          <span className="text-xs text-gray-400">{key}</span>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{String(value)}</p>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}