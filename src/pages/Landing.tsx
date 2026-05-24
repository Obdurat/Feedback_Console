import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BoltLogo } from "../assets/icons/bolt";
import { initLogin, verifyTotp } from "../api/authAPI";
import { useAuth } from "../auth/AuthProvider";

type Step = "employeeCode" | "qrSetup" | "totpCode";

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
    description: "Two-factor authentication via TOTP.",
  },
];

export const Landing = () => {
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("employeeCode");
  const [employeeCode, setEmployeeCode] = useState("");
  const [memberId, setMemberId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInitLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      const result = await initLogin(employeeCode);
      setMemberId(result.memberId);

      if (result.firstLogin) {
        setQrCode(result.qrCode);
        setStep("qrSetup");
      } else {
        setStep("totpCode");
      }
    } catch {
      setError("Employee code not found.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    setIsLoading(true);
    try {
      const { token, user } = await verifyTotp(memberId, code);
      setAuth(token, user);
      navigate("/dashboard");
    } catch {
      setError("Invalid or expired code. Try again.");
      setCode("");
    } finally {
      setIsLoading(false);
    }
  };

  const renderCard = () => {
    if (step === "employeeCode") {
      return (
        <>
          <h2 className="font-bold text-lg">Sign in</h2>
          <div className="flex flex-col gap-1">
            <span className="text-xs opacity-50">Employee Code</span>
            <input
              type="text"
              placeholder="EMP001"
              className="input input-bordered input-sm"
              value={employeeCode}
              onChange={(e) => setEmployeeCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleInitLogin()}
            />
          </div>
          {error && <p className="text-error text-xs">{error}</p>}
          <button
            className="btn btn-primary btn-sm mt-2"
            onClick={handleInitLogin}
            disabled={!employeeCode || isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Continue"
            )}
          </button>
        </>
      );
    }

    if (step === "qrSetup") {
      return (
        <>
          <h2 className="font-bold text-lg">Set up Authenticator</h2>
          <p className="text-sm opacity-50">
            Scan this QR code with Google Authenticator or Microsoft
            Authenticator, then enter the 6-digit code below.
          </p>
          <div className="flex justify-center">
            <img
              src={qrCode}
              alt="TOTP QR Code"
              className="rounded-lg w-48 h-48"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs opacity-50">6-digit code</span>
            <input
              type="text"
              placeholder="000000"
              maxLength={6}
              className="input input-bordered input-sm tracking-widest text-center text-lg"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) =>
                e.key === "Enter" && code.length === 6 && handleVerify()
              }
            />
          </div>
          {error && <p className="text-error text-xs">{error}</p>}
          <button
            className="btn btn-primary btn-sm mt-2"
            onClick={handleVerify}
            disabled={code.length !== 6 || isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Confirm & Sign in"
            )}
          </button>
        </>
      );
    }

    if (step === "totpCode") {
      return (
        <>
          <h2 className="font-bold text-lg">Enter your code</h2>
          <p className="text-sm opacity-50">
            Open your authenticator app and enter the 6-digit code for Bolt TMS.
          </p>
          <div className="flex flex-col gap-1">
            <span className="text-xs opacity-50">6-digit code</span>
            <input
              type="text"
              placeholder="000000"
              maxLength={6}
              className="input input-bordered input-sm tracking-widest text-center text-lg"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) =>
                e.key === "Enter" && code.length === 6 && handleVerify()
              }
              autoFocus
            />
          </div>
          {error && <p className="text-error text-xs">{error}</p>}
          <button
            className="btn btn-primary btn-sm mt-2"
            onClick={handleVerify}
            disabled={code.length !== 6 || isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Sign in"
            )}
          </button>
          <button
            className="btn btn-ghost btn-xs opacity-50"
            onClick={() => {
              setStep("employeeCode");
              setCode("");
              setError("");
            }}
          >
            ← Back
          </button>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <div className="flex flex-col items-center justify-center flex-1 gap-6 px-6 py-24 text-center">
        <div className="flex items-center gap-3 mb-2">
          <BoltLogo className="w-12 h-12 text-primary" />
          <span className="text-4xl font-bold tracking-tight">BOLT TMS</span>
        </div>

        <p className="text-xl opacity-60 max-w-lg">
          A modern team management system built for operations teams to track,
          manage, and grow their people.
        </p>

        <div className="bg-base-300 rounded-box p-8 w-full max-w-sm flex flex-col gap-4 mt-2">
          {renderCard()}
        </div>
      </div>

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
