import React from "react";
import { ShieldCheck, Truck, Cpu, HeadphonesIcon } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Premium Components",
      desc: "Every part is sourced from trusted global brands with full warranty.",
      icon: <Cpu size={40} />,
    },
    {
      title: "Fast & Safe Delivery",
      desc: "Safe shipping across Pakistan with careful packaging and tracking.",
      icon: <Truck size={40} />,
    },
    {
      title: "Warranty Included",
      desc: "We guarantee full authenticity and provide reliable warranty support.",
      icon: <ShieldCheck size={40} />,
    },
    {
      title: "Expert Support",
      desc: "Need help choosing parts? Our team is always ready to guide you.",
      icon: <HeadphonesIcon size={40} />,
    },
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12">Why Choose Us?</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-xl bg-gray-900/50 border border-gray-700 hover:border-indigo-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
            >
              <div className="flex justify-center mb-6 text-indigo-400">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}