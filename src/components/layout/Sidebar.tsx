import { Outlet, NavLink } from "react-router-dom";
import { BoltLogo } from "../../assets/icons/bolt";
import { useAuth } from "../../auth/AuthProvider";

const Sidebar = () => {
  const { user, logout } = useAuth();

  const MANAGEMENT_ROLES = ["Director", "Manager", "Team Manager", "Team Lead"];
  const isManagement = MANAGEMENT_ROLES.includes(user?.role?.name ?? "");

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 px-6 gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 font-semibold text-lg">
            <BoltLogo className="w-6 h-6 text-primary" />
            <span>Feedback Console</span>
          </div>

          {/* Nav Links */}
          {isManagement ? (
            <>
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
              <NavLink
                to="/reset-totp"
                className={({ isActive }) =>
                  `btn btn-sm btn-ghost ${isActive ? "btn-active" : ""}`
                }
              >
                Authenticator
              </NavLink>
              <NavLink
                to="/my-feedbacks"
                className={({ isActive }) =>
                  `btn btn-sm btn-ghost ${isActive ? "btn-active" : ""}`
                }
              >
                My Feedbacks
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/my-feedbacks"
              className={({ isActive }) =>
                `btn btn-sm btn-ghost ${isActive ? "btn-active" : ""}`
              }
            >
              My Feedbacks
            </NavLink>
          )}
          {/* Right Section */}
          <div className="ml-auto flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm opacity-70">{user.name}</span>
                <div className="dropdown dropdown-end">
                  <div className="avatar cursor-pointer" tabIndex={0}>
                    <div className="mask mask-circle h-10 w-10">
                      <img
                        src={`https://ui-avatars.com/api/?name=${user.name}`}
                        alt={user.name}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-300 rounded-box z-[1] w-40 p-2 shadow mt-2"
                  >
                    <li>
                      <button onClick={logout}>Sign out</button>
                    </li>
                  </ul>
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
