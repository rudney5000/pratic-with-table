import { useMemo, useState } from "react"
import type { Column, SortDir } from "../types/types"
import { CURRENTPAGE, PAGESIZE } from "../utils/constants/TableWithPagination/const"

interface TableWithPaginationProps<T> {
  data: T[]
  columns: Column<T>[]
}

export function TableWithPagination<T>({ data, columns }: TableWithPaginationProps<T>){
  const [currentPage, setCurrentPage] = useState(CURRENTPAGE)
  const [pageSize, setPageSize] = useState(PAGESIZE)
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)


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

  const totalPages = Math.ceil(sortedData.length / pageSize)
  const start = (currentPage - 1) * pageSize
  const paginatedData = sortedData.slice(start, start + pageSize)

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
          {paginatedData.map((row, rowIndex) => (
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
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <span className="text-xs text-gray-400">
            {sortedData.length} resultats
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 px-3 text-xs rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              precedent
            </button>
            {Array
              .from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 2)
              .map((page, index, arr) => (
                <>
                  {index > 0 && arr[index - 1] != page - 1 && (
                    <span 
                      key={`ellipsis-${page}`}
                      className="h-8 w-8 flex items-center justify-center text-xs text-gray-400"
                    >
                      ...
                    </span>
                  )}
                  <button
                    onClick={() => setCurrentPage(page)}
                    key={page}
                    className={`h-8 w-8 text-xs rounded border transition-colors
                      ${currentPage === page
                        ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-900 dark:border-gray-100 font-medium'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                  >
                    {page}
                  </button>
                </>
                
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 px-3 text-xs rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              suivant
            </button>
          </div>
        <div>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setCurrentPage(1)
            }}
            className="h-8 px-2 text-xs rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-pointer"
          >
            {[10, 25, 50, 100].map(size => (
              <option key={size} value={size}>{size} par page</option>
            ))}
          </select>
        </div>
        </div>
    </div>
  )
}