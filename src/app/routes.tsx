import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App";
import Sidebar from "../components/layout/Sidebar";
import Shifts from "../pages/Shifts";
import { Teams } from "../pages/Teams";
import { Landing } from "../pages/Landing";
import { Dashboard } from "../pages/Dashboard";
// import Dashboard from "../pages/Dashboard";
// import Shifts from "../pages/Shifts";
// import Feedback from "../pages/Feedback";
// import Login from "../pages/Login";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Sidebar />}>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Shifts />} />
          <Route path="/teams" element={<Teams />} />
          {/* <Route path="/" element={<Dashboard />} />
          <Route path="/shifts" element={<Shifts />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
