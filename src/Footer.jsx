// src/Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Logo + Quick Links */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-12">
          
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-600 mb-2">DigiForge</h2>
            <p className="text-gray-400 max-w-xs">
              Build your dream PC or choose from our pre-built systems. All hardware, all in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-12">
            <div>
              <h3 className="font-semibold mb-2">Products</h3>
              <ul className="space-y-1 text-gray-400">
                <li><a href="#prebuilts" className="hover:text-indigo-500 transition">Pre-Builts</a></li>
                <li><a href="#custombuilds" className="hover:text-indigo-500 transition">Custom Builds</a></li>
                <li><a href="#components" className="hover:text-indigo-500 transition">Components</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Company</h3>
              <ul className="space-y-1 text-gray-400">
                <li><a href="#about" className="hover:text-indigo-500 transition">About Us</a></li>
                <li><a href="#contact" className="hover:text-indigo-500 transition">Contact</a></li>
                <li><a href="#support" className="hover:text-indigo-500 transition">Support</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Social Icons + Copyright */}
        <div className="flex flex-col sm:flex-row sm:justify-between items-center border-t border-gray-700 pt-6">
          {/* Social Icons */}
          <div className="flex gap-4 mb-4 sm:mb-0">
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-indigo-600 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-indigo-600 transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-indigo-600 transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 rounded-full bg-gray-800 hover:bg-indigo-600 transition">
              <FaLinkedinIn />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} DigiForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}