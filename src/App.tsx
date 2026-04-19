import './App.css'
import { Table } from './components/Table'
import { columns } from './utils/constants/columns'
import { USERS } from './utils/constants/users'

function App() {
  return (
    <Table
      data={USERS}
      columns={columns}
    />
  )
}

export default App
