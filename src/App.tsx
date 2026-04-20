import { Table } from './components/Table'
import { TableWithSelection } from './components/TableWithSelection'
import { columnsBasicTable } from './utils/constants/BasicTale/columns'
import { USERS } from './utils/constants/BasicTale/users'
import { columnsTableWithSelection } from './utils/constants/TableWithSelection/columns'

function App() {
  return (
    <>
      <div>Basic Table </div>
      <Table
        data={USERS}
        columns={columnsBasicTable}
      />
      <div> Table with rowSelection</div>
      <TableWithSelection data={USERS} columns={columnsTableWithSelection} rowSelection/>
    </>
  )
}

export default App
