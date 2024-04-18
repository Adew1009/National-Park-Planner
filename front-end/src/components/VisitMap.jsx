import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Map = ({ latlong, code, color }) => {
  const mapContainerRef = useRef(null);
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/satellite-streets-v12"
  );

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_APP_MAP_BOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [-95.7129, 37.0902],
      zoom: 3,
      attributionControl: false,
    });

    map.on("style.load", () => {
      const compassControl = new mapboxgl.NavigationControl({
        showCompass: true,
      });
      map.addControl(compassControl, "top-right");

      console.log(latlong);
      if (latlong) {
        latlong.forEach((coord) => {
          const popup = new mapboxgl.Popup().setText(coord[1]);

          const marker = new mapboxgl.Marker({
            color: color,
          })
            .setLngLat(coord[0])
            .setPopup(popup)
            .addTo(map);
        });
      }
    });
  }, [mapStyle]);

  const handleMapStyleChange = (event) => {
    setMapStyle(event.target.value);
  };

  return (
    <row className="d-block mx-auto img-fluid w-100 rounded">
      <div>
        <select value={mapStyle} onChange={handleMapStyleChange} id="map_type">
          <option value="mapbox://styles/mapbox/streets-v11">MAP</option>
          <option value="mapbox://styles/mapbox/satellite-streets-v12">
            SATELLITE
          </option>
        </select>
        <div
          className="d-block mx-auto img-fluid w-75 rounded"
          ref={mapContainerRef}
          style={{
            width: "50vw",
            height: "50vh",
            border: "1px solid",
            marginBottom: "3rem",
          }}
        />
      </div>
    </row>
  );
};

export default Map;
