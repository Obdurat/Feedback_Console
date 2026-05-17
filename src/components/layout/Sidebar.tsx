import { NavLink, Outlet } from "react-router-dom";
import { CalendarIcon } from "../../assets/icons/calendar";
import { SettingsIcon } from "../../assets/icons/settings";
import { TeamIcon } from "../../assets/icons/teamIcon";
import { HomeIcon } from "../../assets/icons/home";
import { SidebarToggleIcon } from "../../assets/icons/sidebarToggle";
import { BoltLogo } from "../../assets/icons/bolt";

const Sidebar = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 px-4">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <SidebarToggleIcon />
            </label>

            <div className="flex items-center gap-2 font-semibold text-lg">
              <BoltLogo className="w-6 h-6 text-primary" />
              <span>BOLT TMS</span>
            </div>
          </div>

          {/* Right Section */}
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm opacity-70">Anderson Rodrigues</span>

            <div className="avatar">
              <div className="mask mask-circle h-12 w-12">
                <img
                  src={"https://ui-avatars.com/api/?name=Anderson Rodrigues"}
                  alt="Anderson Rodrigues"
                />
              </div>
            </div>
          </div>
        </nav>
        {/* Page content here */}
        <main className="p-6 bg-base-200 min-h-screen">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            <li>
              <NavLink to="/">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Home"
                >
                  <HomeIcon />
                  <span className="is-drawer-close:hidden"> Home</span>
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/calendar">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Work Shift"
                >
                  <CalendarIcon />
                  <span className="is-drawer-close:hidden"> Work Shift</span>
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/teams">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Team"
                >
                  <TeamIcon />
                  <span className="is-drawer-close:hidden"> Team</span>
                </button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings">
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  <SettingsIcon />
                  <span className="is-drawer-close:hidden"> Settings</span>
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
