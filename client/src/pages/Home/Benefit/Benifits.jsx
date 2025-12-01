import BenefitCard from "./BenefitCard";
import liveTracking from "../../../assets/live-tracking.png";
import safeDelivery from "../../../assets/safe-delivery.png";

export default function Benefits() {
  const benefits = [
    {
      id: 1,
      title: "Live Parcel Tracking",
      desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
      img: liveTracking,
    },
    {
      id: 2,
      title: "100% Safe Delivery",
      desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      img: safeDelivery,
    },
    {
      id: 3,
      title: "24/7 Call Center Support",
      desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
      img: safeDelivery,
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-2">Our Benefits</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover why our service stands out from the rest.
        </p>
      </div>

      {/* Benefit Cards */}
      <div className="space-y-10">
        {benefits.map((item) => BenefitCard({ item }))}
      </div>
    </section>
  );
}
