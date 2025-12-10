import React from 'react';
import Hero from './SubComponents/Hero';
import FeaturesSection from './SubComponents/FeaturesSection';
import CarouselSection from './SubComponents/CarouselSection';
import BuildOptionsSection from './SubComponents/BuildOptionsSection';

export default function Body() {
  return (
    <div className="bg-black">
      <Hero />
      <FeaturesSection />
      <CarouselSection />
      <BuildOptionsSection />
    </div>
  );
}
