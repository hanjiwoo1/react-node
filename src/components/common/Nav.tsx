import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-64 bg-gray-500 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <ul>
        <li className="mb-2">Dashboard</li>
        <li className="mb-2" onClick={() => navigate("/dashBoard/reg")}>Photo</li>
        <li className="mb-2">Profile</li>
      </ul>
    </nav>
  );
};

export default Nav;