import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Shifts from "../pages/Shifts";
import { Teams } from "../pages/Teams";
import { Landing } from "../pages/Landing";
import { Dashboard } from "../pages/Dashboard";
import { RequireAuth } from "../auth/RequireAuth";
import { RedirectIfAuthenticated } from "../auth/RedirectIfAuthenticated";
import { RequirePasswordChange } from "../auth/RequirePasswordChange";
import { FirstLogin } from "../pages/FistLogin";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<RedirectIfAuthenticated />}>
          <Route path="/" element={<Landing />} />
        </Route>

        {/* First login — authenticated but password not changed yet */}
        <Route element={<RequireAuth />}>
          <Route path="/first-login" element={<FirstLogin />} />
        </Route>

        {/* Protected — requires auth + password already changed */}
        <Route element={<RequireAuth />}>
          <Route element={<RequirePasswordChange />}>
            <Route element={<Sidebar />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/calendar" element={<Shifts />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
