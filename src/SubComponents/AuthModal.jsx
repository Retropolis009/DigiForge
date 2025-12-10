import { useState } from "react";

export default function AuthModal({ isOpen, onClose }) {
  const [mode, setMode] = useState("login"); // "login" or "signup"

  if (!isOpen) return null;

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
        <form className="space-y-4">
          {/* Username */}
          <div>
            <label className="text-sm font-medium text-purple-200">Username</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border border-purple-700 bg-black/30 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-purple-400"
              placeholder="Enter username"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-purple-200">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border border-purple-700 bg-black/30 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-purple-400"
              placeholder="Enter password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 transition duration-200 rounded-xl font-semibold text-white text-lg"
          >
            {mode === "login" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* Switch Mode */}
        <p className="text-center mt-5 text-purple-200 text-sm">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
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
