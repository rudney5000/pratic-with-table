import { Table } from './components/Table'
import { TableWithFilters } from './components/TableWithFilters'
import { TableWithSelection } from './components/TableWithSelection'
import { TableWithSortable } from './components/TableWithSortable'
import { USERS } from './data/data'
import { columnsBasicTable } from './utils/constants/BasicTable/columns'
// import { USERS } from './utils/constants/BasicTable/users'
import { columnsTableWithFilters } from './utils/constants/TableWithFilters/columns'
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
    </>
  )
}

export default App
