import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";
import { BoltLogo } from "../assets/icons/bolt";

const features = [
  {
    icon: "📋",
    title: "Feedback History",
    description:
      "Keep a persistent, immutable record of all team feedback over time.",
  },
  {
    icon: "👥",
    title: "Team Management",
    description:
      "Visualize your team hierarchy, roles, waves, and statuses at a glance.",
  },
  {
    icon: "📊",
    title: "Dashboard Insights",
    description:
      "Track performance trends and feedback patterns across your team.",
  },
  {
    icon: "🔒",
    title: "Secure Access",
    description: "Enterprise-grade authentication via Microsoft Azure AD.",
  },
];

export const Landing = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await instance.loginPopup();
      navigate("/teams");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Hero */}
      <div className="flex flex-col items-center justify-center flex-1 gap-6 px-6 py-24 text-center">
        <div className="flex items-center gap-3 mb-2">
          <BoltLogo className="w-12 h-12 text-primary" />
          <span className="text-4xl font-bold tracking-tight">BOLT TMS</span>
        </div>

        <p className="text-xl opacity-60 max-w-lg">
          A modern team management system built for operations teams to track,
          manage, and grow their people.
        </p>

        <button className="btn btn-primary btn-lg mt-4" onClick={handleLogin}>
          Sign in with Microsoft
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-12 pb-24">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-base-300 rounded-box p-6 flex flex-col gap-3"
          >
            <span className="text-3xl">{feature.icon}</span>
            <h3 className="font-bold text-lg">{feature.title}</h3>
            <p className="text-sm opacity-60">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center py-6 text-xs opacity-30 border-t border-base-300">
        © {new Date().getFullYear()} Bolt TMS — Internal use only
      </div>
    </div>
  );
};
