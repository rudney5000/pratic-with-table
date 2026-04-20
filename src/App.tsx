import { Table } from './components/Table'
import { TableWithSelection } from './components/TableWithSelection'
import { TableWithSortable } from './components/TableWithSortable'
import { columnsBasicTable } from './utils/constants/BasicTable/columns'
import { USERS } from './utils/constants/BasicTable/users'
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
    </>
  )
}

export default App
