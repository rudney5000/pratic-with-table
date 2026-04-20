import type { Column, User } from "../../../types/types";

export const columnsTableWithFilters: Column<User>[] = [
  { key: 'name', label: 'Nom', sortable: true },
  { key: 'age', label: 'Âge', sortable: false },
  { key: 'city', label: 'Ville', sortable: true },
]
  