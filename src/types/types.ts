export interface Column<T> {
  key: keyof T
  label: string
}

export interface User {
  id: number
  name: string
  age: number
  city: string
}