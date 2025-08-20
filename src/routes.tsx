import { Routes, Route } from "react-router-dom";

import Login from "./pages/loginPage";
import Dashboard from "./pages/DashBoard";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/controle" element={<Dashboard />} />
    </Routes>
  );
};

export default Router;
