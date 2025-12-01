import React from "react";

const BenefitCard = ({ item }) => {
  return (
    <div key={item.id}>
      <div className="bg-white shadow-md rounded-2xl p-6 flex items-center gap-6 border border-gray-200">
        {/* Left Image */}
        <img
          src={item.img}
          alt={item.title}
          className="md:w-30 md:h-30 w-20 h-20 object-cover rounded-xl"
        />

        {/* Divider */}
        <div className="w-px h-20 bg-gray-300" />

        {/* Right Content */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
          <p className="text-gray-600 text-sm">{item.desc}</p>
        </div>
      </div>

      {/* Horizontal Line Between Cards */}
      {/* {index < benefits.length - 1 && <hr className="my-10 border-gray-300" />} */}
    </div>
  );
};

export default BenefitCard;
