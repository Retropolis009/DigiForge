import { useState } from "react";

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const url = `http://localhost:8000/${mode}`; // FastAPI endpoints
    const payload = { username, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage(data.message);
        onAuthSuccess(username); // update parent state with username
        setUsername("");
        setPassword("");
        setTimeout(() => onClose(), 1500);
      } else {
        setError(data.detail || "Something went wrong"); // show error
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-gradient-to-br from-purple-900 to-black w-full max-w-md p-8 rounded-3xl shadow-2xl animate-[fadeIn_0.25s_ease-out] text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-300 hover:text-purple-400 text-2xl transition"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center mb-6 text-purple-300">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="text-sm font-medium text-purple-200">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-purple-700 bg-black/30 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-purple-400"
              placeholder="Enter username"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-purple-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-purple-700 bg-black/30 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-purple-400"
              placeholder="Enter password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 transition duration-200 rounded-xl font-semibold text-white text-lg disabled:opacity-50"
          >
            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Sign Up"}
          </button>

          {/* Error / Success Messages */}
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
          {successMessage && <p className="text-green-400 text-sm mt-2 text-center">{successMessage}</p>}
        </form>

        {/* Switch Mode */}
        <p className="text-center mt-5 text-purple-200 text-sm">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-purple-400 hover:underline font-medium transition"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-purple-400 hover:underline font-medium transition"
              >
                Log In
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}