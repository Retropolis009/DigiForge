// src/Header.jsx
import React from "react";
import { FaUser, FaShoppingCart } from "react-icons/fa";

export default function Header({ onOpenAuth, user }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-black shadow-lg">
      <div className="flex items-center justify-between h-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Logo */}
        <a
          href="/"
          className="text-3xl font-extrabold text-indigo-600 hover:text-indigo-400 transition duration-200"
        >
          DigiForge
        </a>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Cart */}
          <a
            href="/cart"
            className="text-gray-300 hover:text-indigo-500 transition duration-200 flex items-center"
            aria-label="View Cart"
          >
            <FaShoppingCart className="w-6 h-6" />
            <span className="ml-2 hidden sm:inline text-sm font-medium">Cart</span>
          </a>

          {/* Login / Username */}
          {user ? (
            <span className="text-gray-300 flex items-center">
              <FaUser className="w-6 h-6 mr-2" />
              {user}
            </span>
          ) : (
            <button
              onClick={onOpenAuth}
              className="text-gray-300 hover:text-indigo-500 transition duration-200 flex items-center"
              aria-label="Login Account"
            >
              <FaUser className="w-6 h-6" />
              <span className="ml-2 hidden sm:inline text-sm font-medium">Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}