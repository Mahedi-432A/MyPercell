import React from "react";
import ServiceCard from "./ServiceCard";
import { servicesData } from "./serviceData";

const Services = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
            From personal packages to business shipments — we deliver on time, every time.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
