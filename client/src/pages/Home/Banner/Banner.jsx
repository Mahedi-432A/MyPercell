import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import BannerImage1 from "../../../assets/banner/banner1.png"
import BannerImage2 from "../../../assets/banner/banner2.png"
import BannerImage3 from "../../../assets/banner/banner3.png"

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
      <div>
        <img src={BannerImage1} />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src={BannerImage2} />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src={BannerImage3} />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default Banner;
