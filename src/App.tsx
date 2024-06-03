import {useEffect, useState} from 'react'
import './App.css'
import {ColumnDef} from "@tanstack/react-table";
import Table from "./components/Table.tsx";

interface User{
  name: string;
  userId: string;
}

function App() {

  const apiUrl = "http://localhost:8080/api";

  const [getData, setData] = useState<User[]>([]);

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setData(data.result)
      } );
  },[]);

  const column: ColumnDef<User>[] = [
    {id: 'name', header: '이름', accessorFn: (row: User) => row.name},
    {id: 'userId', header: 'id', accessorFn: (row: User) => row.userId},
  ];

  return (
    <>
      <Table
        name="UserTable"
        data={getData}
        columns={column}
        noDataMessage="데이터가 없어요."
      />
    </>
  )
}

export default App
