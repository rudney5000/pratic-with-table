import { Table } from './components/Table'
import { TableWithExpandedRows } from './components/TableWithExpandedRows'
import { TableWithFilters } from './components/TableWithFilters'
import { TableWithPagination } from './components/TableWithPagination'
import { TableWithSelection } from './components/TableWithSelection'
import { TableWithSortable } from './components/TableWithSortable'
import { GENERATEDUSERS } from './data/data'
import { columnsBasicTable } from './utils/constants/BasicTable/columns'
import { USERS } from './utils/constants/BasicTable/users'
import { columnsTableWithExpandedRows } from './utils/constants/TablewithExpandedRows/columns'
import { columnsTableWithFilters } from './utils/constants/TableWithFilters/columns'
import { columnsTableWithPagination } from './utils/constants/TableWithPagination/columns'
import { columnsTableWithSelection } from './utils/constants/TableWithSelection/columns'
import { columnsTableWithSortable } from './utils/constants/TablewithSortable/columns'

function App() {
  return (
    <>
      <div>Basic Table </div>
      <Table
        data={USERS}
        columns={columnsBasicTable}
      />
      <div> Table with rowSelection</div>
      <TableWithSelection 
        data={USERS} 
        columns={columnsTableWithSelection} 
        rowSelection
      />
      <div> Table with sortable</div>
      <TableWithSortable 
        data={USERS}
        columns={columnsTableWithSortable}
      />
      <div> Table with Filter</div>
      <TableWithFilters 
        data={USERS}
        columns={columnsTableWithFilters}
      />
      <div> Table with Pagination</div>
      <TableWithPagination 
        data={GENERATEDUSERS}
        columns={columnsTableWithPagination}
      />
      <div> Table with ExpandedRows</div>
      <TableWithExpandedRows 
        data={USERS}
        columns={columnsTableWithExpandedRows}
      />
    </>
  )
}

export default App
