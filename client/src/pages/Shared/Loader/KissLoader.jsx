import React from "react";
import "../../../Styles/kissLoader.css";

const KissLoader = () => {
  return (
    <div className="kiss-loader-container">
      <svg
        className="couple-svg"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="couple-anim">
          {/* <!-- Boy silhouette --> */}
          <path
            d="M80 110 C60 90, 60 60, 85 50 C105 40, 130 60, 120 85 C115 100, 100 110, 80 110 Z"
            fill="#2f3e46"
          />

          {/* <!-- Girl silhouette --> */}
          <path
            d="M120 110 C140 90, 140 60, 115 50 C95 40, 70 60, 80 85 C85 100, 100 110, 120 110 Z"
            fill="#ff758f"
          />

          {/* <!-- Kiss motion small heart --> */}
          <path
            className="heart"
            d="M100 75 
               C95 70, 88 70, 88 78 
               C88 85, 100 92, 100 92 
               C100 92, 112 85, 112 78 
               C112 70, 105 70, 100 75 Z"
            fill="#ff4d6d"
            opacity="0.8"
          />
        </g>
      </svg>

      <p className="loading-romantic-text">Loading with love…</p>
    </div>
  );
};

export default KissLoader;
