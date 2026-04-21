import type { Column, User } from "../../../types/types";

export const columnsTableWithPagination: Column<User>[] = [
  { key: 'name', label: 'Nom' },
  { key: 'age', label: 'Âge' },
  { key: 'city', label: 'Ville' },
]
  