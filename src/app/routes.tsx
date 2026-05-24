import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Shifts from "../pages/Shifts";
import { Teams } from "../pages/Teams";
import { Landing } from "../pages/Landing";
import { Dashboard } from "../pages/Dashboard";
import { MyFeedbacks } from "../pages/MyFeedbacks";
import { RequireAuth } from "../auth/RequireAuth";
import { RequireManagement, RequireAgent } from "../auth/RequireRole";
import { RedirectIfAuthenticated } from "../auth/RedirectIfAuthenticated";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<RedirectIfAuthenticated />}>
          <Route path="/" element={<Landing />} />
        </Route>

        {/* Management only */}
        <Route element={<RequireAuth />}>
          <Route element={<RequireManagement />}>
            <Route element={<Sidebar />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/calendar" element={<Shifts />} />
            </Route>
          </Route>
        </Route>

        {/* Agent only */}
        <Route element={<RequireAuth />}>
          <Route element={<RequireAgent />}>
            <Route element={<Sidebar />}>
              <Route path="/my-feedbacks" element={<MyFeedbacks />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
