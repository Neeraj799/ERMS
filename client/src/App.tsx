import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Manager from "./pages/Manager";
import Engineer from "./pages/Engineer";
import { Toaster } from "./components/ui/sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import ManagerTeam from "./pages/ManagerTeam";
import Assignment from "./pages/Assignment";
import EngineerProfile from "./pages/EngineerProfile";
import Navbar from "./components/common/Navbar";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Protected Route for Manager */}
        <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
          <Route element={<Navbar />}>
            <Route path="/manager" element={<Manager />} />
            <Route path="/manager/team" element={<ManagerTeam />} />
            <Route path="/manager/assignment" element={<Assignment />} />
          </Route>
        </Route>

        {/* Protected Route for Engineer */}
        <Route element={<ProtectedRoute allowedRoles={["engineer"]} />}>
          <Route element={<Navbar />}>
            <Route path="/engineer" element={<Engineer />} />
            <Route path="/updateEngineer" element={<EngineerProfile />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
