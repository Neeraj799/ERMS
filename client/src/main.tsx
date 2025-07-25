import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ProjectProvider } from "./context/ProjectContext.tsx";
import { EngineerProvider } from "./context/EngineerContext.tsx";
import { AssignmentProvider } from "./context/AssignmentContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <UserProvider>
      <ProjectProvider>
        <EngineerProvider>
          <AssignmentProvider>
            <App />
          </AssignmentProvider>
        </EngineerProvider>
      </ProjectProvider>
    </UserProvider>
  </BrowserRouter>
);
