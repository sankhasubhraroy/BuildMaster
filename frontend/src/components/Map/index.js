import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function Map({ coordinates }) {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCv0tGZVlwdLiE03GxWPQFmY8xgDDwam1g">
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
