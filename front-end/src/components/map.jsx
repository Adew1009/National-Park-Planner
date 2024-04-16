import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import MapboxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { FaArrowTurnDown } from "react-icons/fa6";
const initialItemCount = 4;
// const directions = routeInfo.length > 0 ? routeInfo[0].legs[0].steps : [];
const Map = ({ parkLatLong, parkBoundary, parkName }) => {
  const mapContainerRef = useRef(null);
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/satellite-streets-v12"
  );
  const [expand, setExpand] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [origin, setOrigin] = useState("");
  const destination = [parkLatLong.longitude, parkLatLong.latitude];
  const [routeGeometry, setRouteGeometry] = useState(null);
  const [originCord, setOriginCord] = useState([
    parkLatLong.longitude,
    parkLatLong.latitude,
  ]);
  let originCoordinates = [];
  const [routeInfo, setRouteInfo] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const geocodingClient = MapboxGeocoding({
    accessToken: import.meta.env.VITE_APP_MAP_BOX_ACCESS_TOKEN,
  });

  useEffect(() => {
    localStorage.setItem("mode", "driving");
  }, []);

  //***** Defines the initial map container ********/
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_APP_MAP_BOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [parkLatLong.longitude, parkLatLong.latitude],
      zoom: 12,
      attributionControl: false,
    });

    map.on("style.load", () => {
      const compassControl = new mapboxgl.NavigationControl({
        showCompass: true,
      });
      map.addControl(compassControl, "top-right");

      const startMarker = new mapboxgl.Marker()
        .setLngLat(originCord)
        .addTo(map);

      // TODO ADD LINK TO POP UP BOX
      // * ********Adds the red marker to the park location on the Map******
      const popup = new mapboxgl.Popup().setText(parkName);
      const ParkMarker = new mapboxgl.Marker({
        color: "Red",
      })
        .setLngLat([parkLatLong.longitude, parkLatLong.latitude])
        .setPopup(popup)
        .addTo(map);

      // **********  Adds the driving route to the map **IF True**     ***********
      if (routeGeometry) {
        map.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: routeGeometry,
          },
        });

        map.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "blue",
            "line-width": 3,
          },
        });

        //*****Set the map boundary to the route*****
        const bounds = routeGeometry.coordinates.reduce(
          (bounds, coord) => bounds.extend(coord),
          new mapboxgl.LngLatBounds()
        );

        //* Zooms out to fit the route
        map.fitBounds(bounds, {
          padding: 50,
        });
      }

      //***  Sets the Park Boundary If True ******
      if (parkBoundary) {
        map.addSource("park", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: parkBoundary,
            },
          },
        });
        map.addLayer({
          id: "route",
          type: "line",
          source: "park",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "Green",
            "line-width": 2,
          },
        });
        map.addLayer({
          id: "park",
          type: "fill",
          source: "park",
          layout: {},
          paint: {
            "fill-color": "Red",
            "fill-opacity": 0.5,
          },
        });
      }
      //End of Park Boundary
    });
  }, [mapStyle, routeGeometry]);

  // * sets satelite or road map on change *
  const handleMapStyleChange = (event) => {
    setMapStyle(event.target.value);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setOrigin(value);

    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/united%states/${value}.json`,
        {
          params: {
            access_token: mapboxgl.accessToken,
            autocomplete: true,
            types: ["place"],
            limit: 5,
          },
        }
      )
      .then((response) => {
        const { features } = response.data;
        setSuggestions(features);
      })
      .catch((error) => {
        console.error("Error fetching autocomplete suggestions:", error);
      });
  };

  const handleSelectSuggestion = (suggestion) => {
    setOrigin(suggestion.place_name);
    setOriginCord(suggestion.center);
    setSuggestions([]); // Clear the suggestions
  };

  // calculate direction to the Park
  const calcRouteDirection = async () => {
    if (origin.length > 2) {
      try {
        const origin = document.getElementById("fromAddress").value;
        if (origin.length > 2) {
          try {
            const response = await geocodingClient
              .forwardGeocode({
                query: origin,
                types: ["place"],
                limit: 1,
              })
              .send();

            const destinationCoordinates = response.body.features[0].center;
            originCoordinates = destinationCoordinates;
            setOriginCord(destinationCoordinates);
          } catch (error) {
            console.error("Error calculating directions:", error);
            throw error;
          }
        }
        const response = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/${localStorage.getItem(
            "mode"
          )}/${originCoordinates[0]},${originCoordinates[1]};${
            destination[0]
          },${destination[1]}?steps=true&geometries=geojson&access_token=${
            import.meta.env.VITE_APP_MAP_BOX_ACCESS_TOKEN
          }`
        );

        const routes = response.data.routes;
        console.log("routes=>", routes);
        setRouteInfo(routes);
        // Check if any routes are returned
        if (routes.length > 0) {
          const { distance, duration, geometry } = routes[0];

          //*  set distance and duration
          const directions = {
            distance,
            duration,
          };
          localStorage.setItem("fromLocation", origin);
          setRouteGeometry(geometry); // Set the route geometry
          return directions;
        } else {
          // No routes found
          throw new Error("Unable to calculate directions");
        }
      } catch (error) {
        // Handle error
        console.error("Error calculating directions:", error);
        throw error;
      }
    }
  };

  const handleInputBlur = () => {
    // Use setTimeout to allow the click event to be registered before clearing suggestions
    setTimeout(() => {
      setIsFocused(false);
      setSuggestions([]);
    }, 200);
  };

  return (
    <div>
      <div>
        <h3 className="primary-title text-center" id="info">
          Map and Directions to {parkName}
        </h3>
      </div>

      <div>
        <div>
          <div id="from" className="mx-auto">
            <strong style={{ color: "black" }}>From</strong>
            <label htmlFor="fromAddress" style={{ display: "none" }}>
              From label
            </label>

            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevent default form submission behavior
                calcRouteDirection(); // Call calcRouteDirection function
              }}
            >
              <input
                type="text"
                className={isFocused ? "input-focused" : ""}
                name="fromAddress"
                id="fromAddress"
                placeholder="Example: Nashville, TN"
                value={origin}
                onChange={(e) => {
                  handleInputChange(e);
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={handleInputBlur}
                autoComplete="off"
              />
              <input
                className="bg-light"
                type="submit"
                value="Get Directions"
              />
            </form>
          </div>
          {isFocused && suggestions.length > 0 && (
            <div className="suggestions mx-auto text-start">
              {suggestions.map((suggestion) => (
                <div
                  className="suggestion-item"
                  key={suggestion.id}
                  onClick={() => handleSelectSuggestion(suggestion)}
                ></div>
              ))}
            </div>
          )}
        </div>

        {routeInfo.length > 0 && (
          <div>
            <div>
              <h4>
                <span id="from_address_show">
                  {localStorage
                    .getItem("fromLocation")
                    .replace(/\b\w/g, (match) => match.toUpperCase())}
                </span>
              </h4>
              <h5>To</h5>
              <h4>
                <span id="to_address_show">{parkName}</span>
              </h4>
            </div>
            <div>
              <span>
                Trip Distance:{" "}
                {routeInfo.length > 0 &&
                  Math.floor(routeInfo[0].distance / 1609.34)}{" "}
                miles
                <br />
                Trip Duration:{" "}
                {routeInfo.length > 0 &&
                  Math.floor(routeInfo[0].duration / 3600)}{" "}
                hours{" "}
                {routeInfo.length > 0 &&
                  Math.floor((routeInfo[0].duration % 3600) / 60)}{" "}
                minutes
                {console.log(routeInfo)}
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="text-xs-center text-center">
        <div className="col-lg-12 map_trans col-xs-12 col-sm-12  text-sm-center text-center">
          <select
            value={mapStyle}
            onChange={handleMapStyleChange}
            id="map_type"
          >
            <option value="mapbox://styles/mapbox/streets-v11">MAP</option>
            <option value="mapbox://styles/mapbox/satellite-streets-v12">
              SATELLITE
            </option>
          </select>
          <div
            className="rounded"
            ref={mapContainerRef}
            style={{
              width: "100%",
              height: "50vh",
              border: "1px solid",
              marginBottom: "3rem",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Map;
