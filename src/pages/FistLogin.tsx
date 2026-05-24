import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { changePassword } from "../api/authAPI";
import { BoltLogo } from "../assets/icons/bolt";

export const FirstLogin = () => {
  const { user, login: setAuth, token } = useAuth();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");

    console.log(user);

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      if (!user) throw new Error("User not found");
      await changePassword({ newPassword, confirmPassword });

      // update local user state to flip firstLogin
      setAuth(token!, { ...user!, firstLogin: false });

      navigate("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center gap-6">
      <div className="flex items-center gap-3">
        <BoltLogo className="w-8 h-8 text-primary" />
        <span className="text-2xl font-bold">BOLT TMS</span>
      </div>

      <div className="bg-base-300 rounded-box p-8 w-full max-w-sm flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-lg">Welcome, {user?.name}!</h2>
          <p className="text-sm opacity-50">
            Please set a new password before continuing.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs opacity-50">New Password</span>
          <input
            type="password"
            placeholder="Min. 8 characters"
            className="input input-bordered input-sm"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs opacity-50">Confirm Password</span>
          <input
            type="password"
            placeholder="Repeat your password"
            className="input input-bordered input-sm"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        {error && <p className="text-error text-xs">{error}</p>}

        <button
          className="btn btn-primary btn-sm mt-2"
          onClick={handleSubmit}
          disabled={!newPassword || !confirmPassword || isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "Set Password & Continue"
          )}
        </button>
      </div>
    </div>
  );
};
