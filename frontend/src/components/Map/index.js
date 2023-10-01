import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function Map({ coordinates }) {
  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        center={coordinates}
        zoom={13}
        mapContainerStyle={{ width: "100%", height: "100%" }}
      >
        <Marker position={coordinates} />
      </GoogleMap>
    </LoadScript>
  );
}

export default Map;
