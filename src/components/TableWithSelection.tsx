import { useEffect, useRef, useState } from "react"
import type { Column } from "../types/types"

interface TableWithSelectionProps<T> {
  data: T[]
  columns: Column<T>[],
  rowSelection?: boolean
}

export function TableWithSelection<T>({ data, columns, rowSelection }: TableWithSelectionProps<T>){
  const checkboxRef = useRef<HTMLInputElement>(null)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const allSelected = data.length > 0 && selected.size === data.length
  const isRowSelected = (index: number) => selected.has(index)
  const someSelected = selected.size > 0 && !allSelected

  function toggleRow(index: number) {
    setSelected((prev) => {
      const next = new Set(prev)
      if(next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  function toggleAll() {
    if(allSelected) {
      setSelected(new Set())
    } else {
      setSelected(new Set([...Array(data.length).keys()]))
    }
  }

  useEffect(() => {
    if(checkboxRef.current) {
      checkboxRef.current.indeterminate = someSelected
    }
  }, [someSelected, allSelected])


  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {rowSelection &&
              <th>
                <input
                  type="checkbox"
                  ref={checkboxRef}
                  checked={allSelected}
                  onChange={toggleAll}
                />
              </th> 
            }
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
            <tr
              key={rowIndex}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              {rowSelection && (
                <td>
                  <input
                    type="checkbox"
                    checked={isRowSelected(rowIndex)}
                    onChange={() => toggleRow(rowIndex)}
                  />
                </td>
              )}
              {columns.map((col)=>(
                <td
                  key={String(col.key)}
                  className="px-6 py-4"
                >
                  {String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}