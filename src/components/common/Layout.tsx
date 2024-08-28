import {Outlet} from "react-router-dom";
import {useAuth} from "../session/AuthContext.tsx";
import Header from "./Header.tsx";

function Layout() {
  const { user } = useAuth();
  return (
    <div className="relative">
      {user && <Header />}
      <Outlet />
    </div>
  );
}

export default Layout;
