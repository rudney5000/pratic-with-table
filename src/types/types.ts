export interface Column<T> {
  key: keyof T
  label: string,
  sortable?: boolean
}

export interface User {
  id: number
  name: string
  age: number
  city: string
}