import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App";
import Sidebar from "../components/layout/Sidebar";
import Shifts from "../pages/Shifts";
import App from "./App";
// import Dashboard from "../pages/Dashboard";
// import Shifts from "../pages/Shifts";
// import Feedback from "../pages/Feedback";
// import Login from "../pages/Login";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Sidebar />}>
          <Route path="/" element={<App />} />
          <Route path="/calendar" element={<Shifts />} />
          {/* <Route path="/" element={<Dashboard />} />
          <Route path="/shifts" element={<Shifts />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
