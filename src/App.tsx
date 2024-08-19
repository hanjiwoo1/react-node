import './App.css'
import LoginForm from "./components/LoginForm.tsx";
import {Route, Routes} from "react-router-dom";
import Sign from "./components/Sign.tsx";
import DashBoard from "./pages/dashBoard/DashBoard.tsx";
import DashBoardDetail from "./pages/dashBoard/DashBoardDetail.tsx";
import DashBoardReg from "./pages/dashBoard/DashBoardReg.tsx";
import Layout from "./components/common/Layout.tsx";
import PrivateRoute from "./components/session/PrivateRoute.tsx";

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LoginForm />} />
        <Route element={<PrivateRoute />}>
          <Route path="/sign" element={<Sign />} />
          <Route path="/dashBoard" element={<DashBoard />} />
          <Route path="/dashBoard/detail/:id" element={<DashBoardDetail />} />
          <Route path="/dashBoard/reg" element={<DashBoardReg />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App
