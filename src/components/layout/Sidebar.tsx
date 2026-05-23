import { Outlet } from "react-router-dom";
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
    </div>
  );
};

export default Sidebar;
