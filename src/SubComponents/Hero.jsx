import React from "react";

export default function Hero() {
  return (
    <section className="relative bg-black text-white min-h-[80vh] flex items-center justify-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://static0.howtogeekimages.com/wordpress/wp-content/uploads/2022/04/rgb-lit-gaming-mechanical-keyboard.jpg?q=50&fit=crop&w=1200&h=675&dpr=1.5')",
        }}
      ></div>

      {/* Overlay for darker look */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
          Build Your Dream PC
        </h1>
        <p className="text-xl sm:text-2xl mb-8">
          Pre-Builts, Custom Builds, and Components for every gamer and creator.
        </p>

        {/* Shop Now button */}
        <a
          href="#carousel"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-lg font-semibold text-xl transition duration-300"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
}
