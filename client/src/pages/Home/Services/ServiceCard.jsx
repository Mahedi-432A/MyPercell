// src/components/ServiceCard.jsx
import React from "react";

const ServiceCard = ({ service }) => {
  const { icon: Icon, title, description } = service; 
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-all p-6 border border-gray-100">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-primary text-4xl">
          <Icon />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>

      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
