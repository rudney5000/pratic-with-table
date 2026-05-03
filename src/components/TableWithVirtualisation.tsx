import { useRef, useState } from "react"
import type { Column } from "../types/types"

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
}

export function TableWithVirtualisation<T>({ data, columns }: TableProps<T>){
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const rowHeight = 48
  const containerHeight = 500
  
  const startIndex = Math.floor(scrollTop / rowHeight)
  const visibleCount = Math.ceil(containerHeight / rowHeight)
  const endIndex = Math.min(startIndex + visibleCount + 2 , data.length)
  const offsetTop = startIndex * rowHeight
  const offsetBottom = (data.length - endIndex) * rowHeight

  function handleScroll(e: React.UIEvent<HTMLDivElement>){
    setScrollTop(e.currentTarget.scrollTop)
  }
  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: 500, overflow: 'scroll' }}
      className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0 z-10">
          <tr>
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
          <tr style={{ height: offsetTop }} />
          {data.slice(startIndex, endIndex).map((row, rowIndex) => (
            <tr
              key={startIndex + rowIndex}
              style={{ height: rowHeight }}
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
          <tr style={{ height: offsetBottom }} />
        </tbody>
      </table>
    </div>
  )
}