import type { Column, User } from "../../../types/types";

export const columnsTableWithExpandedRows: Column<User>[] = [
  { key: 'name', label: 'Nom', sortable: true },
  { key: 'age', label: 'Âge', sortable: true },
  { key: 'city', label: 'Ville', sortable: true },
]
  