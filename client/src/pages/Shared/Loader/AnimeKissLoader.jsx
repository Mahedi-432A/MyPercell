import React from "react";
import "../../../Styles/animeKissLoader.css";

const AnimeKissLoader = () => {
  return (
    <div className="anime-loader-container">
      <svg
        className="anime-svg"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="anime-couple">
{/* 
          <!-- Boy full upper body silhouette --> */}
          <path
            className="boy"
            d="M120 200 
               C110 170, 115 150, 135 135 
               C150 125, 175 135, 175 155 
               C175 175, 160 200, 140 210 
               Z"
            fill="#3a4f7a"
          />

          {/* <!-- Girl full upper body silhouette --> */}
          <path
            className="girl"
            d="M180 200 
               C195 170, 190 150, 170 135 
               C150 120, 130 135, 130 155 
               C130 175, 145 200, 165 210 
               Z"
            fill="#ff6b9f"
          />

          {/* <!-- Boy head --> */}
          <circle className="boy-head" cx="150" cy="120" r="28" fill="#2d3e60" />

          {/* <!-- Girl head --> */}
          <circle className="girl-head" cx="165" cy="120" r="28" fill="#ff5c8d" />


          {/* <!-- Hair shapes --> */}
          <path className="boy-hair"
            d="M125 110 C140 90, 170 85, 165 110"
            fill="#1f2b45"
          />

          <path className="girl-hair"
            d="M140 110 C155 90, 185 100, 175 125"
            fill="#e94d80"
          />


          {/* <!-- Heart pop --> */}
          <g className="heart-pop">
            <path
              d="M150 90 
                 C145 85, 138 85, 138 93
                 C138 100, 150 108, 150 108
                 C150 108, 162 100, 162 93
                 C162 85, 155 85, 150 90 Z"
              fill="#ff4d71"
            />
          </g>

        </g>
      </svg>

      <p className="anime-loading-text">Loading romance…</p>
    </div>
  );
};

export default AnimeKissLoader;
