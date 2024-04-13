// import { useState } from "react";
import "./App.css";
import { useEffect, useState } from "react";
import PageNavbar from "./components/navbar";
import { api } from "./utilities";

import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";

function App() {
  const [user, setUser] = useState(useLoaderData());
  const location = useLocation();
  const navigate = useNavigate();
  // **** USED FOR VISIT OUTLET CONTEXT*****
  const [visits, setVisits] = useState([]);
  const [latlong, setLatlong] = useState([]);
  const [mapLoading, setMapLoading] = useState(true);

  // **** USED FOR VISIT OUTLET CONTEXT*****
  const getVisits = async () => {
    try {
      let response = await api.get(`visited/all-visits/`);
      let results = response.data;
      // console.log("results", results);
      setVisits(results);
      // setLoading(false);
      const latlonglist = [];
      results.map((park) =>
        latlonglist.push([
          [park.parkCode.longitude, park.parkCode.latitude],
          park.parkCode.fullName,
        ])
      );
      setLatlong(latlonglist);
      console.log("latlonglist", latlonglist);
      setMapLoading(false);
      console.log(mapLoading);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  useEffect(() => {
    getVisits();
  }, []);

  const updateVisits = () => {
    getVisits();
    setMapLoading(true);
  };

  // **** USED FOR WISHLIST OUTLET CONTEXT*****

  const [wishlist, setWishlist] = useState([]);
  const [wishlatlong, setWishLatlong] = useState([]);
  const [wishmapLoading, setWishMapLoading] = useState(true);

  const getWishlist = async () => {
    try {
      let response = await api.get(`wishlist/allwishlist/`);
      let results = response.data;
      console.log("results", results);
      setWishlist(results);
      // setLoading(false);
      const latlonglist = [];
      results.map((park) =>
        latlonglist.push([
          [park.parkCode.longitude, park.parkCode.latitude],
          park.parkCode.fullName,
        ])
      );
      setWishLatlong(latlonglist);
      console.log("latlonglist", latlonglist);
      setWishMapLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  const updateWishlist = () => {
    getWishlist();
    setWishMapLoading(true);
  };

  //? Code To Show An Alert
  //?  if (favorites.length >= 4) {
  //?     setShowAlert(true);
  useEffect(() => {
    let nullUserUrls = ["/login/", "/signup/"];
    let isAllowed = nullUserUrls.includes(location.pathname);
    if (user && isAllowed) {
      navigate("/");
    } else if (!user && !isAllowed) {
      navigate("/");
    }
  }, [location.pathname, user]);

  return (
    <main>
      <div id="App">
        <PageNavbar setUser={setUser} user={user} />
        <div>
          <Outlet
            context={{
              user,
              setUser,
              visits,
              setVisits,
              latlong,
              setLatlong,
              mapLoading,
              setMapLoading,
              updateVisits,
              wishlist,
              setWishlist,
              wishlatlong,
              setWishLatlong,
              wishmapLoading,
              setWishMapLoading,
              updateWishlist,
            }}
          />
        </div>
      </div>
    </main>
  );
}
export default App;
