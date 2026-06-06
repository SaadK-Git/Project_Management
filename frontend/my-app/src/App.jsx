import { Routes, Route } from "react-router-dom";

import ProjectPage from "./ProjectPage";
import TaskPage from "./TaskPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProjectPage />} />
      <Route path="/projects/:projectId" element={<TaskPage />} />
    </Routes>
  );
}