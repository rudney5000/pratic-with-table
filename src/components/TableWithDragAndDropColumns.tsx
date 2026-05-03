import { useRef, useState } from "react"
import type { Column } from "../types/types"

interface TableWithDragAndDropColumnsProps<T> {
  data: T[]
  columns: Column<T>[]
}

export function TableWithDragAndDropColumns<T>({ data, columns }: TableWithDragAndDropColumnsProps<T>){
  
  const [cols, setCols] = useState<Column<T>[]>(columns)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const dragIndexRef = useRef<number | null>(null)

  function handleDragStart(index: number) {
    dragIndexRef.current = index
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault()
    setDragOverIndex(index)
  }

  function handleDrop(index: number) {
    const dragIndex = dragIndexRef.current
    if(dragIndex == null || dragIndex === index) return 

    const next = [...cols]
    const [dragged] = next.splice(dragIndex, 1)
    next.splice(index, 0, dragged)
    setDragOverIndex(null)

    setCols(next)
    dragIndexRef.current = null
  }

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {cols.map((col, index) => (
              <th 
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                key={String(col.key)} 
                scope="col" 
                className={`px-6 py-3 bg-white border-b dark:bg-gray-800 dark:border-gray-700 transition-colors ${
                dragOverIndex === index ? 'border-t-2 border-blue-500' : ''
              }`}
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
              className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 transition-colors ${
                dragOverIndex === rowIndex ? 'border-t-2 border-blue-500' : ''
              }`}
            >
              {cols.map((col)=>(
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