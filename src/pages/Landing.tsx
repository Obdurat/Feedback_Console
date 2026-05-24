import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoltLogo } from "../assets/icons/bolt";
import { login } from "../api/authAPI";
import { useAuth } from "../auth/AuthProvider";

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
    description: "Enterprise-grade authentication via JWT.",
  },
];

export const Landing = () => {
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();

  const [employeeCode, setEmployeeCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      const { token, user } = await login({ employeeCode, password });
      setAuth(token, user);
      navigate("/dashboard");
    } catch {
      setError("Invalid employee code or password.");
    } finally {
      setIsLoading(false);
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

        {/* Login Card */}
        <div className="bg-base-300 rounded-box p-8 w-full max-w-sm flex flex-col gap-4 mt-2">
          <h2 className="font-bold text-lg">Sign in</h2>

          <div className="flex flex-col gap-1">
            <span className="text-xs opacity-50">Employee Code</span>
            <input
              type="text"
              placeholder="EMP001"
              className="input input-bordered input-sm"
              value={employeeCode}
              onChange={(e) => setEmployeeCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs opacity-50">Password</span>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered input-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
          </div>

          {error && <p className="text-error text-xs">{error}</p>}

          <button
            className="btn btn-primary btn-sm mt-2"
            onClick={handleLogin}
            disabled={!employeeCode || !password || isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Sign in"
            )}
          </button>
        </div>
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

      <div className="text-center py-6 text-xs opacity-30 border-t border-base-300">
        © {new Date().getFullYear()} Bolt TMS — Internal use only
      </div>
    </div>
  );
};
