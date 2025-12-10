import React from "react";

export default function BuildOptionsSection() {
  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center mb-16 max-w-7xl mx-auto">
      {/* Pre-Builts */}
      <a
        href="#prebuilts"
        className="relative w-full md:w-1/2 h-96 rounded-3xl overflow-hidden cursor-pointer flex items-center justify-center transform transition duration-300 hover:scale-105"
        style={{
          backgroundImage: "url('https://i5.walmartimages.com/seo/Hoengager-RTX-5070-12GB-Gaming-PC-Desktop-AMD-Ryzen-5-9600X-6-Core-3-9-GHz-32GB-DDR4-RAM-1TB-PCIe-SSD-WiFi-BT-Windows-11-Pro-RGB-Prebuilt-Computer_88e0b0b6-e18d-4e7b-8a77-2613ce7a865d.f48717efdba3b84f1f3ead07eae3a3a6.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-3xl transition duration-300 hover:bg-black/20">
          <h3 className="text-5xl font-extrabold text-white">Pre-Builts</h3>
        </div>
      </a>

      {/* Custom Builds */}
      <a
        href="#custombuilds"
        className="relative w-full md:w-1/2 h-96 rounded-3xl overflow-hidden cursor-pointer flex items-center justify-center transform transition duration-300 hover:scale-105"
        style={{
          backgroundImage: "url('https://www.createpcs.co.uk/wp-content/uploads/2025/09/amd-ryzen-9950x3d-rtx-5090-rog-astral-gaming-pc-30.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-3xl transition duration-300 hover:bg-black/20">
          <h3 className="text-5xl font-extrabold text-white">Custom Builds</h3>
        </div>
      </a>
    </div>
  );
}