import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { Button } from "../ui/button";

const Navbar = () => {
  const { currentUser } = useUserContext();
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <div>
      <nav className="bg-black text-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wider"> ERMS </h1>
        <div className="space-x-4">
          {role === "manager" && (
            <>
              <Link to="/manager" className="hover:text-gray-300 transition">
                Dashboard
              </Link>
              <Link
                to="/manager/team"
                className="hover:text-gray-300 transition"
              >
                Team
              </Link>
              <Link
                to="/manager/assignment"
                className="hover:text-gray-300 transition"
              >
                Assignment
              </Link>
            </>
          )}

          {role === "engineer" && (
            <>
              <Link to="/engineer" className="hover:text-gray-300 transition">
                Dashboard
              </Link>
              <Link
                to="/updateEngineer"
                className="hover:text-gray-300 transition"
              >
                Profile
              </Link>
            </>
          )}
          <Button
            onClick={handleLogout}
            className="ml-4 px-3 py-1 rounded bg-white text-black hover:bg-gray-200 transition"
          >
            Logout
          </Button>
        </div>
      </nav>

      {/* Page Content */}
      <main className="bg-white text-black min-h-screen p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;
