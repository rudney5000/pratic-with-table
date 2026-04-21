import { useMemo, useState } from "react"
import type { Column } from "../types/types"

interface TableWithSortableProps<T> {
  data: T[]
  columns: Column<T>[]
}

type SortDir = 'asc' | 'desc' | null


export function TableWithSortable<T>({ data, columns }: TableWithSortableProps<T>){
  
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)

  const handleSort = (key: keyof T) => {
    if(sortKey === key) {
      if(sortDir === 'asc') {
        setSortDir('desc')
      } else {
        setSortKey(null)
        setSortDir(null)
      }
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sortedData = useMemo(() => 
        
    [...data].sort((a, b) => {

      if(!sortKey || !sortDir) return 0
  
      const aVal = a[sortKey] as string | number
      const bVal = b[sortKey] as string | number
  
      if(aVal === bVal) return 0
  
      const modifier = sortDir === 'asc' ? 1 : -1
      return aVal > bVal ? modifier : -modifier
    }),
  [data, sortKey, sortDir])

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columns.map((col) => (
              <th 
                key={String(col.key)} 
                scope="col" 
                onClick={() => col.sortable && handleSort(col.key)}
                className="px-6 py-3"
                style={{ cursor: col.sortable ? 'pointer' : 'default'}}
              >
                {col.label} 
                {col.sortable && (
                  sortKey === col.key 
                  ? (sortDir === 'asc' ? '▲' :  '▼')
                  : ' ↕'
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
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