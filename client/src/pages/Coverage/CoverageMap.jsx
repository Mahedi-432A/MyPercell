import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue in Vite + Leaflet
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect } from "react";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Helper component to move map on district selection
function MapController({ selectedDistrict }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedDistrict) return;

    map.flyTo([selectedDistrict.latitude, selectedDistrict.longitude], 14, {
      duration: 1.5,
    });

    // Open popup automatically
    if (selectedDistrict._popupRef) {
      selectedDistrict._popupRef.openOn(map);
    }
  }, [selectedDistrict]);

  return null;
}

export default function CoverageMap({ Warehouses, selectedDistrict }) {
  const branches = Warehouses;

  //   const branchIcon = L.icon({
  //     iconUrl: markerIcon,
  //     iconSize: [25, 41],
  //     iconAnchor: [12, 41],
  //     popupAnchor: [1, -34],
  //     shadowSize: [41, 41],
  //   })

  const branchIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [32, 32],
  });

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg border">
      <MapContainer
        center={[23.8103, 90.4125]} // Dhaka Coordinates
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: "450px", width: "100%" }}
      >
        {/* Map Style (OpenStreetMap) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* Map controller handles search zoom */}
        <MapController selectedDistrict={selectedDistrict} />

        {/* Marker Example */}
        {/* ✅ NEW — Loop through all branches and show markers */}
        {branches.map((branch, index) => (
          <Marker
            key={index}
            position={[branch.latitude, branch.longitude]}
            icon={branchIcon}
          >
            <Popup>
              <div>
                <h2 className="font-bold text-lg">{branch.district}</h2>
                <p className="text-sm">
                  Area: {branch.covered_area.join(", ")}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
