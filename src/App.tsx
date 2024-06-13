import './App.css'
import {ColumnDef} from "@tanstack/react-table";
import LoginForm from "./components/LoginForm.tsx";

interface User{
  name: string;
  userId: string;
}

function App() {

  const column: ColumnDef<User>[] = [
    {id: 'name', header: '이름', accessorFn: (row: User) => row.name},
    {id: 'userId', header: 'id', accessorFn: (row: User) => row.userId},
  ];

  return (
    <>
      <LoginForm/>
      {/*<Table*/}
      {/*  name="UserTable"*/}
      {/*  data={getData}*/}
      {/*  columns={column}*/}
      {/*  noDataMessage="데이터가 없어요."*/}
      {/*/>*/}
    </>
  )
}

export default App
