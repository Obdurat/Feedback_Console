import { Outlet, NavLink } from "react-router-dom";
import { BoltLogo } from "../../assets/icons/bolt";
import { useMsal } from "@azure/msal-react";

const Sidebar = () => {
  const { accounts } = useMsal();
  const user = accounts[0];

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 px-6 gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 font-semibold text-lg">
            <BoltLogo className="w-6 h-6 text-primary" />
            <span>BOLT TMS</span>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `btn btn-sm btn-ghost ${isActive ? "btn-active" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `btn btn-sm btn-ghost ${isActive ? "btn-active" : ""}`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/teams"
              className={({ isActive }) =>
                `btn btn-sm btn-ghost ${isActive ? "btn-active" : ""}`
              }
            >
              Teams
            </NavLink>
          </div>

          {/* Right Section */}
          <div className="ml-auto flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm opacity-70">{user.name}</span>
                <div className="avatar">
                  <div className="mask mask-circle h-10 w-10">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.name}`}
                      alt={user.name}
                    />
                  </div>
                </div>
              </>
            ) : (
              <NavLink to="/" className="btn btn-primary btn-sm">
                Login
              </NavLink>
            )}
          </div>
        </nav>

        {/* Page content */}
        <main className="p-6 bg-base-200 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
