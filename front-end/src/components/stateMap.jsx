import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const StateMap = () => {
  const mapContainerRef = useRef(null);
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/satellite-streets-v12"
  );

  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_APP_MAP_BOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [-95.7129, 37.0902],
      zoom: 3,
      attributionControl: false,
    });

    map.on("load", () => {
      // Add a source for the state polygons.
      map.addSource("states", {
        type: "geojson",
        data: "https://docs.mapbox.com/mapbox-gl-js/assets/ne_110m_admin_1_states_provinces_shp.geojson",
      });

      map.addLayer({
        id: "states-layer",
        type: "fill",
        source: "states",
        paint: {
          // todo adjust colors
          "fill-color": "rgba(60, 179, 113, 0.7)",
          "fill-outline-color": "rgba(150, 75, 0, 1)",
        },
      });

      map.on("click", "states-layer", (e) => {
        const stateName = e.features[0].properties.name;
        const postalCode = e.features[0].properties.postal;
        navigate(`/parksbystate/${stateName}/${postalCode}`); // Use navigate instead of Navigate
      });

      map.on("style.load", () => {
        const compassControl = new mapboxgl.NavigationControl({
          showCompass: true,
        });
        map.addControl(compassControl, "top-right");
      });
      map.on("mouseenter", "states-layer", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "states-layer", () => {
        map.getCanvas().style.cursor = "";
      });
    });
  }, [mapStyle, navigate]); // Include navigate in the dependency array

  return (
    <div>
      <div>
        <div
          className="d-block mx-auto img-fluid w-75"
          ref={mapContainerRef}
          style={{
            width: "75vw",
            height: "50vh",
            border: "1px solid",
            marginBottom: "3rem",
          }}
        />
      </div>
    </div>
  );
};

export default StateMap;
