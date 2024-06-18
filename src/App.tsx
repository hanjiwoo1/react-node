import './App.css'
import LoginForm from "./components/LoginForm.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Sign from "./components/Sign.tsx";
import DashBoard from "./pages/dashBoard/DashBoard.tsx";
import DashBoardDetail from "./pages/dashBoard/DashBoardDetail.tsx";
import DashBoardReg from "./pages/dashBoard/DashBoardReg.tsx";

// interface User{
//   name: string;
//   userId: string;
// }

function App() {

  // const column: ColumnDef<User>[] = [
  //   {id: 'name', header: '이름', accessorFn: (row: User) => row.name},
  //   {id: 'userId', header: 'id', accessorFn: (row: User) => row.userId},
  // ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/dashBoard" element={<DashBoard />} />
        <Route path="/dashBoard/detail/:id" element={<DashBoardDetail />} />
        <Route path="/dashBoard/reg" element={<DashBoardReg />} />
      </Routes>
      {/* Uncomment your Table component once the routing issue is resolved */}
      {/* <Table */}
      {/*   name="UserTable" */}
      {/*   data={getData} */}
      {/*   columns={column} */}
      {/*   noDataMessage="데이터가 없어요." */}
      {/* /> */}
    </BrowserRouter>
  );
}

export default App
