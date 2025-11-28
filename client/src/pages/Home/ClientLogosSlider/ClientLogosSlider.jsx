import Marquee from "react-fast-marquee";

// Import your logos
import client1 from "../../../assets/brands/amazon.png";
import client2 from "../../../assets/brands/amazon_vector.png";
import client3 from "../../../assets/brands/casio.png";
import client4 from "../../../assets/brands/moonstar.png";
import client5 from "../../../assets/brands/randstad.png";
import client6 from "../../../assets/brands/star.png";
import client7 from "../../../assets/brands/start_people.png";

const logos = [
  client1,
  client2,
  client3,
  client4,
  client5,
  client6,
  client7,
];

const ClientLogosSlider = () => {
  return (
    <div className="py-10 bg-base-200">
        <h2 className="font-bold text-center mb-8 text-3xl">Trusted by Leading Brands</h2>
      <Marquee 
        speed={40}       // control speed
        gradient={false} // disable gradient fade
        pauseOnHover={true}
      >
        {logos.map((logo, index) => (
          <img 
            key={index}
            src={logo}
            alt={`client-${index}`}
            className="h-8 w-auto mx-18 opacity-80 hover:opacity-100 transition"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default ClientLogosSlider;
