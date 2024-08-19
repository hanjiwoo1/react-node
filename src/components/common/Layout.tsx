import {Outlet} from "react-router-dom";
import Header from "./Header.tsx";

function Layout() {
  return (
    <div className="relative">
      <Header />
      <Outlet /> {/* 하위 라우트의 내용을 여기에 렌더링합니다 */}
    </div>
  );
}

export default Layout;
