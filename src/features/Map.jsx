/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "../index.css";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  useMapEvents,
} from "react-leaflet";

export default function Map({ onSetLat, onSetLon, lat, lon }) {
  return (
    <div className="mapContainer">
      <MapContainer
        center={[lat, lon]}
        zoom={13}
        scrollWheelZoom={true}
        className="map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}></Marker>
        <ChangeCenter position={[lat, lon]} />
        <DetectClick onSetLat={onSetLat} onSetLon={onSetLon} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick({ onSetLat, onSetLon }) {
  useMapEvents({
    click: (e) => (
      onSetLat(e.latlng.lat), onSetLon(e.latlng.lng), console.log(e)
    ),
  });
}
