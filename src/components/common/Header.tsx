import {Link} from "react-router-dom";
import Logout from "../Logout.tsx";

export default function Header() {
  return (
    <header className="min-h-20">
      <Link to="/">
        home
      </Link>
      <Logout />
    </header>
  );
}
